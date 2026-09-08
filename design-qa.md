# Hero Video Design QA

## Evidence

- Source visual truth: `/Users/xianyu/Downloads/vecteezy_young-adult-male-wearing-straw-hat-surveys-cornfield-at_70787864.mp4`
- Source frame: `/Users/xianyu/Workspace/IDEA/portfolio/public/media/hero-cornfield-poster.jpg`
- Desktop implementation: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-hero/hero-desktop-1440x900.png`
- Mobile implementation: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-hero/hero-mobile-390x844.png`
- Side-by-side comparison: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-hero/hero-source-vs-implementation.png`
- State: homepage, default playback state, light theme.

## Viewports And Normalization

- Source video: 2560 × 1440, 16:9, 10 seconds, H.264.
- Source poster: 1600 × 900 at 1× density.
- Desktop capture: 1440 × 900 at 1× density. Hero frame measured 1216 × 612 CSS pixels at x=112, y=88.
- Mobile capture: 390 × 844 at 1× density. Hero frame measured 350 × 262.5 CSS pixels at x=20, y=68.
- The desktop source and implementation were placed in one side-by-side comparison image. The rendered frame intentionally uses a slightly wider crop than the 16:9 source.

## Findings

- No actionable P0, P1, or P2 mismatch found.
- Fonts and typography: existing navigation typography remains unchanged and legible over the light page background.
- Spacing and layout rhythm: the hero aligns with the navigation's 1280px content framework and maintains the intended 32px desktop and 20px mobile insets.
- Colors and visual tokens: no overlay or color treatment was added; the source video's natural blue, green, and warm neutral palette is preserved.
- Image quality and asset fidelity: the original 2560 × 1440 H.264 source is used directly. Desktop crop retains the hat, shoulders, horizon, and field; the 4:3 mobile crop keeps the central subject intact.
- Copy and content: the Hero contains no added copy, as requested. The video is decorative and hidden from assistive technology.
- Playback: browser verification confirmed muted autoplay with `readyState: 4`, active playback, 2560 × 1440 intrinsic dimensions, and no console errors.

## Focused Region Comparison

No additional close-up comparison was needed because the only new visual asset is a single large Hero video, and the subject placement, crop, and sharpness are clearly readable in the full-view comparison.

## Comparison History

- Initial pass: no P0/P1/P2 findings; no visual fixes were required after comparison.

## Follow-up Polish

- P3: the agricultural subject is intentionally temporary and does not yet communicate a specific design point of view.
- Reduced-motion behavior pauses on the generated poster by implementation, but browser preference emulation was not available in this pass.

## Implementation Checklist

- [x] Use the supplied local video instead of a placeholder.
- [x] Add a lightweight poster frame.
- [x] Preserve the shared content-width alignment.
- [x] Verify desktop and mobile crops.
- [x] Verify muted autoplay and console health.

Hero section result: passed

---

# Superseded Work Categories Motion QA (before user correction)

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-44d05931-b2f0-465a-83fa-016013cb546d.png`
- Interaction truth: four small images begin on the right, move toward the left during native vertical scrolling, crossfade into category text, and become clickable after settling.
- Desktop start: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/categories-desktop-start.png`
- Desktop mid-transition: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/categories-desktop-mid.png`
- Desktop settled state: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/categories-desktop-end.png`
- Mobile start and settled states: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/categories-mobile-start.png` and `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/categories-mobile-end.png`
- Combined comparison board: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories/comparison-board.png`
- State: homepage Work section, light theme, native vertical scrolling.

## Viewports And Normalization

- Reference image: 2986 × 1548 pixels.
- Desktop captures: 1425 × 891 pixels from the 1440 × 900 browser check.
- Mobile captures: 375 × 812 pixels from the 390 × 844 browser check.
- Comparison board: 1265 × 825 pixels. It contains the reference and rendered start state together, plus the start, middle, and settled motion states in one visual input.
- The supplied screenshot is an art-direction reference for quiet product imagery, white space, and scale; the written interaction specification is the source of truth for the new scroll transformation.

## Findings

- No actionable P0, P1, or P2 mismatch found.
- Fonts and typography: the settled labels use the existing Arial-based type system, 32px desktop and 24px mobile optical sizes, restrained weight, and a clear selected/unselected contrast.
- Spacing and layout rhythm: the section keeps the existing 1280px content framework, 32px desktop inset, 20px mobile inset, and the previously approved Hero-to-Work gap. Initial images occupy the right side without breaking the large white field.
- Colors and visual tokens: the white page, charcoal labels, muted inactive text, and warm-white generated imagery stay within the reference's neutral visual language.
- Image quality and asset fidelity: four individual 1254 × 1254 generated product images are used. They share centered industrial-object framing, warm-white studio backgrounds, and gentle shadows; no placeholder boxes or code-drawn imagery remain.
- Copy and content: only four temporary category names are introduced. No matrix, project content, Principles content, or Footer content was added.
- Motion and behavior: native scrolling drives staggered movement and image-to-text crossfades across a 320svh desktop section and a 260svh mobile section. Buttons remain non-interactive until the transition is settled.
- Interaction and accessibility: mouse click changes the selected category; Arrow Up and Arrow Down move selection and focus; selected state and roving tab order are exposed through ARIA. Reduced-motion preference skips directly to the settled labels.
- Responsive behavior: mobile uses a simple 2 × 2 image arrangement before resolving into a vertical label list. Browser checks found no horizontal overflow.
- Runtime: lint and production build pass. Desktop and mobile browser checks found no console warnings or errors.

## Focused Region Comparison

The combined comparison board was sufficient because product-image scale, whitespace, label placement, and all three visible motion states remain readable. Separate close-up crops were not needed for this prototype pass.

## Comparison History

- Initial visual pass: the generated images matched the reference's restrained product-photography direction, and start/middle/end states preserved the intended right-to-left narrative; no visual P0/P1/P2 fixes were required.
- Interaction refinement: tab order was changed to a roving selection model and Arrow Up/Down keyboard behavior was added. The final browser pass confirmed focus and selection move together with no console errors.

## Follow-up Polish

- P3: the four generated objects and category names are intentionally temporary and should later be replaced with real project categories and imagery.
- P3: the exact scroll duration can be tuned after the user evaluates the motion on their own trackpad or mouse.

## Implementation Checklist

- [x] Preserve the existing Hero, global width, and section spacing.
- [x] Use four real raster assets with one shared art direction.
- [x] Build a native-scroll sticky sequence without scroll hijacking.
- [x] Crossfade imagery into usable category labels.
- [x] Verify click, keyboard, desktop, mobile, reduced-motion fallback, and console health.
- [x] Leave the project matrix and later homepage sections untouched.

Superseded result: passed before the user clarified the 24px horizontal requirement.

---

# Corrected Horizontal Work Categories Design QA

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-c2946409-d577-4752-823e-561855f805ad.png`
- Desktop start: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-corrected/horizontal-desktop-start.png`
- Desktop middle: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-corrected/horizontal-desktop-mid.png`
- Desktop end: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-corrected/horizontal-desktop-end.png`
- Mobile end: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-corrected/horizontal-mobile-end.png`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-corrected/comparison-board.png`
- State: homepage Work section, native vertical scroll, light theme.

## Viewports And Normalization

- Reference annotation: 3024 × 1580 pixels before conversation resizing.
- Desktop evidence: 1280 × 720 browser viewport; four images measured exactly 24 × 24 CSS pixels.
- Mobile evidence: 390 × 844 browser viewport; settled tab row measured 319.76px wide inside the 350px content area.
- The comparison board places the annotated source and corrected start state together, followed by start, middle, and end states on one horizontal sequence.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: final tabs use a single horizontal row, 14px desktop and 11px mobile, with 24px line height and restrained selected/inactive contrast.
- Spacing and layout rhythm: the image row is 120px wide—four 24px images with three 8px gaps—and begins at the right content edge. It follows one horizontal rail and ends at the left content edge.
- Colors and visual tokens: white background, black selected text, and muted inactive labels remain consistent with the existing page.
- Image quality and asset fidelity: the same four real raster assets are used at the requested 24px display size. No placeholder shapes or code-drawn graphics are present.
- Copy and content: four labels remain temporary; no project matrix or other homepage section was added.
- Motion: the four images move as one horizontal group. During the final 30% of progress, the group crossfades into a horizontal tab row at the same vertical coordinate.
- Interaction and accessibility: tabs become interactive only after settling; click and Arrow Left/Right selection work, with Arrow Up/Down retained as alternatives. Reduced-motion preference resolves directly to the final tab row.
- Responsive behavior: mobile keeps the final labels on one line without horizontal overflow.
- Runtime: lint and production build pass. A fresh browser session reports no console warnings or errors.

## Focused Region Comparison

No extra crop was needed because the combined board clearly shows the annotated horizontal direction, exact right-side start arrangement, unchanged mid-transition baseline, and left-side horizontal tab result.

## Comparison History

- Previous implementation used large, scattered images and a vertical label list. The user clarified that both the source graphics and resulting tabs must be horizontally arranged.
- Correction pass removed all scattered positioning and size variation, enforced four exact 24px images, reduced the scroll section to 220svh, and placed both states on one horizontal rail.
- Post-fix comparison found no remaining P0/P1/P2 issue.

## Follow-up Polish

- P3: the current raster images and category names remain temporary and can later be replaced without changing the motion model.
- P3: the vertical rail position and scroll duration can be tuned after hands-on feedback.

## Implementation Checklist

- [x] Four images only.
- [x] Every image is exactly 24 × 24 CSS pixels.
- [x] Images begin in one horizontal row on the right.
- [x] The row moves left on one horizontal path.
- [x] Images crossfade into one horizontal tab row on the left.
- [x] Desktop, mobile, click, keyboard, build, and console checks pass.

Superseded result: passed before the user clarified the Hero gap and one-by-one transition timing.

---

# Sequential Work Category Transition Design QA

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-c2946409-d577-4752-823e-561855f805ad.png`
- Hero-to-category spacing: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-sequential/hero-to-categories-spacing.png`
- First-image transition: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-sequential/transition-first-image.png`
- Second-image transition: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-sequential/transition-second-image.png`
- Completed transition: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-sequential/transition-complete.png`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-sequential/comparison-board.png`
- State: homepage Work section, native vertical scroll, light theme.

## Viewports And Normalization

- Reference annotation: 3024 × 1580 pixels before conversation resizing.
- Desktop verification viewport: 1280 × 720 CSS pixels.
- Hero frame bottom at scroll position 80: 528px. First category image top: 641.79px. Visible gap: 113.79px.
- All category images remain exactly 24 × 24 CSS pixels throughout the sequence.
- The comparison board places the annotated source and implementation spacing together, followed by three sequential transition states.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the final horizontal labels preserve the approved 14px desktop type and selected/inactive hierarchy.
- Spacing and layout rhythm: the category images now appear immediately at the Work section boundary, using the approved Hero-to-Work token. The previous extra 58svh vertical offset was removed. A sticky offset of 80px keeps the moving row below the fixed navigation after pinning.
- Colors and visual tokens: no color or contrast drift was introduced.
- Image quality and asset fidelity: four real raster images remain at the exact 24px target size.
- Copy and content: no project matrix or additional section content was introduced.
- Motion: every image has an independent progress window. Image 1 moves first and becomes Tab 1; Image 2 then moves and becomes Tab 2; Images 3 and 4 follow in order. The intervals overlap slightly for continuity but never move as one group.
- Interaction and accessibility: final tabs retain pointer interaction, selected state, roving keyboard focus, and reduced-motion fallback.
- Runtime: lint and production build pass. Browser verification found no console warnings or errors.

## Focused Region Comparison

The combined board clearly exposes both corrected requirements: the Hero-to-image gap is visible in the top comparison, while the lower sequence shows one image moving as the remaining images wait. No additional crop was necessary.

## Comparison History

- Earlier pass placed the row about 58% down a full sticky viewport, making the real gap from Hero to imagery several hundred pixels.
- Earlier pass also translated all four images with one shared progress value.
- This pass removed the internal vertical offset, anchored the sticky stage below navigation, and assigned four staggered movement/crossfade intervals.
- Post-fix visual comparison found no remaining P0/P1/P2 issue.

## Follow-up Polish

- P3: the slight overlap between consecutive transition intervals can be tightened or relaxed after hands-on scroll feedback.

## Implementation Checklist

- [x] Remove the unnecessary internal vertical gap.
- [x] Preserve the intended Hero-to-Work spacing token.
- [x] Keep all four images on one horizontal rail.
- [x] Give every image an independent transition interval.
- [x] Convert images to matching tabs in order from left to right.
- [x] Verify click behavior, build health, visual evidence, and console health.

final result: passed

---

# Procedural Black Marble Footer QA

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-ed784cdd-5dc3-49ca-92f5-120a32f23b40.png`
- Desktop implementation: `/Users/xianyu/Workspace/IDEA/portfolio/artifacts/fluid-footer-qa/marble-desktop-1280x720.png`
- Mobile implementation: `/Users/xianyu/Workspace/IDEA/portfolio/artifacts/fluid-footer-qa/marble-mobile-390x844.png`
- Combined comparison input: `/Users/xianyu/Workspace/IDEA/portfolio/artifacts/fluid-footer-qa/reference-vs-implementation.png`
- State: homepage footer fully revealed, motion enabled, dark marble field unobstructed except for the existing desktop navigation.

