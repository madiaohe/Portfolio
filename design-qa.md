# Floating Agent expanded toolbar QA — 2026-09-12

## Comparison target

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-ad252ab6-9075-4d61-a2f8-37fdc1fd15cd.png`.
- Source pixels: 3024 × 1748. The comparison is normalized to the red-boxed expanded toolbar; surrounding browser chrome and page content are excluded from fidelity judgments.
- Implementation: `http://localhost:3002/components`, Floating Agent contained preview with `entryMode="launcher"`.
- Implementation screenshot evidence: the final 1159 × 788 Codex in-app Browser capture returned inline by `tab.getScreenshot()`; the in-app Browser API does not expose a filesystem path for this capture.
- Desktop CSS viewport and implementation pixels: 1159 × 788 at density 1.
- Mobile CSS viewport and implementation pixels: 390 × 844 at density 1.
- State: launcher opened, empty single-line composer; multiline, popover, model-selection, and Escape states were checked separately.

## Full-view and focused comparison evidence

- The opened surface now uses one horizontal row like the selected lower reference: add action, prompt, model selector, microphone, and submit action.
- The desktop surface measures 642 × 56px inside the 644px preview frame, with a 1px inset on both sides. Its form is 640 × 54px.
- The permission action shown in the source is intentionally omitted per the user request. No permission label, icon, button, menu item, or focus target exists in launcher mode.
- At 390px viewport width, the contained preview is 342px and the opened surface is 340 × 56px with no document overflow.
- Focused comparison was required because the toolbar is a small region in the full reference. Geometry, horizontal control order, radius, elevation, prompt alignment, and the intentionally removed permission control were checked at readable scale.

## Findings

No actionable P0, P1, or P2 findings remain.

### Fonts and typography

- Prompt and model text use Reference Sans at 14px with a 24px prompt line height, reproducing the reference's compact single-row density.
- Placeholder color remains intentionally muted, and model labels truncate rather than pushing persistent controls out of the surface.

### Spacing and layout rhythm

- Empty compose height is 56px with a 28px capsule radius. The form uses 10px horizontal padding, 4px control gaps, 32px action hit areas, and 16px icons. The input's 4px inset combines with the 4px grid gap to create an 8px visual interval between prompt text and adjacent controls.
- Focused computed-style measurements confirm that add, model chevron, microphone, and submit icons are all exactly 16 × 16px and share the same vertical center. Add, microphone, and submit hit areas are all 32 × 32px; every neighboring layout item is separated by 4px.
- One-line text shares the row with the controls. Multiline content switches to a full-width text row above the same bottom toolbar: three explicit lines measured 642 × 134px on desktop and 340 × 136px on mobile.
- The surface remains bottom-aligned while it grows upward.

### Colors and visual tokens

- The expanded state reuses the site's background, foreground, muted, border, focus, and elevation tokens. The current inactive submit state remains muted until text is entered.
- No permission-state orange is present in launcher mode.

### Image quality and asset fidelity

- The expanded toolbar contains only library icons and text; no raster or brand image is required in this state.
- The supplied Slack logo remains confined to the preceding circular launcher state and is not duplicated inside the expanded toolbar.

### Copy and content

- Launcher mode uses the short localized placeholder (`Ask anything` / `随心输入`).
- Model copy remains `GPT-5.6 Sol · High` or its localized equivalent. Permission copy is absent from both the visible UI and accessibility tree.

## Interaction and accessibility verification

- Clicking the circular launcher opens the full-width toolbar directly.
- The add menu opens and Escape closes only that menu, leaving the composer open.
- The model menu opens, switches to GPT-5.6 Luna, and can switch back to GPT-5.6 Sol.
- With an empty prompt, a pointer press outside the Floating Agent collapses it and restores focus to the circular launcher. With non-empty input, the same outside press leaves the composer open and preserves its value.
- During collapse, the prompt content fades before the surface begins narrowing. The surface then transitions its real width rather than using a horizontal scale transform, while the independently positioned launcher logo fades in and rotates 360° without distortion.
- Selecting an item inside the portaled add or model menus is treated as an internal interaction and does not trigger the empty-state outside-click collapse.
- Escape with no child popup open collapses the toolbar and restores focus to the circular launcher.
- Keyboard focus reaches the prompt and every remaining control; launcher mode exposes no permission control.
- Browser interaction produced no layout overflow. One Vinext RSC HMR error occurred while source files were being edited; no interaction error occurred after the final hot update.

