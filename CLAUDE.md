# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menu application with separate backend and user-facing frontend.

## Repository Structure

```
menu_app/
├── backend/          # Rails 7.2 API backend (Docker)
└── user_frontend/    # Next.js frontend (port 3001)
```

## Backend (Rails 7.2 API)

**Technology:** Rails 7.2 in API mode with PostgreSQL 16 (Docker)

**Port:** 3000

### Docker Setup

The backend runs in Docker with PostgreSQL. All commands should be run from the `backend/` directory.

### Development Commands

```bash
cd backend

# Start all services (Rails + PostgreSQL)
docker compose up

# Stop services
docker compose down

# Build/rebuild Docker image
docker compose build

# Run commands in container
docker compose run --rm api <command>

# Examples:
# - Database operations
docker compose run --rm api rails db:create
docker compose run --rm api rails db:migrate
docker compose run --rm api rails db:rollback
docker compose run --rm api rails db:reset

# - Generate model
docker compose run --rm api rails generate model ModelName field:type

# - Generate controller
docker compose run --rm api rails generate controller Namespace::ControllerName

# - Rails console
docker compose run --rm api rails console

# - Bash shell in container
docker compose run --rm api bash

# View logs
docker compose logs -f api
```

### Initial Setup

If starting from scratch:

```bash
cd backend

# 1. Build Docker image
docker compose build

# 2. Generate Rails app (if not already done)
docker compose run --rm api rails new . --api -T --database=postgresql --force

# 3. Add rack-cors to Gemfile (already done)

# 4. Bundle install
docker compose run --rm api bundle install

# 5. Create database
docker compose run --rm api rails db:create

# 6. Run migrations
docker compose run --rm api rails db:migrate

# 7. Start server
docker compose up
```

### API Structure

- **Base URL:** `http://localhost:3000/api/v1`
- **Endpoints:** `/menus` - Full CRUD for menu items
- **CORS:** Configured for `http://localhost:3001`

### Menu Model

- `name` (string, required)
- `price` (integer, required, >= 0)
- `category` (string, required)
- `description` (text, optional)
- `is_published` (boolean, default: false)

## Frontend (Next.js)

**Technology:** Next.js with TypeScript, Pages Router, Tailwind CSS

**Port:** 3001

### Development Commands

```bash
cd user_frontend

# Start development server
npm run dev -- -p 3001

# Build for production
npm run build

# Start production server
npm start -- -p 3001

# Lint
npm run lint
```

### Initial Setup

If starting from scratch:

```bash
cd user_frontend

# 1. Create Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --no-app --src-dir --import-alias "@/*"

# 2. Create directory structure
mkdir -p src/types src/components src/pages/menus

# 3. Create necessary files (see file structure below)

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev -- -p 3001
```

### File Structure

```
src/
├── components/
│   ├── Layout.tsx       # Main layout component with header/footer
│   └── MenuCard.tsx     # Menu item card component
├── pages/
│   ├── _app.tsx
│   ├── index.tsx        # Home page
│   └── menus/
│       ├── index.tsx    # Menu list page (CSR with fetch)
│       └── [id].tsx     # Menu detail page (CSR with fetch)
└── types/
    └── menu.ts          # TypeScript type definitions
```

### Environment Variables

Create `.env.local` in the `user_frontend/` directory:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Pages

- `/` - Home page
- `/menus` - Menu list (fetches from `/api/v1/menus`)
- `/menus/[id]` - Menu detail (fetches from `/api/v1/menus/:id`)

All pages use CSR (Client-Side Rendering) with `useEffect` + `fetch`.
