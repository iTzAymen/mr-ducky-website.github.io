# Handoff: Mr.Ducky Studio site redesign

## Overview

A full redesign of the Mr.Ducky Studio marketing site (`iTzAymen/mr-ducky-website.github.io`). Same information as today — studio stats, team, games with live player counts, community links — restructured and restyled into a "sticker book" system: navy outlines, hard offset shadows, dot-grid textures, animated blobs, and the existing brand colours pushed harder.

New vs. the current site:

- Hero is a split layout (logo + headline + CTAs) with a live "playing right now" badge, instead of a shrink-on-scroll banner.
- A marquee ticker strip under the hero cycling the headline numbers.
- Stat cards are full-colour panels with count-up animation on scroll.
- One featured game gets a hero-sized card (currently *Untitled Golf Game*); the rest sit in a grid with **sortable** ordering (most visits / playing now / newest).
- Two tiny early projects moved into a compact "From the archive" list.
- A "Come hang out" section with three community cards: Discord, **TikTok (new)**, Roblox group.
- Team cards rebuilt as colour panels with the new role lines.
- Thumbnails cycle as a hover slideshow (behaviour ported from the current `ThumbnailCarousel`).

## About the design files

The files in `design/` are **design references created in HTML** — prototypes showing the intended look and behaviour. They are *not* production code to copy in.

The task is to **recreate these designs in the existing codebase**: React 19 + Vite + Tailwind CSS v4, with components in `src/Components/`. Keep the repo's established patterns — `TiltCard` for tilt/lift, `abbreviateNumber` from `src/utils.ts`, `dataFetch.ts` for API calls, `src/Data/*.json` for content, `boldFont` / `defaultFont` classes for type. The prototypes use inline styles because of the tool they were authored in; in the real app these should become Tailwind utility classes.

Two files are included:

- `design/Mr Ducky Studio.dc.html` — **the redesign**. This is what to build.
- `design/Mr Ducky Studio - Current Site.dc.html` — a 1:1 recreation of the site as it exists today, for before/after comparison. Nothing to build here.

Open either directly in a browser (`support.js` sits alongside them and is required).

## Fidelity

**High-fidelity.** Colours, type sizes, spacing, radii, borders, shadows, and interactions below are final values — recreate them exactly. Where the prototype and this README disagree, the prototype wins.

---

## Design tokens

### Colour

| Token | Hex | Used for |
| --- | --- | --- |
| Ink (navy) | `#0B1D3F` | every border, hard shadow, body text, dark panels |
| Ink deep | `#050F1F` | — (reserved) |
| Brand blue | `#009DFF` | primary CTA, stat card 1, team card 1 |
| Blue deep | `#0A66E0` | CTA hover, "FEATURED" pill, shadow under navy stat card |
| Cyan | `#00C6FF` | hero gradient start, ticker sparkles |
| Neon yellow | `#FFFF0D` | nav bar, stat card 2, team card 2, hero CTA, ticker text |
| Yellow hover | `#FFD524` | hero CTA hover |
| Orange | `#FF7A18` | stat card 3, Roblox community card, ticker sparkles |
| Live red | `#FF2D55` | live dots, NEW badge |
| Discord | `#5C68EE` | Discord community card |
| Paper | `#EAF6FF` | page background, chips, meta pills |
| White | `#FFFFFF` | cards, icon tiles |

Hero gradient: `linear-gradient(160deg, #00C6FF 0%, #009DFF 46%, #0A66E0 100%)`.

Muted text is the ink at alpha: `rgba(11,29,63,.72)` body copy, `.62` section sub-lines, `.68/.70` card copy, `.45/.40` dates, `.15` dashed dividers. On coloured panels, white at `.72–.95`.

### Type

Two families, both already in the repo:

