

## Neste steg: STACQ-AI chat med ekte AI og knowledge base

### Nåsituasjon
Chatten bruker hardkodede regex-svar i `getMockBotResponse()` (FloatingChat.tsx linje 28-47). Ingen AI-modell er involvert.

### Arkitektur for ekte AI-chat

```text
┌──────────────┐     ┌──────────────────┐     ┌────────────────────┐
│  FloatingChat │────▶│  Edge Function   │────▶│  Lovable AI Gateway│
│  (frontend)   │◀────│  supabase/       │◀────│  (Gemini 3 Flash)  │
│  SSE stream   │     │  functions/chat/ │     │                    │
└──────────────┘     │                  │     └────────────────────┘
                      │  1. Henter       │
                      │     knowledge    │
                      │     fra DB       │
                      │  2. Bygger       │
                      │     system prompt│
                      │  3. Streamer svar│
                      └──────────────────┘
```

### Implementering i 3 deler

**1. Knowledge base-tabell i Supabase**

Ny tabell `knowledge_base` med kolonner:
- `id` (uuid), `category` (text), `title` (text), `content` (text), `active` (boolean), `sort_order` (int)

RLS: public read, admin write. Seed med innholdet fra de hardkodede svarene (kompetanse, stillinger, håndbok, lønn, forsikring, ferie, kontakt, bransjer).

**2. Edge function `chat`**

- Henter alle aktive rader fra `knowledge_base` ved oppstart
- Bygger et system prompt som inkluderer all knowledge som kontekst: *"Du er STACQs AI-assistent. Svar kun basert på følgende informasjon: [knowledge]"*
- Sender brukerens meldingshistorikk + system prompt til Lovable AI Gateway (google/gemini-3-flash-preview)
- Streamer SSE-respons tilbake til frontend
- Håndterer 429/402 feilkoder

LOVABLE_API_KEY er allerede tilgjengelig som secret.

**3. Oppdatere FloatingChat.tsx**

- Erstatte `getMockBotResponse()` med streaming fetch mot edge function
- Vise tokens progressivt (token-by-token rendering)
- Sende full meldingshistorikk for samtalekontekst
- Beholde suggestion chips og typing-indikator
- Fallback til mock-svar ved nettverksfeil

### Hva dette gir
- AI som kan svare naturlig på norsk basert på STACQs faktiske innhold
- Knowledge kan redigeres i Supabase (og senere via CRM admin-panel)
- Streaming for rask brukeropplevelse

