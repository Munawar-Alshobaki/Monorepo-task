#!/bin/sh
# Bring the database to a usable state, then hand off to the container command.
set -eu

echo "[entrypoint] waiting for the database to accept connections"
python - <<'PY'
import os
import sys
import time

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

engine = create_engine(os.environ["DATABASE_URL"])
deadline = time.monotonic() + 60

while True:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        break
    except SQLAlchemyError as exc:
        if time.monotonic() >= deadline:
            sys.exit(f"[entrypoint] database still unreachable after 60s: {exc}")
        time.sleep(1)
PY

echo "[entrypoint] applying alembic migrations"
alembic upgrade head

echo "[entrypoint] seeding demo data"
python -m app.seed

echo "[entrypoint] starting: $*"
exec "$@"