## Viewport And Normalization

- Source screenshot: 3024 × 1504 pixels. It is an art-direction reference for the background texture; its navigation and center media card are explicitly outside the implementation scope.
- Desktop implementation: 1280 × 720 CSS pixels at device scale 1; WebGL drawing buffer 1728 × 972 pixels at the capped 1.35 render ratio.
- Mobile implementation: 390 × 844 CSS pixels; captured at 390 × 844 pixels.
- Comparison board: 1600 × 900 pixels. Both source and implementation are shown with `object-fit: contain` so their complete crops remain visible.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested texture and motion scope.
- Fonts and typography: no typography belongs to the footer effect. Existing site navigation is unchanged; reference navigation and card copy were not reproduced.
- Spacing and layout rhythm: the procedural field continues to fill the fixed 100svh footer and preserves the existing rounded foreground reveal behavior.
- Colors and visual tokens: both source and implementation use pure black, near-black, and charcoal only. Contrast remains restrained, with no glossy white highlight or added color.
- Image quality and asset fidelity: the final field is procedural WebGL and does not use the generated draft image. Three-octave low-frequency noise produces smooth large forms; 96-phase contouring creates nested bands; localized fine contours add detail without restoring the former shredded texture.
- Copy and content: no content was added or changed.
- Motion: browser evidence changed within a 500ms interval. The shader now runs at a 60fps target and advances the marble phase directly, so the flow is visibly faster than the superseded texture-displacement version.
- Responsive behavior: desktop and 390px mobile captures preserve continuous contours with no seams, stretching, or horizontal overflow.
- Runtime: browser console reported no warnings or errors; lint and production build pass.

