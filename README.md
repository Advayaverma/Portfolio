# Advaya Verma — Portfolio

An interactive *Cars*-themed developer portfolio built with **React 19**, **TypeScript**, **Three.js**, and **Vite** — featuring an explorable **3D Radiator Springs** drive-through alongside a **Classic View** toggle. Showcases projects, experience, skills, education, and certifications.

## Modes & Highlights

- **3D Radiator Springs World (Default)**
  - **Journey Mode:** Drive **Lightning McQueen (#95)** down Route 66 using scroll, `W` / `↑` (forward), `S` / `↓` (backward), or the right-side track navigation dots. Each pit stop smoothly glides a telemetry board across the screen.
  - **Free Drive (`[E]`):** Roam freely around town with `WASD` / Arrow keys (`Shift` to boost) or the on-screen touch controls on mobile.
  - **Radiator Springs Landmarks & Characters:** Includes **Radiator Springs Curios**, **Mater's Towing & Salvage**, **Fillmore's Taste-In**, **Cozy Cone Motel**, **Luigi's Casa Della Tires**, **Flo's V8 Café**, **Ramone's House of Body Art**, and the **Courthouse**, with interactive dialogue for **Mater**, **Fillmore**, **Sally**, **Luigi & Guido**, **Flo**, **Ramone**, and **Doc Hudson** (press `[F]` nearby or click their nameplate).
- **Classic View (`Classic view` ↔ `Back to 3D`)**
  - Racing-inspired UI with **ReactBits** (`Aurora`, `SplitText`, `DecryptedText`, `ShinyText`, `SpotlightCard`), **Framer Motion** scroll progress & flame dividers, a draggable **3D Telemetry Skill Sphere**, and an interactive **Pit-Garage Project Shelf** modal.
  - Automatically defaults to Classic View when `prefers-reduced-motion: reduce` is enabled.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and production builds
- **Tailwind CSS v4** — styling
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) — 3D Radiator Springs scene & `.glb` models
- **Framer Motion**, **GSAP**, **OGL** — animations, ReactBits effects, and WebGL Aurora
- **react-icons** — social and UI icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Install & run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Updating Content

All portfolio text, links, and resume data live in one file:

**`src/data/portfolio.ts`**

| Field | What to edit |
|-------|----------------|
| `profile` | Name, email, phone, tagline, summary |
| `profile.links` | LinkedIn, GitHub, LeetCode URLs |
| `profile.resumeFile` | Path to resume PDF in `public/` |
| `projects` | Project titles, descriptions, `github` and `demo` links |
| `skills` | Skill categories and items |
| `experience` | Internships and work history |
| `education` | Schools, degrees, coursework |
| `certifications` | Cert titles, issuers, dates |

Leave a link as `""` if you don't have one yet — the corresponding button won't appear.

### Resume

Replace `public/Advaya_Verma_resume.pdf` with an updated PDF and keep the filename in sync with `profile.resumeFile`.

## Project Structure

```text
src/
├── components/
│   ├── reactbits/          # Aurora, SplitText, DecryptedText, ShinyText, SpotlightCard
│   ├── world3d/            # CarsWorld3D, RadiatorSpringsScene, RadiatorSpringsTown, RaceCar95, PitStopOverlay, PitCrewDialogue, GlbModel
│   ├── ProjectShelf3D.tsx  # Pit-Garage project shelf & detail modal
│   ├── SkillSphere3D.tsx   # Draggable 3D skill sphere
│   └── ...                 # Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
├── data/
│   └── portfolio.ts        # ← edit content here
├── hooks/                  # scroll and active-section helpers
├── App.tsx                 # 3D / Classic view switcher and layout
├── index.css               # global styles and Tailwind
└── main.tsx                # app entry point

public/
├── models/                 # .glb 3D car and building assets
├── favicon.svg
└── Advaya_Verma_resume.pdf
```

<!-- ## Deployment

1. Push the repo to GitHub.
2. Import the project on [Vercel](https://vercel.com) (or Netlify).
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy — Vite projects work with zero extra config on Vercel.

## License

Personal portfolio — all rights reserved. -->
