# ClipForge — AI Video Clipping Landing Page

Premium pre-launch landing page for an upcoming AI-powered video clipping platform (affordable OpusClip alternative).

**Repo:** https://github.com/Aryan418-dev/clipforge

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Supabase (production waitlist) + file fallback for local
- Deploy on Vercel

## Quick deploy on Vercel

1. Open: https://vercel.com/new/clone?repository-url=https://github.com/Aryan418-dev/clipforge
2. Or: [vercel.com/new](https://vercel.com/new) → Import `Aryan418-dev/clipforge`
3. Add env vars:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `ADMIN_KEY` | Strong random secret |

4. Deploy. Claim a subdomain: `clipforge.vercel.app`, `getclipforge.vercel.app`, etc.

## Supabase setup

```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  platform text,
  niche text,
  monthly_volume text,
  biggest_challenge text,
  consent boolean default true,
  source text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

create policy "Allow public inserts"
  on public.waitlist for insert to anon with check (true);

create policy "Allow service role full access"
  on public.waitlist for all to service_role using (true);
```

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Admin: `/admin` with `ADMIN_KEY` (default `clipforge-admin-dev`).

## Notes

- Coming soon / planned features only — no fake testimonials or user counts.
- Independent product; not affiliated with Rockstar Games or OpusClip.
- Use Supabase on Vercel (file store is not persistent there).
