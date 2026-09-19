# Emil homepage reference study

## Purpose

A faithful local reproduction of https://emilkowal.ski/ captured on 2026-09-08. The user selected fidelity over a loose redesign. Original reference identity and homepage copy are temporarily retained to make direct visual comparison possible.

## Project and branches

The existing app uses React 19, Vinext, Vite, CSS, Markdown journal content, and Three.js for earlier experiments. Its earlier homepage combined a video hero, animated work categories, design principles and a fluid footer. The new homepage uses a single reading column and restrained link feedback.

- Working branch: `codex/emil-minimal`.
- Previous source snapshot: `6802ce9` on `codex/personal-site-v3-snapshot`.
- Original branch `redesign/personal-site-v3` was not rewritten.
- Existing About, Contact, Journal and article routes remain available.
- Existing untracked `artifacts/` and `tsconfig.tsbuildinfo` were left in place.

## Implemented surface

The source homepage: announcement, identity, Today, four Projects, ten Writing links, Newsletter and More. This is a homepage reproduction, not an offline mirror of the source's articles or external products.

The homepage uses the source's font, glyph features, close icon and favicon, stored locally. All content links point to the original author’s real destinations. Writing opens in the same tab; projects and social destinations open in a new tab. The newsletter provides browser email validation and a local pending/result state. No email is transmitted or stored; its result explicitly says it is a preview and links to the original signup. Real subscriptions require a separately configured service.

The announcement is a dated snapshot, including its promotional countdown. Closing it animates it away, retains the source's reserved layout space and remembers the choice in local storage. The source's mobile layout hides the close control; that behavior is retained. Reduced-motion preferences disable added transitions and label animation.

## Measured layout

| Property | Desktop | Mobile |
| --- | --- | --- |
| Reference viewport | 1440 × 1000 | 390 × 844 |
| Outer max width | 692px | Full width |
| Inline padding | 24px | 24px |
| Content width | 644px | 342px |
| Body typography | 16px / 24px | 16px / 24px |
| Intro line height | 26.4px | 26.4px |
| Header-to-main gap | 128px | 128px |
| Section spacing | 128px | 64px |
| Link group gap | 16px | 28px |
| Row padding | 12px | 0px vertically |

The 640–767px breakpoint uses 128px outer vertical padding; 768px and above uses 64px, matching the source. Colors: background `#fdfdfc`, primary `#21201c`, secondary `#63635e`, row hover `#f5f4f4`.

## Source assets

- `public/fonts/reference-sans.woff2`: https://emilkowal.ski/_next/static/media/0336a89fb4e7fc1d-s.p.woff2
- `public/icons/reference-close.svg`: exported from the source announcement button.
- `public/favicon.ico`: https://emilkowal.ski/favicon.ico
- Font features: `cv01`, `ss03`; original fallback metrics retained.

These are reference-study assets and content. They are not represented as XIANYU's work. The homepage sets `noindex, nofollow`; nothing was deployed.

## Editing and preview

- `app/reference-home.tsx`: homepage shell, bio, announcement and newsletter.
- `lib/reference-home.ts`: project and writing rows.
- `app/minimal.css`: isolated layout and styles.
- `components/blocks/site-header.tsx`: suppresses the former navigation and scroll listener only on `/`.

Run `npm run dev`; the existing dev server is available at http://localhost:3010/.
See `design-qa.md` and `output/playwright/emil/` for verification.