- **Nexa** (`src/fonts/Nexa/`, weight 900 = Black, 800 = ExtraBold) — all display and UI type. The repo exposes it as `.boldFont`.
- **Nunito** (Google Fonts, 400/700/900) — body copy. The repo exposes it as `.defaultFont`.

| Role | Font | Size | Weight | Notes |
| --- | --- | --- | --- | --- |
| Hero h1 | Nexa | `clamp(38px, 4.6vw, 62px)` | 900 | `line-height:.97`, `letter-spacing:-1.6px`, white, `text-shadow:0 6px 0 rgba(11,29,63,.55)`, `text-wrap:balance` |
| Hero sub | Nunito | 18px | 400 | `line-height:1.5`, `max-width:460px`, white `.94` |
| Section h2 | Nexa | `clamp(32px, 3.6vw, 48px)` | 900 | `letter-spacing:-1.2px`, ink |
| Section sub | Nunito | 16px | 400 | ink `.62`, baseline-aligned with the h2 |
| Stat value | Nexa | 52px | 900 | `line-height:1` |
| Stat label | Nexa | 13px | 900 | `letter-spacing:.6px`, uppercase |
| Featured h3 | Nexa | `clamp(28px, 3vw, 40px)` | 900 | `letter-spacing:-1px` |
| Card h3 | Nexa | 21px | 900 | `letter-spacing:-.5px` |
| Team name | Nexa | 26px | 900 | `letter-spacing:-.6px` |
| Card body | Nunito | 14.5px | 400 | `line-height:1.5` |
| Meta / pills | Nunito | 13–14px | 700 | |
| Buttons & nav | Nexa | 13–17px | 900 (nav links 800) | |
| Ticker | Nexa | 19px | 900 | yellow on navy, `white-space:nowrap` |

### Shape & elevation

- Radii: `999px` pills · `12px` nav logo · `14px` meta pills · `16px` hero stickers · `18px` card thumbnails, archive rows · `20px` team avatars · `22px` featured thumbnail · `26px` stat and game cards · `28px` team and community cards · `32px` featured card · `9px` icon tiles.
- Borders: `3px solid #0B1D3F` on small elements, `4px` on cards, `5px` on the featured card and hero bottom edge. Nav bottom border `4px`.
- **Hard offset shadows, no blur**: `0 4px 0 #0B1D3F` (small buttons) · `0 5px 0` (hero stickers) · `0 6px 0` (CTAs) · `0 8px 0` (cards) · `0 10px 0` (featured card). The navy stat card and the navy community card use `0 8px 0 #0A66E0` so the shadow stays visible.
- Press behaviour: on hover the element moves *down* by half its shadow and the shadow shrinks by the same amount; on `:active` it sits flush with `box-shadow:0 0 0`. This is the signature interaction — apply it to every CTA.

### Spacing

Page max-width `1180px`, side padding `24px`. Section padding: `82px 24px 20px` (first), `72px 24px 20px` (rest), `72px 24px 90px` (last). Grid gaps `22px` (stats), `26px` (games, team), `24px` (community). Cards pad `14px` (game), `18px` (featured), `22px` (team), `26px 24px 22px` (stat), `26px` (community). `scroll-margin-top:96px` on sections for the sticky nav.

---

## Screens / views

One page, seven bands top to bottom.

### 1. Sticky nav

Full-width `#FFFF0D` bar, `4px` ink bottom border, `padding:10px 22px`, flex row, `position:sticky; top:0; z-index:100`.

- Left: app icon (`src/assets/mr-ducky-app-icon-rounded.png`, 46×46, `border-radius:12px`, `3px` ink border) + wordmark "Mr.Ducky Studio" (Nexa 900, 19px, `letter-spacing:-.4px`).
- Right (`margin-left:auto`, gap 6px): text links **About · Games · Team · Join** (Nexa 800, 14px, pill padding `9px 14px`). Hover: background ink, text yellow, `translateY(-2px)`.
- Then the primary CTA: **▶ Play Now** — `#009DFF`, white, `3px` ink border, `0 4px 0` shadow, `padding:11px 20px`. The play triangle is a CSS triangle (`border-left:9px solid currentColor`, 6px transparent top/bottom), not an icon font.
- On scroll past 24px the bar gains `box-shadow:0 10px 26px rgba(11,29,63,.28)`; above that, none.

