#  React Table – Take-Home Assignment for Thrive Career Wellness

Welcome! This is a performant, sortable, and draggable data table built with React and TypeScript. It loads 500 users into local state, allows dynamic column interaction, and uses virtualization for smooth rendering.

---

## Features

-  **500+ fake user records** loaded and persisted with `localStorage`
-  Columns:
  - ID
  - First Name
  - Last Name
  - Email
  - City
  - Registered Date
  - Full Name (derived)
  - DSR (Days Since Registered — calculated at runtime)
-  **Click to sort** any column (ascending/descending)
-  **Drag to reorder columns** with `@dnd-kit`
-  **Virtualized rows** using `react-window` for smoother scrolling
-  Clean, consistent layout with evenly spaced columns
-  Fully client-side, no backend required

---

## Why `react-window`?

Rendering 500 rows in the DOM at once can cause jank, especially during scrolling or re-rendering. `react-window` solves this by rendering only the visible rows in the viewport. As you scroll, offscreen rows are efficiently swapped in and out of the DOM.

This keeps performance smooth and memory usage low — critical for large or dynamic datasets.

> In short: **react-window = faster tables, happier users.**

---

## Tech Stack

- **React 18 + TypeScript**
- **Tailwind CSS** for styling
- **@faker-js/faker** for fake data generation
- **@dnd-kit** for column drag-and-drop
- **react-window** for virtualization
- **localStorage** for data persistence

---

## Setup

```bash
npm install
npm run dev
