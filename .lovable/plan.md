## Plan: STACQ Landing Page — Implementert

### Implementerte funksjoner

1. **8 bransjer** — Medisinsk teknologi, Halvleder, Energi, Forbrukerelektronikk, Forsvar, Industriell automasjon, Telekom, IoT. 4-kolonne grid på desktop.

2. **Hybrid chat** — Fast input-bar i bunnen med to moduser: "STACQ Bot" (AI mock-svar) og "Snakk med oss" (simulerte svar fra Jon Richard med avatar). Separate meldingshistorikker. Chat ekspanderer oppover.

3. **Konsulent-seksjon** — Under Kompetanse. Navneliste til venstre, bilde + kjernekompetanse-tags til høyre. Hover/klikk bytter aktiv konsulent med animasjon.

4. **Stilling ledig** — Erstatter CTA-seksjonen. "Senior Embedded Konsulent" med "Søk nå"-knapp som åpner JobApplyOverlay med stillingstekst og søknadsskjema (navn, e-post, tlf, melding, CV-opplasting).

5. **Profesjonell footer** — 4-kolonne mørk footer med logo+tagline, selskap-lenker, kompetanse-liste, kontaktinfo. Bunnlinje med copyright og LinkedIn.

### Filstruktur

| Fil | Innhold |
|-----|---------|
| `src/pages/Index.tsx` | Landingsside med alle seksjoner |
| `src/components/FloatingChat.tsx` | Inline chat med to moduser |
| `src/components/TerminalChat.tsx` | Beholdt som referanse |
| `src/components/JobApplyOverlay.tsx` | Søknadsoverlay |
| `src/components/OverlayPanel.tsx` | Mer om STACQ overlay |
