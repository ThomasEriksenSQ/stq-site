import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Heart, Factory, Zap, Cpu, Code, Terminal, Layers, Lock, Server, GitBranch, Workflow, Radio, Smartphone, CircuitBoard, Wifi, Linkedin, MapPin, Clock, ChevronDown, Phone, Mail, Activity, Microchip, BatteryCharging, Monitor, Radar, Cog, Signal, Router } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import JobApplyOverlay from "@/components/JobApplyOverlay";
import PcbPattern from "@/components/PcbPattern";
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
import jonRichardContact from "@/assets/jon-richard-nygaard-contact.jpg";
import thomasEriksenContact from "@/assets/thomas-eriksen-contact.jpg";

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
  { title: "Medisinsk teknologi", icon: Activity },
  { title: "Halvleder og chip-utvikling", icon: Cpu },
  { title: "Energi og elektrisk mobilitet", icon: BatteryCharging },
  { title: "Forbrukerelektronikk", icon: Monitor },
  { title: "Forsvar og sikkerhetskritiske systemer", icon: Shield },
  { title: "Industriell automasjon", icon: Cog },
  { title: "Telekom og kommunikasjon", icon: Signal },
  { title: "IoT og smarte enheter", icon: Wifi },
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
  const [expandedConsultant, setExpandedConsultant] = useState<number | null>(null);


  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
        <PcbPattern />
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <img src={stacqLogo} alt="STACQ" className="h-8 md:h-10 mx-auto mb-10 md:mb-14" />

          {/* Headline */}
          <h1
            className="text-foreground font-bold tracking-tight"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Embedded, firmware
            <br />
            og C/C++/Rust konsulenter
          </h1>

          {/* Supporting copy */}
          <p
            className="mt-6 md:mt-8 text-muted-foreground mx-auto max-w-xl"
            style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.55 }}
          >
            Vi leverer Norges beste spesialister innen embedded&nbsp;systems, firmware og lavnivå-programmering.
          </p>

          {/* CTA */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                document.getElementById("consultants")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-foreground text-background font-semibold text-[15px] rounded-full hover:opacity-90 transition-opacity"
            >
              Se våre konsulenter
            </button>
            <button
              onClick={() => setIsJobOverlayOpen(true)}
              className="px-8 py-3.5 border border-border text-foreground font-medium text-[15px] rounded-full hover:bg-secondary/80 transition-colors"
            >
              Vi ansetter
            </button>
          </div>

          {/* Tags */}
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kompetanse ── */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-8 bg-primary/40" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Kompetanse</p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="text-foreground font-extrabold tracking-tight" style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Hele embedded-stacken.
            </h2>
            <p className="mt-2 font-medium text-muted-foreground/70" style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Fra hardware til sky.
            </p>
          </motion.div>

          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPETENCE_GROUPS.map((group) => (
              <motion.div
                key={group.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-md hover:border-border/80 transition-all duration-300"
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-primary mb-4">{group.title}</h3>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-[15px] text-foreground">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Konsulenter ── */}
      <section id="consultants" className="py-24 md:py-36 px-6 md:px-12 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-8 bg-primary/40" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Våre konsulenter</p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="text-foreground font-extrabold tracking-tight" style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Ekspertene bak
            </h2>
            <p className="mt-2 font-medium text-muted-foreground/70" style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              løsningene.
            </p>
          </motion.div>

          {/* Consultant card grid */}
          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {CONSULTANTS.map((c, i) => (
              <motion.div
                key={c.name}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              >
                <button
                  onClick={() => setExpandedConsultant(expandedConsultant === i ? null : i)}
                  className={`w-full text-left group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    expandedConsultant === i
                      ? "bg-background border-border shadow-lg ring-2 ring-primary/10"
                      : "bg-background/80 border-border/60 hover:border-border hover:shadow-md"
                  }`}
                >
                  {c.image ? (
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] bg-secondary flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground/30">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <div className="p-3.5 md:p-4">
                    <h3 className="text-[14px] md:text-[15px] font-semibold text-foreground leading-tight">{c.name}</h3>
                    <div className="mt-1.5 flex items-center gap-2.5 text-[11px] md:text-[12px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {c.experience}+ år
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {c.location}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {c.competence.slice(0, 3).map((comp) => (
                        <span key={comp} className="px-2 py-0.5 text-[10px] md:text-[11px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground">
                          {comp}
                        </span>
                      ))}
                      {c.competence.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] md:text-[11px] font-medium rounded-full text-muted-foreground/50">
                          +{c.competence.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Consultant profile overlay */}
          <AnimatePresence>
            {expandedConsultant !== null && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
                  onClick={() => setExpandedConsultant(null)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 z-50 w-[92vw] md:w-[45vw] bg-background overflow-y-auto"
                >
                  <div className="pt-24 pb-16 px-8 md:px-16">
                    <button
                      onClick={() => setExpandedConsultant(null)}
                      className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-sm">✕</span>
                    </button>

                    {/* Profile image */}
                    {CONSULTANTS[expandedConsultant].image ? (
                      <img
                        src={CONSULTANTS[expandedConsultant].image}
                        alt={CONSULTANTS[expandedConsultant].name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-secondary flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground/30">
                          {CONSULTANTS[expandedConsultant].name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    )}

                    {/* Name & description */}
                    <h3 className="mt-8 text-[26px] md:text-[30px] font-bold text-foreground tracking-tight">
                      {CONSULTANTS[expandedConsultant].name}
                    </h3>
                    <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                      {CONSULTANTS[expandedConsultant].description}
                    </p>

                    {/* Meta */}
                    <div className="mt-5 flex flex-wrap items-center gap-5 text-[14px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{CONSULTANTS[expandedConsultant].experience}+ års erfaring</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" />{CONSULTANTS[expandedConsultant].location}</span>
                    </div>

                    {/* Kompetanse */}
                    <div className="mt-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/50 mb-3">Kompetanse</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CONSULTANTS[expandedConsultant].competence.map((comp) => (
                          <span key={comp} className="px-3 py-1 text-[13px] font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground">{comp}</span>
                        ))}
                      </div>
                    </div>

                    {/* Bransjeerfaring */}
                    <div className="mt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/50 mb-3">Bransjeerfaring</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CONSULTANTS[expandedConsultant].industries.map((ind) => (
                          <span key={ind} className="px-3 py-1 text-[13px] font-medium rounded-full border border-primary/20 bg-primary/5 text-foreground">{ind}</span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-border">
                      <p className="text-[14px] text-muted-foreground mb-5">
                        Interessert i å booke {CONSULTANTS[expandedConsultant].name.split(" ")[0]}? Ta kontakt med:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <img src={jonRichardContact} alt="Jon Richard Nygaard" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <p className="text-[14px] font-semibold text-foreground">Jon Richard Nygaard <span className="font-normal text-muted-foreground">· Partner</span></p>
                            <div className="mt-0.5 flex items-center gap-3 text-[13px] text-muted-foreground">
                              <a href="tel:93287267" className="inline-flex items-center gap-1 hover:text-foreground transition-colors"><Phone className="w-3 h-3" />932 87 267</a>
                              <a href="mailto:jr@stacq.no" className="inline-flex items-center gap-1 hover:text-foreground transition-colors"><Mail className="w-3 h-3" />jr@stacq.no</a>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={thomasEriksenContact} alt="Thomas Eriksen" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <p className="text-[14px] font-semibold text-foreground">Thomas Eriksen <span className="font-normal text-muted-foreground">· Partner</span></p>
                            <div className="mt-0.5 flex items-center gap-3 text-[13px] text-muted-foreground">
                              <a href="tel:97500321" className="inline-flex items-center gap-1 hover:text-foreground transition-colors"><Phone className="w-3 h-3" />975 00 321</a>
                              <a href="mailto:thomas@stacq.no" className="inline-flex items-center gap-1 hover:text-foreground transition-colors"><Mail className="w-3 h-3" />thomas@stacq.no</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bransjer ── */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-8 bg-primary/40" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Bransjer</p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="text-foreground font-extrabold tracking-tight" style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Der koden møter
            </h2>
            <p className="mt-2 font-medium text-muted-foreground/70" style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              den virkelige verden.
            </p>
          </motion.div>

          <motion.div {...stagger} className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {DOMAINS.map((d) => (
              <motion.div
                key={d.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="group p-6 md:p-7 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-border/80 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.07] flex items-center justify-center mb-5 group-hover:bg-primary/[0.12] transition-colors">
                  <d.icon className="w-5 h-5 text-primary" strokeWidth={1.7} />
                </div>
                <h3 className="text-[14px] md:text-[15px] font-bold text-foreground leading-snug">{d.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stilling ledig ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-8 bg-background/25" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-background/50">Karriere</p>
              <span className="h-px w-8 bg-background/25" />
            </div>
            <h2 className="text-background font-extrabold tracking-tight" style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Bli en del av teamet.
            </h2>
            <p className="mt-2 font-medium text-background/45" style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Vi ser etter deg.
            </p>
            <div className="mt-10">
              <button
                onClick={() => setIsJobOverlayOpen(true)}
                className="inline-flex items-center gap-2.5 bg-background text-foreground px-8 py-3.5 rounded-full text-[15px] font-semibold hover:opacity-90 transition-opacity"
              >
                Søk nå
                <span className="text-[16px]">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-foreground text-background py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo + tagline */}
          <div>
            <img src={stacqLogoWhite} alt="STACQ" className="h-5 mb-5 brightness-0 invert" />
            <p className="text-[14px] text-background/50 leading-relaxed">
              Norges ledende konsulentselskap innen embedded-systemer og lavnivå-programmering.
            </p>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-background/35 mb-5">Selskap</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setIsOverlayOpen(true)} className="text-[14px] text-background/65 hover:text-background transition-colors">Om STACQ</button></li>
              <li><button onClick={() => setIsJobOverlayOpen(true)} className="text-[14px] text-background/65 hover:text-background transition-colors">Karriere</button></li>
            </ul>
            <p className="mt-5 text-[12px] text-background/30 leading-relaxed">
              STACQ AS<br />
              932 575 442 MVA
            </p>
          </div>

          {/* Kontakt oss */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-background/35 mb-5">Kontakt oss</h4>
            <ul className="space-y-4 text-[14px] text-background/65">
              <li>
                <span className="block font-medium text-background/85">Jon Richard Nygaard <span className="font-normal text-background/50">· Partner</span></span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a href="tel:93287267" className="inline-flex items-center gap-1.5 hover:text-background transition-colors"><Phone className="w-3 h-3" />932 87 267</a>
                  <a href="mailto:jr@stacq.no" className="inline-flex items-center gap-1.5 hover:text-background transition-colors"><Mail className="w-3 h-3" />jr@stacq.no</a>
                </div>
              </li>
              <li>
                <span className="block font-medium text-background/85">Thomas Eriksen <span className="font-normal text-background/50">· Partner</span></span>
                <div className="mt-1 flex flex-col gap-0.5">
                  <a href="tel:97500321" className="inline-flex items-center gap-1.5 hover:text-background transition-colors"><Phone className="w-3 h-3" />975 00 321</a>
                  <a href="mailto:thomas@stacq.no" className="inline-flex items-center gap-1.5 hover:text-background transition-colors"><Mail className="w-3 h-3" />thomas@stacq.no</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Besøk oss */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-background/35 mb-5">Besøk oss</h4>
            <p className="text-[14px] text-background/65 leading-relaxed">
              Øvre Slottsgate 27,<br />
              0157 Oslo
            </p>
            <div className="mt-4 rounded-xl overflow-hidden border border-background/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.7397!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e7be3b8cfc1%3A0x5e0ad81d0b2d6ef0!2s%C3%98vre%20Slottsgate%2027%2C%200157%20Oslo!5e0!3m2!1sno!2sno!4v1700000000000!5m2!1sno!2sno"
                width="100%"
                height="120"
                style={{ border: 0 }}
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