## Focused Region Comparison

No additional crop was needed. The texture is the only evaluated surface, and its large contours, localized nested lines, contrast, and edge continuity are clearly visible in the full comparison board. The reference's center card is deliberately ignored.

## Comparison History

- Superseded implementation: the raster source contained high-frequency fractured filaments, and its slow UV displacement left the texture looking damaged and nearly static.
- Iteration 1: replacing texture sampling with a procedural field removed the fractures but produced large camouflage-like blobs. Result remained blocked.
- Iteration 2: removing wave interference and increasing phase density created continuous nested bands, but the pattern still lacked localized refinement. Result remained blocked.
- Final iteration: reducing noise to three octaves smoothed the contour geometry, raising the primary phase to 96 added multiple nested layers, and masked fine contours restored local detail without fragmenting the whole field. Desktop and mobile post-fix evidence show the intended black-marble reading.

## Follow-up Polish

- P3: the reference contains a few intentionally turbulent micro-pattern regions. The implementation keeps these calmer because the user explicitly prioritized precision and continuity over fragmented detail.
- P3: exact phase speed can be tuned after hands-on trackpad viewing without changing the procedural pattern model.

## Implementation Checklist

- [x] Remove dependency on a generated replacement texture.
- [x] Replace fractured raster sampling with procedural nested marble bands.
- [x] Increase flow speed and render at a 60fps target.
- [x] Preserve offscreen, hidden-tab, and reduced-motion pausing.
- [x] Verify desktop and mobile crops, animation updates, console health, lint, and production build.

final result: passed

---

# Layered Fluid Footer QA

## Evidence

- Source visual truth — reveal state: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-84a421d2-8283-4484-ae80-a2688bfd8621.png`
- Source visual truth — full fluid state: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-b800d2e5-e516-40d8-a9d7-ccfdbaae806f.png`
- Desktop reveal implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-reveal-desktop.png`
- Desktop fluid frames: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-fluid-desktop-a.png` and `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-fluid-desktop-b.png`
- Mobile implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-fluid-mobile.png`
- Full-view comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/reveal-comparison.png`
- Focused fluid comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/fluid-comparison.png`
- State: homepage footer, partial reveal and fully revealed states, animated motion enabled.

## Viewports And Normalization

- Source screenshots: 1920 × 930 and 1920 × 925 pixels.
- Desktop browser viewport: 1440 × 900 CSS pixels at device scale 1; saved screenshot is 1425 × 891 pixels after browser scrollbar/chrome exclusion.
- Mobile browser viewport and saved screenshot: 390 × 844 CSS/pixels; the WebGL drawing buffer is 585 × 1266 pixels at the capped 1.5 device-pixel ratio.
- The reveal and full-fluid comparison boards place each source screenshot and its corresponding implementation state in the same 1600 × 900 comparison input. `object-fit: contain` preserves each screenshot's full crop rather than stretching unlike aspect ratios.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the implemented footer intentionally contains no text, matching the user's instruction to omit the reference's center card and its labels. Existing homepage typography is unchanged.
- Spacing and layout rhythm: the white homepage remains the foreground layer with a 14–20px responsive bottom radius. Its bottom edge moves upward through native scrolling while the 100svh fluid footer stays fixed behind it. At the final desktop scroll position, the main bottom measured approximately 0px and the fluid field occupied the full viewport.
- Colors and visual tokens: the footer uses a pure-black/near-black base with low-contrast charcoal marbling, matching the reference's quiet monochrome balance without introducing bright highlights.
- Image quality and asset fidelity: the base texture is a dedicated 1672 × 941 raster asset rather than a placeholder or CSS drawing. WebGL displacement produces continuous slow movement; desktop frames captured 1.6 seconds apart have different image hashes, confirming visible animation.
- Copy and content: the footer contains no card, label, temporary copy, GIF, or placeholder element. The center remains visually unobstructed for the future GIF.
- Responsive behavior: the footer fills both 1440 × 900 desktop and 390 × 844 mobile viewports. Mobile has zero horizontal overflow and no console warnings or errors.
- Performance and accessibility: animation begins only near the footer reveal, pauses while the page is hidden, caps rendering density at 1.5×, and renders a static frame for reduced-motion users.

## Focused Region Comparison

The separate full-fluid comparison is used because the low-contrast marbling details are too small in the reveal board. It confirms that the implementation preserves organic large and small liquid contours across the full field while intentionally excluding the reference's central rectangle and unrelated lower image.

## Comparison History

- Initial browser pass found the requested layer relationship, rounded foreground edge, full-screen fluid coverage, low-contrast texture, empty center, and responsive behavior all present. No P0/P1/P2 fixes were required after the comparison.

## Follow-up Polish

- P3: movement speed and displacement strength can be tuned after hands-on trackpad testing; the current version favors slow, understated motion.
- P3: the future GIF can be added as an independent centered overlay without changing the reveal or fluid systems.

## Implementation Checklist

- [x] Reveal the footer only as the white page moves upward.
- [x] Keep the fluid layer fixed behind the white page.
- [x] Use a full-width, full-height dark fluid texture.
- [x] Add slow randomized motion with a different seed per page load.
- [x] Leave the center empty with no rectangle or placeholder.
- [x] Respect reduced-motion and page visibility.
- [x] Verify desktop, mobile, animation changes, overflow, and console health.
- [x] Pass lint and production build.

final result: passed

---

# Design Principles Section QA

## Evidence

- Reference visual language: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-44d05931-b2f0-465a-83fa-016013cb546d.png`
- Reference content structure: `https://drams.framer.website/` — “Good design is” followed by a direct list of principles.
- Desktop implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/desktop.jpg`
- Mobile implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/mobile.jpg`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/comparison-board.jpg`
- Implementation target: `http://localhost:3001/`

