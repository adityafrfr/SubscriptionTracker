# SubscriptionTracker

A RESTful JSON API for tracking and managing recurring subscriptions.

## Features

- **Authentication** — Register, login, logout with JWT + bcrypt password hashing
- **Subscription CRUD** — Create, read, update, cancel subscriptions
- **Automatic Renewal Dates** — Calculated from start date and frequency
- **Upcoming Renewals** — Query subscriptions due for renewal
- **Role-Based Access** — `user` and `admin` roles with granular permissions
- **Ownership Enforcement** — Users can only access their own data
- **Soft Delete** — Users are flagged as deleted, not removed

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | jsonwebtoken, bcryptjs |
| Config | dotenv |

## Getting Started

**Prerequisites:** Node.js, MongoDB (local or Atlas)

```bash
git clone <repo-url>
cd SubscriptionTracker
npm install
cp .env.development.local .env.development.local  # configure your vars
npm run dev
```

The server starts at `http://localhost:5500` (or whatever `PORT` is set to).

## API Overview

All routes are prefixed with `/api/v1`.

| Route | Method | Description | Auth |
|---|---|---|---|
| `/auth/sign-up` | POST | Register a new user | — |
| `/auth/sign-in` | POST | Login, returns JWT | — |
| `/auth/sign-out` | POST | Logout | — |
| `/users` | GET | List all users | admin |
| `/users/:id` | GET | Get a user | JWT |
| `/users/:id` | PUT | Update own profile | owner |
| `/users/:id` | DELETE | Soft-delete a user | owner/admin |
| `/subscriptions` | GET | List all subscriptions | admin |
| `/subscriptions/user/:id` | GET | List user's subscriptions | owner |
| `/subscriptions/user/:id` | POST | Create a subscription | owner |
| `/subscriptions/upcoming-renewals/:id` | GET | Due-for-renewal subs | owner |
| `/subscriptions/:id` | GET | Get a subscription | owner |
| `/subscriptions/:id` | PUT | Update a subscription | admin |
| `/subscriptions/:id/cancel` | PUT | Cancel a subscription | owner |

## Security

- **Passwords** are hashed with bcryptjs (salt rounds: 10) and excluded from query results by default
- **JWT tokens** are verified on every protected route; invalid or expired tokens are rejected
- **Role middleware** blocks non-admin access to admin-only endpoints (403)
- **Ownership guard** ensures users can only read/write their own subscriptions and profile
- **Soft deletion** preserves data integrity — deleted users are flagged, not dropped
- **Centralized error handler** catches CastErrors, duplicate keys, and validation failures consistently
- **Environment variables** loaded from `.env.*.local` files (gitignored) — keep secrets out of the repo
- **Input validation** on subscription creation: price range (0–100), currency enum, start date not in the past

## Handcrafted

Every line of this codebase was written by hand — no AI, no LLM, no autocomplete, no code generators. Each file was typed deliberately, one keystroke at a time.

## License

MIT
