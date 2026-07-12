# TransitOps Admin Dashboard

Admin dashboard for the TransitOps Smart Transport Operations Platform.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — fast dev server and build tooling
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing
- **TanStack Query** — server state management

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/           # Router and providers
├── layouts/       # Dashboard & auth layouts
├── pages/         # Route-level views
├── components/    # Reusable UI (ui, data, feedback)
├── services/      # API clients and data fetching
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
└── constants/     # App-wide constants
```

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/users` | Users management |
| `/settings` | Platform settings |
| `/login` | Authentication |
