

## Samlet plan: Alle uimplementerte funksjoner

Her er alt vi har diskutert og godkjent som fortsatt ikke er bygget:

### 1. Oppdater bransjer til 8 domener
**Status:** DOMAINS-arrayet har fortsatt bare 4 bransjer. Skal utvides til 8:
- Medisinsk teknologi, Halvleder og chip-utvikling, Energi og elektrisk mobilitet, Forbrukerelektronikk, Forsvar og sikkerhetskritiske systemer, Industriell automasjon, Telekom og kommunikasjon, IoT og smarte enheter
- Grid endres til `lg:grid-cols-4` for 2 rader à 4
- Nye ikoner: `Radio`, `Smartphone`, `CircuitBoard`, `Wifi`

### 2. Hybrid chat med to moduser + inline input
**Status:** Chatten er fortsatt en FAB med kun AI-modus. Skal endres til:
- **Fjern FAB** — erstatt med fast input-bar i bunnen av skjermen
- **To synlige tabs:** "STACQ Bot" og "Snakk med oss"
- Bot-modus: fungerer som i dag med AI mock-svar
- Human-modus: simulerte Slack-svar fra "Jon Richard" med avatar og 3-5s delay
- Separate meldingshistorikker per modus
- Input alltid synlig — chat ekspanderer oppover ved bruk

### 3. Konsulent-seksjon under Kompetanse
**Status:** Ikke implementert. Ny seksjon med:
- Navneliste til venstre (Jon Richard Nygaard, Thomas Eriksen)
- Bilde + kjernekompetanse til høyre
- Hover/klikk bytter aktiv konsulent med animasjon

### 4. "Stilling ledig"-seksjon + søknadsoverlay
**Status:** CTA-seksjonen er uendret. Skal erstattes med:
- "Vi ansetter — Senior Embedded Konsulent"-seksjon
- "Søk nå"-knapp som åpner JobApplyOverlay
- Overlay med stillingstekst + søknadsskjema (navn, e-post, tlf, melding, CV-opplasting)

### 5. Profesjonell footer
**Status:** Footeren er fortsatt minimal. Skal erstattes med:
- 4-kolonne grid: Logo+tagline, Selskap-lenker, Kompetanse-lenker, Kontakt-info
- Bunnlinje med copyright, org.nr, LinkedIn
- Mørk stil (`bg-foreground text-background`)

### 6. Oppdater plan.md
Oppdater `.lovable/plan.md` til å reflektere alle disse endringene.

### Filer som endres

| Fil | Endring |
|-----|---------|
| `src/pages/Index.tsx` | Oppdater DOMAINS (8 stk), legg til konsulent-seksjon, erstatt CTA med stilling ledig, ny footer |
| `src/components/FloatingChat.tsx` | Rewrite: inline input-bar med to modus-tabs |
| `src/components/TerminalChat.tsx` | Legg til `mode` prop, human-modus med mock Slack-svar |
| `src/components/JobApplyOverlay.tsx` | Ny — søknadsoverlay med skjema |
| `.lovable/plan.md` | Oppdater til å reflektere all ny funksjonalitet |

