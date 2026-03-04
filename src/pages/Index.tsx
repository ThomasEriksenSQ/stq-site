import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Heart, Factory, Zap, Cpu, Code, Terminal, Layers, Lock, Server, GitBranch, Workflow, Radio, Smartphone, CircuitBoard, Wifi, Linkedin } from "lucide-react";
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
  { label: "C / C++", icon: Code },
  { label: "Rust", icon: Terminal },
  { label: "Firmware", icon: Cpu },
  { label: "Embedded Linux", icon: Layers },
  { label: "Yocto", icon: Workflow },
  { label: "RTOS", icon: Server },
  { label: "ARM / RISC-V", icon: GitBranch },
  { label: "Security", icon: Lock },
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
    description: "Senior embedded-profil med tung erfaring fra komplekse produkter (kamera/IoT) og sikkerhet. Sterk på arkitektur, ytelse, release/infrastruktur og teamledelse.",
  },
  {
    name: "Lars Rudolfsen",
    image: larsRudolfsen,
    competence: ["Autonomi", "Regulering", "STM32", "FreeRTOS", "CANopen", "Embedded Linux"],
    description: "Kybernetikk/robotikk-ingeniør med erfaring fra sanntidsstyring og integrasjon i komplekse systemer. Spiss på regulering, sensorer og robust embedded kommunikasjon.",
  },
  {
    name: "Ida Abrahamsson",
    image: idaAbrahamsson,
    competence: ["Embedded", "FreeRTOS", "CANopen", "IoT", "AWS", "C/C++"],
    description: "Senior embedded- og kontrollsystemingeniør med bred erfaring fra IoT, automasjon og robotikk. Leverer prototyper og produksjonsklare løsninger med struktur og driv.",
  },
  {
    name: "Trine Ø. Olsen",
    image: trineOlsen,
    competence: ["Defence", "C2", "RTOS", "Sensor Fusion", "Networking", "Robust Systems"],
    description: "Embedded-ingeniør med erfaring fra forsvar og sikkerhetskritiske systemer (C2, sensorer, taktiske nett). Sterk på robusthet, integrasjon og systemer som må fungere i krevende miljø.",
  },
  {
    name: "Tom Erik Lundesgaard",
    image: tomErikLundesgaard,
    competence: ["Embedded", "Bare-metal", "Zigbee", "Test/Debug", "Electronics", "Subsea"],
    description: "Senior embedded-ingeniør med lang fartstid fra forsvar, medtech og subsea. Praktisk sterk på feilsøking, RF/kommunikasjon og samspillet SW–HW.",
  },
  {
    name: "Karl Eirik Bang Fossberg",
    image: karlEirikFossberg,
    competence: ["Robotics", "RTOS", "Embedded Linux", "Qt", "IoT", "CI/CD"],
    description: "Senior embedded med dokumentert leveranse i robotsystemer og industrielle løsninger. Kombinerer arkitektur, motor/sensor-integrasjon og DevOps for raske og stabile leveranser.",
  },
  {
    name: "Rikke Solbjørg",
    image: rikkeSolbjorg,
    competence: ["MedTech", "Yocto", "Embedded Linux", "Verification", "CI/CD", "TDD"],
    description: "Senior embedded-profil med erfaring fra regulert medisinsk utvikling og høy kvalitet. Sterk på Yocto, testdrevet utvikling, automasjon og risikoreduserende engineering.",
  },
  {
    name: "Anders Larsen",
    image: null,
    competence: ["C++", "Qt", "Embedded Linux", "Leadership", "Graphics", "Developer Tooling"],
    description: "Senior C++/Qt med ledelseserfaring og produktutvikling i skalerbare team. Solid på plattform, verktøy og robuste applikasjoner – også grafikk/3D ved behov.",
  },
  {
    name: "Trond Hübertz Emaus",
    image: null,
    competence: ["Rust", "C++", "Architecture", "Embedded", "CMake/Conan", "System Design"],
    description: "Arkitektursterk systemutvikler som bygger fundament og mønstre som øker teamhastighet. Bred bakgrunn fra embedded og plattformnære systemer.",
  },
  {
    name: "Christian Steffen Poljac",
    image: christianPoljac,
    competence: ["Security", "TrustZone", "RTOS", "Firmware", "Zephyr", "ISO15118"],
    description: "Senior embedded med tydelig sikkerhetsprofil (TrustZone, fuzzing, hardening) og erfaring fra EV/charging og SoC. Leverer robust, testbar firmware med høy kvalitet.",
  },
  {
    name: "Martin Tysseland",
    image: martinTysseland,
    competence: ["Embedded Linux", "Yocto", "C++", "CI/CD", "Docker", "Systems"],
    description: "Embedded Linux/Yocto-utvikler med erfaring fra produktutvikling og drift/byggkjeder. God på helhet fra device-image til applikasjon og automasjon.",
  },
  {
    name: "Mattis Asp",
    image: mattisAsp,
    competence: ["Embedded", "Systems", "C/C++", "Architecture", "Integration"],
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

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <img src={stacqLogo} alt="STACQ" className="h-5" />
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Om STACQ
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <h1
              className="text-foreground font-bold tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Embedded- og
              <br />
              <span className="text-muted-foreground font-normal">lavnivåspesialister.</span>
            </h1>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors"
              >
                <tag.icon className="w-3.5 h-3.5" />
                {tag.label}
              </span>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-10">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Mer om STACQ
              <span className="text-[16px]">→</span>
            </button>
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

          <motion.div {...stagger} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECH_TAGS.map((tag) => (
              <motion.div
                key={tag.label}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
              >
                <tag.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-[14px] font-medium text-foreground">{tag.label}</span>
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
              {/* Left — name list */}
              <div className="flex flex-row md:flex-col gap-2">
                {CONSULTANTS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveConsultant(i)}
                    onMouseEnter={() => setActiveConsultant(i)}
                    className={`text-left px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${
                      activeConsultant === i
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
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
                      className="w-28 h-28 rounded-2xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {CONSULTANTS[activeConsultant].name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground">
                      {CONSULTANTS[activeConsultant].name}
                    </h3>
                    <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed max-w-md">
                      {CONSULTANTS[activeConsultant].description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {CONSULTANTS[activeConsultant].competence.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 text-[13px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
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
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsJobOverlayOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Søk nå
                <span className="text-[16px]">→</span>
              </button>
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-[15px] font-medium border border-border text-foreground hover:bg-secondary transition-colors"
              >
                Mer om STACQ
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-foreground text-background py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
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
          </div>

          {/* Kompetanse */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-background/40 mb-4">Kompetanse</h4>
            <ul className="space-y-2.5">
              {["Embedded Linux", "Firmware", "RTOS", "Yocto", "Security"].map((t) => (
                <li key={t} className="text-[14px] text-background/70">{t}</li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-background/40 mb-4">Kontakt</h4>
            <ul className="space-y-2.5 text-[14px] text-background/70">
              <li>Øvre Slottsgate 27</li>
              <li>0157 Oslo</li>
              <li className="pt-1"><a href="mailto:post@stacq.no" className="hover:text-background transition-colors no-underline">post@stacq.no</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-background/40">
            © {new Date().getFullYear()} STACQ AS · Org.nr. 931 871 389
          </p>
          <a href="https://linkedin.com/company/stacq" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors no-underline">
            <Linkedin className="w-4 h-4" />
          </a>
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
