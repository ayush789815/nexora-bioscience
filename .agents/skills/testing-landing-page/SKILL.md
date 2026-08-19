---
name: testing-landing-page
description: How to run and E2E-test the Nexora Bioscience landing page (Vite + React) in a browser, including known pitfalls.
---

# Testing the Nexora Bioscience landing page

## Run
- Node 22 required: `source ~/.nvm/nvm.sh && nvm use 22.12.0`
- `npm run dev` serves at http://localhost:5173 (if the port is taken Vite silently picks 5174 — check the log line, and avoid running two dev servers/browser windows at once: browser-console/CDP tooling may attach to the wrong window and report misleading state, e.g. empty `:hover` chains).

## Page structure
- Single page; sections are anchors: `#about #technology #capabilities #impact #research #contact #top`.
- Scroll story ("04 — The System") is a GSAP ScrollTrigger pinned section (`+=250%` scrub). Scroll in small increments (~5 wheel clicks) to observe each stage; stages end at BIOLOGY → DATA → INTELLIGENCE → IMPACT.
- Impact stats count up once (IntersectionObserver-style trigger); capture a mid-count screenshot on first entry.
- About diagram nodes are SVG `<circle tabIndex=0 role="button">` — both hover and Tab focus update the left detail panel.
- Custom cursor only renders when `(pointer: fine)` matches and reduced motion is off; it shows labels from `[data-cursor]` attributes (EXPLORE/OPEN/VIEW).

## Mobile testing
- Breakpoint is `md` (768px). Chrome's minimum window width (~530px) is enough to trigger the mobile layout without devtools emulation (`wmctrl -r "Nexora" -e 0,100,30,390,900`).
- Known bug area: the mobile menu overlay is a `fixed` element rendered inside `<header>`, which gains `backdrop-blur-md` after scrolling >24px. `backdrop-filter` makes the header the containing block for fixed descendants, so a menu opened after scrolling renders broken (transparent, overlapping content). Always test the hamburger both at page top AND after scrolling.

## Devin Secrets Needed
- None (fully local static site).
