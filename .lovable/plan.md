

## Plan: Developer Documentation-Style Redesign

Transformere hele siten fra Apple-inspirert markedsføringsside til en GitHub/developer docs-estetikk som embedded-utviklere kjenner igjen.

### Designretning

Tenk GitHub docs, Stripe docs, Rust book -- flat, lesbar, monospace-aksenter, tydelig hierarki med border-basert separasjon i stedet for skygger og rounded cards.

### Viktige designgrep

**Farger og bakgrunn:**
- Hvit bakgrunn (`#fff`) med subtil grå border (`#d0d7de`) som primær separasjon
- Fjerne vekslende `#f5f5f7`-seksjoner -- bruk heller `border-bottom` mellom seksjoner
- Kode/monospace-elementer i lys grå bg (`#f6f8fa`) med 1px border
- Lenkefarger i blått (`#0969da`) -- GitHub-stil

**Typografi:**
- Fjerne Apple-store fontstørrelser (72px, 40px etc)
- H1: ~32px, H2: ~24px, H3: ~18px -- tettere, mer docs-aktig
- Brødtekst: 16px med god line-height (1.7)
- Monospace-font for tekniske termer og tags
- Fjerne fancy tracking og letter-spacing

**Layout:**
- Smalere innholdskolonne: `max-w-[768px]` (som en README)
- Fjerne fullscreen hero -- erstatt med en enkel header med logo + tittel
- Flat, minimal header i stedet for hero med bakgrunnsbilde
- Innhold starter umiddelbart, ingen "scroll to discover"

### Ny sidestruktur

```text
┌──────────────────────────────────────┐
│ STACQ logo          [Kontakt]        │  <- Enkel sticky header
├──────────────────────────────────────┤
│                                      │
│ # STACQ                             │
│ Embedded konsulenter for lavnivå-   │
│ programmering.                       │
│                                      │
│ `C/C++` `Rust` `RTOS` `Yocto` ...  │  <- monospace code badges
│                                      │
├─ border ─────────────────────────────┤
│                                      │
│ ## Om oss                           │
│ Prosa om selskapet, rett på sak.    │
│                                      │
├─ border ─────────────────────────────┤
│                                      │
│ ## Kompetanse                        │
│ Tabell eller liste med teknologier  │
│ i docs-stil (ikke fancy grid)       │
│                                      │
├─ border ─────────────────────────────┤
│                                      │
│ ## Domener                          │
│ Forsvar · Medtech · Industri · ...  │
│                                      │
├─ border ─────────────────────────────┤
│                                      │
│ ## Karriere                         │
│ Enkel callout-boks (GitHub-style    │
│ note/tip admonition)                │
│                                      │
├─ border ─────────────────────────────┤
│                                      │
│ ## Kontakt                          │
│ Flat kontaktkort uten hover-effekter│
│                                      │
├──────────────────────────────────────┤
│ Footer · org.nr · adresse           │
└──────────────────────────────────────┘
```

### Tekniske endringer

1. **`src/pages/Index.tsx`** -- Full rewrite:
   - Fjerne fullscreen hero med bakgrunnsbilde
   - Legge til enkel sticky header med logo + nav-lenke
   - Alle seksjoner i en flat `max-w-[768px]` kolonne, separert med `border-b`
   - Tags som `inline-code` badges med monospace font og grå bakgrunn
   - Kompetanse som en ren tabell (`<table>`) eller definisjonsliste i stedet for grid-kort
   - Domener som enkel liste med korte beskrivelser
   - Karriere i en GitHub-style "Note" admonition-boks (blå venstre-border)
   - Kontaktkort: flat, uten skygge/hover-lift, med enkel border
   - Fjerne framer-motion animasjoner (docs scroller ikke inn fancy)

2. **`src/index.css`** -- Oppdatere base-stiler:
   - Justere CSS-variabler for docs-estetikk
   - Legge til stiler for admonition-bokser og code-badges

3. **`src/components/OverlayPanel.tsx`** -- Beholdes som den er (overlay fungerer fortsatt fra "Mer om STACQ"-knapp, men vi kan vurdere om den trengs)

### Eksempler på nøkkelelementer

**Code badges (tags):**
```tsx
<code className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-[#f6f8fa] border border-[#d0d7de] text-[#1f2328]">
  C / C++
</code>
```

**Karriere admonition:**
```tsx
<div className="border-l-4 border-[#0969da] bg-[#ddf4ff] p-4 rounded-r">
  <p className="font-semibold text-[#1f2328]">Vi ansetter</p>
  <p>...</p>
</div>
```

**Kompetanse-tabell:**
```tsx
<table className="w-full text-left border-collapse">
  <thead><tr className="border-b"><th>Teknologi</th><th>Område</th></tr></thead>
  <tbody>
    <tr className="border-b"><td><code>C / C++</code></td><td>Firmware & systemkode</td></tr>
    ...
  </tbody>
</table>
```

