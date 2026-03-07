# Design System: Sammamish-Circle-V2

## 1. Visual Theme & Atmosphere
The UX follows a 'cinematic' pacing, characterized by a smooth, deliberate flow of information. The spatial grid is expansive, using generous whitespace to create a premium, high-end feel akin to luxury real estate and travel platforms. Layouts are anchored by large, immersive imagery (Hero sections) and structured, scannable content zones (offering a breathable Resource Directory and Dashboard).

## 2. Color Palette & Roles (Dark Theme Primary)
*   **Deep Structural Teal (#2A5252)**: Primary base background for most sections, offering a deep, cinematic depth.
*   **Obsidian Black (#000000)**: Used for alternating structural sections, deep contrasting borders, foundational structure, and explicitly for the Footer to create a moody, premium feel.
*   **Pristine White (#FFFFFF)**: Primary text color across all dark surfaces (Teal and Black) to ensure maximum contrast and legibility. Also used sparingly for high-contrast light panels.
*   **High-Contrast Marigold (#FFC300)**: Primary call-to-action buttons, active states, and interactive highlight points (e.g., geospatial hotspots).

## 3. Typography Hierarchy
*   **Display / Hero Headings**: Large, bold, tightly kerned. Used for initial impact. (e.g., `font-weight: 700`, `letter-spacing: -0.02em`)
*   **Section Headers**: Medium weight, clearly partitioned with generous bottom margins. (e.g., `font-weight: 600`)
*   **Body Text**: Highly legible, clean sans-serif with comfortable line height for scannability. (e.g., `font-weight: 400`, `line-height: 1.6`)
*   **Microcopy / Labels**: Uppercase, heavily spaced out for technical precision. (e.g., `font-weight: 500`, `letter-spacing: 0.05em`, `text-transform: uppercase`)

## 4. CSS Animation Easings (Cinematic Motion Profile)
*   **Cinematic Reveal (Ease-Out)**: `cubic-bezier(0.16, 1, 0.3, 1)` - Used for page load animations, hero image scaling, and structural component reveals. Smooth, sweeping, and settles softly.
*   **Snappy Interaction (Ease-InOut)**: `cubic-bezier(0.4, 0, 0.2, 1)` - Used for hover states, button scaling, and tooltip appearances. Feels responsive but controlled.
*   **Spatial Drift (Linear/Smooth)**: `cubic-bezier(0.25, 0.1, 0.25, 1)` - Used for background parallax, slow map panning, and continuous subtle movements.

## 5. Component Stylings
*   **Buttons**: Fully rounded, pill-shaped buttons (`border-radius: 9999px`), driven by Marigold (#FFC300) backgrounds or borders for high visibility. Text on Marigold buttons should use Obsidian Black (#000000) for contrast.
*   **Cards / Containers**: Glassmorphism styling! Use translucent and blurred backgrounds (e.g., `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1);`) overlaid on Deep Structural Teal (#2A5252) or Obsidian Black (#000000). Avoid heavy, muddy drop-shadows.
*   **Structural Anchors**: Deep structural sections seamlessly blend between Teal (#2A5252) and Black (#000000) to segment the page flow, grounding the cinematic layout. Footer represents a hard stop with pure Black (#000000).

## 6. Layout Principles
*   **Spatial Grid**: A robust 12-column foundation with out-of-grid 'breakout' sections for panoramic media.
*   **Cinematic Pacing**: Information architecture is loaded in sequential, scroll-driven stages to prioritize focus over density.