## Comparison history

- [P1 fixed] The earlier expanded state used an 85px two-row composer with the prompt above its toolbar. It now matches the selected one-row, 56px capsule composition.
- [P1 fixed] Launcher mode previously rendered the permission-grant control. The control and its interaction are now omitted from this mode.
- [P2 fixed] A first multiline pass kept the textarea in the narrow space between controls. Multiline input now spans the full surface above the toolbar and grows upward.
- [P2 fixed] Escape initially closed both a child popover and the entire Floating Agent. The parent now waits until child popovers are closed before handling Escape.
- [P2 fixed] Although icon SVG boxes were all 16px, the add and model-chevron wrappers inherited text line-height and rendered their visual centers 2.5px above the microphone and submit icons. Launcher mode now uses shared size and spacing variables, zero-line-height icon wrappers, and a common center axis.
- [P2 fixed] The empty compose state previously remained open after the user clicked elsewhere. It now collapses only when the prompt is empty, while preserving non-empty drafts and allowing portaled menu interactions.

## Follow-up polish

- [P3] The reference's empty-state blue voice-mode action is not reproduced yet; this iteration preserves the existing, truthful disabled send action because voice capture has not been implemented.

final result: passed

---

# Writing detail layout QA — 2026-09-14

## Comparison target

- Source visual truth: `output/playwright/writing-benji-reference-20260913/reference-desktop.png`, captured from `https://benji.org/drawesome` at 1280 × 900 pixels.
- Implementation evidence: `artifacts/writing-detail-qa/implementation-desktop-1280.jpg` and `artifacts/writing-detail-qa/implementation-mobile.jpg`.
- Combined comparison: `artifacts/writing-detail-qa/comparison-desktop.jpg`, with the full views and enlarged navigation/header regions shown together.
- State: English, light theme, top of page. Chinese, dark theme, directory jump, active-section highlight, and mobile collapse were checked separately.

## Normalization

- Reference pixels: 1280 × 900 at density 1.
- Implementation CSS viewport: 1280 × 900 at density 1. The in-app Browser exported the visible document area as 1265 × 889 pixels after browser scrollbar/chrome exclusion.
- Mobile CSS viewport: 390 × 844 at density 1. The exported visible document area is 375 × 812 pixels after browser scrollbar/chrome exclusion.
- The comparison judges the requested structure and rhythm rather than article-specific media or identical copy. The implementation intentionally keeps the portfolio's existing font, 16px body type, theme tokens, and 128px desktop top inset.

## Findings

No actionable P0, P1, or P2 findings remain.

### Fonts and typography

- The return control is 14px / 20px. Directory links are 13px / 16px with 8px between items, matching the reference hierarchy while retaining the portfolio font.
- The article retains the site's 16px body scale. The title and date are vertically stacked with a 4px gap; the date is 14px / 20px in the muted token.
- Long English directory labels wrap without colliding with the article; Chinese labels remain compact and fully visible.

### Spacing and layout rhythm

- Desktop article content is exactly 550px wide, matching the homepage content column.
- The article title starts at 128px, matching the homepage desktop top inset. The reference's 80px inset is intentionally not copied.
- At the 1280px desktop viewport, the fixed sidebar starts at x=80px and y=128px; the article starts at x=357.5px and y=128px.
- The first directory item begins at y=216px, 87.5px below the return label's top, reproducing the reference's roughly 84px visual separation after applying the 48px top-offset difference.
- At 390px, the directory hides, the return control becomes part of the document flow, the title begins at y=96px, and no horizontal overflow occurs.

### Colors and visual tokens

- Navigation uses the existing muted/subtle/text tokens, so hover and active states remain legible in both light and dark themes.
- The layout preserves the portfolio's warm background and does not copy the reference's lower-contrast gray literally.

### Image quality and asset fidelity

- This requested layout contains no raster imagery. The return symbol uses the closest existing Lucide icon rather than a handcrafted SVG or text glyph.
- Existing article components and imagery behavior were left unchanged.

### Copy and content

