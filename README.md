# Apnea Trainer PWA

Progressive Web App for static apnea training and guided breathing practice.

## Setup

1. Install dependencies with `npm install`.
2. Add a `.env.local` file with:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Run `npm run dev`.

## Auth setup

This app uses Supabase email magic links.

In Supabase:

1. Go to `Authentication` -> `URL Configuration`
2. Set `Site URL` to `http://localhost:5173`
3. Add `http://localhost:5173` to redirect URLs
4. Ensure the Email provider is enabled

## Supabase schema

Apply the SQL in [supabase/schema.sql](/Users/frank/Dev/breathwork/supabase/schema.sql).