### 2. Hero

`padding:64px 24px 76px`, gradient background, `overflow:hidden`, `5px` ink bottom border. Four stacked decorative layers, all `pointer-events:none`:

1. Three blurred radial blobs (`filter:blur(26–34px)`) in yellow `.32`, orange `.42`, white `.5`, each animating on a 12–19s `duckyBlob` loop (`alternate` / `alternate-reverse`).
2. Dot grid: `radial-gradient(rgba(11,29,63,.16) 1.6px, transparent 1.6px)`, `background-size:22px 22px`.
3. Diagonal hatch: `repeating-linear-gradient(135deg, rgba(255,255,255,.09) 0 14px, rgba(255,255,255,0) 14px 28px)` at `opacity:.55`.

Content is a centred, wrapping flex row with `gap:48px`, `max-width:1180px`:

- **Left**: full logo lockup (`src/assets/mr-ducky-logo-primary.png`, 370×370 by default, `object-fit:contain`, `drop-shadow(0 18px 0 rgba(11,29,63,.28))`). Two sticker labels absolutely positioned on it: **SINCE 2021** (yellow, top-right, `duckyBob` 6s) and **8 GAMES SHIPPED** (white, top-left `top:30px;left:-8px`, `duckyBob2` 7.5s). Both Nexa 900 13px, `4px` ink border, `16px` radius, `0 5px 0` shadow. The whole group takes a cursor parallax of ±5px (see Interactions).
- **Right** (`flex:1 1 440px; max-width:560px`): live badge pill (`rgba(11,29,63,.9)`, pulsing 9px `#FF2D55` dot, text `"{live} PLAYING RIGHT NOW"`), h1 **"Fun, Creative, and Playful Roblox Game Development!"** (verbatim from the current site), sub-line "We build unique, high-quality Roblox experiences that bring players together. Eight games, one duck in a fedora.", then two CTAs: **▶ Play our newest game** (yellow, links to the featured game) and **See all games** (transparent, `4px` white border, `rgba(255,255,255,.16)` fill, anchors to `#games`; hover inverts to white on `#0A66E0`).

### 3. Ticker

Navy strip, `padding:14px 0`, `overflow:hidden`. Inside, a `width:max-content` flex row containing the same content **twice**, animated `duckyMarquee 34s linear infinite` (`translateX(0)` → `translateX(-50%)`) for a seamless loop. Items (Nexa 900, 19px, `#FFFF0D`, separated by `✦` glyphs alternating `#FF7A18` / `#00C6FF`, gap 34px):

`{totalVisits} VISITS · {groupMembers} GROUP MEMBERS · 5K DISCORD MEMBERS · {totalFavourites} FAVOURITES · SHIPPING SINCE 2021`

Ticker values are **not** animated — they show the final numbers immediately.

### 4. "The numbers" (`#about`)

Heading row: h2 **"The numbers"** + sub "Pulled live from the Roblox API every time this page loads." (`align-items:flex-end`, sub has `margin-bottom:8px` to sit on the baseline).

Stat grid: `repeat(auto-fit, minmax(248px, 1fr))`, gap 22px. Four cards, each `border-radius:26px`, `4px` ink border, `0 8px 0` shadow, tilt `7°`:

