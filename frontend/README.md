# Motorcycle Shop Management System

Admin-only motorcycle inventory CRUD frontend built with React, Vite, TypeScript, Tailwind CSS, React Router, Axios, `clsx`, and `tailwind-merge`.

## Run

```bash
npm install
npm run dev
```

The frontend uses realistic local sample data by default and persists CRUD changes in `localStorage`.

## Laravel API

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

When `VITE_USE_MOCK=false`, `src/services/motorcycle-api.ts` uses Axios for:

- `GET /motorcycles`
- `GET /motorcycles/{id}`
- `POST /motorcycles`
- `PUT /motorcycles/{id}`
- `DELETE /motorcycles/{id}`

The UI and feature components do not need to change when switching from mock data to Laravel.
