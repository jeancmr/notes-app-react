# Ensolvers Notes Frontend

React 19 + Vite client for the Notes app. It handles authentication, notes, categories, and routing for active and archived notes.

## Tech stack

- React 19 + React Router
- TanStack Query
- Tailwind CSS v4 + shadcn/ui
- Axios

## Requirements

- Node.js 20+ (used 24.15.0 LTS)
- Yarn (used 1.22.22)

## Environment variables

Create a `.env` file in the `frontend` folder:

```bash
VITE_API_URL=http://localhost:3000/api/v1
```

This is the API base URL used by Axios with `withCredentials=true` to send auth cookies.

## Install and run

```bash
yarn install

# dev server
yarn dev
```

Vite serves the app at `http://localhost:5173`.

## App routes

- `/` active notes (authenticated)
- `/archived` archived notes (authenticated)
- `/auth/login` login page
