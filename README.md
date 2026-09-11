# Motorcycle Shop — React + Axios + Laravel + MySQL + Docker

## Start everything

From this folder:

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:5173
- Laravel API: http://localhost:8000/api/motorcycles
- phpMyAdmin: http://localhost:8080

The frontend uses Axios with `VITE_USE_MOCK=false`, so motorcycle data comes from Laravel/MySQL.

## Stop

```bash
docker compose down
```

## Reset the database

This deletes the MySQL Docker volume and all database data:

```bash
docker compose down -v
docker compose up --build
```

## API routes

- GET `/api/motorcycles`
- GET `/api/motorcycles/{id}`
- POST `/api/motorcycles`
- PUT `/api/motorcycles/{id}`
- DELETE `/api/motorcycles/{id}`
