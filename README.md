## Stack

- [TanStack Start](https://tanstack.com/start) with file-based routing (`src/routes`)
- [shadcn/ui](https://ui.shadcn.com/) components in `src/components/ui`
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Biome](https://biomejs.dev/) for linting and formatting
- [Nitro](https://nitro.build) for the server output

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command        | What it does                          |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Start the dev server on port 3000     |
| `pnpm build`   | Production build (prerenders `/`)     |
| `pnpm preview` | Serve the production build locally    |
| `pnpm lint`    | Run Biome lint                        |
| `pnpm format`  | Run Biome format                      |
| `pnpm check`   | Run Biome lint and format checks      |

## Project layout

- `src/routes/`: file-based routes (`__root.tsx` is the shell)
- `src/components/`: site components, `ui/` holds the shadcn components
- `src/data/profile.ts`: profile content shown on the site
- `src/lib/`: shared helpers, including the cached GitHub contributions loader
- `src/styles.css`: global styles and Tailwind setup

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add button
```

## Deploying to Vercel

The build uses Nitro (`nitro()` in `vite.config.ts`), which Vercel detects automatically. Import the Git repository in Vercel and keep the default settings. The `/` route is prerendered at build time, including the GitHub activity graph.

To test the Vercel output locally:

```bash
NITRO_PRESET=vercel pnpm build
```

This writes the output to `.vercel/output`.
