# Ekips

A full-stack web app for finding people to play board games with in your city. Users can create game sessions, join an open session, and chat with other participants.

## What it demonstrates

- **Product flow:** account creation, sign-in, profiles, game discovery, hosting, joining, and event chat.
- **Backend:** Next.js route handlers, PostgreSQL models and relations with Prisma, password hashing, and signed session cookies.
- **Operations:** environment-based configuration, a Dockerfile, and Railway deployment configuration.

## Stack

Next.js 15, React 19, TypeScript, PostgreSQL, Prisma 6, bcryptjs, and JOSE.

## Run locally

Requirements: Node.js 20+, npm, and a running PostgreSQL database.

```bash
npm ci
cp .env.example .env
# Set DATABASE_URL and a unique JWT_SECRET of at least 32 characters in .env.
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To populate local demo data, run `npm run seed`. The seed creates a demonstration account; **do not use it in production**. Keep `.env` and database credentials out of Git. The deployment must provide `DATABASE_URL` and `JWT_SECRET`; `ADMIN_EMAIL` is optional for the admin statistics route.

## Architecture

| Area | Location | Responsibility |
| --- | --- | --- |
| Pages and UI | `app/`, `components/` | Discovery, events, profiles, chat, and account flows |
| API | `app/api/` | Authentication, games, participants, messages, notifications, and settings |
| Data | `prisma/schema.prisma` | Users, games, memberships, messages, and preferences |
| Session handling | `lib/auth.ts` | Signed, HTTP-only cookie and protected API access |

## Current limitations

Chat refreshes through requests; it does not use live WebSocket updates. Location is entered as text rather than verified or geocoded. Email verification and complete moderation tools are not yet implemented. The repo does not currently include automated tests.

This is a portfolio project, not a production-ready public service. Before exposing a deployment to real users, add rate limiting, email verification, stronger moderation and abuse controls, automated tests, and an operational backup plan.
