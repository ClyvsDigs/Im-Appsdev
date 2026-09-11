# Motorcycle Shop Frontend + Laravel Backend

## Backend
1. Copy `.env.example` to `.env`.
2. Set MySQL values in `.env`.
3. Run `composer install`.
4. Run `php artisan key:generate`.
5. Create the database named in `DB_DATABASE`.
6. Run `php artisan migrate --seed`.
7. Run `php artisan storage:link`.
8. Start Laravel: `php artisan serve --host=127.0.0.1 --port=8000`.

API base URL: `http://localhost:8000/api`

## Frontend
In the React project, create `.env`:

`VITE_API_URL=http://localhost:8000/api`
`VITE_USE_MOCK=false`

Then:
`npm install`
`npm run dev`

The existing Axios service already uses:
- GET /motorcycles
- GET /motorcycles/{id}
- POST /motorcycles
- PUT /motorcycles/{id}
- DELETE /motorcycles/{id}

The frontend sends the exact camelCase fields defined by `src/types/motorcycle.ts`. The Laravel controller converts them to database snake_case columns and converts API responses back to camelCase.

Images are sent as JPEG data URLs by the current frontend. Laravel validates them, stores them in `storage/app/public/motorcycles`, and returns a public `/storage/...` URL.

If your MySQL server is XAMPP/local instead of Docker, use:
DB_HOST=127.0.0.1
DB_PORT=3306
and your MySQL username/password.