| # | Background | Label | Value | Sub-line | Icon |
| --- | --- | --- | --- | --- | --- |
| 1 | `#009DFF` | TOTAL VISITS | white, `text-shadow:0 4px 0 rgba(11,29,63,.45)` | across all eight experiences | home |
| 2 | `#FFFF0D` | GROUP MEMBERS | ink | in the Mr.Ducky Studio community | members |
| 3 | `#FF7A18` | TOTAL FAVOURITES | white | players who bookmarked a game | star |
| 4 | `#0B1D3F` | PLAYING NOW | `#FFFF0D` | live concurrent players | play, in a pulsing `#FF2D55` tile |

Icons are the **existing 24×24 paths from `src/Components/About.tsx`** (`HomeIcon`, `MembersIcon`, `StarIcon`) at 17px inside a 30px white tile (`border-radius:9px`, `3px` ink border). Card 4's tile is `#FF2D55` with a white `3px` border, a white CSS play triangle inside, and a `duckyPulse` ring.

Below the grid, a white "about" panel (`4px` border, `0 8px 0` shadow, `padding:32px 34px`): the studio paragraph **verbatim from the current site**, plus four paper chips — MULTIPLAYER, CO-OP, PARTY GAMES, OBBY.

### 5. "Out now" (`#games`)

Heading row: h2 **"Out now"** + sub "Player counts are live, straight from Roblox."

**Featured card** (`Untitled Golf Game`, universe `9928869006`, place `136650991799295`): white, `5px` ink border, `32px` radius, `0 10px 0` shadow, `padding:18px`, tilt `1.6°`, wrapping flex with `gap:26px`.
- Left: 16:9 thumbnail link, `4px` ink border, `22px` radius, image scales to `1.06` on hover. A `NEW` badge (`#FF2D55`, `3px` ink border, `0 4px 0` shadow, `duckyBob2` 6s) sits `top:14px;left:14px`.
- Right: `FEATURED` pill (`#EAF6FF` on `3px #0A66E0` border) + live "{ccu} playing" with a pulsing dot · h3 · description (verbatim from `projects.json`) · three paper meta pills ({visits} visits · {favourites} favourites · Launched 2026) · **▶ Play now** CTA in brand blue.

**Sort control** — label "SORT BY" (Nexa 900, 12.5px, ink `.5`, uppercase) + three pills: **Most visits** (default) · **Playing now** · **Newest**. Inactive: white fill, ink text, `3px` ink border. Active: ink fill, `#FFFF0D` text. Hover: `translateY(-2px)`.

**Games grid**: `repeat(auto-fill, minmax(330px, 1fr))`, gap 26px. Five cards — Truths Table, Chained Up, Nation Survival, Wordly, The Squid Game — each white, `4px` ink border, `26px` radius, `0 8px 0` shadow, `padding:14px`, tilt `3°`, column flex:
- 16:9 thumbnail link (`3px` border, `18px` radius, image `scale(1.07)` on hover).
- Title row: h3 + right-side live count (pulsing dot + abbreviated CCU). Truths Table has `noFetch: true` so it shows a `COLLAB` pill instead (`#EAF6FF` on `2px #0A66E0`).
- Description verbatim from `projects.json`.
- Footer row above a `3px dashed rgba(11,29,63,.15)` divider: `{visits} visits · {favs} favs` on the left, release year on the right.
- The Squid Game additionally carries a `BIGGEST HIT` badge (yellow, `3px` ink border) at `top:12px;left:12px`.

**Archive list** — "From the archive" label with a dashed rule filling the remaining width, then two rows: **Fall Block** and **Escape The Loop Obby 🕛** (emoji is part of the real game name). Each row: white, `3px rgba(11,29,63,.3)` border, `18px` radius, `padding:12px 16px`, flex with 74×42 thumbnail, name (Nexa 900 16px), one-line description that truncates with ellipsis, `{visits} visits`, year. Hover: border goes solid ink, `translateX(6px)`, `box-shadow:-6px 0 0 #FFFF0D`.

### 6. "The ducks behind it" (`#team`)

