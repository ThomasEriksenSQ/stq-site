

## Plan: Retro Terminal-Inspired Full Redesign

Transformere hele nettsiden til en retro CRT-terminal-estetikk, inspirert av det vedlagte bildet av en `man gcc` terminal med grønn fosfor-tekst på mørk bakgrunn, komplett med en CRT-monitor-ramme.

### Designretning

- **Farge:** Grønn fosfor-tekst (`#33ff00`) på nesten svart bakgrunn (`#0a0a0a`)
- **Font:** Monospace overalt — terminalestetikk
- **CRT-effekter:** Subtil scanline-overlay, svak text-shadow/glow på tekst, avrundet "monitor-ramme" rundt innholdet
- **Layout:** Alt innhold presentert som om det er i et terminalvindu — man-page-aktig struktur med `NAME`, `SYNOPSIS`, `DESCRIPTION`-seksjoner

### Sidestruktur

```text
┌─ CRT Monitor Frame (rounded corners, bezel) ─────────┐
│ ┌─ Terminal Window ─────────────────────────────────┐ │
│ │  STACQ(1)              STACQ              STACQ(1)│ │
│ │                                                    │ │
│ │  NAME                                              │ │
│ │      stacq - embedded konsulenter for              │ │
│ │      lavnivåprogrammering                          │ │
│ │                                                    │ │
│ │  SYNOPSIS                                          │ │
│ │      `C/C++` `Rust` `RTOS` `Yocto` `ARM` ...     │ │
│ │                                                    │ │
│ │  DESCRIPTION                                       │ │
│ │      STACQ er et norsk konsulentselskap ...        │ │
│ │                                                    │ │
│ │  KOMPETANSE                                        │ │
│ │      C / C++        Firmware & systemkode          │ │
│ │      Rust           Sikker lavnivåkode             │ │
│ │      ...                                           │ │
│ │                                                    │ │
│ │  DOMENER                                           │ │
│ │      Forsvar, Medtech, Industri, Energi            │ │
│ │                                                    │ │
│ │  KARRIERE                                          │ │
│ │      Vi ansetter. Se ledige stillinger.            │ │
│ │                                                    │ │
│ │  KONTAKT                                           │ │
│ │      Jon Richard Nygaard  93 287 267  jr@stacq.no  │ │
│ │      Thomas Eriksen       97 500 321  thomas@...   │ │
│ │                                                    │ │
│ │  [Mer om STACQ]                                    │ │
│ │                                                    │ │
│ │ Manual page stacq(1) line 1 (press h for help)     │ │
│ └────────────────────────────────────────────────────┘ │
│          ┌──────────────────────┐                      │
│          │    STACQ monitor     │  <- monitor base     │
│          └──────────────────────┘                      │
└────────────────────────────────────────────────────────┘
```

### Tekniske endringer

**`src/pages/Index.tsx`** — Full rewrite:
- Hele siden i en mørk bakgrunn med en CRT-monitor-ramme (CSS border-radius, bezel-gradient, monitor-stand)
- Innhold strukturert som en Unix man-page med seksjoner: `NAME`, `SYNOPSIS`, `DESCRIPTION`, `KOMPETANSE`, `DOMENER`, `KARRIERE`, `KONTAKT`
- All tekst i monospace, grønn (`#33ff00`) på mørk bakgrunn
- Statuslinje nederst i terminalen (som `man`-sidene har)
- "Mer om STACQ"-knappen beholdes og åpner eksisterende overlay
- Kontaktinfo i tabellformat, man-page-stil

**`src/index.css`** — Full rewrite av stiler:
- CRT scanline-effekt via repeating-linear-gradient overlay
- Text-shadow glow-effekt på all tekst
- Monitor-ramme med gradient bezel og stand
- Fjerne all docs-stil (code-badge, admonition, etc.)
- Beholde overlay-relaterte stiler

**Overlay beholdes** — `OverlayPanel.tsx` forblir uendret (moderne stil i kontrast til retro-hovedsiden)

### Nøkkelelementer

- CRT glow: `text-shadow: 0 0 5px rgba(51,255,0,0.6)`
- Scanlines: `background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)`
- Monitor bezel: rounded dark gray gradient border med en "stand" under
- Blinkende cursor-effekt på statuslinjen

