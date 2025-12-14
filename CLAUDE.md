# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menu application with separate backend and user-facing frontend.

## Repository Structure

```
menu_app/
├── backend/          # Rails 7.1 API backend
└── user_frontend/    # Next.js frontend (port 3001)
```

## Backend (Rails 7.1 API)

**Technology:** Rails 7.1 in API mode with SQLite3

**Port:** 3000

### Development Commands

```bash
cd backend

# Start server
rails server -p 3000

# Database
rails db:create
rails db:migrate
rails db:rollback
rails db:reset

# Generate model
rails generate model ModelName field:type

# Generate controller
rails generate controller Namespace::ControllerName

# Console
rails console
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

**Port:** 3001

To be configured.
