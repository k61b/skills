# Stacky

Stacky is the logo's block as a character: three stacked layers (two cream,
the top one an **apricot file with a folded peach corner**) and a face on the
middle layer. The top layer is tilted −6° — it has just snapped into place —
with two apricot speed ticks behind it.

## Poses

| Pose        | Face                              | Extras                          | Use                                          |
| ----------- | --------------------------------- | ------------------------------- | -------------------------------------------- |
| `default`   | two open eyes, smile              | speed ticks                     | section heads, neutral                       |
| `wink`      | left open, right closed arc       | speed ticks                     | hero, welcome                                |
| `wave`      | open eyes, open mouth             | apricot hand block, speed ticks | sign-in prompts, onboarding                  |
| `think`     | eyes glancing up-left, flat mouth | thought bubble with "?"         | survey in progress, empty search, loading    |
| `celebrate` | happy arcs, open mouth            | top layer −12°, confetti blocks | success: published, card made, results ready |
| `sleep`     | closed lines, small "o"           | top layer flat, "z z"           | 404, nothing here yet, footer                |

Eyes blink every ~5s (`motion-safe:animate-blink`); nothing else loops.

## Adding a pose

Add the pose name to `StackyPose`, then extend `StackyFace` (eyes + mouth)
and the extras inside `Stacky`. Keep the body, colours, cheeks (apricot 70%),
outline and die-cut identical — only the face, the top layer's tilt and small
extras change. Render the sheet and compare the new pose next to the others.

## Don't

- Recolour Stacky or give him new body parts beyond small hands/props.
- Crop through his face, rotate the whole body, or place him smaller than
  40px (he turns into a blob).
- Put words in his mouth (no speech bubbles with text).
- Use more than one Stacky per view.
