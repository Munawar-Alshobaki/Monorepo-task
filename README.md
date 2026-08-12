# Monorepo Task

FastAPI + Postgres backend and a React/TypeScript frontend, wired together so the
whole stack comes up with one command.

## Run it

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8000/api/users
- OpenAPI docs: http://localhost:8000/docs

Nothing else to configure. Compose has defaults for every variable, so no `.env`
is required; copy `.env.example` to `.env` to override ports or credentials. If a
port is already taken on your machine, override it there (e.g. `BACKEND_PORT=8001`).

On startup the backend container waits for Postgres, runs `alembic upgrade head`,
inserts a few demo users if the table is empty, and then starts uvicorn.

## Layout

```
.
├── docker-compose.yml        # db + backend + frontend
├── .env.example
├── back-end/
│   ├── Dockerfile            # uv-based image, runs as a non-root user
│   ├── pyproject.toml        # dependencies, locked in uv.lock
│   ├── docker-entrypoint.sh  # wait for db -> migrate -> seed -> serve
│   ├── alembic.ini
│   ├── seed/
│   │   └── seed.py           # idempotent demo data
│   └── app/
│       ├── db.py             # engine, session factory, get_db dependency
│       ├── model.py          # User ORM model
│       ├── schema.py         # Pydantic request/response schemas
│       ├── main.py           # endpoints, lifespan, logging, error handling
│       └── migrations/
│           ├── env.py        # reads DATABASE_URL, targets Base.metadata
│           └── versions/     # auto-generated migrations
└── front-end/
    ├── Dockerfile            # vite build -> nginx
    ├── nginx.conf            # serves the SPA, proxies /api to the backend
    └── src/
        ├── main.tsx          # QueryClientProvider + RouterProvider
        ├── lib/api.ts        # typed fetch helpers
        └── routes/
            ├── __root.tsx    # shared layout
            └── index.tsx     # users list

```

## API

| Method | Path         | Notes                                        |
| ------ | ------------ | -------------------------------------------- |
| GET    | `/api/users` | Lists users. `limit` (1–200) and `offset`.   |

The frontend calls the API on its own origin (`/api`), which nginx proxies to the
backend container, so the browser never issues a CORS preflight. `CORS_ORIGINS`
is still set on the backend for running the Vite dev server directly.

## Dependencies

Backend dependencies are managed with [uv](https://docs.astral.sh/uv/). `uv sync`
installs them; `uv.lock` pins exact resolved versions so builds are reproducible,
and the Docker image installs from it with `uv sync --locked`. All backend
commands run through `uv run`.

## Working on it without Docker

Backend (needs a reachable Postgres and [uv](https://docs.astral.sh/uv/)):

```bash
cd back-end
uv sync
export DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/app
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

Frontend (proxies `/api` to `http://localhost:8000` in dev):

```bash
cd front-end
npm install
npm run dev
```

## Migrations

Alembic migrations are auto-generated. After changing `app/model.py`:

```bash
docker compose run --rm \
  --volume "$PWD/back-end/app/migrations/versions:/app/app/migrations/versions" \
  --entrypoint alembic backend revision --autogenerate -m "describe the change"
```

Review the generated file, then `docker compose up` applies it. `alembic check`
reports whether the models and the applied schema have drifted.
