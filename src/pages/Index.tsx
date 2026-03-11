import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, Clock, MapPin, Linkedin, Menu, X } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import JobApplyOverlay from "@/components/JobApplyOverlay";
import PcbPattern from "@/components/PcbPattern";
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
import jonRichardContact from "@/assets/jon-richard-nygaard-contact.jpg";
import thomasEriksenContact from "@/assets/thomas-eriksen-contact.jpg";
import robotAvatar from "@/assets/robot-avatar.png";

const TICKER_ITEMS = [
  "C", "C++", "Rust", "Zephyr", "FreeRTOS", "ThreadX", "Embedded Linux", "Yocto",
  "ARM Cortex", "RTOS", "CAN / CANopen", "SPI", "I2C", "UART", "Board bring-up",
  "Bare-metal", "TrustZone", "CMake", "Linux-kjerne", "Hardware-debugging",
  "ISO 26262", "IEC 62443",
];

const COMPETENCE_GROUPS = [
  {
    hex: "0x01",
    title: "Embedded systemer",
    description: "Utvikling av komplette embedded systemer — fra firmware på mikrokontrollere til Linux-baserte produkter.",
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
  { name: "Kacper Wysocki", image: kacperWysocki, competence: ["Embedded Linux", "RTOS", "Security", "Firmware", "CI/CD", "Board Bring-up"], industries: ["IoT", "Kamera", "Sikkerhet"], experience: 15, location: "Oslo", description: "Senior embedded-profil med tung erfaring fra komplekse produkter (kamera/IoT) og sikkerhet. Sterk på arkitektur, ytelse, release/infrastruktur og teamledelse." },
  { name: "Lars Rudolfsen", image: larsRudolfsen, competence: ["Autonomi", "Regulering", "STM32", "FreeRTOS", "CANopen", "Embedded Linux"], industries: ["Robotikk", "Autonomi", "Industri"], experience: 8, location: "Oslo", description: "Kybernetikk/robotikk-ingeniør med erfaring fra sanntidsstyring og integrasjon i komplekse systemer." },
  { name: "Ida Abrahamsson", image: idaAbrahamsson, competence: ["Embedded", "FreeRTOS", "CANopen", "IoT", "AWS", "C/C++"], industries: ["IoT", "Automasjon", "Robotikk"], experience: 10, location: "Oslo", description: "Senior embedded- og kontrollsystemingeniør med bred erfaring fra IoT, automasjon og robotikk." },
  { name: "Trine Ø. Olsen", image: trineOlsen, competence: ["Defence", "C2", "RTOS", "Sensor Fusion", "Networking", "Robust Systems"], industries: ["Forsvar", "Sikkerhet", "Taktiske systemer"], experience: 10, location: "Østlandet", description: "Embedded-ingeniør med erfaring fra forsvar og sikkerhetskritiske systemer." },
  { name: "Tom Erik Lundesgaard", image: tomErikLundesgaard, competence: ["Embedded", "Bare-metal", "Zigbee", "Test/Debug", "Electronics", "Subsea"], industries: ["Forsvar", "MedTech", "Subsea"], experience: 20, location: "Oslo", description: "Senior embedded-ingeniør med lang fartstid fra forsvar, medtech og subsea." },
  { name: "Karl Eirik Bang Fossberg", image: karlEirikFossberg, competence: ["Robotics", "RTOS", "Embedded Linux", "Qt", "IoT", "CI/CD"], industries: ["Robotikk", "Industri", "IoT"], experience: 12, location: "Oslo", description: "Senior embedded med dokumentert leveranse i robotsystemer og industrielle løsninger." },
  { name: "Rikke Solbjørg", image: rikkeSolbjorg, competence: ["MedTech", "Yocto", "Embedded Linux", "Verification", "CI/CD", "TDD"], industries: ["MedTech", "Regulert utvikling"], experience: 10, location: "Oslo", description: "Senior embedded-profil med erfaring fra regulert medisinsk utvikling og høy kvalitet." },
  { name: "Anders Larsen", image: null, competence: ["C++", "Qt", "Embedded Linux", "Leadership", "Graphics", "Developer Tooling"], industries: ["Plattform", "Grafikk/3D", "Produktutvikling"], experience: 15, location: "Oslo", description: "Senior C++/Qt med ledelseserfaring og produktutvikling i skalerbare team." },
  { name: "Trond Hübertz Emaus", image: null, competence: ["Rust", "C++", "Architecture", "Embedded", "CMake/Conan", "System Design"], industries: ["Embedded", "Plattform", "Systemarkitektur"], experience: 12, location: "Oslo", description: "Arkitektursterk systemutvikler som bygger fundament og mønstre som øker teamhastighet." },
  { name: "Christian Steffen Poljac", image: christianPoljac, competence: ["Security", "TrustZone", "RTOS", "Firmware", "Zephyr", "ISO15118"], industries: ["EV/Charging", "Halvleder", "Sikkerhet"], experience: 10, location: "Oslo", description: "Senior embedded med tydelig sikkerhetsprofil og erfaring fra EV/charging og SoC." },
  { name: "Martin Tysseland", image: martinTysseland, competence: ["Embedded Linux", "Yocto", "C++", "CI/CD", "Docker", "Systems"], industries: ["Produktutvikling", "DevOps", "Embedded"], experience: 8, location: "Oslo", description: "Embedded Linux/Yocto-utvikler med erfaring fra produktutvikling og drift/byggkjeder." },
  { name: "Mattis Asp", image: mattisAsp, competence: ["Embedded", "Systems", "C/C++", "Architecture", "Integration"], industries: ["Embedded", "Systemintegrasjon"], experience: 10, location: "Oslo", description: "Erfaren systemutvikler med bred embedded-kompetanse og evne til å levere robuste løsninger." },
];

const MANIFEST = [
  { num: "01", title: "Kun seniorer.", text: "Alle våre konsulenter har minimum 8 års erfaring fra reelle produkter i produksjon. Ingen juniorer. Ingen generalister." },
  { num: "02", title: "Dypt integrert.", text: "Konsulentene våre blir en del av teamet ditt — ikke en ekstern ressurs. De fleste oppdrag varer i ett til tre år." },
  { num: "03", title: "Kuratert, ikke katalogisert.", text: "Vi er 15 konsulenter. Thomas og Jon kjenner alle personlig. Når du ringer, får du en anbefaling — ikke en CV-bunke." },
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
  const [expandedConsultant, setExpandedConsultant] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .eq("active", true)
        .order("sort_order");
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
    setMobileMenuOpen(false);
  };

  const Tag = ({ children }: { children: string }) => (
    <span className="text-[11px] font-mono">
      <span className="text-primary">[</span>
      <span className="text-muted-foreground">{children}</span>
      <span className="text-primary">]</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border" style={{ background: 'hsla(240, 6%, 4%, 0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-14">
          <button onClick={() => scrollTo("hero")}>
            <img src={stacqLogoWhite} alt="STACQ" className="h-5 brightness-0 invert" />
          </button>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Konsulenter", id: "consultants" },
              { label: "Kompetanse", id: "competence" },
              { label: "Om oss", id: "om-oss" },
              { label: "Kontakt", id: "footer-contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[12px] tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile nav icon */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-3" style={{ background: 'hsla(240, 6%, 4%, 0.95)' }}>
            {[
              { label: "Konsulenter", id: "consultants" },
              { label: "Kompetanse", id: "competence" },
              { label: "Om oss", id: "om-oss" },
              { label: "Kontakt", id: "footer-contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[12px] tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center" style={{ paddingLeft: '10vw', paddingRight: '6vw' }}>
        <PcbPattern />
        <div className="relative z-10 max-w-[720px]">
          {/* Overline */}
          <p className="text-[11px] tracking-[0.2em] uppercase font-mono text-primary/70 mb-6">
            Konsulentselskap — Oslo, Norge
          </p>

          {/* H1 */}
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            Der stakken
            <br />
            begynner.
          </h1>

          {/* Ingress */}
          <p className="mt-7 text-[15px] text-muted-foreground leading-[1.8] max-w-[460px]">
            15 senior embedded-, firmware- og C/C++-konsulenter.
            <br />
            Alle i aktive oppdrag. Alle tilgjengelige
            <br />
            for de rette prosjektene.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={() => scrollTo("consultants")}
              className="px-7 py-3 bg-foreground text-background text-[13px] tracking-[0.05em] font-medium hover:opacity-90 transition-opacity duration-300"
              style={{ borderRadius: '2px' }}
            >
              Se konsulentene
            </button>
            <button
              onClick={() => scrollTo("om-oss")}
              className="px-7 py-3 border border-border text-muted-foreground text-[13px] tracking-[0.05em] font-medium hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              style={{ borderRadius: '2px' }}
            >
              Ta kontakt
            </button>
          </div>
        </div>

        {/* Tech ticker at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t" style={{ borderColor: 'hsl(var(--border-subtle))' }}>
          <div className="overflow-hidden py-3">
            <div className="ticker-animate whitespace-nowrap flex">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="text-[12px] tracking-[0.1em] mx-4" style={{ color: 'hsl(var(--text-faint))' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifest ── */}
      <section id="manifest" className="border-t border-b border-border" style={{ padding: '100px 10vw' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {MANIFEST.map((item, i) => (
              <div key={item.num} className={`${i > 0 ? 'md:border-l md:border-border md:pl-10' : ''} ${i < MANIFEST.length - 1 ? 'md:pr-10' : ''}`}>
                <p className="text-[11px] tracking-[0.2em] text-primary font-mono mb-6">{item.num}</p>
                <h3 className="text-[18px] font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.8]">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Kompetanse ── */}
      <section id="competence" style={{ background: 'hsl(var(--surface))', padding: '100px 10vw' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">Kompetanse</p>
            <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}>
              Koden som
              <br />
              ikke kan feile.
            </h2>
          </motion.div>

          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETENCE_GROUPS.map((group) => (
              <motion.div
                key={group.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group p-7 border border-border bg-background hover:border-primary/40 transition-colors duration-300"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[14px] font-semibold text-foreground">{group.title}</h3>
                  <span className="text-[11px] text-text-faint font-mono">{group.hex}</span>
                </div>
                {group.description && (
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">{group.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Konsulenter ── */}
      <section id="consultants" style={{ padding: '100px 10vw' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">Våre konsulenter</p>
            <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}>
              Menneskene bak
              <br />
              maskinene.
            </h2>
          </motion.div>

          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {consultants.map((c, i) => (
              <motion.div
                key={c.name}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              >
                <button
                  onClick={() => setExpandedConsultant(expandedConsultant === i ? null : i)}
                  className="w-full text-left group border border-border overflow-hidden hover:border-primary/30 transition-colors duration-500"
                  style={{ borderRadius: '0px' }}
                >
                  {c.image ? (
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        style={{ filter: 'grayscale(15%)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(15%)')}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] overflow-hidden bg-secondary">
                      <img
                        src={robotAvatar}
                        alt={`${c.name} avatar`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        style={{ filter: 'grayscale(15%)' }}
                      />
                    </div>
                  )}
                  <div className="p-4" style={{ background: 'hsl(var(--surface))' }}>
                    <h3 className="text-[14px] font-medium text-foreground">{c.name}</h3>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{c.experience}+ år</span>
                      <span>{c.location}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.competence.slice(0, 3).map((comp) => (
                        <Tag key={comp}>{comp}</Tag>
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
                  style={{ background: 'hsla(240, 6%, 4%, 0.6)', backdropFilter: 'blur(4px)' }}
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
                          style={{ borderRadius: '2px' }}
                        />
                      ) : (
                        <img
                          src={robotAvatar}
                          alt={`${consultants[expandedConsultant].name} avatar`}
                          className="w-24 h-24 md:w-28 md:h-28 object-cover flex-shrink-0"
                          style={{ borderRadius: '2px' }}
                        />
                      )}
                      <div className="pt-1">
                        <h3 className="text-[24px] md:text-[28px] font-serif text-foreground leading-tight">
                          {consultants[expandedConsultant].name}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
                          <span>{consultants[expandedConsultant].experience}+ års erfaring</span>
                          <span>{consultants[expandedConsultant].location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-7 text-[14px] text-muted-foreground leading-[1.8]">
                      {consultants[expandedConsultant].description}
                    </p>

                    {/* Kompetanse */}
                    <div className="mt-8">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-3">Kompetanse</p>
                      <div className="flex flex-wrap gap-2">
                        {consultants[expandedConsultant].competence.map((comp) => (
                          <Tag key={comp}>{comp}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Bransjeerfaring */}
                    <div className="mt-6">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-3">Bransjeerfaring</p>
                      <div className="flex flex-wrap gap-2">
                        {consultants[expandedConsultant].industries.map((ind) => (
                          <Tag key={ind}>{ind}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-12 pt-6 border-t border-border">
                      <p className="text-[13px] text-muted-foreground mb-4">
                        Interessert i å booke {consultants[expandedConsultant].name.split(" ")[0]}? Ta kontakt med:
                      </p>
                      <div className="space-y-3">
                        {[
                          { img: jonRichardContact, name: "Jon Richard Nygaard", tel: "932 87 267", telRaw: "93287267", email: "jr@stacq.no" },
                          { img: thomasEriksenContact, name: "Thomas Eriksen", tel: "975 00 321", telRaw: "97500321", email: "thomas@stacq.no" },
                        ].map((contact) => (
                          <div key={contact.name} className="flex items-center gap-3 p-3 border border-border" style={{ borderRadius: '2px', background: 'hsl(var(--surface))' }}>
                            <img src={contact.img} alt={contact.name} className="w-10 h-10 object-cover flex-shrink-0" style={{ borderRadius: '2px' }} />
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-foreground">{contact.name} <span className="font-normal text-muted-foreground">· Partner</span></p>
                              <div className="mt-0.5 flex items-center gap-3 text-[12px] text-muted-foreground">
                                <a href={`tel:${contact.telRaw}`} className="inline-flex items-center gap-1 hover:text-primary transition-colors"><Phone className="w-3 h-3" />{contact.tel}</a>
                                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1 hover:text-primary transition-colors"><Mail className="w-3 h-3" />{contact.email}</a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Om Thomas og Jon ── */}
      <section id="om-oss" className="border-t border-b border-border" style={{ background: 'hsl(var(--surface))', padding: '100px 10vw' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left column - text */}
            <div className="lg:col-span-2">
              <p className="text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: 'hsl(var(--text-faint))' }}>Partnerne</p>
              <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.05 }}>
                Personlig kjennskap.
                <br />
                Ikke et søk i en database.
              </h2>
              <p className="mt-6 text-[14px] text-muted-foreground leading-[1.9]">
                Thomas Eriksen og Jon Richard Nygaard bygget STACQ fordi de så det samme problemet gjentatte ganger: selskaper med krevende embedded-prosjekter fikk CVer fra folk som hadde lest om teknologien — ikke brukt den.
              </p>
              <p className="mt-4 text-[14px] text-muted-foreground leading-[1.9]">
                Vi kjenner alle i nettverket vårt personlig. Vi vet hvem som passer hvor. Ring oss.
              </p>
            </div>

            {/* Right column - partner cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { img: thomasEriksenContact, name: "Thomas Eriksen", tel: "975 00 321", telRaw: "97500321", email: "thomas@stacq.no" },
                { img: jonRichardContact, name: "Jon Richard Nygaard", tel: "932 87 267", telRaw: "93287267", email: "jr@stacq.no" },
              ].map((partner) => (
                <div key={partner.name} className="p-6 border border-border bg-background" style={{ borderRadius: '2px' }}>
                  <img src={partner.img} alt={partner.name} className="w-[72px] h-[72px] object-cover rounded-full mb-4" />
                  <h3 className="text-[14px] font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-[11px] mt-1 mb-4" style={{ color: 'hsl(var(--text-faint))' }}>Partner</p>
                  <div className="space-y-2 text-[13px] text-muted-foreground">
                    <a href={`tel:${partner.telRaw}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Phone className="w-3.5 h-3.5" />{partner.tel}
                    </a>
                    <a href={`mailto:${partner.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Mail className="w-3.5 h-3.5" />{partner.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bransjer ── */}
      <section style={{ padding: '100px 10vw' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">Bransjer</p>
            <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}>
              Der koden møter
              <br />
              den virkelige verden.
            </h2>
          </motion.div>

          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-[1px]">
            {DOMAINS.map((title, i) => (
              <motion.div
                key={title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group border border-border hover:border-primary/30 transition-colors duration-300"
                style={{ borderRadius: '2px', background: 'hsl(var(--surface))', padding: '32px 28px' }}
              >
                <p className="text-[28px] font-light text-primary/20 font-mono mb-auto">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[14px] font-medium text-foreground leading-snug mt-12">{title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Karriere ── */}
      <section id="career" className="border-t border-border" style={{ padding: '160px 10vw' }}>
        <div className="max-w-3xl">
          <motion.div {...fadeUp}>
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">Karriere</p>
            <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}>
              Vi rekrutterer de som
              <br />
              koder nærmest metallet.
            </h2>
            <p className="mt-6 text-[15px] text-muted-foreground leading-[1.7] max-w-[480px]">
              Er du en senior embedded-ingeniør som vil jobbe
              med krevende oppdrag over tid? Vi er alltid interessert
              i å snakke med de riktige menneskene.
            </p>
            <div className="mt-10">
              <button
                onClick={() => setIsJobOverlayOpen(true)}
                className="px-7 py-3 bg-foreground text-background text-[13px] tracking-[0.05em] font-medium hover:opacity-90 transition-opacity duration-300"
                style={{ borderRadius: '2px' }}
              >
                Send en åpen søknad →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-20 px-6 md:px-12" style={{ background: 'hsl(240, 10%, 2%)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo + tagline */}
          <div>
            <img src={stacqLogoWhite} alt="STACQ" className="h-5 mb-5 brightness-0 invert" />
            <p className="text-[13px] font-mono" style={{ color: 'hsl(var(--text-faint))' }}>
              Der stakken begynner.
            </p>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-5">Selskap</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setIsOverlayOpen(true)} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Om STACQ</button></li>
              <li><button onClick={() => setIsJobOverlayOpen(true)} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Karriere</button></li>
            </ul>
            <p className="mt-5 text-[11px] font-mono" style={{ color: 'hsl(var(--text-faint))' }}>
              STACQ AS<br />
              932 575 442 MVA
            </p>
          </div>

          {/* Kontakt oss */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-5">Kontakt oss</h4>
            <ul className="space-y-4 text-[13px] text-muted-foreground">
              <li>
                <span className="block font-medium text-foreground/85">Jon Richard Nygaard <span className="font-normal text-muted-foreground">· Partner</span></span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a href="tel:93287267" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><Phone className="w-3 h-3" />932 87 267</a>
                  <a href="mailto:jr@stacq.no" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-3 h-3" />jr@stacq.no</a>
                </div>
              </li>
              <li>
                <span className="block font-medium text-foreground/85">Thomas Eriksen <span className="font-normal text-muted-foreground">· Partner</span></span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a href="tel:97500321" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><Phone className="w-3 h-3" />975 00 321</a>
                  <a href="mailto:thomas@stacq.no" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-3 h-3" />thomas@stacq.no</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Besøk oss */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-5">Besøk oss</h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Øvre Slottsgate 27,<br />
              0157 Oslo
            </p>
            <div className="mt-4 overflow-hidden border border-border" style={{ borderRadius: '2px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.7397!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e7be3b8cfc1%3A0x5e0ad81d0b2d6ef0!2s%C3%98vre%20Slottsgate%2027%2C%200157%20Oslo!5e0!3m2!1sno!2sno!4v1700000000000!5m2!1sno!2sno"
                width="100%"
                height="120"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) grayscale(0.3)' }}
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
      <JobApplyOverlay isOpen={isJobOverlayOpen} onClose={() => setIsJobOverlayOpen(false)} />
      <FloatingChat />
    </div>
  );
};

export default Index;
