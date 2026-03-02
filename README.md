# A1-Satta Clone

A full clone of the A1-Satta website with admin authentication and editable content.

## Features

- **Exact clone** of a1-satta.com layout and components
- **Clerk authentication** for admin access
- **Admin panel** to edit all frontend content:
  - Site configuration (name, messages, links, disclaimer)
  - Live results (alwar, mandi bazar, lion bazar, disawer)
  - Satta games (yesterday/today results)
  - Chart data (daily results)
  - Content sections (FAQ, descriptions, etc.)
- **PostgreSQL database** via Prisma (Neon/Vercel Postgres for production)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env` (or copy from `.env.example`):

```env
# Database - PostgreSQL (use Neon free tier: neon.tech)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Clerk - Get from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Admin access - Add Clerk user IDs (comma-separated) to restrict admin to specific users
# Leave empty to allow ANY signed-in user (useful for initial setup)
ADMIN_USER_IDS=user_xxx,user_yyy
```

### 3. Set up Clerk (Required for build & auth)

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to **API Keys** and copy:
   - **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY`
4. Paste both into your `.env` file (replace the placeholder values)
5. In Clerk Dashboard → User & Authentication → Email, enable Email
6. Sign up at `/login`, then go to Clerk → Users, copy your user ID → add to `ADMIN_USER_IDS` in `.env`

### 4. Initialize database

```bash
npx prisma migrate dev
npm run db:seed
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Access

1. Sign in at `/login`
2. Go to `/admin` to access the admin panel
3. Edit any content and click Save

## Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

Quick: Push to GitHub → Import to Vercel → Add env vars (DATABASE_URL, Clerk keys) → Deploy.

## Tech Stack

- Next.js 16 (App Router)
- Clerk (authentication)
- Prisma + PostgreSQL (database)
- Tailwind CSS (styling)
