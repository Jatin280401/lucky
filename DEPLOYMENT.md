# Deploy A1-Satta Clone to Vercel

## Prerequisites

- GitHub account
- [Vercel account](https://vercel.com) (free)
- [Clerk account](https://clerk.com) (free)
- [Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres) (free tier)

---

## Step 1: Push to GitHub

```bash
cd a1-satta-clone
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/a1-satta-clone.git
git push -u origin main
```

---

## Step 2: Create Neon PostgreSQL Database (Free)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the **connection string** (looks like `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

---

## Step 3: Admin-Only Login (Restrict Sign-Up)

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) → Your app
2. **User & Authentication** → **Restrictions** → Enable **"Restricted"** mode
3. This disables public sign-up. Only users you create in Clerk (or add to allowlist) can sign in.
4. Create your admin user: **Users** → **Create user** (add your email)
5. Copy the user ID (e.g. `user_2abc...`) and add to `ADMIN_USER_IDS` in Vercel env vars

## Step 4: Configure Clerk for Production

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Select your application
3. Go to **Configure** → **Domains**
4. Add your Vercel domain (e.g. `a1-satta-clone.vercel.app`)
5. Go to **Configure** → **Paths** and ensure:
   - Sign-in URL: `/login`
   - After sign-in: `/admin`

---

## Step 5: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add **Environment Variables** (Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon connection string |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From Clerk dashboard |
   | `CLERK_SECRET_KEY` | From Clerk dashboard |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/login` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/login` |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/admin` |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/admin` |
   | `ADMIN_USER_IDS` | **Required.** Your Clerk user ID (from Clerk Dashboard → Users). Comma-separated for multiple admins. |

4. Click **Deploy**

---

## Step 6: Seed the Database (One-Time)

After your first deploy, **visit** `https://your-app.vercel.app/api/seed` in your browser. This populates the database with default content. It only runs if the database is empty.

---

## Step 7: Add Clerk Production Keys (Optional)

For production, create a production instance in Clerk and use those keys in Vercel env vars.

---

## Troubleshooting

- **Build fails**: Ensure all env vars are set in Vercel
- **Database connection error**: Check DATABASE_URL format and Neon project is running
- **Admin redirects to login**: Add your Clerk user ID to ADMIN_USER_IDS (required - no one can access admin without it)
