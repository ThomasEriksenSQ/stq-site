

## Plan: Fullbredde hero i docs-stil

Legge til en profesjonell fullbredde hero-seksjon øverst — uten bakgrunnsbilde/chip — som matcher den rene docs-estetikken men gir et sterkt førsteinntrykk. Inspirert av GitHub's landingsside og Stripe docs: mørk bakgrunn (`#0d1117` — GitHub dark), stor typografi, og code-badges.

### Struktur

```text
┌─────────────────────────────────────────────────┐
│  HERO — fullbredde, mørk bg (#0d1117)           │
│  min-h-[70vh], sentrert innhold                 │
│                                                 │
│  [STACQ logo hvit]                              │
│                                                 │
│  "Embedded konsulenter for                      │
│   lavnivåprogrammering."          (stor, hvit)  │
│                                                 │
│  Undertekst i muted hvit                        │
│                                                 │
│  `C/C++` `Rust` `RTOS` `ARM` ...  (light badges)│
│                                                 │
│  [Kontakt oss]  [Les mer ↓]       (CTA-knapper)│
│                                                 │
│  ↓ subtil scroll-indikator                      │
└─────────────────────────────────────────────────┘
┌─ sticky header vises ved scroll forbi hero ─────┐
│  docs-innhold fortsetter som i dag               │
└─────────────────────────────────────────────────┘
```

### Tekniske endringer

**`src/pages/Index.tsx`:**
- Legge til hero-seksjon før `<main>`: fullbredde, `min-h-[70vh]`, `bg-[#0d1117]` (GitHub dark), flex-center
- Hvit STACQ-logo, stor heading (~40-48px), muted undertekst, code-badges i lys/transparent variant, to CTA-knapper
- Scroll-ned-indikator (ChevronDown-ikon) med subtil animasjon
- Sticky header: skjules i hero via `useEffect` + `IntersectionObserver`, vises når hero scrolles forbi
- Nåværende intro-seksjon fjernes (innholdet flyttes til hero)
- Resten av docs-innholdet beholdes uendret

**`src/index.css`:**
- Legge til `.code-badge-light` variant (hvit/transparent for mørk bakgrunn)
- Hero CTA-knappestiler

Ingen nye filer, ingen nye avhengigheter. Bruker `stacq-logo-white.png` og `lucide-react` ChevronDown.

