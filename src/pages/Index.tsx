import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Phone, Mail, Clock, MapPin, Linkedin, X,
  Activity, Cpu, Zap, Smartphone, Shield, Cog, Radio, Wifi,
  ArrowRight, CheckCircle2, ChevronRight,
  Code2, Layers, Bug, ShieldCheck, Wrench, FlaskConical,
} from "lucide-react";
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

/* ─── Data ─── */

const TICKER_ITEMS = [
  "C", "C++", "Rust", "Zephyr", "FreeRTOS", "ThreadX", "Embedded Linux", "Yocto",
  "ARM Cortex", "RTOS", "CAN", "CANopen", "SPI", "I2C", "UART", "Board bring-up",
  "Bare-metal", "TrustZone", "CMake", "Linux-kjerne", "Hardware-debugging",
  "ISO 26262", "IEC 62443", "MISRA-C",
];

const SERVICES = [
  {
    icon: Cpu,
    title: "Embedded Software Development",
    text: "Full-stack embedded development from BSP and drivers to application logic. We build software that runs reliably on constrained hardware in production.",
  },
  {
    icon: Layers,
    title: "Firmware Development",
    text: "Custom firmware for microcontrollers and SoCs. From bare-metal to RTOS-based architectures, designed for performance and long-term maintainability.",
  },
  {
    icon: Code2,
    title: "C / C++ / Rust Engineering",
    text: "Deep expertise in low-level languages where every byte and cycle matters. We write code that meets the strictest requirements for safety and speed.",
  },
  {
    icon: Wrench,
    title: "Hardware-Near Debugging & Integration",
    text: "JTAG, oscilloscopes, logic analyzers — we bridge the gap between hardware and software. Board bring-up, driver development, and system integration.",
  },
  {
    icon: FlaskConical,
    title: "Testing, Validation & Production Readiness",
    text: "CI/CD for embedded, hardware-in-the-loop testing, and systematic validation. We make sure your product is production-ready, not just prototype-ready.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-Critical & High-Reliability Software",
    text: "Development according to IEC 62443, ISO 26262, and IEC 62304. For domains where software failure has real-world consequences.",
  },
];

const CASE_STUDIES = [
  {
    domain: "Medtech",
    title: "Embedded platform for a Class IIb medical device",
    challenge: "Legacy firmware on an aging MCU with no CI, no tests, and upcoming regulatory audit.",
    delivered: "Full platform migration to Yocto Linux, TDD pipeline, and IEC 62304-compliant documentation.",
    outcome: "Passed regulatory audit. 60% reduction in firmware defects post-release.",
  },
  {
    domain: "Industrial Robotics",
    title: "Real-time motion control for autonomous vehicles",
    challenge: "Intermittent control loop failures under high load causing safety shutdowns in production.",
    delivered: "Root cause analysis, RTOS architecture redesign, and deterministic scheduling with sub-ms jitter.",
    outcome: "Zero unplanned shutdowns in 14 months. System certified for autonomous operation.",
  },
  {
    domain: "EV Charging",
    title: "Secure firmware for next-gen EV charging infrastructure",
    challenge: "New ISO 15118 compliance requirements with tight go-to-market deadline.",
    delivered: "TrustZone-based secure boot, encrypted firmware updates, and protocol stack implementation.",
    outcome: "Launched on schedule. First Nordic charger with full ISO 15118-20 support.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    text: "We map your technical landscape, constraints, and goals. No sales pitch — just an honest assessment of fit.",
  },
  {
    num: "02",
    title: "Technical Assessment",
    text: "Our partners match the right consultant based on domain, tech stack, and team dynamics. One recommendation — not a CV pile.",
  },
  {
    num: "03",
    title: "Execution",
    text: "Your consultant integrates into your team. Deep ownership, long-term commitment. Most engagements last one to three years.",
  },
  {
    num: "04",
    title: "Continuity",
    text: "Knowledge transfer, documentation, and ongoing support. We build for handover from day one.",
  },
];

const DOMAIN_ICONS: Record<string, React.ComponentType<any>> = {
  "Industrial Systems": Cog,
  "Medtech & Life Sciences": Activity,
  "IoT & Connected Devices": Wifi,
  "Robotics & Autonomy": Cpu,
  "Defense & Security": Shield,
  "Energy & E-Mobility": Zap,
  "Automotive": Radio,
  "Consumer Electronics": Smartphone,
};

const DOMAINS = [
  "Industrial Systems",
  "Medtech & Life Sciences",
  "IoT & Connected Devices",
  "Robotics & Autonomy",
  "Defense & Security",
  "Energy & E-Mobility",
  "Automotive",
  "Consumer Electronics",
];