Heading row: h2 + sub "Two people, eight games." Grid `repeat(auto-fit, minmax(340px, 1fr))`, gap 26px. Two cards, `28px` radius, `4px` ink border, `0 8px 0` shadow, `padding:22px`, tilt `5°`, flex row with `gap:20px`:

| | Background | Name colour | Avatar backdrop |
| --- | --- | --- | --- |
| Aymen | `#009DFF` | white | `#FFFF0D` |
| Mohomesad | `#FFFF0D` | ink | `#009DFF` |

- Avatar: 112×112, `border-radius:20px`, `4px` ink border, sourced from `devs.json` `icon`.
- Role line (Nunito 700, 15.5px) — **use these strings exactly**: `Main Scripter, Animator, UI Designer` (Aymen) and `Main Builder, 3D Modeler, Scripter` (Mohomesad).
- Social chips: 38×38 white tiles, `12px` radius, `3px` ink border, holding the repo's `youtube.svg` / `twitter.svg` / `discord.svg` at 19px. Hover: `translateY(-3px) rotate(±6deg)`. Aymen has all three, Mohomesad has X + Discord (matching `devs.json`).
- CTA: **View profile →** — ink fill, `#FFFF0D` text; hover inverts to white fill with ink text.

### 7. "Come hang out" (`#join`)

Heading row: h2 + sub "Playtests, sneak peeks, and questions answered." Grid `repeat(auto-fit, minmax(300px, 1fr))`, gap 24px. Three cards in this order — each is one big `<a>`, `28px` radius, `4px` ink border, `padding:26px`, tilt `5°`, with a white dot-grid overlay (`radial-gradient(rgba(255,255,255,.14–.2) 1.5px, transparent 1.5px)`, `18px` grid):

| Card | Background | Shadow | Icon | Sub-line | CTA pill | Link |
| --- | --- | --- | --- | --- | --- | --- |
| Discord | `#5C68EE` | `0 8px 0 #0B1D3F` | repo `discord.svg`, 28px | 5K members · daily chat | `rgba(11,29,63,.85)` | `https://discord.gg/mrduckystudio` |
| TikTok | `#0B1D3F` | `0 8px 0 #0A66E0` | TikTok glyph, 28px | @mr.ducky.studio · clips & devlogs | `#FFFF0D` with ink text | `https://www.tiktok.com/@mr.ducky.studio` |
| Roblox group | `#FF7A18` | `0 8px 0 #0B1D3F` | Roblox logo, 30px, `filter:brightness(0)` | {members} members · free items | `rgba(11,29,63,.85)` | `https://www.roblox.com/communities/8954519/Mr-Ducky-Studio#!/about` |

All three icons sit in a 54×54 white tile, `16px` radius, `3px` ink border. Card titles are Nexa 900 26px.

**Assets to sort out**: the TikTok mark is an inline SVG pulled from a public icon set, and the Roblox mark is currently the Wikimedia PNG (`upload.wikimedia.org/.../Roblox_Logo.svg`) hotlinked with a local fallback. Vendor both into `src/assets/` before shipping — see Assets below.

### 8. Footer

Navy, `padding:44px 24px 36px`, `overflow:hidden`, with one blurred blue blob animating behind it. Left: app icon 56×56 (`14px` radius, `3px #FFFF0D` border) + "Mr.Ducky Studio" (Nexa 900 19px, white) over "© 2025 · Making Roblox games since 2021" (14px, white `.6`). Right: three pills — **Discord** (yellow fill, ink text; hover goes transparent with yellow text) and **Roblox group** / **TikTok** (transparent, `3px rgba(255,255,255,.35)` border; hover brightens to white border on `rgba(255,255,255,.12)`).

---

## Interactions & behaviour