## Viewports And Normalization

- Desktop browser viewport: 1157 × 786 CSS pixels; saved browser content is 1142 × 776 pixels after scrollbar exclusion.
- Mobile browser viewport: 390 × 844 CSS pixels; saved browser content is 375 × 812 pixels after scrollbar exclusion.
- The comparison board places the reference site's restrained visual language and the desktop principles implementation together in equal 1265 × 712 slots.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: large regular-weight headings, tight letter spacing, compact utility text, and restrained body copy match the existing homepage language. Desktop headings remain legible without awkward wrapping; mobile wraps intentionally into two lines.
- Spacing and layout rhythm: the section uses the existing fixed content width. Its two-column header and three-column principle rows maintain clear vertical rhythm; mobile collapses to a compact number/title grid with descriptions aligned under each title.
- Colors and visual tokens: the white background, black type, muted secondary copy, and low-contrast separators stay within the established palette.
- Image quality and asset fidelity: the section is intentionally text-only, matching the reference principle-list model; no visual assets are missing.
- Copy and content: four provisional first-person principles answer how the designer frames problems, simplifies complexity, judges details, and leaves room for users.
- Interaction: desktop title rows move 8px on hover; reduced-motion removes the transition. Mobile suppresses the hover shift.
- Responsive behavior: mobile rows measure 335px wide with no horizontal overflow.
- Runtime and console: lint and production build pass; browser console contains no warnings or errors.

## Focused Region Comparison

No additional crop was needed. The combined comparison clearly shows the shared restrained palette, thin separators, compact labels, large editorial type, and generous whitespace.

## Implementation Checklist

- [x] Replace the empty principles placeholder with semantic content.
- [x] Use a compact introduction followed by four large principles.
- [x] Include short explanations so the section communicates judgment, not slogans alone.
- [x] Preserve the homepage content width and visual language.
- [x] Verify desktop, mobile, reduced-motion behavior, console health, lint, and production build.

final result: passed

---

# Unified Work Scroll Correction Design QA

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-c2946409-d577-4752-823e-561855f805ad.png`
- Desktop top-state implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/work-unified-scroll/implementation-top.jpg`
- Desktop transition-state implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/work-unified-scroll/implementation-mid.jpg`
- Mobile implementation: `/Users/xianyu/.codex/visualizations/2026/09/02/work-unified-scroll/implementation-mobile.jpg`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/09/02/work-unified-scroll/comparison-board.jpg`
- Implementation target: `http://localhost:3001/`
- State: four 24px category images at the top of the Work content, transitioning one-by-one while the matrix remains directly beneath them.

## Viewports And Normalization

- Source reference: 3024 × 1580 pixels, normalized to 1512 × 790 for the combined comparison.
- Desktop browser viewport: 1512 × 790 CSS pixels; saved browser content is 1497 × 782 pixels after scrollbar exclusion and was fitted to the same 1512 × 790 comparison slot.
- Mobile browser viewport: 390 × 844 CSS pixels; single-column state captured at device scale 1.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the approved category-label and placeholder-card typography is unchanged; labels retain their selected/inactive hierarchy.
- Spacing and layout rhythm: the previous 130svh/177svh motion spacer and isolated sticky row are removed. A single `.work-categories__content` container now holds the 24px motion rail and the matrix with a constant 24px desktop gap and 16px mobile gap.
- Colors and visual tokens: the restrained white, warm-grey, and black palette remains unchanged.
- Image quality and asset fidelity: all four supplied category raster images render at exactly 24 × 24 CSS pixels. The project matrix intentionally remains image-free.
- Copy and content: the four category names, eight provisional project titles, and tags remain unchanged.
- Motion timing: on desktop the first image moves from x=990px at scrollY 0 to x≈888.6px at scrollY 24 while the other three remain at x=1022px, 1054px, and 1086px. The remaining images begin at their own staggered thresholds and all four labels settle by approximately scrollY 320.
- Continuous composition: at every measured scroll state, the matrix stays exactly 24px below the motion rail on desktop and 16px below it on mobile; there is no independent sticky phase or delayed matrix reveal.
- Responsive behavior: the mobile matrix is one 335px column with no horizontal overflow.
- Runtime and console: lint and production build pass. The browser console contains no warnings or errors.

## Focused Region Comparison

The combined board compares the annotated source intent and the implementation top state in one visual input. The separate transition capture confirms the first two images becoming labels while the remaining images continue traveling, with the first matrix row visible immediately below throughout the transition.

## Comparison History

- Earlier implementation placed the matrix after a tall motion-only spacer, so the category row and matrix appeared as separate sections.
- This correction removes that spacer and sticky split, nests the rail and matrix in one flex column, shortens the Hero-to-Work gap, and maps animation progress to the initial page scroll range.
- Post-fix desktop and mobile measurements confirm immediate staggered motion and a constant rail-to-matrix gap.

## Implementation Checklist

- [x] Keep the four category images at the top of the Work content on the first viewport.
- [x] Start the first image movement within the first 24px of page scroll.
- [x] Preserve one-by-one image-to-label transitions.
- [x] Keep category rail and matrix in one DOM and visual container.
- [x] Remove the scroll spacer and isolated sticky phase.
- [x] Preserve eight image-free project placeholders and remove matrix controls.
- [x] Verify desktop, mobile, console health, lint, and production build.

final result: passed

---

# Early-Entry Work Category Trigger Design QA

## Evidence

