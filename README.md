# Advaya Verma — Portfolio

A dark, modern single-page portfolio built with React, TypeScript, and Vite. Showcases projects, skills, education, and certifications.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and production builds
- **Tailwind CSS** — styling
- **Framer Motion** — scroll and entrance animations
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
| `education` | Schools, degrees, coursework |
| `certifications` | Cert titles, issuers, dates |

Leave a link as `""` if you don't have one yet — the corresponding button won't appear.

### Resume

Replace `public/Advaya_Verma_Resume_v1.pdf` with an updated PDF and keep the filename in sync with `profile.resumeFile`.

## Project Structure

```
src/
├── components/     # UI sections (Hero, About, Projects, etc.)
├── data/
│   └── portfolio.ts   # ← edit content here
├── hooks/          # scroll and active-section helpers
├── App.tsx         # page layout
├── index.css       # global styles and Tailwind
└── main.tsx        # app entry point

public/
└── Advaya_Verma_Resume_v1.pdf
```

<!-- ## Deployment

1. Push the repo to GitHub.
2. Import the project on [Vercel](https://vercel.com) (or Netlify).
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy — Vite projects work with zero extra config on Vercel.

## License

Personal portfolio — all rights reserved. -->
