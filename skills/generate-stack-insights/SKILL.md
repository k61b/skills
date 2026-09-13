---
name: generate-stack-insights
description: Generates data-backed monthly tech stack trend reports (insights) for STACK IT FAST by querying live approved directory projects from the database and creating structured markdown files under apps/web/src/content/insights/. Trigger on commands/prompts like 'generate monthly insight', 'aylık trend raporu oluştur', 'create stack insights', or 'generate insights report'.
license: MIT
---

# STACK IT FAST — Monthly Stack Insights Generator Skill

This skill guides the creation of monthly, data-backed architectural trend reports for **STACK IT FAST**. It queries the live PostgreSQL database for approved submissions added in the last 30 days and outputs an Astro Content Collections compatible markdown article.

---

## 1. Database Query & Validation Phase

Execute the built-in query helper script to retrieve verifiable production metrics:

```bash
bun packages/db/src/insightsStats.ts
```

### Threshold Rule (Mandatory):

- If `sufficientData === false` (sample size `< 10` approved records in the last 30 days):
  - **DO NOT WRITE A REPORT.**
  - Immediately inform the user: _"Yeterli veri yok, son 30 günde onaylanan X kayıt var (en az 10 gerekli)."_
  - Stop execution.
- If `sampleSize >= 10`:
  - Proceed with report generation using the exact returned numbers.

---

## 2. Content Writing Guidelines

1. **Strict Data Grounding**:
   - Every single statistic, percentage, technology ranking, and development mode count must come directly from the database query.
   - **Never invent, extrapolate, or estimate synthetic numbers.**
2. **Word Count & Structure**:
   - Total length: **400 to 600 words**.
   - **First Paragraph**: Lead immediately with the single most striking statistic (e.g. _"Across N verified production architectures... [Tech] powers X% of stacks..."_).
   - **H2 Sections**:
     - `## 1. Database & Persistence Layer: ...`
     - `## 2. Frontend Frameworks & Meta-Runtimes: ...`
     - `## 3. Development Modalities: Classic vs. AI-Agent Assisted: ...`
     - `## 4. Category Distribution: ...`
     - `## Sample Size & Methodology Transparency: ...`
3. **Internal Linking**:
   - All technology names must link to their filtered search view: `[PostgreSQL](/explore?q=Postgres)`, `[Next.js](/explore?q=Next.js)`, `[Redis](/explore?q=Redis)`.
4. **FAQ Section**:
   - Include 2-3 concise question & answer pairs explaining key takeaways or architectural tradeoffs.

---

## 3. File Creation & Naming

Save the generated report inside `apps/web/src/content/insights/` using the current date:
`apps/web/src/content/insights/YYYY-MM-stack-trends.md` (e.g. `2026-09-stack-trends.md`).

### Frontmatter Schema:

```yaml
---
title: 'Month YYYY Production Stack Trends: [Key Highlight]'
date: 'YYYY-MM-DD'
description: 'Analysis of N verified production software architectures submitted and benchmarked in Month YYYY...'
sampleSize: N
statCallout:
  value: 'XX%'
  label: 'short description of the most prominent metric'
faq:
  - question: 'How were these architecture statistics collected?'
    answer: 'Every datapoint in this report is calculated directly from N production open-source architectures verified and approved in the STACK IT FAST directory over the past 30 days.'
  - question: '...'
    answer: '...'
---
```

---

## 4. Build Validation & Review

1. Run the build to ensure Astro Content Collections parses the markdown schema without errors:
   ```bash
   bun run build
   ```
2. Present the summary and generated file link to the user.
3. **DO NOT AUTO-COMMIT OR AUTO-DEPLOY** unless explicitly instructed by the user.
