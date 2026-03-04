import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Heart, Factory, Zap, Cpu, Code, Terminal, Layers, Lock, Server, GitBranch, Workflow, Radio, Smartphone, CircuitBoard, Wifi, Linkedin, MapPin, Clock, ChevronDown } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import JobApplyOverlay from "@/components/JobApplyOverlay";
import stacqLogo from "@/assets/stacq-logo-black.png";
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

const TECH_TAGS = [
  { label: "C", icon: Code },
  { label: "C+", icon: Code },
  { label: "Rust", icon: Terminal },
  { label: "Embedded Linux", icon: Layers },
  { label: "Firmware", icon: Cpu },
  { label: "RTOS", icon: Server },
  { label: "Mikrokontrollere", icon: CircuitBoard },
  { label: "Security", icon: Lock },
  { label: "+mer", icon: null },
];

const COMPETENCE_GROUPS = [
  {
    title: "Språk",
    items: ["C", "C++", "Rust", "Python"],
  },
  {
    title: "Systemer",
    items: ["Embedded Linux", "Firmware Development", "RTOS", "Bare-metal Systems"],
  },
  {
    title: "Hardware",
    items: ["Microcontrollers", "ARM Cortex", "Hardware Integration", "Board Bring-up"],
  },
  {
    title: "Software / system",
    items: ["System Software", "Device Drivers", "Networking Protocols", "Performance Optimization"],
  },
  {
    title: "Tools / plattform",
    items: ["Yocto", "Build Systems (CMake / Bazel / Make)", "CI/CD"],
  },
  {
    title: "Kvalitet",
    items: ["Testing & Debugging"],
  },
];

const DOMAINS = [
  { title: "Medisinsk teknologi", desc: "Pålitelig programvare for medisinsk utstyr der kvalitet redder liv.", icon: Heart },
  { title: "Halvleder og chip-utvikling", desc: "Drivere, firmware og verktøykjeder for neste generasjons brikker.", icon: CircuitBoard },
  { title: "Energi og elektrisk mobilitet", desc: "Styringssystemer for fornybar energi, lading og elektriske kjøretøy.", icon: Zap },
  { title: "Forbrukerelektronikk", desc: "Embedded-løsninger for produkter som når millioner av brukere.", icon: Smartphone },
  { title: "Forsvar og sikkerhetskritiske systemer", desc: "Robuste systemer som møter de strengeste kravene til sikkerhet.", icon: Shield },
  { title: "Industriell automasjon", desc: "Sanntidsstyring og automasjon for moderne produksjonslinjer.", icon: Factory },
  { title: "Telekom og kommunikasjon", desc: "Lavnivå-programvare for nettverksinfrastruktur og kommunikasjonsprotokoller.", icon: Radio },
  { title: "IoT og smarte enheter", desc: "Tilkoblede enheter med fokus på strømeffektivitet og pålitelighet.", icon: Wifi },
];

