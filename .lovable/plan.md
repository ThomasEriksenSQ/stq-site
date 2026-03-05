## Plan: STACQ Landing Page — Implementert

### Implementerte funksjoner

1. **8 bransjer** — Medisinsk teknologi, Halvleder, Energi, Forbrukerelektronikk, Forsvar, Industriell automasjon, Telekom, IoT. 4-kolonne grid på desktop.

2. **Hybrid chat** — Fast input-bar i bunnen med to moduser: "STACQ Bot" (AI-drevet med streaming) og "Snakk med oss" (simulerte svar fra Jon Richard/Thomas med avatar). Separate meldingshistorikker. Chat ekspanderer oppover.

3. **STACQ-AI med ekte AI** — Gemini 3 Flash via Lovable AI Gateway. Knowledge base i Supabase (`knowledge_base`-tabell). Edge function `chat` henter knowledge, bygger system prompt, streamer SSE-respons. Markdown-rendering av AI-svar.

4. **Konsulent-seksjon** — Under Kompetanse. Navneliste til venstre, bilde + kjernekompetanse-tags til høyre. Hover/klikk bytter aktiv konsulent med animasjon. Data fra Supabase `consultants`-tabell.

5. **Stilling ledig** — Erstatter CTA-seksjonen. "Senior Embedded Konsulent" med "Søk nå"-knapp som åpner JobApplyOverlay med stillingstekst og søknadsskjema.

6. **Profesjonell footer** — 4-kolonne mørk footer med logo+tagline, selskap-lenker, kompetanse-liste, kontaktinfo.

### Database

| Tabell | Beskrivelse |
|--------|-------------|
| `consultants` | Konsulentprofiler med kompetanser, bransjer, erfaring |
| `knowledge_base` | AI-chat knowledge base med kategorier |
| `user_roles` | Rolletabell for fremtidig CRM |

### Edge Functions

| Funksjon | Beskrivelse |
|----------|-------------|
| `chat` | Streaming AI-chat med Gemini 3 Flash, henter knowledge fra DB |

### Filstruktur

| Fil | Innhold |
|-----|---------|
| `src/pages/Index.tsx` | Landingsside med alle seksjoner |
| `src/components/FloatingChat.tsx` | Hybrid chat med AI-streaming + direktemeldinger |
| `src/components/JobApplyOverlay.tsx` | Søknadsoverlay |
| `src/components/OverlayPanel.tsx` | Mer om STACQ overlay |
| `supabase/functions/chat/index.ts` | AI chat edge function |
