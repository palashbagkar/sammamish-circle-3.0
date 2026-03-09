# Design System & Component Specifications
**Project Name:** Sammamish Circle
**Strategy:** Desktop-first execution, strict Dark Mode.

## 1. Global Background & Environment
* **Type:** Animated mesh gradient.
* **Colors:** Transitioning between `#14181e` and `#124b51`.
* **Texture:** Overlay a static SVG grain/noise texture.
* **Texture Opacity:** 10% - 15%.
* **Animation:** Slow, continuous organic morphing of the mesh gradient points.
* **Component Entrance:** All main cards and elements must use a `slide-up` entrance animation.

## 2. Color Palette (50-30-10-10 Rule)
* **50% Base (Primary Base):** `#124b51` (Deep Teal)
* **30% Surface (Secondary/Primary 2):** `#14181e` (Dark Slate/Charcoal)
* **10% Accent 1 (Vibrant):** `#FFC300` (Cyber Yellow)
* **10% Accent 2 (Highlight/Light):** `#dce1e8` (Cool Grey/White)

## 3. Glassmorphism Specifications (Image Matched)
*Design Reference: The exact visual treatment of the uploaded dark search bar component.*
* **Base Layer:** Use the Surface color (`#14181e`) set to 40%-60% opacity (`bg-[#14181e]/50`).
* **Backdrop Blur:** Medium-to-heavy blur effect (Tailwind `backdrop-blur-md` or `backdrop-blur-lg`).
* **Border:** Extremely subtle, 1px solid utilizing Accent 2 at a very low opacity (`border border-[#dce1e8]/10`).
* **Dividers:** For inline card sections, use thin vertical dividers mapping to the border color.
* **Shadow:** Soft, deep drop shadow to separate from the background mesh.

## 4. Typography System
* **Primary Fonts:** Noto Serif & Inter. (Import via Google Fonts).
* **Base Size:** 12px.
* **Weights Available:** Regular (400) and Bold (700).
* **Headings:** Noto Serif. Color: `#dce1e8` (Accent 2). Tracking/Letter-spacing: `0.25em` (25%).
* **Body Text:** Inter. Color: `#124b51` (Base). Line-height: Normal. *(Note to Developer/AI: Ensure contrast ratios are checked here, as dark teal on a dark background is specified).*

## 5. Layout & Container Architecture
* **Layout Model:** CSS Grid.
* **Border Radius:** `5%` on the primary card containers.
* **Internal Padding:** `20vw` (20% of screen width) for main wrapper padding.
* **Gap:** `5%` of the container size for spacing between grid items/sections.

## 6. Interactive Elements & Components
*Global UI constraints: All transition durations must strictly be `100ms`.*

### Main CTA Button
* **Shape:** Pill shape (`border-radius: 100%` or `rounded-full`).
* **Default State:** Background `#FFC300` (Accent 1), Text `#14181e` (Surface/Primary 2).
* **Hover State:** Inverse styling. Border becomes `#FFC300`, Background becomes `#14181e` at 10% opacity with a blur, Text becomes `#dce1e8` (Accent 2).

### Flow Navigational Buttons
* **Shape:** Standard with `5px` solid border in `#dce1e8` (Accent 2).
* **Default State:** Transparent background utilizing `#14181e` at 10% opacity, Text `#dce1e8` with a slight blur effect.
* **Iconography:** Icons placed on the **Right** side.
* **Hover State:** Inverse. Background `#dce1e8` (Accent 2), Text `#14181e`.

### Submission Button (Animated)
* **Default State:** Background `#dce1e8` (Accent 2).
* **Loading State:** Execute a "battery charging" animation. The button background fills horizontally from 0% to 100% using `#FFC300` (Accent 1) to indicate progress.
* **Success State:** Solid `#FFC300` upon completion.

### Labels & Data Points
* **Styling:** Uppercase, Bold typography. Size: `12px`.
* **Container:** Pill shape (`border-radius: 100%`).
* **Background:** `#14181e` at 10% opacity with backdrop blur.