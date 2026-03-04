

## Plan: Oppdater suggestion-chips i chatten

Endre de tre hurtigvalg-knappene i `TerminalChat.tsx` fra dagens verdier til:

- **Kjernekompetanse** (query: "kompetanse")
- **Stilling ledig** (query: "stilling")
- **Håndbok** (query: "håndbok")

### Endring

**`src/components/TerminalChat.tsx`** — Oppdater `SUGGESTIONS`-arrayet (linje 12-16):

```tsx
const SUGGESTIONS = [
  { label: "Kjernekompetanse", query: "kompetanse" },
  { label: "Stilling ledig", query: "stilling" },
  { label: "Håndbok", query: "håndbok" },
];
```

Ingen andre endringer nødvendig.

