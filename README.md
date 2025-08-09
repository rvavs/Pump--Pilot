# Pump Pilot — Full App (Marketing + Supabase Auth)

## Env
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://mkahocyazmedkdvflbcn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYWhvY3lhem1lZGtkdmZsYmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NzM4MDMsImV4cCI6MjA3MDM0OTgwM30.r_QJAjrxOV9G5l05z1f4VBoWX44wtfniHDidEDPyvac
```

## Supabase
- Auth → URL config: add your domain(s) and `http://localhost:3000` (+ callback path `/auth/callback`)
- Providers: enable Email → Magic Link/OTP
- Storage: create private bucket `photos`

## Database
Run in SQL editor:
- `sql/schema.sql`
- `sql/storage_policies.sql`

## Dev
```
npm i
npm run dev
```
Landing page is `/`. Login at `/login`. After magic link you’ll land on `/app`.
