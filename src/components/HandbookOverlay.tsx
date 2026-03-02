import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HandbookOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const slideSecondary = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring" as const, damping: 28, stiffness: 280, mass: 0.8 } },
  exit: { x: "100%", transition: { type: "spring" as const, damping: 35, stiffness: 400, mass: 0.6 } },
};

const fadeBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const staggerContent = {
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
};

const fadeUpItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const HandbookOverlay = ({ isOpen, onClose }: HandbookOverlayProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const sections = [
    { title: "Lønn", size: "h3", content: "Vi ønsker å tilby våre ansatte en lønn som er både konkurransedyktig og rettferdig, en lønn som speiler deres erfaring, kompetanse og dedikasjon. Lønn er en faktor for å tiltrekke og beholde talentfulle medarbeidere, samtidig som det bidrar til et positivt og produktivt arbeidsmiljø." },
    { title: "Provisjonslønn", size: "h3", content: "Vi tilbyr en provisjonsbasert lønn på 70% av fakturert beløp. Dette inkluderer arbeidsgiveravgift, pensjon og dine feriepenger. Din kunnskap og erfaring spiller en direkte rolle i å bestemme din inntekt. Vi ser på dette som en drivkraft for å fremme engasjement og motivasjon, og å oppmuntre til kontinuerlig utvikling blant ansatte." },
    { title: "Feriepenger", size: "h3", content: "Det settes av feriepenger tilsvarende 12% av din bruttolønn hver måned. Disse blir utbetalt normalt sett i juni påfølgende år hvis ikke annet er avtalt." },
    { title: "Arbeidstid", size: "h3", content: "Normal arbeidstid er 37,5 timer i uken. Din arbeidstid kan du selv styre i henhold til kundens forventinger og avtale. Du kan for eksempel starte sent en dag og jobbe det inn på ettermiddagen, eller jobbe helg en dag og ta fri en ukedag. Dette avtales individuelt med kunde." },
    { title: "PC eller Mac", size: "h3", content: "Vi sikrer at alle ansatte får tilgang til PC og telefon som oppfyller deres spesifikke jobbrelaterte behov og preferanser for å kunne utføre sin jobb på best mulig måte. Vanligvis skaffer oppdragsgiver dette." },
    { title: "Faglig utvikling", size: "h3", content: "Vi fremmer faglig utvikling og oppmuntrer våre ansatte til å tilegne seg nye ferdigheter. Ta kontakt med ledelsen når du ser behov. I tillegg tilbyr vi interne opplæringsprogrammer og workshops, designet for å styrke ansattes ferdigheter og kunnskap." },
    { title: "Lisenser", size: "h3", content: "Vi dekker nødvendige lisenser for at du skal kunne utføre dine oppgaver godt. Vi dekker også lisensen av Chat GPT eller tilsvarende tjenester og det oppfordres til bruk av nye AI verktøy." },
    { title: "Internett og mobil", size: "h3", content: "Vi dekker mobil og bredbånd abonnement inntil 500kr hver måned. Ved behov for ny telefon dekkes inntil kr 12.000 inkl. mva. hvert andre år, forutsett at den kjøpes via STACQ. Evt. overskytende trekkes fra lønnsgrunnlaget." },
    { title: "Våre kjerneverdier", size: "h2", content: "I STACQ er kjerneverdier viktig, de er med på å definere vår identitet og kultur. De veileder våre beslutninger, påvirker interne og eksterne valg og fremmer samhold og engasjement." },
    { title: "Trygt og inkluderende", size: "h3", content: "Det å føle seg trygg og inkludert er essensielt for et team, da det skaper et miljø hvor en føler seg verdsatt og akseptert. Dette fremmer trivsel, tillit og åpen kommunikasjon, noe som er nøkkelen til å yte sitt beste og oppnå personlig og felles suksess." },
    { title: "Alltid i forkant", size: "h3", content: "Vi omfavner forandring som noe fantastisk og det krever at vi alltid må ligge i forkant. Vår lidenskap for ny teknologi, metodikk, verktøy, tilnærminger og arbeidsmåter, sammen med glede av kunnskapsdeling og kontinuerlig forbedring skal være en del av vår hverdag." },
    { title: "Det lille ekstra", size: "h3", content: "Det handler ikke om å komme med den mest geniale løsningen raskest mulig. Behersker du det faglige handler resten om det lille ekstra som kan utgjør en stor forskjell. Refleksjon og deling av denne type kunnskap og erfaring er en del av vårt fokus." },
    { title: "God stemning", size: "h3", content: "God stemning handler om å skape et fantastisk arbeidsmiljø. Sunn og god kommunikasjon, fokus på velvære, støtte hverandre, inspirere, åpenhet, glede i å dele kunnskap og vise engasjement og kreativitet. Vi mener god stemning er essensielt for vekst, personlig og sammen som en enhet." },
    { title: "Fravær", size: "h2", content: "Det vil til tider være nødvendig å ta fri fra arbeidet av ulike årsaker, som sykdom, ferie, eller personlige forhold. For å hjelpe deg med å navigere i disse situasjonene, inneholder vår oversikt detaljert informasjon om de forskjellige typer fravær du kan oppleve, herunder sykefravær, ferieavvikling og ulike permisjonsordninger." },
    { title: "Ferietid", size: "h3", content: "Du står fritt til å ta så mye ferie du ønsker og når du ønsker det. Alt som kreves er at lengde og tidspunkt er avtalt og godkjent av kunden du er i oppdrag hos." },
    { title: "Foreldrepermisjon", size: "h3", content: "STACQ gir deg kr 100.000, - i gave ved inngangen til fødselspermisjonen, i tillegg til 6G som NAV vil dekke i perioden, som sikrer deg en god start og stabil inntekt i perioden. Etter foreldrepermisjonen er det viktig for oss å legge til rette for en smidig overgang tilbake til arbeidslivet. Vi vil jobbe tett sammen med deg for å tilpasse arbeidssituasjonen din, slik at den harmonerer godt med ditt familieliv, og sikrer en balanse som gagner både deg og din familie." },
    { title: "Sykefravær og egenmelding", size: "h3", content: ["Vi oppfordrer deg til å informere ledelsen umiddelbart dersom du føler deg syk. Du kan benytte egenmelding inntil 4 ganger per kalenderår, med en varighet på inntil 3 dager per.", "Ved sykefravær utover dette er legeerklæring (sykmelding) nødvendig. Ved egenmelding og sykmeldt fravær utbetales lønn tilsvarende 6G."] },
    { title: "Influensavaksine", size: "h3", content: "Hos STACQ er helse og velvære viktig. Vi forstår risikoen for influensa som konsulenter og tilbyr derfor gratis årlige influensavaksiner til alle ansatte for å beskytte helsen deres." },
    { title: "Militærtjeneste", size: "h3", content: "Dersom du blir innkalt til obligatorisk militærtjeneste, sørger vi for økonomisk støtte ved å dekke inntil 6G for én uke, tilsvarende 37,5 timer." },
    { title: "Pensjon og forsikringer", size: "h2", content: "I STACQ legger vi vekt på å sikre våre ansatte en trygg og robust økonomisk fremtid. Vi forstår viktigheten av pensjons- og forsikringsordninger som nøkkelkomponenter for økonomisk stabilitet og sikkerhet. Derfor har vi forpliktet oss til å tilby våre ansatte solide og fordelaktige ordninger på disse områdene." },
    { title: "Pensjon på 6%", size: "h3", content: "DNB administrerer pensjonsordningene våre, og vi er forpliktet til å holde deg godt informert om dine pensjonsfordeler og de ulike alternativene du har. Pensjonssatsen er satt til 6 % innskuddspensjon av lønn." },
    { title: "Ansvarsforsikring", size: "h3", content: "En profesjonell arbeidshverdag innebærer at det kan oppstå ansvarssituasjoner. Denne forsikringen bidrar til trygghet rundt utførelsen av arbeid ved at selskapet er dekket ved eventuelle erstatningskrav knyttet til leveranser og oppdrag." },
    { title: "Yrkesskadeforsikring", size: "h3", content: "Dette gir en svært trygg ramme rundt arbeidshverdagen og dekningen hvis det oppstår skade eller sykdom knyttet til arbeid, med utvidelser utover det grunnleggende. Formålet er at ansatte skal være godt ivaretatt dersom noe uforutsett skjer i jobbsammenheng." },
    { title: "Fritidsulykke forsikring", size: "h3", content: "Tryggheten stopper ikke når arbeidsdagen er over. Fritidsulykke dekker hendelser som skjer utenfor jobb og gir en ekstra sikkerhet i hverdagen — nettopp fordi de fleste uhell ofte skjer på fritiden." },
    { title: "Helseforsikring", size: "h3", content: "Helse-/behandlingsforsikringen er en viktig del av trygghetspakken og den legger til rette for raskere tilgang til medisinsk oppfølging og behandling når det trengs. Dette er en ordning som både støtter den enkelte og bidrar til kortere tid borte fra jobb ved helseutfordringer." },
    { title: "Gruppeliv forsikring", size: "h3", content: "Gruppeliv gir en viktig økonomisk trygghet for familie og etterlatte ved bortfall. Det er en tydelig del av et helhetlig sikkerhetsnett som viser omsorg for ansatte og deres nærmeste." },
    { title: "Uførepensjon", size: "h3", content: "Uførepensjon er en sentral del av tryggheten ved alvorlig sykdom eller skade som fører til redusert arbeidsevne. Uførepensjonen gir årlig utbetaling ved uførhet frem til 67 år, og inkluderer blant annet 66 % av pensjonsgrunnlaget mellom 6G og 12G. Dette kommer i tillegg til offentlige ytelser fra NAV. Samlet gir dette en svært solid økonomisk sikkerhet og et ekstra lag av forutsigbarhet i en situasjon hvor det betyr mest. Forsikringer som sikrer deg mot økonomiske bekymringer i tilfelle skade eller sykdom skulle oppstå." },
    { title: "Etikk og ansvar", size: "h2", content: "" },
    { title: "Inkludering og mangfold", size: "h3", content: "Fremme av mangfold og likestilling i arbeidslivet er en sentral samfunnsoppgave. Vi er engasjert i å berike det norske arbeidslivet med mangfold og arbeider aktivt for å sikre dette gjennom våre rekrutterings- og inkluderingsstrategier. Dette innebærer at vi, i våre ansettelsesprosesser, er dedikert til å tilby like muligheter til alle jobbsøkere, uavhengig av deres kulturelle bakgrunn, funksjonsevne eller seksuell orientering, for å skape et mer inkluderende og mangfoldig arbeidsmiljø." },
    { title: "Miljøpolicy", size: "h3", content: "STACQ er dedikert til miljøbeskyttelse og til å fremme bærekraftighet i alle deler av vår virksomhet. Vi er bevisste på at våre aktiviteter påvirker miljøet og forplikter oss til å redusere denne påvirkningen ved stadig å forbedre våre miljømessige ytelsesstandarder." },
    { title: "Kritikkverdige forhold", size: "h3", content: "Kritikkverdige forhold strider mot juridiske regler, våre skriftlige etiske retningslinjer, eller allment aksepterte etiske normer i samfunnet. Eksempler på dette kan være situasjoner som truer liv og helse, skader klimaet eller miljøet, involverer korrupsjon eller annen økonomisk kriminalitet, misbruk av myndighet, et uforsvarlig arbeidsmiljø, eller brudd på personopplysningssikkerheten." },
    { title: "Retningslinjer for rapportering", size: "h3", content: "Vi oppmuntrer aktivt alle våre ansatte til å rapportere slike kritikkverdige forhold. Når vi håndterer varslingssaker, skal konfidensialitet, habilitet og retten til kontradiksjon alltid være ledende prinsipper for å sikre en rettferdig og ansvarlig prosess i vår virksomhet." },
    { title: "Oppsigelsestid", size: "h3", content: "Din oppsigelsestid er på tre måneder, med mindre en annen avtale er nedfelt skriftlig. Denne perioden er etablert for å gi både deg og oss tilstrekkelig tid til å forberede og tilpasse oss overgangen." },
    { title: "Sluttattest", size: "h3", content: "Ved avslutning av arbeidsforholdet vil du motta en sluttattest fra oss. Denne attesten vil dokumentere lengden på din ansettelse og detaljert beskrive de arbeidsoppgavene du har utført." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div {...fadeBackdrop} className="absolute inset-0" onClick={onClose} />
          <motion.div
            {...slideSecondary}
            className="absolute right-0 top-0 h-full w-[92%] md:w-[45%] md:min-w-[370px] bg-background border-l border-border overflow-y-auto flex flex-col shadow-lg"
          >
            <div className="sticky top-0 z-10 px-6 md:px-[88px] py-4 bg-background border-b border-border">
              <div className="max-w-[640px] w-full">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-accent hover:underline text-[13px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Tilbake
                </button>
              </div>
            </div>

            <motion.div className="px-6 md:px-[88px] pt-20 pb-[88px] flex-1" variants={staggerContent} initial="initial" animate="animate">
              <div className="max-w-[640px] w-full space-y-10">
                <motion.h2 variants={fadeUpItem} className="text-[38px] font-bold text-foreground leading-[1.15]">
                  Håndbok for STACQ
                </motion.h2>

                <motion.div variants={fadeUpItem} className="space-y-3 text-foreground text-[18px] leading-[1.7]">
                  <p>
                    Denne håndboken er laget for å gi deg en grundig forståelse av de retningslinjene, prosedyrene og standardene som er gjeldende for alle ansatte i selskapet. Vårt overordnede mål er å et arbeidsmiljø som er positivt, inkluderende og støttende, hvor hver medarbeider har mulighet til å trives og vokse.
                  </p>
                  <p>
                    Innenfor håndbokens sider vil du finne detaljert informasjon om lønn, frynsegoder, pensjons- og forsikringsordninger, ferie og fraværsregler, samt andre nøkkelområder som berører ditt arbeidsforhold.
                  </p>
                </motion.div>

                <div className="space-y-10">
                  {sections.map((section) => (
                    <motion.section key={section.title} variants={fadeUpItem} className="space-y-3">
                      <h3 className={`${section.size === "h2" ? "text-[26px]" : "text-[22px]"} font-semibold text-foreground`}>
                        {section.title}
                      </h3>
                      {section.content && (
                        Array.isArray(section.content)
                          ? <div className="space-y-3 text-foreground text-[18px] leading-[1.7]">
                              {section.content.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                          : <p className="text-foreground text-[18px] leading-[1.7]">{section.content}</p>
                      )}
                    </motion.section>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="px-6 md:px-[88px] py-6 border-t border-border mt-auto">
              <div className="max-w-[640px] w-full">
                <p className="text-[13px] text-muted-foreground">
                  STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HandbookOverlay;