- The return label, directory labels, title, and publication date all localize with the site's language control.
- The article now owns an ISO publication date, and the homepage derives its month from the same value so the list and detail page cannot drift.

## Interaction and responsive verification

- Every directory item links to its article heading, and the active item updates after a jump or scroll.
- Language switching updates the document title, return label, directory, article title, and formatted date.
- Dark mode updates the page and prose tokens; the tested dark background was `rgb(25, 25, 24)` and the prose color was `rgb(212, 211, 204)`.
- Desktop and 390px mobile layouts expose no document-width overflow.
- The in-app Browser reported no console warnings or errors after the final update.

## Full-view and focused comparison evidence

- The combined full view confirms the same centered narrow article column, fixed left navigation, vertical title/date header, and restrained grayscale hierarchy.
- The enlarged navigation/header comparison confirms the return-to-directory rhythm, 80px sidebar inset, article alignment, and title/date stacking at readable scale.

## Comparison history

- [P2 fixed] The initial mobile pass left 56px after the return control, placing the title at y=120px and making the opening feel looser than the reference. Reducing the gap to 32px moved the title to y=96px while preserving the homepage's 40px outer inset.
- Post-fix desktop and mobile captures confirm the requested rhythm with no overlap or overflow.

## Follow-up polish

- [P3] When final publication dates replace demo content, confirm whether English dates should keep the reference-inspired day-first style or follow a different editorial standard.

final result: passed

---

# Homepage spacing design QA

Date: 2026-09-11

## Comparison target

The goal is an intentional adaptation of Benji Taylor's homepage spacing system, not a content or brand clone. The implementation keeps Xu Xianyu's avatar, bilingual content, theme controls, project descriptions, warmer palette, and larger readable body type.

### Source visual truth

- Desktop: `output/playwright/benji-spacing-audit-20260911/07-benji-desktop-viewport.png`
- Mobile: `output/playwright/benji-spacing-audit-20260911/05-benji-mobile-viewport.png`
- Focused writing list: `output/playwright/home-spacing-redesign-20260911/08-reference-writing.png`

### Implementation evidence

- Desktop viewport: `output/playwright/home-spacing-redesign-20260911/10-desktop-final-viewport.png`
- Desktop viewport after the requested 128px top-inset adjustment: `output/playwright/home-spacing-redesign-20260911/12-desktop-top-128.png`
- Desktop full page: `output/playwright/home-spacing-redesign-20260911/07-desktop-en-light-final.png`
- Mobile viewport: `output/playwright/home-spacing-redesign-20260911/11-mobile-final-viewport.png`
- Mobile English light full page: `output/playwright/home-spacing-redesign-20260911/03-mobile-en-light.png`
- Mobile Chinese dark full page: `output/playwright/home-spacing-redesign-20260911/04-mobile-zh-dark.png`
- Focused writing list: `output/playwright/home-spacing-redesign-20260911/09-implementation-writing.png`
- Writing hover state: `output/playwright/home-spacing-redesign-20260911/05-writing-row-hover.png`

## Normalization

- Desktop source and implementation viewport: 1440 × 1000 CSS pixels, 1440 × 1000 image pixels, device pixel ratio 1.
- Mobile source and implementation viewport: 390 × 844 CSS pixels, 390 × 844 image pixels, device pixel ratio 1.
- State for primary comparison: English, light theme, top of page, no active hover or keyboard focus.
- Focused writing captures are both 550 CSS/image pixels wide at device pixel ratio 1. Their heights differ because the implementation has more entries.

## Findings

No actionable P0, P1, or P2 findings remain.

### Fonts and typography

- The implementation intentionally retains the local Reference Sans face instead of copying Benji's Inter setup.
- Body copy remains 16px / 24px for English and Chinese readability. Section labels and metadata use 14px / 20px, matching the reference's compact hierarchy without reducing all text to 14px.
- English and Chinese titles remain readable without truncation at 320px, 390px, and desktop widths.

### Spacing and layout rhythm

