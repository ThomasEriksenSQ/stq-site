import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface HandbookOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HandbookOverlay = ({ isOpen, onClose }: HandbookOverlayProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[92%] md:w-[38%] md:min-w-[370px] bg-background border-l border-border overflow-y-auto animate-slide-in-right flex flex-col shadow-lg">
        <div className="sticky top-0 z-10 px-6 md:px-[88px] py-4 bg-background border-b border-border">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-accent hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </button>
        </div>

        <div className="px-6 md:px-[88px] py-12 space-y-8 max-w-[640px]">
          <h2 className="text-[22px] font-semibold text-foreground leading-[1.3]">
            Håndbok for STACQ
          </h2>

          <div className="space-y-3 text-foreground text-[15px] leading-[1.65]">
            <p>
              Denne håndboken er laget for å gi deg en grundig forståelse av de retningslinjene, prosedyrene og standardene som er gjeldende for alle ansatte i selskapet. Vårt overordnede mål er et arbeidsmiljø som er positivt, inkluderende og støttende, hvor hver medarbeider har mulighet til å trives og vokse.
            </p>
          </div>

          <div className="space-y-8">
            {/* Lønn */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Lønn</h3>
              <div className="space-y-3 text-foreground text-[15px] leading-[1.65]">
                <p>
                  Vi ønsker å tilby våre ansatte en lønn som er både konkurransedyktig og rettferdig, en lønn som speiler deres erfaring, kompetanse og dedikasjon.
                </p>
              </div>
              <div className="code-block space-y-3 text-[14px] leading-[1.6]">
                <div>
                  <div className="font-semibold">Provisjonslønn</div>
                  <div>70% av fakturert beløp (inkl. arbeidsgiveravgift, pensjon og feriepenger)</div>
                </div>
                <div>
                  <div className="font-semibold">Feriepenger</div>
                  <div>12% av bruttolønn, utbetalt i juni</div>
                </div>
                <div>
                  <div className="font-semibold">Arbeidstid</div>
                  <div>37,5 timer/uke, fleksibel etter avtale med kunde</div>
                </div>
              </div>
            </div>

            {/* Utstyr & utvikling */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Utstyr & utvikling</h3>
              <div className="code-block space-y-3 text-[14px] leading-[1.6]">
                <div>
                  <div className="font-semibold">PC / Mac</div>
                  <div>Tilpasset dine jobbrelaterte behov og preferanser</div>
                </div>
                <div>
                  <div className="font-semibold">Faglig utvikling</div>
                  <div>Interne opplæringsprogrammer og workshops</div>
                </div>
                <div>
                  <div className="font-semibold">Lisenser</div>
                  <div>Nødvendige verktøy + ChatGPT / AI-tjenester dekkes</div>
                </div>
                <div>
                  <div className="font-semibold">Mobil & internett</div>
                  <div>Inntil 500 kr/mnd. Ny telefon inntil 12 000 kr hvert 2. år</div>
                </div>
              </div>
            </div>

            {/* Kjerneverdier */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Våre kjerneverdier</h3>
              <div className="space-y-3 text-foreground text-[15px] leading-[1.65]">
                <p><span className="font-medium">Trygt og inkluderende</span> — Et miljø hvor alle føler seg verdsatt og akseptert. Trivsel, tillit og åpen kommunikasjon.</p>
                <p><span className="font-medium">Alltid i forkant</span> — Lidenskap for ny teknologi, metodikk og verktøy. Kunnskapsdeling og kontinuerlig forbedring.</p>
                <p><span className="font-medium">Det lille ekstra</span> — Refleksjon og deling av kunnskap og erfaring som utgjør den store forskjellen.</p>
                <p><span className="font-medium">God stemning</span> — Sunn kommunikasjon, velvære, støtte, inspirasjon, åpenhet og engasjement.</p>
              </div>
            </div>

            {/* Fravær */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Fravær</h3>
              <div className="code-block space-y-3 text-[14px] leading-[1.6]">
                <div>
                  <div className="font-semibold">Ferie</div>
                  <div>Fri ferietid — lengde og tidspunkt avtales med kunde</div>
                </div>
                <div>
                  <div className="font-semibold">Foreldrepermisjon</div>
                  <div>Kr 100 000 i gave ved fødselspermisjon + 6G fra NAV</div>
                </div>
                <div>
                  <div className="font-semibold">Sykefravær</div>
                  <div>Egenmelding inntil 4 ganger/år, 3 dager per gang. Lønn inntil 6G</div>
                </div>
                <div>
                  <div className="font-semibold">Influensavaksine</div>
                  <div>Gratis årlig influensavaksine for alle ansatte</div>
                </div>
                <div>
                  <div className="font-semibold">Militærtjeneste</div>
                  <div>Inntil 6G for én uke (37,5 timer)</div>
                </div>
              </div>
            </div>

            {/* Pensjon & forsikring */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Pensjon & forsikringer</h3>
              <div className="space-y-3 text-foreground text-[15px] leading-[1.65]">
                <p>Vi legger vekt på å sikre våre ansatte en trygg og robust økonomisk fremtid.</p>
              </div>
              <div className="code-block space-y-3 text-[14px] leading-[1.6]">
                <div>
                  <div className="font-semibold">Pensjon</div>
                  <div>6% innskuddspensjon via DNB</div>
                </div>
                <div>
                  <div className="font-semibold">Ansvarsforsikring</div>
                  <div>Dekker erstatningskrav knyttet til leveranser og oppdrag</div>
                </div>
                <div>
                  <div className="font-semibold">Yrkesskadeforsikring</div>
                  <div>Utvidet dekning ved skade eller sykdom knyttet til arbeid</div>
                </div>
                <div>
                  <div className="font-semibold">Fritidsulykke</div>
                  <div>Dekker hendelser utenfor jobb</div>
                </div>
                <div>
                  <div className="font-semibold">Helseforsikring</div>
                  <div>Raskere tilgang til medisinsk oppfølging og behandling</div>
                </div>
                <div>
                  <div className="font-semibold">Gruppeliv</div>
                  <div>Økonomisk trygghet for familie og etterlatte</div>
                </div>
                <div>
                  <div className="font-semibold">Uførepensjon</div>
                  <div>66% av pensjonsgrunnlag mellom 6G og 12G ved uførhet</div>
                </div>
              </div>
            </div>

            {/* Etikk */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Etikk & ansvar</h3>
              <div className="space-y-3 text-foreground text-[15px] leading-[1.65]">
                <p><span className="font-medium">Inkludering og mangfold</span> — Like muligheter til alle jobbsøkere, uavhengig av bakgrunn.</p>
                <p><span className="font-medium">Miljøpolicy</span> — Dedikert til miljøbeskyttelse og bærekraftighet i alle deler av virksomheten.</p>
                <p><span className="font-medium">Varsling</span> — Vi oppmuntrer aktivt til rapportering av kritikkverdige forhold.</p>
              </div>
            </div>

            {/* Oppsigelse */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Avslutning</h3>
              <div className="code-block space-y-3 text-[14px] leading-[1.6]">
                <div>
                  <div className="font-semibold">Oppsigelsestid</div>
                  <div>3 måneder, med mindre annet er avtalt skriftlig</div>
                </div>
                <div>
                  <div className="font-semibold">Sluttattest</div>
                  <div>Dokumenterer ansettelseslengde og arbeidsoppgaver</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-[88px] py-6 border-t border-border mt-auto">
          <p className="text-xs text-muted-foreground">
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389 MVA
          </p>
        </div>
      </div>
    </div>
  );
};

export default HandbookOverlay;
