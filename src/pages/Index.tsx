import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Linkedin,
  X,
  Activity,
  Cpu,
  Zap,
  Smartphone,
  Shield,
  Cog,
  Radio,
  Wifi,
} from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import JobApplyOverlay from "@/components/JobApplyOverlay";
import PcbPattern from "@/components/PcbPattern";
import AccentSwitcher from "@/components/AccentSwitcher";
import ConsultantInquiry from "@/components/ConsultantInquiry";
import HandbookOverlay from "@/components/HandbookOverlay";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import kacperWysocki from "@/assets/kacper-wysocki.jpeg";
import larsRudolfsen from "@/assets/lars-rudolfsen.jpg";
import idaAbrahamsson from "@/assets/ida-abrahamsson.jpg";
import trineOlsen from "@/assets/trine-olsen.jpg";
import tomErikLundesgaard from "@/assets/tom-erik-lundesgaard.jpg";
import karlEirikFossberg from "@/assets/karl-eirik-fossberg.jpg";
import rikkeSolbjorg from "@/assets/rikke-solbjorg.jpg";
import christianPoljac from "@/assets/christian-poljac.jpg";
import martinTysseland from "@/assets/martin-tysseland.jpg";
import mattisAsp from "@/assets/mattis-asp.jpg";
import robotAvatar from "@/assets/robot-avatar.png";

const TICKER_ITEMS = [
  "C",
  "C++",
  "Rust",
  "Zephyr",
  "FreeRTOS",
  "ThreadX",
  "Embedded Linux",
  "Yocto",
  "ARM Cortex",
  "RTOS",
  "CAN",
  "CANopen",
  "SPI",
  "I2C",
  "UART",
  "Board bring-up",
  "Bare-metal",
  "TrustZone",
  "CMake",
  "Linux-kjerne",
  "Hardware-debugging",
  "ISO 26262",
  "IEC 62443",
  "MISRA-C",
];

const COMPETENCE_GROUPS = [
  {
    hex: "0x01",
    title: "Embedded systemer",
    description:
      "Utvikling av komplette embedded systemer — fra firmware på mikrokontrollere til Linux-baserte produkter.",
    tags: ["Firmware", "Embedded Linux", "Yocto / Buildroot", "Linux-kjerne og drivere"],
  },
  {
    hex: "0x02",
    title: "Sanntidssystemer",
    description: "Systemer der stabilitet, timing og determinisme er kritisk.",
    tags: ["RTOS (FreeRTOS, Zephyr, ThreadX)", "Multitråding", "Interrupt-styrte systemer", "Ytelsesoptimalisering"],
  },
  {
    hex: "0x03",
    title: "Hardware-nær utvikling",
    description: "Integrasjon mellom programvare, elektronikk og fysiske systemer.",
    tags: ["Mikrokontrollere", "ARM Cortex", "Board bring-up", "Hardware-debugging"],
  },
  {
    hex: "0x04",
    title: "Protokoller og kommunikasjon",
    description: "Kommunikasjon mellom embedded systemer og andre systemer.",
    tags: ["SPI / I2C / UART", "CAN / CANopen", "TCP/IP", "Industrielle protokoller"],
  },
  {
    hex: "0x05",
    title: "Programmering",
    description: null,
    tags: ["C", "C++", "Rust", "Python", "Assembly"],
  },
  {
    hex: "0x06",
    title: "Testing og kvalitet",
    description: "Robuste systemer krever systematisk testing.",
    tags: ["Debugging", "CI/CD", "Hardware-in-the-loop testing", "Sikker firmware"],
  },
];

const DOMAIN_ICONS: Record<string, React.ComponentType<any>> = {
  "Medisinsk teknologi": Activity,
  "Halvleder og chip-utvikling": Cpu,
  "Energi og elektrisk mobilitet": Zap,
  Forbrukerelektronikk: Smartphone,
  "Forsvar og sikkerhetskritiske systemer": Shield,
  "Industriell automasjon": Cog,
  "Telekom og kommunikasjon": Radio,
  "IoT og smarte enheter": Wifi,
};

