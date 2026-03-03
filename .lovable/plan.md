

## Plan: Scrollbar-side med seksjoner

Gjøre om `Index.tsx` fra en enkeltsides fullscreen hero til en klassisk scroll-side med distinkte seksjoner nedover. Overlayet beholdes som det er.

### Struktur (top-down)

```text
┌─────────────────────────────────┐
│  HERO (100vh, som i dag)        │
│  Bakgrunnsbilde + tittel + tags │
│  + "Mer om STACQ"-knapp        │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  OM STACQ                       │
│  Hvit bg, intro-tekst           │
│  (lignende overlay-intro)       │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  KOMPETANSE / TJENESTER         │
│  Teknologier og hva vi leverer  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  DOMENER                        │
│  Forsvar · Medtech · Industri · │
│  Energi                         │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  KARRIERE                       │
│  Rekrutteringstekst + CTA       │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  KONTAKT                        │
│  Kontaktkort (Jon Richard,      │
│  Thomas) + footer               │
└─────────────────────────────────┘
```

### Teknisk tilnærming

1. **`src/pages/Index.tsx`** — Utvide fra en `min-h-screen` hero-container til en scrollbar wrapper:
   - Hero forblir `h-screen` med nåværende bakgrunn og innhold
   - Fem nye seksjoner under hero, hver med generøs vertikal padding (`py-24 md:py-32`)
   - Innhold sentrert i `max-w-[880px] mx-auto` for å matche hero-bredden
   - Scroll-triggered fade-in-animasjoner via framer-motion `whileInView`
   - Hvit bakgrunn på seksjonene, vekslende med subtil grå (`#f5f5f7`) på annenhver

2. **Innhold** flyttes/dupliseres fra overlayet der det gir mening:
   - Om-tekst, domener, karriere-CTA og kontaktkort gjenbrukes
   - Kompetanse-seksjon er ny (basert på tag-lista i hero: C/C++, Rust, Firmware, etc.)

3. **Overlay beholdes** uendret — "Mer om STACQ"-knappen fungerer som før

4. **Ingen nye filer** — alt skjer i `Index.tsx` med eksisterende assets og komponenter

