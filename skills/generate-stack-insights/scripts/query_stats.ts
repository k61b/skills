import { createDbClient } from '../../../../packages/db/src/client';
import { directoryProjects } from '../../../../packages/db/src/schema/directoryProjects';
import { gte, eq, and } from 'drizzle-orm';

const connectionString =
  process.env.DATABASE_URL ||
  (() => {
    throw new Error('DATABASE_URL environment variable is required.');
  })();

const db = createDbClient(connectionString);

export async function fetchMonthlyStats(days: number = 30) {
  const windowDate = new Date();
  windowDate.setDate(windowDate.getDate() - days);

  const projects = await db
    .select()
    .from(directoryProjects)
    .where(
      and(eq(directoryProjects.status, 'approved'), gte(directoryProjects.createdAt, windowDate))
    );

  const total = projects.length;

  if (total < 10) {
    return {
      sufficientData: false,
      sampleSize: total,
      message: `Yeterli veri yok, son ${days} günde onaylanan ${total} kayıt var (en az 10 gerekli).`,
    };
  }

  const techCounts: Record<string, number> = {};
  const comboCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};
  let vibecodedCount = 0;
  let classicCount = 0;
  let hybridCount = 0;
  let agentModeCount = 0;

  for (const p of projects) {
    const stack = (Array.isArray(p.stack) ? p.stack : []) as string[];
    const combo = stack.slice().sort().join(' + ');
    comboCounts[combo] = (comboCounts[combo] || 0) + 1;

    for (const t of stack) {
      techCounts[t] = (techCounts[t] || 0) + 1;
    }

    typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;

    if (p.isVibecoded) {
      vibecodedCount++;
    }

    if (p.mode === 'classic') classicCount++;
    else if (p.mode === 'hybrid') hybridCount++;
    else if (p.mode === 'agent') agentModeCount++;
  }

  const topTechs = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tech, count]) => ({
      tech,
      count,
      percentage: Math.round((count / total) * 100),
    }));

  const topCombos = Object.entries(comboCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([combo, count]) => ({ combo, count }));

  const topCategories = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
    }));

  return {
    sufficientData: true,
    sampleSize: total,
    topTechs,
    topCombos,
    topCategories,
    vibecoded: {
      count: vibecodedCount,
      percentage: Math.round((vibecodedCount / total) * 100),
    },
    nonVibecoded: {
      count: total - vibecodedCount,
      percentage: Math.round(((total - vibecodedCount) / total) * 100),
    },
    modes: {
      classic: { count: classicCount, percentage: Math.round((classicCount / total) * 100) },
      hybrid: { count: hybridCount, percentage: Math.round((hybridCount / total) * 100) },
      agent: { count: agentModeCount, percentage: Math.round((agentModeCount / total) * 100) },
    },
  };
}

async function main() {
  const stats = await fetchMonthlyStats(30);
  console.log(JSON.stringify(stats, null, 2));
  process.exit(0);
}

if (import.meta.main) {
  main();
}