const CONSULTANTS = [
  {
    name: "Kacper Wysocki",
    image: kacperWysocki,
    competence: ["Embedded Linux", "RTOS", "Security", "Firmware", "CI/CD", "Board Bring-up"],
    industries: ["IoT", "Kamera", "Sikkerhet"],
    experience: 15,
    location: "Oslo",
    description: "Senior embedded-profil med tung erfaring fra komplekse produkter (kamera/IoT) og sikkerhet. Sterk på arkitektur, ytelse, release/infrastruktur og teamledelse.",
  },
  {
    name: "Lars Rudolfsen",
    image: larsRudolfsen,
    competence: ["Autonomi", "Regulering", "STM32", "FreeRTOS", "CANopen", "Embedded Linux"],
    industries: ["Robotikk", "Autonomi", "Industri"],
    experience: 8,
    location: "Oslo",
    description: "Kybernetikk/robotikk-ingeniør med erfaring fra sanntidsstyring og integrasjon i komplekse systemer. Spiss på regulering, sensorer og robust embedded kommunikasjon.",
  },
  {
    name: "Ida Abrahamsson",
    image: idaAbrahamsson,
    competence: ["Embedded", "FreeRTOS", "CANopen", "IoT", "AWS", "C/C++"],
    industries: ["IoT", "Automasjon", "Robotikk"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded- og kontrollsystemingeniør med bred erfaring fra IoT, automasjon og robotikk. Leverer prototyper og produksjonsklare løsninger med struktur og driv.",
  },
  {
    name: "Trine Ø. Olsen",
    image: trineOlsen,
    competence: ["Defence", "C2", "RTOS", "Sensor Fusion", "Networking", "Robust Systems"],
    industries: ["Forsvar", "Sikkerhet", "Taktiske systemer"],
    experience: 10,
    location: "Østlandet",
    description: "Embedded-ingeniør med erfaring fra forsvar og sikkerhetskritiske systemer (C2, sensorer, taktiske nett). Sterk på robusthet, integrasjon og systemer som må fungere i krevende miljø.",
  },
  {
    name: "Tom Erik Lundesgaard",
    image: tomErikLundesgaard,
    competence: ["Embedded", "Bare-metal", "Zigbee", "Test/Debug", "Electronics", "Subsea"],
    industries: ["Forsvar", "MedTech", "Subsea"],
    experience: 20,
    location: "Oslo",
    description: "Senior embedded-ingeniør med lang fartstid fra forsvar, medtech og subsea. Praktisk sterk på feilsøking, RF/kommunikasjon og samspillet SW–HW.",
  },
  {
    name: "Karl Eirik Bang Fossberg",
    image: karlEirikFossberg,
    competence: ["Robotics", "RTOS", "Embedded Linux", "Qt", "IoT", "CI/CD"],
    industries: ["Robotikk", "Industri", "IoT"],
    experience: 12,
    location: "Oslo",
    description: "Senior embedded med dokumentert leveranse i robotsystemer og industrielle løsninger. Kombinerer arkitektur, motor/sensor-integrasjon og DevOps for raske og stabile leveranser.",
  },
  {
    name: "Rikke Solbjørg",
    image: rikkeSolbjorg,
    competence: ["MedTech", "Yocto", "Embedded Linux", "Verification", "CI/CD", "TDD"],
    industries: ["MedTech", "Regulert utvikling"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded-profil med erfaring fra regulert medisinsk utvikling og høy kvalitet. Sterk på Yocto, testdrevet utvikling, automasjon og risikoreduserende engineering.",
  },
  {
    name: "Anders Larsen",
    image: null,
    competence: ["C++", "Qt", "Embedded Linux", "Leadership", "Graphics", "Developer Tooling"],
    industries: ["Plattform", "Grafikk/3D", "Produktutvikling"],
    experience: 15,
    location: "Oslo",
    description: "Senior C++/Qt med ledelseserfaring og produktutvikling i skalerbare team. Solid på plattform, verktøy og robuste applikasjoner – også grafikk/3D ved behov.",
  },
  {
    name: "Trond Hübertz Emaus",
    image: null,
    competence: ["Rust", "C++", "Architecture", "Embedded", "CMake/Conan", "System Design"],
    industries: ["Embedded", "Plattform", "Systemarkitektur"],
    experience: 12,
    location: "Oslo",
    description: "Arkitektursterk systemutvikler som bygger fundament og mønstre som øker teamhastighet. Bred bakgrunn fra embedded og plattformnære systemer.",
  },
  {
    name: "Christian Steffen Poljac",
    image: christianPoljac,
    competence: ["Security", "TrustZone", "RTOS", "Firmware", "Zephyr", "ISO15118"],
    industries: ["EV/Charging", "Halvleder", "Sikkerhet"],
    experience: 10,
    location: "Oslo",
    description: "Senior embedded med tydelig sikkerhetsprofil (TrustZone, fuzzing, hardening) og erfaring fra EV/charging og SoC. Leverer robust, testbar firmware med høy kvalitet.",
  },
  {
    name: "Martin Tysseland",
    image: martinTysseland,
    competence: ["Embedded Linux", "Yocto", "C++", "CI/CD", "Docker", "Systems"],
    industries: ["Produktutvikling", "DevOps", "Embedded"],
    experience: 8,
    location: "Oslo",
    description: "Embedded Linux/Yocto-utvikler med erfaring fra produktutvikling og drift/byggkjeder. God på helhet fra device-image til applikasjon og automasjon.",
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-60px" },
};

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isJobOverlayOpen, setIsJobOverlayOpen] = useState(false);
  const [activeConsultant, setActiveConsultant] = useState(0);

  const scrollListRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const el = scrollListRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setShowScrollHint(!atBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="pt-20 pb-20 md:pt-32 md:pb-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <img src={stacqLogo} alt="STACQ" className="h-6 mb-8" />
            <h1
              className="text-foreground font-bold tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Embedded, firmware
              <br />
              og C/C++/Rust konsulenter
            </h1>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors"
              >
                
                {tag.label}
              </span>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Kompetanse ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Kompetanse</p>
            <h2 className="mt-4 text-foreground font-bold tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
              Hele embedded-stacken.
              <br />
              <span className="text-muted-foreground font-normal">Fra hardware til sky.</span>
            </h2>
          </motion.div>

          <motion.div {...stagger} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETENCE_GROUPS.map((group) => (
              <motion.div
                key={group.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-3">{group.title}</h3>
                <div className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="text-[14px] text-foreground">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Konsulenter ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Våre konsulenter</p>
            <h2 className="mt-4 text-foreground font-bold tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
              Ekspertene bak
              <br />
              <span className="text-muted-foreground font-normal">løsningene.</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12">
              {/* Left — name list with scroll indicator */}
              <div className="relative">
                <div
                  ref={scrollListRef}
                  className="flex flex-row md:flex-col gap-1.5 md:max-h-[420px] md:overflow-y-auto overflow-x-auto scrollbar-thin"
                >
                  {CONSULTANTS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveConsultant(i)}
                      onMouseEnter={() => setActiveConsultant(i)}
                      className={`text-left px-3 py-2 rounded-lg text-[14px] font-medium transition-all whitespace-nowrap md:whitespace-normal ${
                        activeConsultant === i
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
                {/* Scroll hint */}
                {showScrollHint && (
                  <div className="hidden md:flex absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent items-end justify-center pb-1 pointer-events-none">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                      <span>Scroll for flere</span>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Right — profile */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConsultant}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-start gap-6"
                >
                  {CONSULTANTS[activeConsultant].image ? (
                    <img
                      src={CONSULTANTS[activeConsultant].image}
                      alt={CONSULTANTS[activeConsultant].name}
                      className="w-36 h-36 rounded-2xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-36 h-36 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-muted-foreground">
                        {CONSULTANTS[activeConsultant].name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[20px] font-semibold text-foreground">
                      {CONSULTANTS[activeConsultant].name}
                    </h3>
                    <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed max-w-lg">
                      {CONSULTANTS[activeConsultant].description}
                    </p>

                    {/* Meta info */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {CONSULTANTS[activeConsultant].experience}+ års erfaring
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {CONSULTANTS[activeConsultant].location}
                      </span>
                    </div>

                    {/* Competence tags */}
                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60 mb-1.5">Kompetanse</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CONSULTANTS[activeConsultant].competence.map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-0.5 text-[12px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Industry tags */}
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60 mb-1.5">Bransjeerfaring</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CONSULTANTS[activeConsultant].industries.map((ind) => (
                          <span
                            key={ind}
                            className="px-2.5 py-0.5 text-[12px] font-medium rounded-full border border-primary/20 bg-primary/5 text-foreground"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bransjer ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Bransjer</p>
            <h2 className="mt-4 text-foreground font-bold tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
              Der koden møter
              <br />
              <span className="text-muted-foreground font-normal">den virkelige verden.</span>
            </h2>
          </motion.div>

          <motion.div {...stagger} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOMAINS.map((d) => (
              <motion.div
                key={d.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="p-5 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-colors"
              >
                <d.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-[15px] font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stilling ledig ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Vi ansetter</p>
            <h2 className="mt-4 text-foreground font-bold tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
              Senior Embedded Konsulent
            </h2>
            <p className="mt-4 text-muted-foreground text-[16px] max-w-lg mx-auto leading-relaxed">
              Vi ser etter erfarne utviklere med lidenskap for embedded-systemer. Bli en del av Norges mest spesialiserte fagmiljø.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsJobOverlayOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Søk nå
                <span className="text-[16px]">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-foreground text-background py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div>
            <img src={stacqLogoWhite} alt="STACQ" className="h-5 mb-4 brightness-0 invert" />
            <p className="text-[13px] text-background/60 leading-relaxed">
              Norges ledende konsulentselskap innen embedded-systemer og lavnivå-programmering.
            </p>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-background/40 mb-4">Selskap</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => setIsOverlayOpen(true)} className="text-[14px] text-background/70 hover:text-background transition-colors">Om STACQ</button></li>
              <li><button onClick={() => setIsJobOverlayOpen(true)} className="text-[14px] text-background/70 hover:text-background transition-colors">Karriere</button></li>
            </ul>
            <p className="mt-4 text-[12px] text-background/40">STACQ AS · Org.nr: 932 575 442 MVA</p>
          </div>

          {/* Kontakt oss */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-background/40 mb-4">Kontakt oss</h4>
            <ul className="space-y-3 text-[14px] text-background/70">
              <li>
                <span className="block font-medium text-background/90">Jon Richard Nygaard</span>
                <a href="mailto:jr@stacq.no" className="hover:text-background transition-colors no-underline">jr@stacq.no</a>
              </li>
              <li>
                <span className="block font-medium text-background/90">Thomas Eriksen</span>
                <span>975 00 321</span> · <a href="mailto:thomas@stacq.no" className="hover:text-background transition-colors no-underline">thomas@stacq.no</a>
              </li>
            </ul>
          </div>

          {/* Besøk oss */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-background/40 mb-4">Besøk oss</h4>
            <p className="text-[14px] text-background/70">Øvre Slottsgate 27, 0157 Oslo</p>
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
