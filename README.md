# 3D Print Portfolio - Setup Guide

## How to use this in Google AI Studio / Real World

### 1. Create the Google Sheet
Create a new Google Sheet with exactly these headers in Row 1:
- `slug` (e.g., `geometric-planter`)
- `title` (e.g., `Geometric Planter`)
- `description` (Short sentence)
- `category` (Values: `Sports`, `Gifts`, `Functional`, `Decorative`)
- `material` (e.g., `PLA`, `PETG`, `TPU`)
- `purpose` (Values: `gift`, `personal`, `custom`)
- `notes` (e.g., `Printed with 0.6mm nozzle for strength`)
- `featured` (TRUE or FALSE)
- `images` (Pipe-separated URLs: `url1|url2`)
- `imageAlts` (Pipe-separated text: `Side view|Top view`)

### 2. Publish to Web
1. File > Share > Publish to web.
2. Select "Entire Document" (or specific sheet) and "Comma-separated values (.csv)".
3. Click Publish.
4. Copy the link generated.

### 3. Configure the App
In `services/dataService.ts`, replace the `DEMO_SHEET_URL` constant with your published CSV link.
Alternatively, set it via environment variable `VITE_GOOGLE_SHEET_URL` if using a build system that supports it.

### 4. Hosting
This is a static React SPA.
- **GitHub Pages**: Build and push to gh-pages branch.
- **Netlify/Vercel**: Connect repo and set build command `npm run build` and output `dist`.

### 5. Google Drive Images
If using Drive images, ensure files are "Anyone with the link can view".
The app automatically converts standard sharing links (e.g., `drive.google.com/file/d/ID/view`) into direct embed links.

---

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Three.js (@react-three/fiber)
- HashRouter (for static compatibility)