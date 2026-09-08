# Reference homepage design QA

Date: 2026-09-08

final result: passed

## Scope and constraints

Comparison target: the homepage at https://emilkowal.ski/ and the local homepage at http://localhost:3010/. This result applies to the homepage's visual reproduction and frontend interactions. Article pages and external project sites remain at their original URLs. Newsletter submission is a local demonstration with an explicit unsent result, not a connected service. No external signup was performed.

The source's reference identity, copy, light theme and date-specific announcement are retained for this study. The page is marked noindex. Previous portfolio source is preserved in snapshot commit `6802ce9` and branch `codex/personal-site-v3-snapshot`.

## Evidence

All paths below are relative to this project root.

- Source visual truth: `output/playwright/emil/reference-desktop-top.png`, `reference-desktop-bottom.png`, `reference-mobile-top.png`, `reference-mobile-middle.png`, `reference-mobile-bottom.png`, `reference-hover.png`, `reference-focus.png`, `reference-dismissed.png` in the same directory.
- Implementation: corresponding `implementation-*.png` captures in `output/playwright/emil/`.
- Full-view comparisons: `comparison-desktop-top.jpg`, `comparison-desktop-bottom.jpg`, `comparison-mobile-top.jpg`, `comparison-mobile-middle.jpg`, `comparison-mobile-bottom.jpg`.
- State comparisons: `comparison-hover.jpg`, `comparison-focus.jpg`.
- Focused typography comparison: `comparison-typography.png` (source left, implementation right).
- Form preview result: `implementation-form-preview.png`.
- Additional widths: `implementation-width-320.png`, `implementation-width-640.png`, `implementation-width-768.png`, `implementation-width-1440.png`.

Source and implementation desktop CSS viewports and screenshot pixels: 1440 × 1000 at density 1. Mobile: 390 × 844 at density 1. No rescaling was needed for comparison. The paired desktop images are 2880 × 1000; paired mobile images are 780 × 844. Focused typography crops are 668 × 319 per side. Captures were combined before visual review, with matched viewport, scroll position, theme and input state.

## Findings and comparison history

1. Initial paired review found the source font's glyph features (`cv01`, `ss03`) and native underline positioning were missing. [P2] Typography fidelity. Fixed by adding those font features, matching `text-rendering: auto` and removing the custom underline offset.
2. Recaptured both layouts and reviewed full-view and focused comparisons. Structure, wrapping, section positions and glyphs match. No actionable P0/P1/P2 differences remain.
3. A mobile comparison initially retained input focus only on the implementation. This was a capture-state mismatch; it was recaptured without focus before judging the idle state.
4. Initial console inspection found a missing favicon; copied the observed source favicon locally. A later screenshot taken during hydration introduced Playwright's temporary caret style and a hydration warning. Final verification used a fresh browser session and waited for React input handlers before screenshots. The final local session reported 0 errors and 0 warnings. Errors from subsequently visited external reference pages are not local app errors.

## Required fidelity surfaces

- Fonts/typography: locally stored source variable font, exact fallback metrics, 16px type, 400/500 weights, 24px body and 26.4px intro leading, source glyph features and wrapping. Focused paired crop reviewed at readable scale.
- Spacing/layout: exact 692px shell / 644px desktop content / 24px side padding. Desktop header begins at x=398, y=117; main at y=285. Main height is 2131.171875px in both source and implementation. Desktop and mobile section rhythm, row padding, sticky announcement and 48px rounded form match.
- Colors/tokens: `#fdfdfc` page, `#21201c` primary text, `#63635e` secondary text, `#f9f9f8` announcement and `#f5f4f4` hover. Border, underline and form shadow inspected in paired state captures.
- Assets/image quality: source font, source SVG close mark and favicon stored locally. No recreated illustration or placeholder asset. Homepage has no raster content imagery.
- Copy/content: reference homepage text and link order retained for comparison. Metadata identifies the page as a local study. The local newsletter result intentionally discloses that no subscription took place.

## Interaction and regression checks

- Project row hover, input focus ring and keyboard focus styling.
- Required email and valid-email submission through a real browser; pending state followed by truthful local preview result.
- Announcement close, inert hidden state and persistence after reload.
- Writing link navigates to the original article and browser Back returns to the local homepage.
- Project link opens its actual target in a new tab.
- Widths 320, 390, 640, 768 and 1440: no horizontal overflow.
- Reduced-motion emulation: announcement transition duration is 0s.
- Existing `/about`, `/contact`, `/journal`, `/journal/a-place-for-the-everyday` and `/work/ambient-dial` return HTTP 200. Their visual redesign is outside this homepage change.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed. Existing Vinext experimental/static route classification notices remain informational.
- Fresh local browser console: 0 errors, 0 warnings.

## Follow-up polish / limits

Small rasterization differences remain; they do not affect wrapping, layout or interaction. Pixel-difference measurements are recorded in `output/playwright/emil/pixel-differences.json` and are supporting evidence rather than a replacement for visual review. The original source's subscription success/error backend states were not triggered, since doing so would subscribe someone to a third-party mailing list.

The local form uses semantic email validation and an explicit preview result; these are intentional frontend-only constraints. Offline article mirroring and real subscription delivery have not been implemented.

## Implementation checklist

- [x] Preserve previous source and create new branch.
- [x] Capture source desktop, mobile and primary control states.
- [x] Store observed font and icons locally.
- [x] Build the reference homepage in the existing React/Vinext app.
- [x] Match and visually compare desktop/mobile plus focused typography.
- [x] Verify frontend interactions, console, lint, types and production build.
- [x] Keep a local preview running.
