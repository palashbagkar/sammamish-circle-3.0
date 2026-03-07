# TRANSFORMATION_LOG.md: Functional-First Architectural Reskin

## 1. Goal Alignment & Core Functionality (Must Preserve)
The existing Sammamish Circle project relies on the following core functionalities that must be preserved during the aesthetic transformation:
*   **Directory System (`app/directory/page.tsx`)**: Complex filtering (Type, Cost, Tags), local storage-based saved resources and collections, List/Calendar toggle views, and the dynamic `MapComponent` integration.
*   **Homepage (`app/page.tsx`)**: Framer Motion scroll animations (parallax), featured resources array mapping, and newsletter form state handling.
*   **Dashboard (`app/dashboard/page.tsx`)**: Quick access resource grids with functional routing (`User Account`, `Directory`, `Forum`).

## 2. Aesthetic Gaps & Required Shifts
Based on the revised `SYSTEM.md` (Cinematic, Dark Theme Primary: Teal/Black/Marigold), the following components require significant structural and stylistic updates:

### A. Global Layout & Styling (`globals.css` / `home.css` / `app/directory/directory.css`)
*   **Current State**: Mix of light backgrounds (#fff), standard rounded borders, and various accent colors (e.g., `#FFC300`, `#10B981`, `#0EA5E9`).
*   **Transformation**: Invert base backgrounds to `Deep Structural Teal (#244747)` and `Obsidian Black (#000000)`. Text must default to `Pristine White (#FFFFFF)`. 
*   **Action**: Completely rewrite CSS variables. Convert box-shadows to flat, high-contrast borders or subtle white opacity borders. Translate all multi-color tags to utilize the `Marigold (#FFC300)` accent strictly.

### B. Header & Footer Components
*   **Current State**: Standard light-themed layouts.
*   **Transformation**: Apply dark `Teal (#244747)` backgrounds. Ensure uppercase, spaced-out microcopy for navigation links. Update CTA buttons to pure Marigold rectangles with sharp or subtly rounded edges and Obsidian Black text.

### C. Directory Listing & Map (`app/directory/page.tsx`)
*   **Current State**: White card backgrounds with complex internal tag colors.
*   **Transformation**: Shift resource cards to dark Teal/Black variants. Flat design. The MapComponent base layout needs to support a dark theme (passing map style props if utilizing mapping libraries like Mapbox/Leaflet) with Marigold hotspots.
*   **State Preservation**: The `CollectionPicker` popover and filter dropdowns must be restyled with dark backgrounds (#244747) and white text, maintaining the existing `onClick` and `useState` logic perfectly.

### D. Homepage Hero & Staggered Animations
*   **Current State**: Bright hero image with a white fade overlay.
*   **Transformation**: Deepen the hero overlay (gradient to dark Teal/Black). Preserve the Framer Motion `useScroll` and `useTransform` logic but apply the new 'Cinematic Reveal' (Ease-Out) bezier curves defined in `SYSTEM.md`.

## 3. Execution Strategy (Stitch Integration)
We will leverage `mcp:stitch` to generate the new dark-themed aesthetic shells (HTML/CSS) for these pages. Once generated, we will *surgically inject* the existing complex React hooks (`useState`, `useEffect`, `localStorage`), mapping data structures (`RESOURCES`), and Framer Motion logic into the Stitch-provided structural markup. This ensures we achieve the premium visual upgrade without breaking a single functional requirement.