| Behaviour | Spec |
| --- | --- |
| **Tilt + lift** | On `mousemove` over a card: `perspective(900px) rotateX(-Y°) rotateY(X°) translateY(-6px) scale(1.015)`, where the angles are the cursor's offset from centre normalised to ±`max`. `max` per element: stat 7, team 5, community 5, game card 3, featured 1.6. Reset `transform` on `mouseleave`. Transition `transform .3s ease-out`. This is the repo's existing `TiltCard` plus the `-6px` lift and `1.015` scale. |
| **Count-up** | The four stat values animate 0 → final over 1400ms with cubic ease-out (`1 - (1-p)³`), triggered once when the stats row scrolls into view. Values pass through `abbreviateNumber` each frame. Ticker, game cards, and community cards show final values immediately. |
| **Scroll reveal** | Every `[data-reveal]` block starts at `opacity:0; translateY(26px)` and transitions to `opacity:1; none` over `.6s cubic-bezier(.2,.8,.25,1)` when it intersects the viewport (`rootMargin:0px 0px -8% 0px`, `threshold:.08`), staggered `70ms` per item within a group of four. **Include a safety timer (~2.6s) that force-reveals everything** so content can never be stranded invisible if the observer never fires. |
| **Cursor parallax** | The hero logo group translates `±5px` horizontally and `±3px` vertically with the pointer (`translate3d`, driven by a `mousemove` listener writing styles directly — not React state). Disabled when motion is calm. |
| **Hover slideshow** | On hover of a game thumbnail, cycle that game's thumbnails every 3000ms: fade to `opacity:0`, swap `src` after 240ms, fade back. Dots (7px, white, `1.5px` ink border, active `scale(1.25)`) fade in at the bottom centre on hover only. Reset to frame 0 on `mouseleave`. Only enabled when the game has ≥2 thumbnails. All frames are preloaded. This is the current `ThumbnailCarousel` behaviour with a crossfade added. |
| **Sorting** | Clicking a sort pill reorders the grid by writing CSS `order` on each card (no DOM moves, no remount): most visits (default), live CCU, or release date. Ties fall back to visits. Re-runs whenever live data lands. |
| **Confetti** | Clicking any `[data-confetti]` CTA (nav Play Now, hero CTA, featured Play now) spawns 26 fixed-position 6–14px chips at the cursor in the palette colours, each with a `1.5px` ink border, animated outward on a random vector 60–230px with rotation and fade over 900–1400ms via the Web Animations API, then removed. Silent, no sound. |
| **Press feedback** | Every CTA: hover pushes down half the shadow depth, `:active` flattens it (`box-shadow:0 0 0`). |
| **Nav shadow** | Appears past 24px of scroll (see nav spec). |
| **Reduced motion** | The prototype exposes a `motion: "full" | "calm"` switch that kills blob/marquee/pulse animations and the parallax. In production, drive this from `prefers-reduced-motion` instead. |

### Responsive

Everything is fluid — no media queries. Grids use `auto-fit`/`auto-fill` with the min widths above; the hero and featured card are wrapping flex rows; display type uses `clamp()`. Below ~700px the hero stacks (logo above copy) and the grids collapse to one column. Verify the nav wraps acceptably at small widths — it is currently a single flex row and will need a mobile treatment (hamburger or scrollable row) that the prototype does not cover.

---

## State & data

The prototype's state, to port into the React app:

```ts
live: Record<universeId, { playing, visits, favs }>   // per-game live data
members: number                                       // group member count, fallback 656_900
progress: number                                      // 0→1 count-up driver
sort: "visits" | "ccu" | "date"                        // grid ordering
```

Endpoints — the same `roproxy.com` hosts already in `src/dataFetch.ts`:

1. `https://games.roproxy.com/v1/games?universeIds={id}` → `playing`, `visits`, `favoritedCount`, `created`. One call per game, skipping `noFetch` entries.
2. `https://groups.roproxy.com/v1/groups/8954519` → `memberCount`.
3. `https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?countPerUniverse=999&format=Png&isCircular=false&size=768x432&universeIds={comma-separated ids}` → all thumbnails per game, in one request.

