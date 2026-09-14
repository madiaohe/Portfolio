# Project detail pilot

The first case study is Ambient Dial at `/work/ambient-dial`. Only this project
has a detail route. Keep the pilot self-contained until its content and layout
have been reviewed; migrate the settled design to other projects afterwards.

## Existing application

- React 19 with Vinext, using Next-compatible App Router APIs.
- Shared navigation: `components/blocks/site-header.tsx` in `app/layout.tsx`.
- Shared typography, page width and mobile gutters: `app/globals.css`.
- Home: hero video, animated work categories with an eight-card matrix,
  design principles and a fluid footer.
- About: scroll-driven experience timeline with expandable project summaries.

## Pilot implementation

- `app/work/ambient-dial/page.tsx`: metadata, introduction, project facts,
  cover, section links, overview, design direction, detail crops, reflection,
  and return navigation.
- `app/work/ambient-dial/project.css`: scoped page styles and responsive layouts.
- `components/blocks/work-categories/work-matrix.tsx`: the first card links to the pilot; the other
  cards keep their current placeholder treatment.
- `app/about/about-timeline.tsx`: an additional case-study link inside the
  expanded Ambient Dial summary.
- The existing `digital-products.png` asset supplies the cover and two detail
  crops. These are views of the same concept image, not separate photographs.
- All narrative remains illustrative. No client, launch, research results or
  performance metrics are represented as verified facts.

## Validation — 2026-09-05

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed and includes `/work/ambient-dial`.
- `git diff --check`: passed.
- The local detail URL responds with HTTP 200.
- Local preview opened at `http://localhost:3010/work/ambient-dial`.
- Browser interaction and visual QA have not been run. Mobile layouts,
  keyboard focus styles and reduced-motion rules are implemented but still
  need visual review in the preview.

## Next iteration

Review the introductory scale, section spacing, image crops and narrative on
this one page. Replace the illustrative material with verified project content
when it becomes available. Extract shared case-study structure only after the
pilot has settled.

## Approved reference implementation — 2026-09-05

This supersedes the initial pilot layout described above. The live route now uses
`app/work/ambient-dial/project-index.tsx` for a sticky four-chapter directory with scroll
tracking. The left sidebar contains only that directory. The right side is a
single content column with Project, Problem, Design decisions and Outcome.
The timeline, large display hero, separate principles grid and two-image gallery
have been removed. Existing hash IDs remain valid. The original raster asset is
reused for the cover and a detail crop. Desktop and mobile browser checks and
reference comparison are recorded in the latest section of `design-qa.md`.
