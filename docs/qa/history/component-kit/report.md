# Component integration QA — 2026-09-11

Update: Reading blocks were subsequently removed at the user's request. The gallery now contains only Tabs, Accordion, and Testimonial2. The article uses Tabs directly and renders its exercise as a static list. The original reading-block screenshots and exercise interaction checks below describe the earlier iteration.

- TypeScript (`npx tsc --noEmit`), oxlint, production build, and `git diff --check` passed.
- shadcn CLI dry runs resolve Tabs to `components/ui/tabs.tsx` and `@ncdai/testimonial-2` to `components/blocks/testimonial-2.tsx`.
- Desktop article: Tabs click and ArrowRight update selection and associated panel; exercise click collapses and Enter expands.
- Gallery: ArrowRight wraps while skipping disabled Tabs; single Accordion closes the previous item. Reduced-motion emulation disables transitions. Disabled controls are exposed as disabled.
- 320px article and gallery: no document-level horizontal overflow. English labels wrap; touch targets are at least 44px. Chinese dark-theme article inspected visually. Gallery code examples scroll inside their own containers.
- Desktop gallery: Chánh Đại Testimonial2 displays the placeholder quote and author correctly; screenshot inspected. Header duplication corrected for `/components`.
- Homepage screenshots before/after visually preserve layout, typography, spacing, avatar, and controls.
- Production HTTP: `/`, `/writing/beauty-in-everyday-life`, and `/contact` return 200. `/components` returns 404 as intended outside development.
- Production browser: Tabs End key selects last tab; exercise click collapses and Space expands; Chinese switch updates heading. Fixed a production 500 by making `ipaddr.js` a direct dependency: vinext's emitted image module could not resolve the nested dependency.

## Remaining framework observation

The production browser logs `[vinext] RSC prefetch setup error: TypeError: d is not a function` from the built Link chunk (`getPrefetchInterceptionContext`). This was observed during link prefetch, independently of the successful component interactions above. No claim is made that production prefetch is fixed; addressing vinext's prefetch implementation is outside this component integration. No deployment was performed.

## Evidence

- `home-before.png`, `home-after.png`
- `article-tabs-desktop.png`
- `article-mobile-en.png`, `article-mobile-zh-dark.png`
- `gallery-desktop.png`, `gallery-mobile-dark.png`

Some screenshots were captured during iteration; the final version additionally stretches narrow-screen Tabs to equal height and uses the library's own focus treatment.