const TRUST_LOGOS = [
  "Kongsberg", "Nordic Semiconductor", "Zaptec", "Laerdal", "Aker Solutions",
  "Kitron", "Elliptic Labs", "Autostore",
];

const VALUE_PROPS = [
  { num: "01", title: "Only seniors.", text: "Every consultant has 8+ years building real products in production. No juniors. No generalists." },
  { num: "02", title: "Deeply embedded.", text: "Our people become part of your team — not an external resource. Most engagements last one to three years." },
  { num: "03", title: "Curated, not catalogued.", text: "15 consultants. Our partners know every one personally. One phone call — and you know who you need." },
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

/* ─── Animation presets ─── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-60px" },
};

/* ─── Component ─── */

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isJobOverlayOpen, setIsJobOverlayOpen] = useState(false);
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
  };

  const Tag = ({ children }: { children: string }) => (
    <span className="text-[13px] font-mono inline-flex items-center">
      <span className="text-primary">[</span>
      <span className="text-muted-foreground">&nbsp;{children}&nbsp;</span>
      <span className="text-primary">]</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ padding: '0 10vw' }}>
        <PcbPattern />
        <div className="relative z-10 max-w-[640px]">
          <img src={stacqLogoWhite} alt="STACQ" className="h-7 brightness-0 invert mb-12" />

          <p className="text-[12px] tracking-[0.22em] uppercase font-mono text-primary/75 mb-6">
            Embedded Systems Consultancy — Oslo, Norway
          </p>

          <h1 className="font-serif text-foreground" style={{ fontSize: "clamp(44px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            Engineering software<br />that can't afford to fail.
          </h1>

          <p className="mt-7 text-[16px] text-muted-foreground leading-[1.9] max-w-[500px]">
            We provide senior embedded, firmware, and C/C++/Rust engineers for
            projects where reliability, safety, and performance are non-negotiable.
            All 15 consultants are currently in active engagements.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("footer-contact")}
              className="px-7 py-3.5 bg-foreground text-background text-[13px] tracking-[0.02em] font-medium hover:opacity-90 transition-opacity duration-300"
              style={{ borderRadius: '2px' }}
            >
              Start a project
            </button>
            <button
              onClick={() => scrollTo("consultants")}
              className="px-7 py-3.5 border border-border text-muted-foreground text-[13px] tracking-[0.02em] hover:text-foreground hover:border-muted-foreground transition-all duration-300"
              style={{ borderRadius: '2px' }}
            >
              See our experts
            </button>
          </div>
        </div>

        {/* Tech ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t" style={{ borderColor: 'hsl(var(--border-subtle))' }}>
          <div className="overflow-hidden h-10 flex items-center">
            <div className="ticker-animate whitespace-nowrap flex">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="text-[11px] tracking-[0.14em] mx-4" style={{ color: 'hsl(var(--text-faint))' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. TRUSTED BY
      ════════════════════════════════════════════ */}
      <section className="border-t border-b border-border" style={{ padding: '40px 10vw' }}>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-[11px] tracking-[0.2em] uppercase font-mono text-muted-foreground/60 whitespace-nowrap shrink-0">
            Trusted by
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4 w-full">
            {TRUST_LOGOS.map((logo) => (
              <span key={logo} className="text-[13px] font-mono text-muted-foreground/40 tracking-[0.06em] hover:text-muted-foreground transition-colors duration-300">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. SERVICES / EXPERTISE
      ════════════════════════════════════════════ */}
      <section id="services" style={{ background: 'hsl(var(--surface))', padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
            Services
          </p>
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            What we do.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground leading-[1.85] max-w-[480px]">
            Deep technical capabilities across the full embedded stack — from bare-metal firmware to production-grade Linux systems.
          </p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] w-full">
          {SERVICES.map((s) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group relative bg-background border border-border hover:border-primary/40 transition-colors duration-[400ms]"
                style={{ borderRadius: '2px', padding: '32px' }}
              >
                <IconComp className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-[15px] font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-[1.85]">{s.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          4. WHY STACQ / VALUE PROPOSITION
      ════════════════════════════════════════════ */}
      <section className="border-t border-b border-border" style={{ padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
            Why Stacq
          </p>
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Not a staffing agency.<br />A curated network.
          </h2>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {VALUE_PROPS.map((item, i) => (
            <div key={item.num} className={`${i > 0 ? 'md:border-l md:border-border md:pl-12' : ''} ${i < VALUE_PROPS.length - 1 ? 'md:pr-12' : ''}`}>
              <p className="text-[11px] tracking-[0.2em] text-primary font-mono mb-5">{item.num}</p>
              <h3 className="text-[17px] font-semibold text-foreground tracking-[0.01em] mb-3">{item.title}</h3>
              <p className="text-[14px] text-muted-foreground leading-[1.9] max-w-[300px]">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          5. CASE STUDIES
      ════════════════════════════════════════════ */}
      <section id="cases" style={{ background: 'hsl(var(--surface))', padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
            Selected Projects
          </p>
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Proven in production.
          </h2>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] w-full">
          {CASE_STUDIES.map((cs) => (
            <motion.div
              key={cs.title}
              variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="bg-background border border-border hover:border-primary/30 transition-colors duration-[400ms] flex flex-col"
              style={{ borderRadius: '2px', padding: '32px' }}
            >
              <span className="text-[11px] tracking-[0.18em] uppercase font-mono text-primary mb-4">{cs.domain}</span>
              <h3 className="text-[15px] font-semibold text-foreground mb-5 leading-snug">{cs.title}</h3>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-muted-foreground/50 mb-1">Challenge</p>
                  <p className="text-[13px] text-muted-foreground leading-[1.8]">{cs.challenge}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-muted-foreground/50 mb-1">Delivered</p>
                  <p className="text-[13px] text-muted-foreground leading-[1.8]">{cs.delivered}</p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-[13px] text-foreground/80 leading-[1.7]">{cs.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          6. TEAM / CONSULTANTS
      ════════════════════════════════════════════ */}
      <section id="consultants" style={{ padding: '88px 10vw' }}>
        <div>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
              Our Consultants
            </p>
            <h2 className="font-serif text-foreground mb-3" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              The people behind the systems.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-[1.85] max-w-[500px] mb-14">
              Senior specialists with deep domain expertise. Each personally vetted by our founding partners.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] w-full">
            {consultants.map((c, i) => (
              <motion.div
                key={c.name}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              >
                <button
                  onClick={() => setExpandedConsultant(expandedConsultant === i ? null : i)}
                  className="w-full text-left group border border-border overflow-hidden hover:border-primary/35 transition-colors duration-[400ms]"
                  style={{ borderRadius: '0px' }}
                >
                  {c.image ? (
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                        style={{ filter: 'grayscale(12%) brightness(0.92)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) brightness(1.0)')}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(12%) brightness(0.92)')}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] overflow-hidden bg-secondary">
                      <img
                        src={robotAvatar}
                        alt={`${c.name} avatar`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                        style={{ filter: 'grayscale(12%) brightness(0.92)' }}
                      />
                    </div>
                  )}
                  <div className="border-t border-border" style={{ background: 'hsl(var(--surface))', padding: '16px 18px' }}>
                    <h3 className="text-[14px] font-medium text-foreground leading-snug">{c.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-[12px] text-muted-foreground">
                      <span>{c.experience}+ yrs</span>
                      <span>{c.location}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {c.competence.slice(0, 3).map((comp) => (
                        <span key={comp} className="text-[11px] font-mono whitespace-nowrap">
                          <span className="text-primary">[</span>
                          <span className="text-muted-foreground/60">&nbsp;{comp}&nbsp;</span>
                          <span className="text-primary">]</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Consultant drawer */}
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

                    <div className="flex items-start gap-6">
                      {consultants[expandedConsultant].image ? (
                        <img src={consultants[expandedConsultant].image} alt={consultants[expandedConsultant].name} className="w-24 h-24 md:w-28 md:h-28 object-cover flex-shrink-0" style={{ borderRadius: '2px' }} />
                      ) : (
                        <img src={robotAvatar} alt={`${consultants[expandedConsultant].name} avatar`} className="w-24 h-24 md:w-28 md:h-28 object-cover flex-shrink-0" style={{ borderRadius: '2px' }} />
                      )}
                      <div className="pt-1">
                        <h3 className="text-[24px] md:text-[28px] font-serif text-foreground leading-tight">
                          {consultants[expandedConsultant].name}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
                          <span>{consultants[expandedConsultant].experience}+ years experience</span>
                          <span>{consultants[expandedConsultant].location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-7 text-[15px] text-muted-foreground leading-[1.9]">
                      {consultants[expandedConsultant].description}
                    </p>

                    <div className="mt-8">
                      <p className="text-[12px] tracking-[0.18em] uppercase mb-3 text-muted-foreground/60">Competence</p>
                      <div className="flex flex-wrap gap-3">
                        {consultants[expandedConsultant].competence.map((comp) => (
                          <Tag key={comp}>{comp}</Tag>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[12px] tracking-[0.18em] uppercase mb-3 text-muted-foreground/60">Industry experience</p>
                      <div className="flex flex-wrap gap-3">
                        {consultants[expandedConsultant].industries.map((ind) => (
                          <Tag key={ind}>{ind}</Tag>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-border">
                      <p className="text-[14px] text-muted-foreground mb-4">
                        Interested in booking {consultants[expandedConsultant].name.split(" ")[0]}? Contact:
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
                              <div className="mt-0.5 flex items-center gap-3 text-[13px] text-muted-foreground">
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

      {/* ════════════════════════════════════════════
          7. HOW WE WORK
      ════════════════════════════════════════════ */}
      <section style={{ background: 'hsl(var(--surface))', padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
            Process
          </p>
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            How we work.
          </h2>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className={`relative ${i > 0 ? 'md:border-l md:border-border md:pl-8' : ''} ${i < PROCESS_STEPS.length - 1 ? 'md:pr-8' : ''}`}>
              <p className="text-[11px] tracking-[0.2em] text-primary font-mono mb-4">{step.num}</p>
              <h3 className="text-[16px] font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.85] max-w-[260px]">{step.text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          8. INDUSTRIES / DOMAINS
      ════════════════════════════════════════════ */}
      <section style={{ padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-[12px] tracking-[0.2em] uppercase mb-4 font-mono text-muted-foreground/60">
            Industries
          </p>
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Where code meets<br />the real world.
          </h2>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-4 gap-[1px] w-full">
          {DOMAINS.map((title) => {
            const IconComp = DOMAIN_ICONS[title];
            return (
              <motion.div
                key={title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group flex flex-col items-start border border-border bg-card hover:border-primary/40 transition-colors duration-300"
                style={{ borderRadius: '2px', padding: '32px 28px', minHeight: '180px' }}
              >
                {IconComp && <IconComp className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />}
                <h3 className="text-[14px] font-medium text-foreground leading-normal mt-auto">{title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          9. CTA SECTION
      ════════════════════════════════════════════ */}
      <section className="border-t border-b border-border" style={{ padding: '88px 10vw' }}>
        <motion.div {...fadeUp} className="max-w-xl">
          <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Let's build something<br />that works.
          </h2>
          <p className="mt-6 text-[15px] text-muted-foreground leading-[1.85] max-w-[440px]">
            Whether you're scaling a team, starting a new product, or solving a hard embedded problem — we'd like to hear about it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("footer-contact")}
              className="px-7 py-3.5 bg-foreground text-background text-[13px] tracking-[0.02em] font-medium hover:opacity-90 transition-opacity duration-300"
              style={{ borderRadius: '2px' }}
            >
              Start a conversation <ArrowRight className="inline w-3.5 h-3.5 ml-1.5" />
            </button>
            <button
              onClick={() => setIsJobOverlayOpen(true)}
              className="px-7 py-3.5 border border-border text-muted-foreground text-[13px] tracking-[0.02em] hover:text-foreground hover:border-muted-foreground transition-all duration-300"
              style={{ borderRadius: '2px' }}
            >
              Join as consultant
            </button>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          10. FOOTER
      ════════════════════════════════════════════ */}
      <footer id="footer-contact" className="border-t border-border" style={{ background: '#050507', padding: '72px 10vw 40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src={stacqLogoWhite} alt="STACQ" className="h-4 mb-3.5 brightness-0 invert" />
            <p className="text-[13px] tracking-[0.04em] font-mono leading-[1.8]" style={{ color: 'hsl(var(--text-faint))' }}>
              Engineering software<br />that can't afford to fail.
            </p>
            <p className="mt-6 text-[11px] font-mono" style={{ color: 'hsl(var(--text-faint))' }}>
              STACQ AS · 932 575 442 MVA
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase mb-4" style={{ color: 'hsl(var(--text-faint))' }}>Company</h4>
            <ul className="space-y-3">
              <li><button onClick={() => scrollTo("services")} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-[1.8]">Services</button></li>
              <li><button onClick={() => scrollTo("consultants")} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-[1.8]">Consultants</button></li>
              <li><button onClick={() => scrollTo("cases")} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-[1.8]">Case Studies</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase mb-4" style={{ color: 'hsl(var(--text-faint))' }}>Contact</h4>
            <ul className="space-y-4 text-[13px] text-muted-foreground leading-[1.8]">
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

          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase mb-4" style={{ color: 'hsl(var(--text-faint))' }}>Visit us</h4>
            <p className="text-[13px] text-muted-foreground leading-[1.8]">
              Øvre Slottsgate 27,<br />0157 Oslo
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
