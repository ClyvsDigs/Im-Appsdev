#!/bin/sh
set -e

cd /var/www/html
# Ensure Git writes its global config to a writable location (the working directory) and mark the directory as safe
export HOME=/var/www/html
git config --global --add safe.directory /var/www/html

# --- Development only: bind-mounted volume may be missing dependencies -------
if [ "$APP_ENV" != "production" ]; then
    if [ ! -f vendor/autoload.php ]; then
        echo "[entrypoint] Installing composer dependencies..."
        composer install --no-interaction --prefer-dist
    fi

    # Generate an app key into the (bind-mounted) .env if it has none.
    if [ -f .env ] && ! grep -q '^APP_KEY=base64:' .env; then
        echo "[entrypoint] Generating APP_KEY..."
        php artisan key:generate --force || true
    fi

    if [ -f .env ] && grep -q '^APP_KEY=base64:' .env; then
        APP_KEY="$(grep '^APP_KEY=' .env | tail -n 1 | cut -d= -f2-)"
        export APP_KEY
    fi
fi

# --- Seed the demo motorcycle images into the shared public storage -----------
if [ -d public/motorcycles ] && [ ! -f storage/app/public/motorcycles/honda-click.svg ]; then
    echo "[entrypoint] Copying demo motorcycle images..."
    mkdir -p storage/app/public/motorcycles
    cp public/motorcycles/*.svg storage/app/public/motorcycles/
fi

# --- Database migrations (db is already healthy via depends_on) -------------
echo "[entrypoint] Running migrations and seeders..."
php artisan migrate --seed --force

# --- Optimize for production / keep fresh for dev ---------------------------
if [ "$APP_ENV" = "production" ]; then
    echo "[entrypoint] Caching config, routes and views..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
else
    php artisan optimize:clear || true
fi

if [ ! -e public/storage ]; then
    php artisan storage:link || true
fi

echo "[entrypoint] Starting: $*"
exec "$@"