const DOMAINS = [
  "Medisinsk teknologi",
  "Halvleder og chip-utvikling",
  "Energi og elektrisk mobilitet",
  "Forbrukerelektronikk",
  "Forsvar og sikkerhetskritiske systemer",
  "Industriell automasjon",
  "Telekom og kommunikasjon",
  "IoT og smarte enheter",
];

const CONSULTANTS = [
  {
    name: "Kacper Wysocki",
    image: kacperWysocki,
    competence: ["Embedded Linux", "RTOS", "Security", "Firmware", "CI/CD", "Board Bring-up"],
    industries: ["IoT", "Kamera", "Sikkerhet"],
    experience: 15,
    location: "Oslo",
    description:
      "Senior embedded-profil med tung erfaring fra komplekse produkter (kamera/IoT) og sikkerhet. Sterk på arkitektur, ytelse, release/infrastruktur og teamledelse.",
  },
  {
    name: "Lars Rudolfsen",
    image: larsRudolfsen,
    competence: ["Autonomi", "Regulering", "STM32", "FreeRTOS", "CANopen", "Embedded Linux"],
    industries: ["Robotikk", "Autonomi", "Industri"],
    experience: 8,
    location: "Oslo",
    description: "Kybernetikk/robotikk-ingeniør med erfaring fra sanntidsstyring og integrasjon i komplekse systemer.",
  },
  {
    name: "Ida Abrahamsson",
    image: idaAbrahamsson,
    competence: ["Embedded", "FreeRTOS", "CANopen", "IoT", "AWS", "C/C++"],
    industries: ["IoT", "Automasjon", "Robotikk"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded- og kontrollsystemingeniør med bred erfaring fra IoT, automasjon og robotikk.",
  },
  {
    name: "Trine Ø. Olsen",
    image: trineOlsen,
    competence: ["Defence", "C2", "RTOS", "Sensor Fusion", "Networking", "Robust Systems"],
    industries: ["Forsvar", "Sikkerhet", "Taktiske systemer"],
    experience: 10,
    location: "Østlandet",
    description: "Embedded-ingeniør med erfaring fra forsvar og sikkerhetskritiske systemer.",
  },
  {
    name: "Tom Erik Lundesgaard",
    image: tomErikLundesgaard,
    competence: ["Embedded", "Bare-metal", "Zigbee", "Test/Debug", "Electronics", "Subsea"],
    industries: ["Forsvar", "MedTech", "Subsea"],
    experience: 20,
    location: "Oslo",
    description: "Senior embedded-ingeniør med lang fartstid fra forsvar, medtech og subsea.",
  },
  {
    name: "Karl Eirik Bang Fossberg",
    image: karlEirikFossberg,
    competence: ["Robotics", "RTOS", "Embedded Linux", "Qt", "IoT", "CI/CD"],
    industries: ["Robotikk", "Industri", "IoT"],
    experience: 12,
    location: "Oslo",
    description: "Senior embedded med dokumentert leveranse i robotsystemer og industrielle løsninger.",
  },
  {
    name: "Rikke Solbjørg",
    image: rikkeSolbjorg,
    competence: ["MedTech", "Yocto", "Embedded Linux", "Verification", "CI/CD", "TDD"],
    industries: ["MedTech", "Regulert utvikling"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded-profil med erfaring fra regulert medisinsk utvikling og høy kvalitet.",
  },
  {
    name: "Anders Larsen",
    image: null,
    competence: ["C++", "Qt", "Embedded Linux", "Leadership", "Graphics", "Developer Tooling"],
    industries: ["Plattform", "Grafikk/3D", "Produktutvikling"],
    experience: 15,
    location: "Oslo",
    description: "Senior C++/Qt med ledelseserfaring og produktutvikling i skalerbare team.",
  },
  {
    name: "Trond Hübertz Emaus",
    image: null,
    competence: ["Rust", "C++", "Architecture", "Embedded", "CMake/Conan", "System Design"],
    industries: ["Embedded", "Plattform", "Systemarkitektur"],
    experience: 12,
    location: "Oslo",
    description: "Arkitektursterk systemutvikler som bygger fundament og mønstre som øker teamhastighet.",
  },
  {
    name: "Christian Steffen Poljac",
    image: christianPoljac,
    competence: ["Security", "TrustZone", "RTOS", "Firmware", "Zephyr", "ISO15118"],
    industries: ["EV/Charging", "Halvleder", "Sikkerhet"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded med tydelig sikkerhetsprofil og erfaring fra EV/charging og SoC.",
  },
  {
    name: "Martin Tysseland",
    image: martinTysseland,
    competence: ["Embedded Linux", "Yocto", "C++", "CI/CD", "Docker", "Systems"],
    industries: ["Produktutvikling", "DevOps", "Embedded"],
    experience: 8,
    location: "Oslo",
    description: "Embedded Linux/Yocto-utvikler med erfaring fra produktutvikling og drift/byggkjeder.",
  },
  {
    name: "Mattis Asp",
    image: mattisAsp,
    competence: ["Embedded", "Systems", "C/C++", "Architecture", "Integration"],
    industries: ["Embedded", "Systemintegrasjon"],
    experience: 10,
    location: "Oslo",
    description: "Erfaren systemutvikler med bred embedded-kompetanse og evne til å levere robuste løsninger.",
  },
];

const MANIFEST = [
  {
    num: "01",
    title: "Solid fagkompetanse.",
    text: "Alle har lang erfaring fra systemer i produksjon og er vant til å ta tekniske beslutninger der kvalitet og stabilitet er avgjørende.",
  },
  {
    num: "02",
    title: "Selvstendige.",
    text: "Setter seg raskt inn i systemer og problemstillinger, og tar ansvar for sitt område. Arbeidet drives fremover uten behov for tett oppfølging.",
  },
  {
    num: "03",
    title: "Gode holdninger.",
    text: "Vi er opptatt av gode holdninger. Ryddige, åpne om fremdrift og gode å samarbeide med.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-60px" },
};

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isJobOverlayOpen, setIsJobOverlayOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [expandedConsultant, setExpandedConsultant] = useState<number | null>(null);

  const localImageMap: Record<string, string> = {
    "Kacper Wysocki": kacperWysocki,
    "Lars Rudolfsen": larsRudolfsen,
    "Ida Abrahamsson": idaAbrahamsson,
    "Trine Ø. Olsen": trineOlsen,
    "Tom Erik Lundesgaard": tomErikLundesgaard,
    "Karl Eirik Bang Fossberg": karlEirikFossberg,
    "Rikke Solbjørg": rikkeSolbjorg,
    "Christian Steffen Poljac": christianPoljac,
    "Martin Tysseland": martinTysseland,
    "Mattis Asp": mattisAsp,
  };

  const { data: dbConsultants } = useQuery({
    queryKey: ["consultants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("consultants").select("*").eq("active", true).order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const consultants = (dbConsultants ?? CONSULTANTS).map((c: any) => ({
    name: c.name,
    image: c.image_url || localImageMap[c.name] || c.image || null,
    competence: c.competences || c.competence || [],
    industries: c.industries || [],
    experience: c.experience_years ?? c.experience ?? 0,
    location: c.location || "Oslo",
    description: c.description || "",
  }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const Tag = ({ children }: { children: string }) => (
    <span className="text-[14px] font-mono inline-flex items-center gap-0">
      <span className="text-primary">[</span>
      <span className="text-muted-foreground">&nbsp;{children}&nbsp;</span>
      <span className="text-primary">]</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ paddingLeft: "10vw", paddingRight: "6vw" }}
      >
        <PcbPattern />
        <div className="relative z-10 max-w-[1100px]">
          {/* Logo */}
          <img src={stacqLogoWhite} alt="STACQ" className="h-[26px] brightness-0 invert mb-16" />

          {/* Overline */}
          <p className="text-[13px] tracking-[0.18em] uppercase font-mono text-primary/80 mb-5">
            Konsulentselskap — Oslo, Trondheim, Norge
          </p>

          {/* H1 */}
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(56px, 6.5vw, 88px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            <span className="md:whitespace-nowrap">Embedded, firmware</span>
            <br />
            <span className="md:whitespace-nowrap">og C/C++/Rust konsulenter.</span>
          </h1>

          {/* Ingress */}
          <p className="mt-7 text-[20px] text-muted-foreground leading-[2.0] max-w-[620px]">
            Vi leverer noen av Norges beste spesialister innen embedded systems firmware og lavnivå-programmering.
          </p>

          {/* CTAs */}
          <div className="mt-11 flex items-center gap-3">
            <button
              onClick={() => scrollTo("consultants")}
              className="px-7 py-3.5 bg-foreground text-background text-[14px] tracking-[0.02em] font-medium hover:opacity-90 transition-opacity duration-300"
              style={{ borderRadius: "2px" }}
            >
              Se konsulentene
            </button>
            <button
              onClick={() => setIsJobOverlayOpen(true)}
              className="px-7 py-3.5 border border-border text-muted-foreground text-[14px] tracking-[0.02em] hover:text-foreground hover:border-muted-foreground transition-all duration-300"
              style={{ borderRadius: "2px" }}
            >
              Vi ansetter
            </button>
          </div>
        </div>

        {/* Tech ticker at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t" style={{ borderColor: "hsl(var(--border-subtle))" }}>
          <div className="overflow-hidden h-10 flex items-center">
            <div className="ticker-animate whitespace-nowrap flex">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] tracking-[0.14em] mx-4"
                  style={{ color: "hsl(var(--text-faint))" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifest ── */}
      <section id="manifest" className="border-t border-b border-border" style={{ padding: "80px 10vw" }}>
        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {MANIFEST.map((item, i) => (
            <div
              key={item.num}
              className={`${i > 0 ? "md:border-l md:border-border md:pl-12" : ""} ${i < MANIFEST.length - 1 ? "md:pr-12" : ""}`}
            >
              <p className="text-[13px] tracking-[0.16em] text-primary font-mono mb-5">{item.num}</p>
              <h3 className="text-[19px] font-semibold text-foreground tracking-[0.01em] mb-4">{item.title}</h3>
              <p className="text-[17px] text-muted-foreground leading-[1.95] max-w-[300px]">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Kompetanse ── */}
      <section id="competence" style={{ background: "hsl(var(--surface))", padding: "80px 10vw" }}>
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-[13px] tracking-[0.16em] uppercase mb-4 text-muted-foreground">Kompetanse</p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Lavnivå. Høy presisjon.
          </h2>
        </motion.div>

        <motion.div {...stagger} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {COMPETENCE_GROUPS.map((group) => (
            <motion.div
              key={group.title}
              variants={{
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group relative border border-border bg-background hover:border-primary/40 transition-colors duration-[400ms]"
              style={{ borderRadius: "2px", padding: "28px" }}
            >
              <span
                className="absolute top-4 right-4 text-[10px] font-mono"
                style={{ color: "hsl(var(--text-faint))" }}
              >
                {group.hex}
              </span>
              <h3 className="text-[16px] font-semibold text-foreground mb-2.5">{group.title}</h3>
              {group.description && (
                <p className="text-[14px] text-muted-foreground leading-[1.85] mb-5">{group.description}</p>
              )}
              <div className="flex flex-wrap gap-3">
                {group.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Konsulenter ── */}
      <section id="consultants" style={{ padding: "80px 10vw" }}>
        <div>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[13px] tracking-[0.16em] uppercase mb-4 text-muted-foreground">Våre konsulenter</p>
            <h2
              className="font-serif text-foreground mb-14"
              style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Konsulentene.
            </h2>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] w-full">
            {consultants.map((c, i) => (
              <motion.div
                key={c.name}
                variants={{
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <button
                  onClick={() => setExpandedConsultant(expandedConsultant === i ? null : i)}
                  className="w-full text-left group border border-border overflow-hidden hover:border-primary/35 transition-colors duration-[400ms]"
                  style={{ borderRadius: "0px" }}
                >
                  {c.image ? (
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                        style={{ filter: "grayscale(12%) brightness(0.92)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) brightness(1.0)")}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(12%) brightness(0.92)")}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] overflow-hidden bg-secondary">
                      <img
                        src={robotAvatar}
                        alt={`${c.name} avatar`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                        style={{ filter: "grayscale(12%) brightness(0.92)" }}
                      />
                    </div>
                  )}
                  <div
                    className="border-t border-border"
                    style={{ background: "hsl(var(--surface))", padding: "18px 20px" }}
                  >
                    <h3 className="text-[15px] font-medium text-foreground leading-snug mb-1.5">{c.name}</h3>
                    <div className="flex items-center gap-3 text-[13px] text-muted-foreground mb-2.5">
                      <span>{c.experience}+ år</span>
                      <span>{c.location}</span>
                    </div>
                    <div className="flex flex-wrap" style={{ gap: "10px" }}>
                      {c.competence.slice(0, 3).map((comp) => (
                        <span key={comp} className="text-[13px] font-mono whitespace-nowrap">
                          <span className="text-primary">[</span>
                          <span className="text-muted-foreground">&nbsp;{comp}&nbsp;</span>
                          <span className="text-primary">]</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Consultant profile drawer */}
          <AnimatePresence>
            {expandedConsultant !== null && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50"
                  style={{ background: "hsla(240, 6%, 4%, 0.6)", backdropFilter: "blur(4px)" }}
                  onClick={() => setExpandedConsultant(null)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 z-50 w-[92vw] md:w-[45vw] bg-background border-l border-border overflow-y-auto"
                >
                  <div className="pt-24 pb-16 px-8 md:px-16">
                    <button
                      onClick={() => setExpandedConsultant(null)}
                      className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Profile header */}
                    <div className="flex items-start gap-6">
                      {consultants[expandedConsultant].image ? (
                        <img
                          src={consultants[expandedConsultant].image}
                          alt={consultants[expandedConsultant].name}
                          className="w-24 h-24 md:w-28 md:h-28 object-cover flex-shrink-0"
                          style={{ borderRadius: "2px" }}
                        />
                      ) : (
                        <img
                          src={robotAvatar}
                          alt={`${consultants[expandedConsultant].name} avatar`}
                          className="w-24 h-24 md:w-28 md:h-28 object-cover flex-shrink-0"
                          style={{ borderRadius: "2px" }}
                        />
                      )}
                      <div className="pt-1">
                        <h3 className="text-[24px] md:text-[28px] font-serif text-foreground leading-tight">
                          {consultants[expandedConsultant].name}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-[14px] text-muted-foreground">
                          <span>{consultants[expandedConsultant].experience}+ års erfaring</span>
                          <span>{consultants[expandedConsultant].location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-7 text-[17px] text-muted-foreground leading-[1.95]">
                      {consultants[expandedConsultant].description}
                    </p>

                    {/* Kompetanse */}
                    <div className="mt-8">
                      <p className="text-[13px] tracking-[0.16em] uppercase mb-3 text-muted-foreground">Kompetanse</p>
                      <div className="flex flex-wrap gap-3">
                        {consultants[expandedConsultant].competence.map((comp) => (
                          <Tag key={comp}>{comp}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Bransjeerfaring */}
                    <div className="mt-6">
                      <p className="text-[13px] tracking-[0.16em] uppercase mb-3 text-muted-foreground">
                        Bransjeerfaring
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {consultants[expandedConsultant].industries.map((ind) => (
                          <Tag key={ind}>{ind}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Availability inquiry */}
                    <ConsultantInquiry consultantName={consultants[expandedConsultant].name} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bransjer ── */}
      <section style={{ background: "hsl(var(--surface))", padding: "80px 10vw" }}>
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-[13px] tracking-[0.16em] uppercase mb-4 text-muted-foreground">Bransjer</p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Der koden møter
            <br />
            den virkelige verden.
          </h2>
        </motion.div>

        <motion.div {...stagger} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-[1px] w-full">
          {DOMAINS.map((title) => {
            const IconComp = DOMAIN_ICONS[title];
            return (
              <motion.div
                key={title}
                variants={{
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group flex flex-col items-start border border-border bg-background hover:border-primary/40 transition-colors duration-300"
                style={{ borderRadius: "2px", padding: "32px 28px", minHeight: "180px" }}
              >
                {IconComp && <IconComp className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />}
                <h3 className="text-[17px] font-medium text-foreground leading-normal mt-auto">{title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Karriere ── */}
      <section id="career" className="border-t border-border" style={{ padding: "80px 10vw" }}>
        <div className="max-w-3xl">
          <motion.div {...fadeUp}>
            <p className="text-[13px] tracking-[0.16em] uppercase mb-4 text-muted-foreground">Karriere</p>
            <h2
              className="font-serif text-foreground"
              style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Bli en del av teamet.
            </h2>
            <h2
              className="font-serif text-foreground/45 italic mt-3"
              style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Vi ser etter deg.
            </h2>
            <p className="mt-8 text-[17px] text-muted-foreground leading-[1.95] max-w-[420px]">
              Er du senior embedded-ingeniør med erfaring fra reelle produkter i produksjon? Vi er alltid interessert i
              å snakke med de riktige menneskene.
            </p>
            <div className="mt-9">
              <button
                onClick={() => setIsJobOverlayOpen(true)}
                className="px-7 py-3.5 bg-foreground text-background text-[14px] tracking-[0.02em] font-medium hover:opacity-90 transition-opacity duration-300"
                style={{ borderRadius: "2px" }}
              >
                Søk nå →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="footer-contact"
        className="border-t border-border"
        style={{ background: "#050507", padding: "72px 10vw 40px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-12">
          {/* Logo + tagline */}
          <div>
            <img src={stacqLogoWhite} alt="STACQ" className="h-4 mb-3.5 brightness-0 invert" />
            <p
              className="text-[15px] tracking-[0.04em] font-mono leading-[1.85]"
              style={{ color: "hsl(var(--text-faint))" }}
            >
              Der stakken begynner.
            </p>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="text-[13px] tracking-[0.16em] uppercase mb-4" style={{ color: "hsl(var(--text-faint))" }}>
              Selskap
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("consultants")}
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors leading-[1.85]"
                >
                  Konsulenter
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("career")}
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors leading-[1.85]"
                >
                  Karriere
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsHandbookOpen(true)}
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors leading-[1.85]"
                >
                  Håndbok
                </button>
              </li>
            </ul>
            <p className="mt-7 text-[15px] font-mono leading-[1.85]" style={{ color: "hsl(var(--text-faint))" }}>
              STACQ AS · 932 575 442 MVA
            </p>
          </div>

          {/* Kontakt oss */}
          <div>
            <h4 className="text-[13px] tracking-[0.16em] uppercase mb-4" style={{ color: "hsl(var(--text-faint))" }}>
              Kontakt
            </h4>
            <ul className="space-y-4 text-[15px] text-muted-foreground leading-[1.85]">
              <li>
                <span className="block font-medium text-foreground/85">Jon Richard Nygaard</span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a
                    href="tel:93287267"
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    932 87 267
                  </a>
                  <a
                    href="mailto:jr@stacq.no"
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    jr@stacq.no
                  </a>
                </div>
              </li>
              <li>
                <span className="block font-medium text-foreground/85">Thomas Eriksen</span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a
                    href="tel:97500321"
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    975 00 321
                  </a>
                  <a
                    href="mailto:thomas@stacq.no"
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    thomas@stacq.no
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Besøk oss */}
          <div>
            <h4 className="text-[13px] tracking-[0.16em] uppercase mb-4" style={{ color: "hsl(var(--text-faint))" }}>
              Besøk oss
            </h4>
            <p className="text-[15px] text-muted-foreground leading-[1.85]">
              Øvre Slottsgate 27,
              <br />
              0157 Oslo
            </p>
            <div className="mt-4 overflow-hidden border border-border" style={{ borderRadius: "2px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.7397!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e7be3b8cfc1%3A0x5e0ad81d0b2d6ef0!2s%C3%98vre%20Slottsgate%2027%2C%200157%20Oslo!5e0!3m2!1sno!2sno!4v1700000000000!5m2!1sno!2sno"
                width="100%"
                height="120"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) grayscale(0.3)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STACQ kontor"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays & Chat */}
      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      <JobApplyOverlay
        isOpen={isJobOverlayOpen}
        onClose={() => setIsJobOverlayOpen(false)}
        onOpenHandbok={() => {
          setIsJobOverlayOpen(false);
          setIsHandbookOpen(true);
        }}
      />
      <HandbookOverlay isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />
      <AccentSwitcher />
      <FloatingChat />
    </div>
  );
};

export default Index;