- Source visual truth: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-early-trigger/reference.png`
- First-scroll evidence: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-early-trigger/scroll-024.jpg`
- Early-motion evidence: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-early-trigger/scroll-120.jpg`
- Near-sticky evidence: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-early-trigger/scroll-660.jpg`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/08/31/01a056c0-e69b-70d1-92cc-5b62b0e63c53/personal-site-v3-work-categories-early-trigger/comparison-board.jpg`
- State: homepage Work category motion, native vertical scroll, light theme.

## Viewport And Normalization

- Reference annotation: 3024 × 1580 pixels.
- Browser viewport: 1280 × 720 CSS pixels at device scale 1; saved browser captures are 1265 × 712 pixels after browser chrome and scrollbar exclusion.
- The comparison board places the annotated source and the early and near-sticky implementation states in the same 1265 × 712 visual input.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the trigger change does not alter the approved final category-label typography or selected/inactive hierarchy.
- Spacing and layout rhythm: the Hero-to-Work gap remains approximately 114px. The motion now begins when the Work section crosses the viewport bottom, instead of waiting until its top reaches the sticky offset.
- Colors and visual tokens: no palette, opacity, or contrast tokens changed outside the intended image-to-label crossfades.
- Image quality and asset fidelity: the four source raster images remain exactly 24 × 24 CSS pixels on one horizontal rail.
- Copy and content: category names and the rest of the homepage remain unchanged.
- Motion timing: at scrollY 0 the first image is at x=1081px. At scrollY 24 it has already moved to x≈1062.7px while the remaining three stay at x=1113px, 1145px, and 1177px. At scrollY 120 the first image is at x≈684.1px while the others still wait. Near the sticky transition at scrollY 660, the first two labels have resolved, the third is finishing, and the fourth has begun its movement.
- Interaction and accessibility: the independent four-step sequence, settled tab interaction, keyboard model, and reduced-motion fallback are unchanged.
- Runtime: lint and production build pass; the browser completed the measured scroll sequence without a page crash or broken render.

## Focused Region Comparison

The combined board is sufficient because the relevant fidelity surfaces are the single horizontal motion rail and its timing relative to the Hero. The early-motion state clearly shows the first image displaced left while the other three remain at the right edge.

## Comparison History

- Previous progress mapped `0%` to the moment the Work section reached the viewport top, delaying all horizontal movement until the image rail was already at the top.
- This pass maps `0%` to the moment the Work section enters the viewport bottom and keeps an additional capped motion distance after the sticky position is reached.
- Post-fix measurements and the combined visual comparison show no remaining P0/P1/P2 issue.

## Follow-up Polish

- P3: the capped post-sticky distance can still be tightened after hands-on trackpad feedback, without changing the new entry trigger.

## Implementation Checklist

- [x] Start motion as the Work section enters the viewport.
- [x] Make the first displacement visible within the first 24px of page scroll.
- [x] Preserve one-by-one image-to-label handoff.
- [x] Preserve the approved Hero gap and sticky navigation clearance.
- [x] Verify visual states, lint, and production build.

final result: passed

---

# Work Matrix Design QA

## Evidence

- Source visual truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-44d05931-b2f0-465a-83fa-016013cb546d.png`
- Implementation target: `http://localhost:3001/`
- Intended state: desktop two-column project grid and horizontal rail after the Rail control is activated.

## Findings

- [P0] Browser-rendered implementation evidence is unavailable.
  Location: local preview browser tab.
  Evidence: the local server was restarted after the existing tab had already fallen back to the browser's connection-error page. The browser security boundary then blocked automated navigation from that error document back to localhost.
  Impact: the eight-card grid, responsive state, layout toggle, imagery, spacing, and interaction cannot yet be visually compared with the source.
  Fix: manually reopen `http://localhost:3001/` in the existing in-app browser tab, then rerun capture and interaction QA.

## Required Fidelity Surfaces

- Fonts and typography: implementation not yet browser-verified.
- Spacing and layout rhythm: implementation not yet browser-verified.
- Colors and visual tokens: implementation not yet browser-verified.
- Image quality and asset fidelity: eight real 1254 × 1254 raster images are present in the project, but their rendered crops are not yet browser-verified.
- Copy and content: source code includes eight project titles and card tags; rendered state not yet browser-verified.

## Implementation Checklist

- [x] Add eight real project-card images.
- [x] Add two-column Grid and single-row Rail layouts.
- [x] Add working Grid/Rail controls in code.
- [x] Pass lint and production build.
- [ ] Capture Grid and Rail states in the in-app browser.
- [ ] Compare source and implementation in one visual input.
- [ ] Test pointer interaction, mobile layout, and console output.

final result: blocked

---

# Unified Work Categories And Matrix Design QA

## Evidence

- Source visual truth: `/Users/xianyu/.codex/visualizations/2026/09/01/work-categories-matrix-unified/reference.png`
- Desktop implementation: `/Users/xianyu/.codex/visualizations/2026/09/01/work-categories-matrix-unified/unified-desktop.jpg`
- Mobile implementation: `/Users/xianyu/.codex/visualizations/2026/09/01/work-categories-matrix-unified/unified-mobile.jpg`
- Combined comparison input: `/Users/xianyu/.codex/visualizations/2026/09/01/work-categories-matrix-unified/comparison-board.jpg`
- State: settled category tabs immediately followed by the project matrix.

## Viewports And Normalization

- Reference: 2986 × 1548 pixels before conversation resizing.
- Desktop browser viewport: 1280 × 720 CSS pixels; saved capture 1265 × 712 pixels after browser chrome and scrollbar exclusion.
- Mobile browser viewport: 390 × 844 CSS pixels; saved capture 375 × 836 pixels after browser chrome and scrollbar exclusion.
- The comparison board places the source matrix and desktop implementation together at the same visible interaction state.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: category tabs retain the approved 14px desktop and 11px mobile treatment. Placeholder titles use the existing restrained card-title hierarchy.
- Spacing and layout rhythm: categories and matrix now share one `#work` section. The sticky rail is 24px high rather than viewport-height, allowing the matrix to catch up beneath it. The measured final gap is approximately 28px desktop and 16px mobile.
- Colors and visual tokens: the neutral white page and light-grey placeholder cards remain consistent with the source's restrained palette.
- Image quality and asset fidelity: the matrix intentionally contains zero images, following the user's explicit placeholder instruction. The only remaining images are the four approved 24px category-motion assets.
- Copy and content: eight project placeholders retain a top-left tag and bottom-left provisional title; the separate `Selected Work` heading is removed.
- Controls and behavior: Grid/Rail controls and all alternate-layout state have been removed. The matrix is a fixed two-column desktop grid and a single-column mobile grid.
- Motion regression: at scrollY 24, only the first category image has moved; the remaining three stay at their starting positions.
- Responsive behavior: desktop cards measure approximately 588.5 × 606.1 CSS pixels. Mobile cards measure 335px wide in one column with no horizontal overflow.
- Runtime: browser console contains no warnings or errors.

## Focused Region Comparison

No additional crop was needed. The combined board clearly shows the two-column card proportions, top-left tags, bottom-left titles, blank centers, and the category row directly above the matrix.

## Comparison History

- The superseded implementation incorrectly rendered the matrix as a separate section with its own heading, imagery, and Grid/Rail controls.
- The correction nests the matrix inside the category section, reduces the sticky block from viewport height to 24px, removes all project imagery and layout controls, and deletes the four unused generated matrix assets.
- Desktop and mobile browser captures confirm that the two parts now read as one continuous Work section.

## Follow-up Polish

- P3: placeholder titles and tags can be replaced when real project content is introduced; this does not require changing the matrix structure.

## Implementation Checklist

