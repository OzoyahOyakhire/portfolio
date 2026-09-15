# Ozoyah Oyakhire — portfolio

A statically prerendered Next.js 15 site. Three runtime dependencies, one
small client component, no animation libraries.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + format
npm run build      # the real regression test — see below
```

## Editing content

Copy lives in `src/content/`, separate from the components that render it.
Most day-to-day edits never touch a component:

| To change…                          | Edit                          |
| ----------------------------------- | ----------------------------- |
| The "currently building" panel      | `site.ts` → `status`          |
| Hero, CTA, footer, contact details  | `site.ts`                     |
| A project or case study             | `projects.ts`                 |
| Services, process, principles       | `services.ts`, `process.ts`, `principles.ts` |
| Stack and "currently learning"      | `stack.ts`                    |

Content files carry strings and structure only — never Tailwind class names.

A project's architecture diagram is data (`architecture` in `projects.ts`),
rendered by one component, so adding a diagram to another project means adding
nodes and edges rather than drawing SVG.

## Why the build is the test

`typedRoutes`, strict TypeScript with `noUncheckedIndexedAccess`, and
`dynamicParams = false` on `/work/[slug]` mean a renamed slug, a missing
content field or an accidental dynamic API fails `next build`. Every route
should print `○ (Static)` or `● (SSG)`; one flipping to `ƒ (Dynamic)` means
something opted out of prerendering.

## Decisions worth knowing before changing things

- **No `overflow-x: hidden` on the body.** It would break the sticky header —
  an ancestor with overflow becomes the scroll container. Sections are full
  width with the container inside (`<Band>`), so nothing needs to bleed out.
- **`data-tone` is load-bearing.** It sets the focus-ring colour, the logo's
  hover colour and rule opacities on dark grounds. Use `<Band tone="…">` for
  any new coloured section rather than a raw `bg-navy`.
- **Muted is `#6B6965`, not the design's `#767470`.** The original fails WCAG AA
  on the bone background (3.85:1). Don't lighten it.
- **Motion is CSS only**, behind `prefers-reduced-motion` and `@supports`, with
  the finished state as the base style — content is never hidden if an
  animation doesn't run.
