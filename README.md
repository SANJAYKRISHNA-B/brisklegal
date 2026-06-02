# Brisk Legal MERN Project

This is a clean MERN project for Brisk Legal.

The project uses:

- **MongoDB** for storing consultation leads.
- **Express** and **Node.js** for the backend API.
- **React** with **React Router** for separate frontend pages.
- **Vite** for frontend development and production builds.

There is no PHP in this project, and the old static lawyer template files have been removed.

## Pages

The top navigation uses separate React routes:

- `/` - Home
- `/who-we-are` - Who We Are
- `/mission` - Our Mission
- `/practice-areas` - Brisk Legal Services
- `/approach` - How We Work
- `/clients` - Who We Work With, Retainer Services, Knowledge & Insights
- `/contact` - Schedule a Consultation

## Project Structure

```text
client/
  index.html
  src/
    App.jsx
    main.jsx
    styles.css
  vite.config.js

server/
  src/
    config/db.js
    models/Lead.js
    routes/leads.js
    server.js

.env.example
package.json
README.md
```

## Required Software

Install these before running the project:

- **Node.js LTS**

  ```bash
  node -v
  npm -v
  ```

- **MongoDB**

  Use local MongoDB Community Server or MongoDB Atlas.

  ```bash
  mongod --version
  ```

- **VS Code**

- **Git** is optional, but recommended.

## Setup

1. Open the project root:

   ```bash
   cd /Users/apple/Downloads/brisklegal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the environment file:

   ```bash
   cp .env.example .env
   ```

4. Confirm `.env` contains:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/brisk_legal
   CLIENT_ORIGIN=http://localhost:5173
   ```

5. Start MongoDB.

   If installed with Homebrew on macOS:

   ```bash
   brew services start mongodb-community
   ```

   If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

6. Start the full MERN app:

   ```bash
   npm run dev
   ```

7. Open:

   ```text
   Frontend: http://localhost:5173
   Backend health check: http://localhost:5000/api/health
   ```

## Useful Commands

Run only the React frontend:

```bash
npm run client
```

Run only the Express backend:

```bash
npm run server
```

Build the React frontend:

```bash
npm run build
```

Run the backend in production mode:

```bash
npm start
```

## API

- `GET /api/health` - API health check.
- `POST /api/leads` - Create a consultation lead.
- `GET /api/leads` - List latest consultation leads.

Consultation form submissions from `/contact` are sent to `/api/leads` and stored in MongoDB.

## Supabase Auth

The Sign In and Sign Up pages use Supabase Auth for email/password and SSO.

1. Create `client/.env` from the example:

   ```bash
   cp client/.env.example client/.env
   ```

2. Add your Supabase project values:

   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. In Supabase SQL Editor, run:

   ```text
   supabase/profiles.sql
   ```

   This creates the `profiles` table, a trigger for new Auth users, and the `upsert_current_user_profile` RPC used after SSO redirects. Re-run this file whenever `profiles.sql` changes.

4. In Supabase Authentication > Providers, enable:

   - Google
   - LinkedIn OIDC
   - Azure / Microsoft

   If any SSO button returns `Unsupported provider: provider is not enabled`, that provider is still disabled or missing its client ID/client secret in Supabase. The app uses Supabase provider IDs `google`, `linkedin_oidc`, and `azure`.

5. Add this callback URL to each OAuth app:

   ```text
   https://your-project-ref.supabase.co/auth/v1/callback
   ```

6. Add your local and production site URLs in Supabase Authentication > URL Configuration.

### BriskLegal confirmation email

Supabase sends the signup confirmation email from its own email template settings. To brand it for BriskLegal:

1. Open Supabase Dashboard > Authentication > Email Templates.
2. Select `Confirm signup`.
3. Set the subject to:

   ```text
   Confirm your BriskLegal account
   ```

4. Paste the HTML from:

   ```text
   supabase/email-templates/confirm-signup.html
   ```

5. Keep `{{ .ConfirmationURL }}` in the template. Supabase replaces that variable with the real secure confirmation link.

You can also apply the same template through the Supabase Management API:

```bash
SUPABASE_ACCESS_TOKEN=your-token SUPABASE_PROJECT_REF=your-project-ref npm run supabase:email-template
```

The project ref is the first part of your Supabase URL: `https://your-project-ref.supabase.co`.
