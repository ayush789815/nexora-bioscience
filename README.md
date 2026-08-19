# Nexora Bioscience — Premium Biotech Landing Page

A premium, futuristic landing page for **Nexora Bioscience**, a fictional biotechnology company
engineering the next generation of biological intelligence. Built as a frontend development
assessment demonstrating visual design, motion design, and modern frontend engineering.

> "Science is becoming programmable."

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS 4** (CSS-first `@theme` configuration)
- **GSAP 3** + **ScrollTrigger** (load timelines, scroll reveals, pinned scroll story, count-ups)
- **Framer Motion** (mobile navigation transitions)
- **Three.js + react-three-fiber** (lazy-loaded 3D molecular model section)
- **Lucide React** (icons)

Most scientific visuals are procedural Canvas 2D and SVG for performance; the single WebGL
section (the 3D double helix) is code-split and only loads when scrolled near the viewport.

## Features

- **Hero** with staggered line-by-line load animation and an interactive molecular network
  (Canvas 2D: orbiting nodes, proximity bonds, DNA helix ribbon, drifting particles, pointer
  attraction, floating scientific labels).
- **Sticky navigation** — transparent → blurred surface on scroll, IntersectionObserver-driven
  active-section indicator, animated hamburger, full-screen mobile menu with scroll lock.
- **About / Approach** — interactive circular "biological system" diagram (Biology → Data →
  Computation → Discovery → Impact); converts to a vertical stacked interactive system on mobile.
- **Technology** — four hover-reactive cards with micro-interactions and an animated
  molecular-signal dashboard (fictional, clearly labeled conceptual data).
- **Molecular model** — lazy-loaded react-three-fiber scene: a procedural DNA double helix
  assembled from scattered instanced spheres as you scroll, with pointer-parallax inspection.
  No imported 3D assets — pure geometry and light.
- **Capabilities** — interactive index list with hover expansion.
- **Scroll story** — GSAP ScrollTrigger pinned section: scattered molecules connect, sprout data
  readouts, organize into a structured grid, and resolve into
  `BIOLOGY → DATA → INTELLIGENCE → IMPACT`.
- **Impact** — count-up statistics (run once, on viewport entry) over an orbital background visual.
- **Insights** — three research insight cards with hover states.
- **Final CTA** — molecular structure background with dramatic closing typography.
- **Custom cursor** — desktop-only dot + trailing ring with contextual labels (`VIEW`, `EXPLORE`,
  `OPEN`); disabled on touch devices and under reduced motion.
- **Scroll progress** — hairline gradient bar at the top of the viewport.

## Animation Architecture

| Layer | Tool | Usage |
| --- | --- | --- |
| Page-load sequence | GSAP timeline | Hero background → eyebrow → headline lines → copy → CTAs → meta |
| Scroll reveals | GSAP + ScrollTrigger | Shared `useSectionReveal` hook animates `[data-reveal]` elements per section, once |
| Scroll story | ScrollTrigger (pin + scrub) | Progress drives interpolation between scattered/connected/structured states |
| Count-ups | GSAP tween on plain object | Runs once when stats enter viewport |
| Mobile menu | Framer Motion | AnimatePresence mount/unmount with sequential item reveal |
| 3D helix assembly | react-three-fiber `useFrame` | Scroll progress lerps instanced nodes from scattered positions into the helix; pointer drives parallax |
| Micro-interactions | CSS transitions | Hover states, underline reveals, card translations |
| Custom cursor | `gsap.quickTo` | Low-latency dot + eased trailing ring |

Easing is standardized on `power3.out` / `expo.out`. All GSAP work is wrapped in `gsap.context`
and cleaned up on unmount.

### Reduced motion

`prefers-reduced-motion` is respected globally: load/scroll animations are skipped (content is
fully visible statically), the canvas visual renders a single static frame, the scroll story shows
its final state without pinning, count-ups render final values, and the custom cursor is disabled.

## Project Structure

```
src/
├── components/
│   ├── Navbar/           # Sticky nav + mobile full-screen menu
│   ├── Hero/             # Load timeline + molecular visual
│   ├── MolecularVisual/  # Procedural Canvas 2D molecular network
│   ├── About/            # Circular biological system diagram
│   ├── Technology/       # Tech cards + ResearchViz dashboard
│   ├── Capabilities/     # Interactive index list
│   ├── ScrollStory/      # Pinned scroll-driven narrative
│   ├── Impact/           # Count-up statistics
│   ├── Research/         # Insight cards
│   ├── CTA/              # Closing section
│   ├── Footer/
│   ├── CustomCursor/
│   └── ScrollProgress/
├── animations/           # useSectionReveal (shared ScrollTrigger reveal hook)
├── hooks/                # useReducedMotion, usePointerFine
├── data/                 # Centralized site content
├── App.tsx
├── main.tsx
└── index.css             # Tailwind theme, design tokens, global styles
```

## Installation

Requires Node.js **20.19+ or 22.12+**.

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deployment

**Vercel:** import the repository — the Vite preset is detected automatically
(build command `npm run build`, output directory `dist`).

**Netlify:** connect the repository with build command `npm run build` and publish directory
`dist`, or `netlify deploy --prod --dir=dist` after a local build.

## Design Explanation

- **Design concept** — "Science is becoming programmable": a laboratory-dark canvas where
  biological signal (organic motion, molecular networks) is progressively structured into data
  and intelligence. The page reads as one continuous story rather than isolated blocks.
- **Visual identity** — near-black green (`#07100E`) surfaces, a single biological-green accent
  (`#B8FF65`) used sparingly for emphasis, soft mint (`#8FE3C2`) for secondary scientific detail,
  Space Grotesk for editorial display type and Inter for body copy. Restraint over decoration:
  hairline borders, fine grids, grain, tiny scientific labels.
- **Animation approach** — purposeful motion only: entrance choreography establishes hierarchy,
  scroll-driven interpolation tells the biology→intelligence story, micro-interactions confirm
  interactivity. Consistent easing and duration bands throughout.
- **Technology choices** — Canvas 2D/SVG instead of WebGL keeps the bundle light, avoids WebGL
  fallback complexity, and stays smooth on low-power devices. GSAP handles timelines/scroll;
  Framer Motion is limited to mount/unmount transitions where it excels.
- **Responsive strategy** — mobile gets purpose-built layouts (vertical system diagram,
  full-screen menu, always-visible capability details, reduced particle counts), not a shrunken
  desktop page.
- **Performance decisions** — single canvas per visual with capped device-pixel ratio, deterministic
  layouts (no re-randomizing on resize), IntersectionObserver-gated animation, passive listeners,
  transform/opacity-only transitions, and run-once reveal triggers.

## Disclaimer

Nexora Bioscience is a fictional company. All figures and scientific data shown are conceptual
visualizations, not real measurements or claims.