- [x] Keep categories and matrix in one semantic section.
- [x] Place the matrix directly beneath the settled category row.
- [x] Remove project images and leave blank card centers.
- [x] Remove the extra section heading and layout controls.
- [x] Preserve eight cards, two desktop columns, and one mobile column.
- [x] Verify category motion, responsive layout, console health, lint, and production build.

final result: passed

---

# Latest QA Status

- Current change: Design Principles section.
- Full report: `Design Principles Section QA` above.
- Desktop evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/desktop.jpg`
- Mobile evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/mobile.jpg`
- Combined comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles/comparison-board.jpg`
- Browser console: no warnings or errors.
- Lint and production build: passed.

final result: passed

---

# Latest QA Status — Screenshot-Matched Principles

- Source truth: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-9cdaba00-77a5-40d1-98ea-97a2a805c75a.png`
- Desktop evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles-corrected/desktop.jpg`
- Mobile evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles-corrected/mobile.jpg`
- Combined comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/design-principles-corrected/comparison-board.jpg`
- Viewports: 1157 × 786 desktop and 390 × 844 mobile at device scale 1.
- Fonts and typography: regular-weight Arial, tight large-list leading and tracking, with responsive scaling matching the screenshot's proportions.
- Spacing and layout: full-width two-column section with a 32px inset rule; label and list share the same top baseline. Mobile collapses to a single column.
- Colors: orange label is `rgb(255, 91, 31)`; body text is the existing near-black.
- Image fidelity: the section is text-only in both source and implementation; no visible assets are missing.
- Copy: all ten screenshot labels are reproduced exactly. Explanations, numbering, the previous introduction, separators, and hover motion are removed.
- Browser verification: ten list items, zero explanation paragraphs, zero number labels, no horizontal overflow, and no console warnings or errors in a fresh tab.
- Lint and production build: passed.

final result: passed

---

# Latest QA Status — Layered Fluid Footer

- Full report: `Layered Fluid Footer QA` above.
- Desktop reveal evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-reveal-desktop.png`
- Desktop fluid evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-fluid-desktop-b.png`
- Mobile evidence: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/footer-fluid-mobile.png`
- Full-view comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/reveal-comparison.png`
- Focused fluid comparison: `/Users/xianyu/.codex/visualizations/2026/09/02/01a0601f-d529-76a1-b160-5194d29ce678/footer-fluid-qa/fluid-comparison.png`
- Browser console, responsive layout, lint, and production build: passed.

final result: passed


---

# About Timeline QA — 2026-09-05

## Scope and source truth

- Request: adapt the timeline interaction from https://www.mikes.cv/ to About, with more detailed experience and project information. The user explicitly approved illustrative content.
- User image: `/var/folders/hn/h5y4d6y956g0rnrdn_wn5mnh0000gn/T/codex-clipboard-70bc43b5-6b6a-414a-86b7-133e9730be41.png` (3024 × 1748).
- Live reference: `artifacts/about-timeline-qa/reference-upper.png` and `reference-scrolled.png`.
- Local implementation: http://localhost:3010/about.
- Evidence directory: `/Users/xianyu/Workspace/IDEA/portfolio/artifacts/about-timeline-qa/`.
- This is an adaptation of the timeline structure, not a pixel-for-pixel clone of the complete reference site. Additional focus text, project disclosures, chapter navigation, white background and orange accent intentionally extend the existing portfolio.

## Evidence and normalization

- Desktop: `desktop-start.png`, `desktop-middle.png`, `desktop-expanded.png`, `desktop-jump.png`.
- Browser window: 1512 × 874 CSS px; page viewport with DevTools closed: 1512 × 753. Device pixel ratio: 2. Native CUA captures are downsampled to 1329 × 768 pixels including browser chrome.
- Source and implementation native captures have identical dimensions and density treatment. `comparison-board.png` (2658 × 704) crops the top 106 pixels of browser chrome from both views; each panel is 1329 × 662 beneath its label.
- `comparison-detail.png` (1600 × 620) compares the timeline rail, company nodes, project nodes and text hierarchy. Both views show the first company near the upper viewport boundary, with project disclosures closed. Content length and node count differ intentionally.
- Mobile: `mobile-390x844.png` and `mobile-320-final.png`. Actual emulated viewports are 390 × 844 and 320 × 844. DevTools auto-scales the display; native 1329 × 768 captures include DevTools. These are responsive implementation checks, not a claim of matching a mobile reference that was not supplied.
- Metrics: `verification-metrics.png` records `[390,844,390]` and `[320,844,320]` for viewport width, height and document scroll width; neither viewport has horizontal overflow.
- Reduced motion: `mobile-reduced-motion.png` records `[true,"1","none"]` for reduced-motion preference, timeline fill fraction and moving-head display.

## Findings / required fidelity surfaces

- Fonts and typography: inherited system sans-serif; company headings lead roles, location/date metadata, descriptive text, responsibilities and project previews. Descriptions wrap without truncation at both mobile widths. The additional text is deliberate to explain the experience more fully.
- Spacing and layout: continuous narrow left rail with dates on its left, content on its right. Large ring markers align with company headings; smaller markers align with project thumbnails. The sidebar remains sticky on desktop and becomes a compact year index on mobile. Expanded project content increases document height and the rail remeasures to maintain alignment.
- Colors and tokens: white and near-black inherit the portfolio; orange #e94f18 relates to the existing orange emphasis. Passed nodes and solid line are orange; upcoming nodes and dashed track remain neutral. Reference blue/pink treatment is intentionally not copied.
- Images: existing raster concept assets are reused at natural aspect ratio, with small previews and full-width expanded images. No invented employer logos or reference-site project assets are used. Imagery and employment details are expressly marked as illustrative.
- Copy: four sample experiences and four sample projects, with per-experience introduction and focus. Each project expands into context, contribution, outcome and concept imagery. No claim that these are verified career details.
- No actionable P0/P1/P2 issues remain for the agreed adaptation.

## Interaction and runtime verification

- Native scrolling advances the solid line and moving head, progressively activating company and project markers; the sidebar tracks the current experience.
- Clicking the 2020 chapter navigates to `#northstar`, positions the section beneath the fixed-header area and highlights that chapter.
- Clicking Ambient Dial expands context, contribution, outcome and image. Pressing Enter on its focused summary closes it. Native details semantics expose the disclosure to assistive technology.
- ResizeObserver updates rail measurements when a disclosure changes the layout.
- Contact CTA navigates to `/contact`; the shared About navigation returns to `/about`.
- Reduced motion renders the complete solid timeline, hides the moving head and removes smooth scrolling / hover transforms. The emulation override was restored after testing.
- Browser console: no application errors observed; React development tooling informational message present. A DevTools self-XSS warning resulted from the inspection tool's attempted paste; it is not an application warning and its protection was not disabled.
- `npm run lint`, `npx tsc --noEmit`, production build and `git diff --check` passed. Vinext prints its existing static route-classification limitation during builds.

