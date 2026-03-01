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
          <div className="max-w-[640px] w-full">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-accent hover:underline text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake
            </button>
          </div>
        </div>

        <div className="px-6 md:px-[88px] pt-20 pb-[88px] flex-1">
          <div className="max-w-[640px] w-full space-y-10">
            <h2 className="text-[34px] font-bold text-foreground leading-[1.15]">
              Håndbok for STACQ
            </h2>

            <div className="space-y-3 text-foreground text-[16px] leading-[1.7]">
              <p>
                Denne håndboken er laget for å gi deg en grundig forståelse av de retningslinjene, prosedyrene og standardene som er gjeldende for alle ansatte i selskapet. Vårt overordnede mål er å et arbeidsmiljø som er positivt, inkluderende og støttende, hvor hver medarbeider har mulighet til å trives og vokse.
              </p>
              <p>
                Innenfor håndbokens sider vil du finne detaljert informasjon om lønn, frynsegoder, pensjons- og forsikringsordninger, ferie og fraværsregler, samt andre nøkkelområder som berører ditt arbeidsforhold.
              </p>
            </div>

            <div className="space-y-10">
              {/* Lønn */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Lønn</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi ønsker å tilby våre ansatte en lønn som er både konkurransedyktig og rettferdig, en lønn som speiler deres erfaring, kompetanse og dedikasjon. Lønn er en faktor for å tiltrekke og beholde talentfulle medarbeidere, samtidig som det bidrar til et positivt og produktivt arbeidsmiljø.</p>
              </section>

              {/* Provisjonslønn */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Provisjonslønn</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi tilbyr en provisjonsbasert lønn på 70% av fakturert beløp. Dette inkluderer arbeidsgiveravgift, pensjon og dine feriepenger. Din kunnskap og erfaring spiller en direkte rolle i å bestemme din inntekt. Vi ser på dette som en drivkraft for å fremme engasjement og motivasjon, og å oppmuntre til kontinuerlig utvikling blant ansatte.</p>
              </section>

              {/* Feriepenger */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Feriepenger</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Det settes av feriepenger tilsvarende 12% av din bruttolønn hver måned. Disse blir utbetalt normalt sett i juni påfølgende år hvis ikke annet er avtalt.</p>
              </section>

              {/* Arbeidstid */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Arbeidstid</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Normal arbeidstid er 37,5 timer i uken. Din arbeidstid kan du selv styre i henhold til kundens forventinger og avtale. Du kan for eksempel starte sent en dag og jobbe det inn på ettermiddagen, eller jobbe helg en dag og ta fri en ukedag. Dette avtales individuelt med kunde.</p>
              </section>

              {/* PC eller Mac */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">PC eller Mac</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi sikrer at alle ansatte får tilgang til PC og telefon som oppfyller deres spesifikke jobbrelaterte behov og preferanser for å kunne utføre sin jobb på best mulig måte. Vanligvis skaffer oppdragsgiver dette.</p>
              </section>

              {/* Faglig utvikling */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Faglig utvikling</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi fremmer faglig utvikling og oppmuntrer våre ansatte til å tilegne seg nye ferdigheter. Ta kontakt med ledelsen når du ser behov. I tillegg tilbyr vi interne opplæringsprogrammer og workshops, designet for å styrke ansattes ferdigheter og kunnskap.</p>
              </section>

              {/* Lisenser */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Lisenser</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi dekker nødvendige lisenser for at du skal kunne utføre dine oppgaver godt. Vi dekker også lisensen av Chat GPT eller tilsvarende tjenester og det oppfordres til bruk av nye AI verktøy.</p>
              </section>

              {/* Internett og mobil */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Internett og mobil</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi dekker mobil og bredbånd abonnement inntil 500kr hver måned. Ved behov for ny telefon dekkes inntil kr 12.000 inkl. mva. hvert andre år, forutsett at den kjøpes via STACQ. Evt. overskytende trekkes fra lønnsgrunnlaget.</p>
              </section>

              {/* Kjerneverdier */}
              <section className="space-y-3">
                <h3 className="text-[20px] font-semibold text-foreground">Våre kjerneverdier</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">I STACQ er kjerneverdier viktig, de er med på å definere vår identitet og kultur. De veileder våre beslutninger, påvirker interne og eksterne valg og fremmer samhold og engasjement.</p>
              </section>

              {/* Trygt og inkluderende */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Trygt og inkluderende</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Det å føle seg trygg og inkludert er essensielt for et team, da det skaper et miljø hvor en føler seg verdsatt og akseptert. Dette fremmer trivsel, tillit og åpen kommunikasjon, noe som er nøkkelen til å yte sitt beste og oppnå personlig og felles suksess.</p>
              </section>

              {/* Alltid i forkant */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Alltid i forkant</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi omfavner forandring som noe fantastisk og det krever at vi alltid må ligge i forkant. Vår lidenskap for ny teknologi, metodikk, verktøy, tilnærminger og arbeidsmåter, sammen med glede av kunnskapsdeling og kontinuerlig forbedring skal være en del av vår hverdag.</p>
              </section>

              {/* Det lille ekstra */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Det lille ekstra</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Det handler ikke om å komme med den mest geniale løsningen raskest mulig. Behersker du det faglige handler resten om det lille ekstra som kan utgjør en stor forskjell. Refleksjon og deling av denne type kunnskap og erfaring er en del av vårt fokus.</p>
              </section>

              {/* God stemning */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">God stemning</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">God stemning handler om å skape et fantastisk arbeidsmiljø. Sunn og god kommunikasjon, fokus på velvære, støtte hverandre, inspirere, åpenhet, glede i å dele kunnskap og vise engasjement og kreativitet. Vi mener god stemning er essensielt for vekst, personlig og sammen som en enhet.</p>
              </section>

              {/* Fravær */}
              <section className="space-y-3">
                <h3 className="text-[20px] font-semibold text-foreground">Fravær</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Det vil til tider være nødvendig å ta fri fra arbeidet av ulike årsaker, som sykdom, ferie, eller personlige forhold. For å hjelpe deg med å navigere i disse situasjonene, inneholder vår oversikt detaljert informasjon om de forskjellige typer fravær du kan oppleve, herunder sykefravær, ferieavvikling og ulike permisjonsordninger.</p>
              </section>

              {/* Ferietid */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Ferietid</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Du står fritt til å ta så mye ferie du ønsker og når du ønsker det. Alt som kreves er at lengde og tidspunkt er avtalt og godkjent av kunden du er i oppdrag hos.</p>
              </section>

              {/* Foreldrepermisjon */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Foreldrepermisjon</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">STACQ gir deg kr 100.000, - i gave ved inngangen til fødselspermisjonen, i tillegg til 6G som NAV vil dekke i perioden, som sikrer deg en god start og stabil inntekt i perioden. Etter foreldrepermisjonen er det viktig for oss å legge til rette for en smidig overgang tilbake til arbeidslivet. Vi vil jobbe tett sammen med deg for å tilpasse arbeidssituasjonen din, slik at den harmonerer godt med ditt familieliv, og sikrer en balanse som gagner både deg og din familie.</p>
              </section>

              {/* Sykefravær og egenmelding */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Sykefravær og egenmelding</h3>
                <div className="space-y-3 text-foreground text-[16px] leading-[1.7]">
                  <p>Vi oppfordrer deg til å informere ledelsen umiddelbart dersom du føler deg syk. Du kan benytte egenmelding inntil 4 ganger per kalenderår, med en varighet på inntil 3 dager per.</p>
                  <p>Ved sykefravær utover dette er legeerklæring (sykmelding) nødvendig. Ved egenmelding og sykmeldt fravær utbetales lønn tilsvarende 6G.</p>
                </div>
              </section>

              {/* Influensavaksine */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Influensavaksine</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Hos STACQ er helse og velvære viktig. Vi forstår risikoen for influensa som konsulenter og tilbyr derfor gratis årlige influensavaksiner til alle ansatte for å beskytte helsen deres.</p>
              </section>

              {/* Militærtjeneste */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Militærtjeneste</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Dersom du blir innkalt til obligatorisk militærtjeneste, sørger vi for økonomisk støtte ved å dekke inntil 6G for én uke, tilsvarende 37,5 timer.</p>
              </section>

              {/* Pensjon og forsikringer */}
              <section className="space-y-3">
                <h3 className="text-[20px] font-semibold text-foreground">Pensjon og forsikringer</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">I STACQ legger vi vekt på å sikre våre ansatte en trygg og robust økonomisk fremtid. Vi forstår viktigheten av pensjons- og forsikringsordninger som nøkkelkomponenter for økonomisk stabilitet og sikkerhet. Derfor har vi forpliktet oss til å tilby våre ansatte solide og fordelaktige ordninger på disse områdene.</p>
              </section>

              {/* Pensjon på 6% */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Pensjon på 6%</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">DNB administrerer pensjonsordningene våre, og vi er forpliktet til å holde deg godt informert om dine pensjonsfordeler og de ulike alternativene du har. Pensjonssatsen er satt til 6 % innskuddspensjon av lønn.</p>
              </section>

              {/* Ansvarsforsikring */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Ansvarsforsikring</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">En profesjonell arbeidshverdag innebærer at det kan oppstå ansvarssituasjoner. Denne forsikringen bidrar til trygghet rundt utførelsen av arbeid ved at selskapet er dekket ved eventuelle erstatningskrav knyttet til leveranser og oppdrag.</p>
              </section>

              {/* Yrkesskadeforsikring */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Yrkesskadeforsikring</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Dette gir en svært trygg ramme rundt arbeidshverdagen og dekningen hvis det oppstår skade eller sykdom knyttet til arbeid, med utvidelser utover det grunnleggende. Formålet er at ansatte skal være godt ivaretatt dersom noe uforutsett skjer i jobbsammenheng.</p>
              </section>

              {/* Fritidsulykke forsikring */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Fritidsulykke forsikring</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Tryggheten stopper ikke når arbeidsdagen er over. Fritidsulykke dekker hendelser som skjer utenfor jobb og gir en ekstra sikkerhet i hverdagen — nettopp fordi de fleste uhell ofte skjer på fritiden.</p>
              </section>

              {/* Helseforsikring */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Helseforsikring</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Helse-/behandlingsforsikringen er en viktig del av trygghetspakken og den legger til rette for raskere tilgang til medisinsk oppfølging og behandling når det trengs. Dette er en ordning som både støtter den enkelte og bidrar til kortere tid borte fra jobb ved helseutfordringer.</p>
              </section>

              {/* Gruppeliv forsikring */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Gruppeliv forsikring</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Gruppeliv gir en viktig økonomisk trygghet for familie og etterlatte ved bortfall. Det er en tydelig del av et helhetlig sikkerhetsnett som viser omsorg for ansatte og deres nærmeste.</p>
              </section>

              {/* Uførepensjon */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Uførepensjon</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Uførepensjon er en sentral del av tryggheten ved alvorlig sykdom eller skade som fører til redusert arbeidsevne. Uførepensjonen gir årlig utbetaling ved uførhet frem til 67 år, og inkluderer blant annet 66 % av pensjonsgrunnlaget mellom 6G og 12G. Dette kommer i tillegg til offentlige ytelser fra NAV. Samlet gir dette en svært solid økonomisk sikkerhet og et ekstra lag av forutsigbarhet i en situasjon hvor det betyr mest. Forsikringer som sikrer deg mot økonomiske bekymringer i tilfelle skade eller sykdom skulle oppstå.</p>
              </section>

              {/* Etikk og ansvar */}
              <section className="space-y-3">
                <h3 className="text-[20px] font-semibold text-foreground">Etikk og ansvar</h3>
              </section>

              {/* Inkludering og mangfold */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Inkludering og mangfold</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Fremme av mangfold og likestilling i arbeidslivet er en sentral samfunnsoppgave. Vi er engasjert i å berike det norske arbeidslivet med mangfold og arbeider aktivt for å sikre dette gjennom våre rekrutterings- og inkluderingsstrategier. Dette innebærer at vi, i våre ansettelsesprosesser, er dedikert til å tilby like muligheter til alle jobbsøkere, uavhengig av deres kulturelle bakgrunn, funksjonsevne eller seksuell orientering, for å skape et mer inkluderende og mangfoldig arbeidsmiljø.</p>
              </section>

              {/* Miljøpolicy */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Miljøpolicy</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">STACQ er dedikert til miljøbeskyttelse og til å fremme bærekraftighet i alle deler av vår virksomhet. Vi er bevisste på at våre aktiviteter påvirker miljøet og forplikter oss til å redusere denne påvirkningen ved stadig å forbedre våre miljømessige ytelsesstandarder.</p>
              </section>

              {/* Kritikkverdige forhold */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Kritikkverdige forhold</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Kritikkverdige forhold strider mot juridiske regler, våre skriftlige etiske retningslinjer, eller allment aksepterte etiske normer i samfunnet. Eksempler på dette kan være situasjoner som truer liv og helse, skader klimaet eller miljøet, involverer korrupsjon eller annen økonomisk kriminalitet, misbruk av myndighet, et uforsvarlig arbeidsmiljø, eller brudd på personopplysningssikkerheten.</p>
              </section>

              {/* Retningslinjer for rapportering */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Retningslinjer for rapportering</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Vi oppmuntrer aktivt alle våre ansatte til å rapportere slike kritikkverdige forhold. Når vi håndterer varslingssaker, skal konfidensialitet, habilitet og retten til kontradiksjon alltid være ledende prinsipper for å sikre en rettferdig og ansvarlig prosess i vår virksomhet.</p>
              </section>

              {/* Oppsigelsestid */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Oppsigelsestid</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Din oppsigelsestid er på tre måneder, med mindre en annen avtale er nedfelt skriftlig. Denne perioden er etablert for å gi både deg og oss tilstrekkelig tid til å forberede og tilpasse oss overgangen.</p>
              </section>

              {/* Sluttattest */}
              <section className="space-y-3">
                <h3 className="text-[18px] font-semibold text-foreground">Sluttattest</h3>
                <p className="text-foreground text-[16px] leading-[1.7]">Ved avslutning av arbeidsforholdet vil du motta en sluttattest fra oss. Denne attesten vil dokumentere lengden på din ansettelse og detaljert beskrive de arbeidsoppgavene du har utført.</p>
              </section>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-[88px] py-6 border-t border-border mt-auto">
          <div className="max-w-[640px] w-full">
            <p className="text-[13px] text-muted-foreground">
              STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389 MVA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandbookOverlay;
