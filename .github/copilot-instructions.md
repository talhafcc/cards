# Project Guidelines

## Architecture
- This repo is a multi-service cards game stack: API + Socket.IO in [api/index.js](api/index.js), async persistence worker in [worker/index.js](worker/index.js), PostgreSQL schema in [postgres/init.sql](postgres/init.sql), and reverse proxy in [nginx/default.conf](nginx/default.conf).
- Keep gameplay rules and card evaluation logic in [api/gameplay/rules.js](api/gameplay/rules.js) and deck generation/shuffling in [api/gameplay/deck.js](api/gameplay/deck.js). Avoid moving rule logic into socket handlers unless necessary.
- API service owns real-time game state in [api/cache.js](api/cache.js). Worker service owns writing finished game data to Postgres.

## Build and Run
- Start production-like stack: `docker-compose up --build`
- Start development stack with hot reload: `docker-compose -f docker-compose.dev.yml up --build`
- API local scripts (from [api/package.json](api/package.json)): `npm start`, `npm run dev`
- Worker local scripts (from [worker/package.json](worker/package.json)): `npm start`, `npm run dev`
- Required env files for compose runs: `.env` and `db.env`
- There is no established automated test suite yet; do not invent test commands.

## Conventions
- Card format is `<Suit><Value>` with zero-padded values, e.g. `C02`, `H14` (Ace high). Preserve this encoding across API, rules, and client payloads.
- Player slots are positional (`p1` to `p4`) in state objects. Keep this shape stable for compatibility with worker DB writes.
- Keep Socket.IO event names and payload fields backward-compatible unless both server and client in [api/public/](api/public/) are updated together.
- Prefer making changes in the owning service only:
  - request/auth and game flow in `api/`
  - queue consumption and DB persistence in `worker/`
  - routing/proxy behavior in `nginx/`

## Safety and Maintenance Notes
- Existing SQL in [api/routes/authenticate.js](api/routes/authenticate.js) and [worker/index.js](worker/index.js) is interpolation-based; when editing related code, prefer parameterized queries.
- README usage steps in [README.md](README.md) are legacy and do not reflect the dockerized workflow. Prefer compose files and package scripts as source of truth.
- Keep instructions concise and link to source files instead of duplicating large explanations.