

## Plan: Moderne split-hero med AI-chat

Helt nytt design. Rent, moderne, sofistikert. Fullbredde hero med to kolonner: venstre = STACQ-info, høyre = interaktiv chat med mock AI.

### Layout

```text
┌───────────────────────────────────────────────────────────────┐
│  FULLBREDDE HERO (min-h-screen, hvit/lys bg)                  │
│                                                               │
│  ┌─── VENSTRE (45%) ─────────┐  ┌─── HØYRE (55%) ──────────┐ │
│  │                            │  │                           │ │
│  │  STACQ (logo, sort)        │  │  ┌─ Chat Panel ────────┐ │ │
│  │                            │  │  │                      │ │ │
│  │  Embedded konsulenter      │  │  │  Hei! Jeg er STACQs  │ │ │
│  │  for lavnivå-              │  │  │  assistent. Spør meg │ │ │
│  │  programmering.            │  │  │  om kompetanse,      │ │ │
│  │                            │  │  │  stillinger eller    │ │ │
│  │  Kort beskrivelse i        │  │  │  håndboken.          │ │ │
│  │  muted tekst               │  │  │                      │ │ │
│  │                            │  │  │  [Kompetanse]        │ │ │
│  │  Forsvar · Medtech ·       │  │  │  [Stillinger]        │ │ │
│  │  Industri · Energi         │  │  │  [Håndbok]           │ │ │
│  │                            │  │  │                      │ │ │
│  │  [Mer om STACQ →]          │  │  │  > bruker-input      │ │ │
│  │  [Kontakt oss]             │  │  └──────────────────────┘ │ │
│  │                            │  │                           │ │
│  └────────────────────────────┘  └───────────────────────────┘ │
│                                                               │
│  Footer: STACQ AS · Adresse · Org.nr                          │
└───────────────────────────────────────────────────────────────┘
```

Mobil: stables vertikalt (info øverst, chat under, chat får ~60vh).

### Designretning

- **Farger:** Hvit/off-white bakgrunn, sort tekst, aksent i dempet blå (#0066cc)
- **Font:** System sans-serif (Inter-aktig via Tailwind default)
- **Stil:** Apple/Linear-inspirert — masse whitespace, stor typografi, subtile shadows
- **Chat-panel:** Avrundet kort med subtil border og shadow, lys grå bakgrunn (#f9fafb)

### Tekniske endringer

**`src/index.css`** — Full rewrite:
- Fjerne ALL CRT/retro-styling (scanlines, grønn tekst, monitor-ramme)
- Sette hvit/lys fargepalett som CSS-variabler
- Rene, moderne utility-klasser
- Chat-panel-stiler

**`src/pages/Index.tsx`** — Full rewrite:
- Fullbredde `min-h-screen`, to-kolonne grid
- Venstre: STACQ logo (sort), heading, beskrivelse, domener, to CTA-knapper
- Høyre: `<TerminalChat />` komponent
- Beholde `OverlayPanel`-integrasjon med "Mer om STACQ"-knapp

**`src/components/TerminalChat.tsx`** — Ny fil:
- Moderne chat-UI i et avrundet kort
- Ved mount: velkomstmelding + 3 klikkbare hurtigvalg-chips ("Kompetanse", "Ledige stillinger", "Håndbok")
- Input-felt nederst med send-knapp
- Mock keyword-matching:
  - "kompetanse" / "teknologi" → Kompetansetabell fra COMPETENCIES
  - "stilling" / "jobb" / "karriere" → Stillingsbeskrivelse
  - "lønn" / "provisjon" → 70% provisjonsmodell fra håndboken
  - "forsikring" / "pensjon" → Forsikrings/pensjonsinfo
  - "ferie" / "permisjon" → Ferieinfo
  - "kontakt" → Kontaktinfo
  - Default → Foreslår topics
- Typewriter-effekt på AI-svar (karakter for karakter)
- Chat-historikk med scroll-to-bottom

### Filer som endres

| Fil | Endring |
|-----|---------|
| `src/index.css` | Full rewrite — moderne, lys, ren |
| `src/pages/Index.tsx` | Full rewrite — split-hero layout |
| `src/components/TerminalChat.tsx` | **Ny** — chat-komponent med mock AI |

Overlay-komponentene (`OverlayPanel.tsx`, `HandbookOverlay.tsx`) forblir uendret.