- Desktop content width is now 550px, matching the measured source content width.
- Desktop top padding is 128px per the final user-selected spacing. Mobile top padding remains 40px rather than the source's 32px to leave room for the retained avatar and fixed controls.
- Header-to-main and all major section gaps use 56px. The earlier 128px repeated gaps are removed from the homepage.
- Projects and Writing now share the same continuous 45px year/title/month rows, with 96px desktop and 48px mobile year columns.
- The writing list reproduces the source's most important structural cues: muted label, horizontal rule, year column, title column, right-aligned date, and inset row separators.
- Document width equals viewport width at 320px and 390px. No horizontal overflow was observed.

### Colors and visual tokens

- The existing warm light background and dark-theme tokens are preserved.
- Muted text remains more legible than the source's approximately 40% black metadata. Dividers remain subtle in both themes.
- Hover and focus states use the existing semantic theme tokens and are visible in dark and light modes.

### Image quality and assets

- The existing real avatar asset is retained at 48 × 48 CSS pixels with the existing crop and radius.
- No new generated or placeholder imagery was introduced. The reference's decorative pink New mark was intentionally not copied.

### Copy and content

- The former role label is replaced by a live Beijing-time display labeled with Hefei, Anhui, China, following the final user-selected header content.
- Project dates now localize with the active language.
- Writing displays a short month visually, while each `time` element exposes the full localized month and year to assistive technology.

## Interaction and responsive verification

- Language toggle updates all homepage copy and date formatting.
- Theme toggle updates the full page and controls; Chinese dark mode was inspected visually.
- Writing and project rows show hover feedback.
- Keyboard Tab reaches the project links with a visible 2px focus outline and 4px offset.
- Writing and project rows are both 45px high.
- 320px, 390px, 640px, and 1440px layouts were checked. The year column changes from 48px to 96px at 640px.
- The live Hefei time line uses 24px line-height and refreshes on minute boundaries.
- Browser console: 0 errors, 0 warnings during final local verification.
- `npm run lint`, `npx tsc --noEmit`, `npx oxfmt --check components/reference-home.tsx app/minimal.css`, `git diff --check`, and `npm run build` passed.

## Comparison history

### Initial baseline

- [P1] The desktop homepage repeated 128px gaps between identity, introduction, and every main section, fragmenting the page.
- [P2] The 644px desktop content column and two-line lists with external gaps produced weak grouping and excessive page length.
- [P2] Mobile kept an 80px top inset, a 128px header gap, and 28px gaps between list items; the 390px page measured about 2413px high.

### Fixes

- Reduced the homepage content column to 550px and set desktop/mobile top padding to the final selected 128px/40px.
- Standardized homepage section rhythm at 56px.
- Changed both Projects and Writing to the same compact year/title/month index; project descriptions are no longer displayed.
- Added subtle dividers, localized dates, full accessible date labels, and homepage-scoped responsive rules.

### Post-fix evidence

- Desktop and mobile comparison screenshots show the new narrow column and continuous directory structure.
- The 390px page now measures about 1712px high while preserving all content.
- The focused list comparison confirms the intended reference rhythm with a slightly larger, intentional 45px interaction row.
- The latest desktop capture and computed styles confirm the final 128px top inset without horizontal overflow.

## Follow-up polish

- [P3] Once demo projects and articles are replaced with final content, re-evaluate whether every project still needs a second description line.
- [P3] The Today label can be reconsidered as a content decision; it does not currently create a spacing or hierarchy problem.

final result: passed

# Floating Agent phase 0 launcher QA — 2026-09-12

## Comparison target

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-ef697cb4-f030-4836-a7dd-e7dc6d24323a.png` (3024 × 1748 px desktop reference).
- Supplied logo asset: `/Users/xianyu/Downloads/slack-fill.svg` (24 × 24 viewBox).
- Implementation: `http://localhost:3002/components`, Floating Agent contained preview.
- Implementation screenshots: current Codex in-app Browser captures shown inline during this QA run; the browser surface does not expose a filesystem export path.
- Desktop viewport: 1159 × 788 CSS px; comparison is normalized to the Floating Agent preview region rather than the surrounding browser chrome.
- Mobile viewport: 390 × 844 CSS px.
- States: circular launcher, direct launcher-to-compose expansion, and Escape-to-launcher return.

## Full-view and focused comparison evidence