Notes worth carrying over:

- **The `180DAY-…` thumbnail URLs baked into `src/Data/projects.json` expire.** Always fetch thumbnails; treat the JSON URL as an `onerror` fallback only, so a stale URL is never requested on a normal load.
- Totals (visits, favourites, live players) are summed across all games client-side, then abbreviated with `abbreviateNumber` from `src/utils.ts` (`hidePlus` off for stat cards and the ticker).
- Fallback numbers come from `projects.json`; the page must render fully and correctly with the API unavailable.
- Content stays in `src/Data/*.json` — `projects.json` (games), `devs.json` (team; the two role strings above replace the current duplicated `description`), `contacts.json` (add the TikTok URL alongside Discord and RobloxGroup).
- Hardcoded copy in the design that has no data source yet: "5K DISCORD MEMBERS", "SHIPPING SINCE 2021", the four category chips, and the `Launched 2026` pill. Move these into data if they should be editable.

## Assets

All in `design/src/`, copied from the repo except where noted:

| File | Use | Source |
| --- | --- | --- |
| `assets/mr-ducky-logo-primary.png` | hero lockup | repo |
| `assets/mr-ducky-app-icon-rounded.png` | nav + footer mark | **new** — supplied by the studio this session; commit it to `src/assets/` |
| `assets/discord.svg`, `youtube.svg`, `twitter.svg` | team + community icons | repo |
| `assets/arrow-top-right.svg`, `ducky-masked.png`, `react.svg` | unused by the redesign | repo |
| `fonts/Nexa/*` + `stylesheet.css` | display face (900/800/400) | repo |
| Nunito | body face | Google Fonts (`wght@400;700;900`) |
| Stat card icons | home / members / star paths | inline SVG in `src/Components/About.tsx` |
| Play triangles, live dots, dashed rules, dot grids | pure CSS | — |
| TikTok mark | community card | inline SVG from a public icon set — **vendor into `src/assets/tiktok.svg`** |
| Roblox mark | community card | currently hotlinked from Wikimedia (public domain) with a local fallback — **vendor into `src/assets/roblox.svg`** |

No new illustration was produced; the duck artwork is all existing studio art.

## Suggested component mapping

| Design band | Existing file to change | Notes |
| --- | --- | --- |
| Nav | `src/Components/NavBar.tsx` | add the logo + wordmark, the Play CTA, and the scroll shadow |
| Hero | `src/Components/Header.tsx` | replaces the scroll-shrink logic entirely |
| Ticker | new `Ticker.tsx` | |
| Numbers + about panel | `src/Components/About.tsx` | keep the icon components; the team half moves out |
| Featured game | new `FeaturedGame.tsx` | |
| Sort control + grid + archive | `src/Components/Projects.tsx` | reuse `ThumbnailCarousel`, add the crossfade and dots |
| Team | new `Team.tsx` (split out of `About.tsx`) | |
| Community cards | `src/Components/Contacts.tsx` | rename/repurpose; add TikTok |
| Footer | `src/Components/Footer.tsx` | |
| Tilt | `src/Components/TiltCard.tsx` | add the `translateY(-6px)` lift; note the existing `className` template bug (missing space before `${className}`) |
| Confetti, reveal, parallax | new hooks (`useConfetti`, `useReveal`, `useParallax`) | all imperative, no React state |

## Files in this bundle

```
design_handoff_site_redesign/
├── README.md                                  ← this document
└── design/
    ├── Mr Ducky Studio.dc.html                ← the redesign (build this)
    ├── Mr Ducky Studio - Current Site.dc.html ← today's site, for comparison
    ├── support.js                             ← runtime required to open the HTML files
    └── src/
        ├── assets/                            ← logo, app icon, social SVGs
        └── fonts/Nexa/                        ← display face
```

Open the HTML files directly in a browser. Both hit the live Roblox API, so numbers will differ from any screenshot.
