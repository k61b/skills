# New brand surface checklist

Before shipping a new place the brand appears (an email, a social template,
a docs site, a new OG or share-card layout, a README section):

1. **Mark**: generated from `brand.ts` (component or `brandMarkSvg`), right
   palette for the background, clear space, ≥ 16px.
2. **Wordmark**: outlined or live Manrope 700; product name in text is
   "STACK IT FAST".
3. **Colour**: tokens only; apricot carries ink text; contrast pairs added to
   `contrast-check.mjs` if new.
4. **Stacky**: a real pose from the component, only if it has a role (greets,
   thinks, celebrates, sleeps); not cropped through the face.
5. **Copy**: `stackitfast-design-system` voice — sentence case, numbers,
   limits, no emoji.
6. **Rendering**: fonts that exist in the renderer (resvg has no fallback);
   check at 1× and 2×, and on a phone.
7. **Emails**: stay plain text until a branded HTML template is designed and
   tested in the major clients; the From name is "STACK IT FAST".