- The initial control is now a single circular entry point centered along the bottom edge of the preview, matching the reference's hierarchy rather than presenting a prompt bar before interaction.
- Focused desktop measurements: launcher 56 × 56 px, supplied logo 20 × 20 px, and zero center-axis delta against the 644px preview region.
- After the click transition settles, the composer measures 642px inside the preview's 1px borders, leaving 1px on each side and therefore matching the full 644px content frame.
- Focused mobile measurements: launcher 56 × 56 px; the composer expands to 325px inside the 327px preview frame with the same 1px border alignment and no page-width overflow.
- A focused region comparison was required because the source's launcher is small relative to the full screenshot; launcher geometry, logo scale, and expanded edge alignment were checked directly.

## Required fidelity surfaces

- Fonts and typography: the launcher contains no visible text; the existing composer typography remains unchanged for this phase.
- Spacing and layout rhythm: the launcher is centered, uses a 56px circular surface, and expands directly to the content frame without a stable intermediate narrow-bar state.
- Colors and tokens: the launcher reuses the site's surface, border, and restrained shadow tokens; logo opacity remains intentionally secondary until hover or keyboard focus.
- Image quality and asset fidelity: the supplied vector path is used as a real SVG image asset at 20 × 20 px. No generated, handwritten, or CSS-drawn replacement is used.
- Copy and content: the launcher has localized accessible labels (`打开 AI 助手` / `Open AI assistant`) while remaining visually icon-only.

## Interaction and accessibility verification

- Pointer activation moves directly from the circular launcher to the full-width compose state.
- Escape returns focus to the circular launcher.
- The launcher exposes a localized accessible name.
- Desktop and 390 × 844 mobile layouts were checked.
- The browser console contained no warnings or errors.

## Comparison history

- [P1 fixed] The previous initial state was a 304px prompt pill rather than the requested icon-only circular launcher.
- [P2 fixed] The previous compose state stopped at 550px instead of aligning with the full component content frame.
- Post-fix browser evidence confirms a 56px launcher and full-width 642px/325px composers inside the desktop/mobile preview borders.

## Follow-up phase

- The internal composer control density and conversation state are intentionally unchanged; they remain the subject of later staged adjustments.

final result: passed

---

# Floating Agent interaction QA

Date: 2026-09-12

## Comparison target

Reproduce the selected bottom prompt references as a portfolio-native floating AI entry point, then extend that surface upward into a conversation only after the first message is sent.

### Source visual truth

- Default floating bar: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-b5576736-e7d0-4146-951f-ba0882111671.png`
- Multiline prompt: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-580d4111-8e2e-490e-a484-6b1911f9897d.png`
- The user specified the conversation behavior in prose: no overlay on focus; the overlay and upward-growing conversation surface begin only after the first send.

### Implementation evidence

- Routes: `http://localhost:3002/` and `http://localhost:3002/components`
- Implementation screenshots: current task's in-app Browser captures of collapsed, focused, multiline, first-send, completed-response, dark-theme, and mobile states (inline browser evidence; no separate filesystem export).
- Desktop browser viewport: 1144 × 768 pixels. Mobile viewport: 390 × 844 CSS pixels.

## Findings

No actionable P0, P1, or P2 findings remain.

### Default and focused states

- The resting surface is 304 × 56 CSS pixels, centered at the bottom with a quiet border, restrained shadow, compact AI icon, centered placeholder, and microphone icon.
- Focus changes the width to the homepage's 550px content column without adding an overlay.
- The one-row focused composer is 85px high because it reveals the beUI action toolbar; this is a deliberate functional addition to the compact resting state.

### Multiline behavior

- The beUI textarea grows from one to six 24px rows and then scrolls internally.
- A three-line desktop prompt produced a 129px surface without horizontal movement or content clipping.
- The visible native scrollbar is suppressed while preserving keyboard and wheel scrolling.

### First-send conversation state

- Sending the first prompt changes the same bottom-anchored surface into a 550 × 680px desktop conversation panel; the background overlay appears at the same transition.
- The message log occupies the flexible middle region and follows newly added output only while the reader remains at the live edge.
- The composer remains fixed inside the bottom of the panel. Loading changes the send action into a stop control, and the simulated reply replaces the typing indicator.
- Collapsing restores the 304 × 56 entry point and restores body scrolling. Reopening preserves the current conversation for the page lifetime.

### Responsive, theme, and accessibility checks

