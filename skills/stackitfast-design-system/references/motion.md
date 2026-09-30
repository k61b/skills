# Motion

Motion says "a layer snapped into place" — quick, settled, never floaty.
Everything is wrapped in `motion-safe:` or checks `prefers-reduced-motion`.

| Utility               | Duration                   | Use                                                       |
| --------------------- | -------------------------- | --------------------------------------------------------- |
| `animate-snap`        | 220ms, 10px from the right | the one hero moment: a layer / Stacky's top file arriving |
| `animate-rise`        | 520ms, 14px up             | first view of hero copy and panels, staggered 60ms        |
| `animate-pop`         | 150ms, scale .96 → 1       | modals, popovers                                          |
| `animate-drop`        | 150ms, 6px down            | menus, drawers                                            |
| `animate-blink`       | 5s loop                    | Stacky's eyes (built in)                                  |
| `lift` / Button hover | 150ms, −2px                | CTAs, tool cards, share cards                             |
| `fold-grow`           | 150ms                      | file cards and folded tabs on hover                       |

Rules:

- One orchestrated entrance per page (the hero). Sections below do not animate in on scroll.
- Easing is always `ease-snap` (cubic-bezier(0.2, 0.8, 0.2, 1)).
- No pulsing, no infinite attention loops except Stacky's blink.
- No blur-in, no parallax, no scroll-jacking.
- Share cards may spread slightly on hover (rotate ±2° more), 220ms.

For deeper motion reviews defer to the `design-motion-principles` skill.
