

## Plan: Minimal Supabase-oppsett for nettside + fremtidig CRM

### Hva som opprettes nå

Kun det nettsiden faktisk trenger, pluss minimalt fundament for fremtidig CRM:

**1. Database-tabeller (migration)**

- **`consultants`** — Konsulentdata som vises på nettsiden
  - `id` (uuid, PK), `name` (text), `title` (text), `image_url` (text, nullable), `competences` (text[]), `industries` (text[]), `experience_years` (int), `location` (text), `description` (text), `sort_order` (int), `active` (boolean, default true)

- **`user_roles`** — Rolletabell for fremtidig CRM-tilgang
  - `id` (uuid, PK), `user_id` (uuid, FK auth.users), `role` (app_role enum: admin/user)
  - `has_role()` security definer-funksjon

**2. RLS-policies**

- `consultants`: Alle kan lese (`anon` + `authenticated`). Kun admin kan skrive (via `has_role()`).

**3. Storage**

- Public bucket `consultant-images` for profilbilder

**4. Seed data**

- Migrere de 11 hardkodede konsulentene fra `Index.tsx` til `consultants`-tabellen (via insert tool)
- Laste opp eksisterende profilbilder til Storage-bucketen

**5. Kode-endringer**

- Oppdatere `Index.tsx` til å hente konsulenter fra Supabase med `useQuery`
- Beholde hardkodede `COMPETENCE_GROUPS`, `DOMAINS`, `TECH_TAGS` (lite data, sjelden endring — kan flyttes til DB senere)
- Beholde hardkodede AI-bot-svar (kan flyttes til `knowledge_base`-tabell senere)

### Hva som IKKE implementeres nå

- `knowledge_base`-tabell (AI-bot)
- `competences`-tabell (statisk data foreløpig)
- CRM-tabeller (`customers`, `projects`, `engagements`, `profiles`)
- Autentisering (ikke nødvendig for nettsiden)

### Implementeringsrekkefølge

1. Kjør migration: opprett `app_role` enum, `consultants`-tabell, `user_roles`-tabell, `has_role()`-funksjon, RLS-policies
2. Opprett `consultant-images` Storage-bucket
3. Insert konsulentdata fra hardkodede verdier
4. Oppdater `Index.tsx`: hent fra Supabase, fallback til hardkodet data ved feil