- At 390 × 844, the resting control remains 304 × 56; the expanded composer fits without horizontal overflow, and the conversation becomes a 366 × 820px near-full-height surface.
- The permission label condenses to its icon and the model label truncates on narrow screens.
- Light and dark themes use the portfolio's semantic surface, border, text, and muted tokens.
- The dialog uses a real textarea and buttons, Enter to send, Shift+Enter for a new line, Chinese IME composition protection, Escape to close, a modal focus loop, sibling inerting, and body scroll lock while the fixed conversation is open.
- Browser console: 0 errors and 0 warnings in the verified desktop and mobile interaction paths.
- `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

## Evidence limits

- No exact visual reference was supplied for the fully expanded conversation panel, so that state was evaluated against the agreed interaction model and the site's existing visual system rather than a pixel-identical source.
- The response is intentionally simulated; model streaming, tools, persistence, usage limits, authentication, and server error recovery are outside this iteration.

## Follow-up polish

- [P3] Replace the generic Sparkles mark if a final assistant identity or logo is selected.

final result: passed

---

# Homepage CAMERICH trigger visual QA

Date: 2026-09-12

## Comparison target

Keep the homepage sentence visually unchanged: the trigger must render only the original underlined `CAMERICH` text, while the Notion Mention Link card appears exclusively on hover or keyboard focus.

### Source visual truth

- `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-29dabb27-0c2d-434e-bdd4-4f5c57d8c532.png`
- Source pixels: 3024 × 1748. The comparison uses the highlighted CAMERICH sentence and the neighboring inline links as the typography and spacing reference.

### Implementation evidence

- Route: `http://localhost:3002/`
- Implementation screenshot path: current task's in-app Browser captures of the resting homepage and focus-open CAMERICH card (inline browser evidence; no separate filesystem export).
- Browser capture: 1144 × 768 pixels at the default desktop viewport.

## Normalization

- State: English, light theme, homepage at the top of the Projects section.
- The source includes surrounding Codex chrome and a different browser viewport, so comparison is normalized to the sentence containing CAMERICH.
- A resting capture checks the unchanged body line; a keyboard-focus capture checks the open preview without changing trigger content.

## Findings

No actionable P0, P1, or P2 findings remain.

### Fonts and typography

- CAMERICH now inherits the paragraph's exact Reference Sans family, 16px size, 400 weight, 24px line height, and foreground color.
- The trigger renders only `CAMERICH`; fetched favicon, site name, and title no longer appear inside the sentence.

### Spacing and layout rhythm

- Computed trigger styles are `display: inline`, zero padding, zero margin, and a 2px underline offset.
- The link therefore preserves the original sentence baseline, wrapping, and rhythm.

### Colors and visual tokens

- The trigger inherits the paragraph foreground and the existing `--minimal-underline` decoration token.
- No background chip or component hover fill is applied to the inline trigger.

### Image quality and asset fidelity

- No image or favicon appears in the resting homepage sentence.
- CAMERICH does not expose an Open Graph cover image, so the open card correctly uses the component's no-cover layout and the real remote favicon.

### Copy and content

- The homepage copy remains `Previously, I worked on the visual design team at CAMERICH.`
- The open card contains the remotely fetched `锐驰家具` title and description without leaking them into the body copy.

## Interaction and responsive verification

- Keyboard focus opens the preview card while leaving the trigger text unchanged.
- The trigger remains a real external link to `https://www.camerich.com/`.
- Browser console: 0 errors and 0 warnings during final verification.
- `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

## Comparison history

### Initial finding

- [P1] The default mention trigger inserted a favicon, site name, and remotely fetched title into the homepage sentence, changing its typography, width, and reading flow.

### Fix

- Added an optional custom trigger body to `NotionMentionLink`. When supplied, the component leaves the caller's anchor styling untouched and limits its own visual treatment to the floating card.
- Restored the homepage trigger to the original `CAMERICH` copy and `minimal-pending-link` class.

### Post-fix evidence

- The resting browser capture shows the same single underlined CAMERICH word and uninterrupted sentence baseline as the surrounding homepage typography.
- Computed styles confirm the trigger exactly inherits its paragraph's font family, size, weight, line height, and color with no spacing additions.
- The focus-open capture confirms the card appears separately below the trigger.

## Follow-up polish

- No follow-up visual polish is required for this correction.

final result: passed

---

# Notion Mention Link visual QA

Date: 2026-09-12

## Comparison target

Reproduce the open Notion Mention Link preview shown in the user-provided Unlumen UI screenshot while allowing the component to inherit this site's light and dark theme tokens.

### Source visual truth

- `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-899c6380-c2ab-4ada-b012-cd7c3429e4f3.png`
- Source pixels: 3024 × 1748. The browser screenshot is a high-density capture; the focused comparison uses the annotated card region rather than the surrounding Unlumen documentation layout.

### Implementation evidence

- Route: `http://localhost:3002/components`
- Implementation screenshot path: current task's in-app Browser capture of the open DesEngs card (inline browser evidence; no separate filesystem export).
- Browser capture: 900 × 768 pixels at the default desktop viewport; an additional 390 × 844 CSS-pixel mobile capture was inspected.