## Comparison history

- Initial desktop comparison found no P0/P1/P2 drift against the requested adaptation. The full-view and focused comparison boards were opened and reviewed together.
- Mobile polish: preserved a space between the two sentences of the illustrative-content note when its line break is hidden. Rechecked in `mobile-320-final.png`.

## Follow-up polish

- P3: replace illustrative employment history and concept imagery with verified career and project material when available. Data is isolated in `components/about-experiences.ts`.
- The current motion timing and orange accent can be tuned after hands-on review.

## Implementation checklist

- [x] About route implemented within the existing app.
- [x] Continuous scroll-progress rail with company and project nodes.
- [x] Detailed project disclosures and multi-project experience support.
- [x] Desktop, 390px and 320px responsive checks.
- [x] Keyboard disclosure, chapter navigation and reduced-motion checks.
- [x] Full-view and focused source comparison reviewed.
- [x] Lint, TypeScript and production build passed.

final result: passed


---

# About node crossing motion — 2026-09-05

- Requested refinement: noticeable animation each time the scroll-progress head passes a timeline node.
- Company markers spring to 1.65× and settle over 720ms, with a 950ms expanding halo. Project markers spring to 2.4×, accompanied by a small thumbnail lift and rotation. Titles briefly shift 6px and highlight orange before returning to their original appearance.
- Crossing works in either scroll direction, with a 4px dead zone to avoid repeated pulses during tiny scroll reversals. Initially visible passed nodes receive one entry pulse, so the first company also gets feedback.
- Animation instances are cancelled on retrigger/unmount; enabling reduced motion cancels running pulses and hides halos. Layout-only measurements do not trigger crossing effects.
- Browser checked: visible project pulse, company pulse, reverse-scroll pulse, first-company entry pulse. Evidence: `artifacts/about-timeline-qa/company-node-pulse.png`, `node-pulse-reverse.png`, `node-pulse-initial.png` (all 1329 × 768 native browser captures).
- Lint, TypeScript and build passed; final entry-condition change was rechecked with lint, TypeScript and a browser reload.
- Latest sidebar: introduction and sample note removed at user request; only chapter navigation remains. Desktop initial position is 58px higher, with sticky top 88px.

final result: passed

---

# Ambient Dial reference implementation — 2026-09-05

## Scope and evidence

- Replaced the existing `/work/ambient-dial` page with the user-approved second reference: directory only on the left, no timeline, single-column project narrative on the right.
- Source visual truth: `/Users/xianyu/.codex/generated_images/01a07103-6632-74e0-8c19-1d5fe210900d/exec-9b917542-8616-4e64-8c5d-d4642802238f.png`.
- Evidence directory: `/Users/xianyu/Workspace/IDEA/portfolio/artifacts/project-detail-v2-qa/`.
- Source: 1135 × 1386 pixels. Final implementation: `desktop-final.png`, 1135 × 1386 CSS pixels and image pixels, device pixel ratio 1, top of page, Project active. No density normalization required.
- Full-view comparison: `comparison-final.jpg`, source left and implementation right. Focused title and sidebar comparison: `comparison-detail.jpg`. Both were opened and reviewed together.
- Desktop interaction viewport: 1135 × 786. Mobile evidence: `mobile-390.png` at 390 × 844 and `mobile-320.png` / `mobile-jump-final.png` at 320 × 844.

## Findings and comparison history

- Initial comparison (`comparison-first.jpg`): [P2] Design decisions wrapped on desktop because an inactive marker reserved space. Removed the reserved grid column and positioned the marker independently. The final comparison confirms a single line.
- Initial comparison: [P2] Heading scale, paragraph density and detail crop differed from the reference. Adjusted the title to 54px, opening spacing, desktop copy size and measure, chapter spacing, and close-up crop. Re-captured at the same dimensions and reviewed the final full and focused comparisons.
- A capture taken immediately after a viewport transition had incorrect output dimensions. Rejected it, allowed the viewport to settle, and replaced it with the verified 1135 × 1386 capture. It is not used as passing evidence.
- No actionable P0/P1/P2 findings remain for the selected layout.

## Required fidelity surfaces

- Typography: existing system sans-serif, regular-weight title and chapter headings; 54px desktop title, 24px chapter headings, 14px directory and desktop copy, 16px mobile copy. Minor generated-reference glyph and line-break differences remain P3.
- Layout: shared content alignment at approximately x400 in the 1135px viewport, narrow left index beginning around y284, compact metadata, 1.49-ratio cover and narrower close-up. No timeline, nodes, sidebar identity or return link; the global site header remains.
- Color: white and near-black inherit the site; #e94f18 active chapter text, section labels and horizontal current marker. Mobile adds weight to the active label. Keyboard focus has a visible outline and aria-current identifies the current chapter.
- Imagery: reuses the existing raster concept image for the cover and close-up. The generated reference subtly reinterpreted the object; original asset geometry and shading are deliberately retained. Crops preserve the subject and support the adjacent explanation. No CSS-drawn product substitutes.
- Copy: Project, Problem and Design decisions reproduce the selected reference. Outcome completes the existing fourth chapter below the reference's visible crop, explicitly retaining concept status. The compact All work / Back to top footer preserves the prior return path.

## Interaction and responsive checks

- Clicking chapter links updates the hash, scrolls to the target and marks that chapter current.
- Explicit chapter selection is preserved when a tall viewport cannot scroll the destination to the reading line; wheel/touch/pointer/scroll-key input resumes normal tracking.
- Keyboard Enter on Design decisions navigates to its chapter.
- At 320px, Design decisions lands at y172 with the sticky directory ending at y157; the heading remains visible. Scrolling to the end changes the active chapter to Outcome.
- Back to top returns scrollY to 0 and highlights Project. All work returns to the Home work section. The homepage Ambient Dial link returns to the detail route.
- 390px and 320px document widths equal viewport widths: no horizontal overflow. At 320px, active Design decisions can wrap inside its existing row without overlapping the adjacent control or heading.
- Browser log check: no warning or error entries observed on the detail page.
- Reduced-motion stylesheet disables smooth scrolling; runtime preference emulation was not performed in this run.
- Lint, TypeScript (without incremental artifact), production build and git diff whitespace checks passed. Existing Vinext route-classification notice remains.

## Follow-up polish

- P3: subtle font and product rendering differences from the generated reference; the implementation preserves the existing site font and original project asset.
- Full assistive-technology and 200% text-zoom checks were not performed.

## Implementation checklist

- [x] Replace the existing pilot route only.
- [x] Sidebar contains only chapter navigation.
- [x] Remove timeline and redundant navigation content.
- [x] Single content column with four matching chapter names.
- [x] Responsive directory, scroll tracking, anchors and keyboard navigation.
- [x] Inspect full-view and focused reference comparisons.
- [x] Run lint, TypeScript and production build.

