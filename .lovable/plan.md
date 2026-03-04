

## Plan: Klassisk scroll-landingsside + flytende chat

Bygge ut Index.tsx fra ren split-hero til en fullverdig scrollende landingsside med dedikerte seksjoner, inspirert av skjermbildene. Chatten flyttes til en flytende widget.

### Nye seksjoner (under hero)

1. **Kompetanse** — Overskrift "Hele embedded-stacken. Fra hardware til sky.", 4x2 grid med tech-tags som kort (ikke pills), pluss beskrivende tekst under
2. **Bransjer** — Overskrift "Der koden møter den virkelige verden.", 2x2 grid med ikoner (Shield, Heart, BarChart3, Zap fra lucide), tittel og beskrivelse per bransje
3. **CTA** — Sentrert "Klar for å bygge noe som betyr noe?" med ingress og "Mer om STACQ"-knapp
4. **Footer** — Logo, adresse, org.nr, lenker

### Chat som flytende widget

Beste designløsning: Gjør chatten til en **flytende FAB (Floating Action Button)** i nedre høyre hjørne som åpner et chat-panel. Dette gir:
- Chatten er alltid tilgjengelig uansett scroll-posisjon
- Innholdet på landingssiden får puste fritt
- Kjent UX-mønster (Intercom/Drift-stil)
- Hero-seksjonen blir renere og mer fokusert

**Implementering:** En sirkulær knapp (FAB) med chat-ikon i nedre høyre hjørne. Klikk åpner TerminalChat i et flytende panel (ca 400x560px) med shadow og avrundede hjørner. Lukk med X-knapp.

### Filer som endres

| Fil | Endring |
|-----|---------|
| `src/pages/Index.tsx` | Full rewrite — fjern split-grid, legg til scrollende seksjoner (Kompetanse, Bransjer, CTA, Footer). Hero forenkles til fullbredde med logo, heading, tags, CTA. |
| `src/components/FloatingChat.tsx` | **Ny** — FAB-knapp + flytende chat-panel som wrapper rundt TerminalChat |
| `src/components/TerminalChat.tsx` | Uendret (brukes inne i FloatingChat) |

### Hero (forenklet)
Fullbredde, sentrert eller venstrejustert. Logo, heading "Embedded- og lavnivåspesialister.", GitHub-stil tags, "Mer om STACQ"-knapp. Ingen chat i hero lenger.

### Designvalg for tech-tags i Kompetanse-seksjonen
Rektangulære kort (ikke pills) med avrundede hjørner og subtil border — nøyaktig som i skjermbildene. 4 per rad, venstrejustert tekst.