## Normalization

- State: English, light theme, `desengs.com` metadata loaded, focus-open preview.
- The source and implementation pages use different surrounding layouts, so the comparison is normalized to the component region.
- Source card measurements normalize to approximately 310 CSS pixels wide with a 140 CSS-pixel media area. The implementation uses the upstream 310px `previewWidth` and 140px `previewHeight` defaults.

## Findings

No actionable P0, P1, or P2 findings remain.

### Fonts and typography

- The trigger preserves the upstream 15px / 24px hierarchy, and the card preserves the 18px / 24px semibold title plus 14px / 20px description and domain text.
- The implementation intentionally inherits Reference Sans from the portfolio rather than copying the Unlumen documentation site's font. Wrapping and three-line truncation match the source component behavior.

### Spacing and layout rhythm

- The open card preserves the source's 310px width, 140px media height, 20px content padding, 12px radius, and compact 8px internal gaps.
- The preview stage now reserves enough vertical space for the complete open card, so it no longer overlaps the code example below.
- The trigger and card remain inside the viewport at 390px mobile width.

### Colors and visual tokens

- The light card matches the source's white surface, subtle border, dark foreground, and elevated shadow.
- Dark mode maps those roles to the portfolio's existing semantic tokens without changing the component hierarchy.
- Focus rings remain visible in both themes.

### Image quality and asset fidelity

- The live DesEngs Open Graph image loads through the protected same-origin proxy at its native 1200 × 630 pixels and is cropped into the 310 × 140 media area with `object-cover`.
- The 128 × 128 favicon also loads through the proxy. No placeholder, generated asset, or CSS recreation is used.

### Copy and content

- The preview uses the same `desengs.com` example as the upstream component: DesEngs title, description, cover, favicon, and domain.
- The gallery guidance explains that the data is fetched automatically and that hover and keyboard focus both open the card.

## Interaction and responsive verification

- Metadata loads from the same-origin API after a fresh page reload.
- Keyboard focus opens the card and keeps the link usable.
- Desktop light, 390 × 844 mobile light, and 390 × 844 mobile dark states were inspected.
- The cover and favicon reported complete intrinsic dimensions of 1200 × 630 and 128 × 128.
- One vinext HMR error occurred while source files were being edited at 01:47:53; after a full reload, no new console error was recorded.
- `npm run build` passed.

## Comparison history

### Initial finding

- [P1] The first adaptation omitted the source image by supplying static metadata and reduced the card's spacing, radius, typography, and elevation, materially changing the signature preview effect.
- [P2] The small preview stage allowed the floating card to overlap the code example.

### Fixes

- Restored the upstream card dimensions, image area, padding, type scale, radius, and shadow.
- Switched the gallery to the upstream `desengs.com` example with live protected metadata and asset fetching.
- Expanded the preview stage to contain the open card on desktop and mobile.

### Post-fix evidence

- The revised light capture shows the same black DesEngs cover, two-line title, three-line summary, favicon, and domain structure as the source screenshot.
- The mobile captures confirm that the 310px card fits at 390px without clipping; the dark capture confirms semantic theme adaptation.

## Follow-up polish

- [P3] The long mention title truncates slightly earlier in the narrower portfolio preview stage than in Unlumen's split-screen demo; the complete title remains available in the open card.

final result: passed