final result: passed

---

# Journal reading layout — 2026-09-06

## Source and scope

- User reference: https://emilkowal.ski/ui/developing-taste.
- Source visual truth: `artifacts/journal-reading-qa/reference-top.png` and `reference-bottom.png`, captured in this run and inspected.
- Implementation: http://localhost:3010/journal/a-place-for-the-everyday.
- Implemented the reference's quiet reading composition in the existing Journal detail template. Original sample writing, source product image, article routes, and site identity are retained. This is a layout adaptation, not a copy of Emil's article or identity.
- Removed the article sidebar, oversized title, opening metadata/deck, hero placement, orange quote border and large related-work card. A normal-flow brand/Journal header, compact text hierarchy, serif quotations, inline supporting image, and modest end navigation now serve the reading flow.

## Evidence and viewport normalization

- Desktop reference and implementation screenshots were captured in the same unchanged Chrome window using native CUA; both are 1329 × 768 pixels including browser chrome. The page region begins around y106. Exact CSS viewport dimensions and device pixel ratio were not independently queried; do not interpret native capture pixels as CSS pixels. No density conversion was needed between this pair.
- Implementation evidence: `implementation-top.png`, `implementation-middle.png`, `implementation-figure.png`, `implementation-bottom.png`.
- Full-view comparisons: `comparison-top.png`, `comparison-bottom.png` (2658 × 768); both inspected with source and implementation together.
- Focused typography comparison: `comparison-type.png` (1210 × 255), made from native-size crops of the opening title/paragraphs. Opened and inspected without resizing the individual crops.
- Mobile: `mobile-320.png` and `mobile-390.png`, each 1329 × 768 native captures including DevTools. Device-toolbar dimensions were verified as 320 × 844 and 390 × 844 CSS pixels. Browser display scaling is present; these are responsive checks, not source-matched mobile comparisons.
- An intermediate width-entry error produced a 9999px viewport. That screenshot was rejected and the 390px evidence replaced after verifying the actual width. Device emulation was switched off and DevTools closed afterwards.

## Required fidelity surfaces

- Typography: retained the portfolio's system sans-serif; 16px/1.65 body, 16px semibold title and section headings. Focused comparison shows closely aligned reading density and title hierarchy. Georgia quotations at 29px desktop and 26px mobile provide the reference's serif emphasis. Exact source font files were not copied or independently identified.
- Layout: centered 640px content column with broad exterior space. Brand block and title follow the source's separated opening rhythm. The header scrolls away with the document, leaving only article content during reading. Small top/column differences in the combined capture are P3, with different text wrapping expected from different content.
- Colors: white and neutral dark/gray type preserve the portfolio. The source's subtly different white is an accepted product-theme difference. No orange emphasis or sticky UI competes with the body.
- Images: reuses the existing Ambient Dial raster as supporting material after the first section. The source article has quotations instead of a product photograph; this difference is intentional because our article discusses that product. Asset load, crop, caption and column alignment were inspected.
- Copy: original sample article preserved; title, paragraphs and sections remain readable. The sample marker and date are moved to the end, along with a plain related-work link. No source article text, endorsements, footnotes or marketing announcement were transplanted.

## Interaction checks and limits

- Clicking Next opens the second article and returns to its opening reading state.
- Clicking the section heading gives the expected `#give-the-action-a-home` URL and brings the section into view.
- Journal returns to the index and restores the normal navigation; the first article link reopens the new reading template.
- Native scrolling shows the article without a sticky header or sidebar.
- At 320px and 390px, text wraps within the visible column and no content clipping was observed. Full text-zoom and assistive-technology testing were not performed.
- Browser console inspected: React DevTools informational notice only; no application warning/error entries observed during the checked states.
- TypeScript, lint and production build passed. Existing Vinext route-classification and large-chunk notices remain unrelated to this typography change.

## Comparison history and findings

- First paired desktop comparison found no actionable P0/P1/P2 differences for the requested layout adaptation. No visual source changes were made after this comparison.
- Additional middle, figure, footer and mobile checks found no blocking issues.
- P3: source font identity and small top-spacing/background differences remain; content-driven line breaks and the supporting product image are expected differences.

## Checklist

- [x] Capture and inspect reference before source edits.
- [x] Rework all existing Journal article details using the shared template.
- [x] Preserve the minimal index and list-only samples.
- [x] Compare full-view and focused source/implementation images together.
- [x] Verify key links, section anchor and mobile reading layouts.
- [x] Run lint, TypeScript, production build and whitespace checks.

final result: passed


## Journal compact index — 2026-09-06

Source: `artifacts/journal-list-qa/reference.png` (user supplied screenshot, 3024 × 1506). Implementation: `artifacts/journal-list-qa/selected.png` and `scrolled.png` (1329 × 768 native Chrome captures). Comparison evidence: `comparison.png` and `type-comparison.png`, opened together as combined images. Reference CSS viewport and DPR are unknown; full reference was resized to 1329 × 662 for composition comparison, implementation browser chrome cropped to the same dimensions. Focused reference crop was reduced by 2 for approximate typography comparison. These are adaptation comparisons, not a pixel-identical clone.

**Findings**
- No actionable P0/P1/P2 differences in the captured desktop layout. The requested light theme, pinned preview and title/category-only content intentionally differ from the dark resource directory.
- Typography: existing system sans at 15px / 24px, weight 500, restrained tracking; smaller uppercase monospace categories follow the reference hierarchy. Single-line title truncation preserves right-hand metadata alignment.
- Spacing: centered 640px column, 40px desktop rows, no dividers. The original pinned image region remains intact.
- Colors: white background, readable gray titles and tags, near-black selected title. Dark-theme colors and near-invisible inactive states were not copied.
- Images: existing product images remain sharp and proportional, changing with the selected row. No new image assets required for this typography adjustment.
- Copy: existing Journal titles and categories retained; no resource descriptions, dates, dots or new controls added.

**Verification and limits**
- Clicked a preview row; confirmed selected text and image changed. Scrolled the list; image stayed fixed and rows remained below it.
- Lint and diff whitespace checks passed. CSS-only change; no new behavioral tests or production build needed.
- Responsive rules inspected: 14px title, 10px tag, 44px touch rows, ellipsis for long titles. A fresh mobile capture was unavailable because native Chrome screenshot capture stopped responding after entering developer tools. Desktop captures and comparison were completed before that issue. No new mobile visual verification or console claim is made.
- Comparison history: first completed comparison found no P0/P1/P2 issues; no visual edits followed it.

**Implementation checklist**
- [x] Smaller title and category typography.
- [x] Narrower centered list, consistent rows, no dividers.
- [x] Preserve fixed preview and row interaction.
- [x] Compare rendered desktop output to supplied reference.

final result: passed
