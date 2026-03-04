import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, HeartPulse, Factory, Zap, ChevronRight } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import stacqLogoBlack from "@/assets/stacq-logo-black.png";
import heroBg from "@/assets/hero-bg.png";
import teamPhoto from "@/assets/team-photo.png";

const TECH_TAGS = ["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"];

const DOMAINS = [
  {
    icon: Shield,
    title: "Forsvar",
    desc: "Kritiske systemer med strenge krav til robusthet og sikkerhet.",
  },
  {
    icon: HeartPulse,
    title: "Medtech",
    desc: "Medisinsk-teknisk utstyr der pålitelighet redder liv.",
  },
  {
    icon: Factory,
    title: "Industri",
    desc: "Automasjon, IoT og sanntidsstyring.",
  },
  {
    icon: Zap,
    title: "Energi",
    desc: "Smart infrastruktur og styringssystemer.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-16 py-6">
          <img src={stacqLogoWhite} alt="STACQ" className="h-6" />
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="text-[14px] font-medium text-white/80 hover:text-white transition-colors"
          >
            Om STACQ
          </button>
        </nav>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Embedded- og
            <br />
            lavnivåspesialister.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/60 text-[18px] md:text-[20px] leading-relaxed max-w-xl mx-auto"
          >
            Vi skriver firmware, systemsoftware og maskinvarenær kode for selskaper som bygger fysiske produkter.
          </motion.p>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[13px] font-medium rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => {
                document.getElementById("kompetanse")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3 rounded-lg text-[15px] font-semibold hover:bg-white/90 transition-colors"
            >
              Utforsk
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3 rounded-lg text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              Om STACQ
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ KOMPETANSE ═══════════════ */}
      <section id="kompetanse" className="py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Kompetanse
            </p>
            <h2
              className="mt-4 text-foreground font-bold leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
            >
              Hele embedded-stacken.
              <br />
              <span className="text-muted-foreground font-normal">Fra hardware til sky.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_TAGS.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <span className="text-[15px] font-medium text-foreground">{tag}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12">
            <p className="text-muted-foreground text-[16px] leading-relaxed max-w-2xl">
              Vi dekker alt fra bare-metal firmware i C til komplekse Embedded Linux-distribusjoner med Yocto. 
              Sikkerhet, RTOS-integrasjoner og hardware-abstraksjon er hverdagen vår.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TEAM PHOTO BREAK ═══════════════ */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={teamPhoto}
          alt="STACQ-teamet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </section>

      {/* ═══════════════ BRANSJER ═══════════════ */}
      <section id="bransjer" className="py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Bransjer
            </p>
            <h2
              className="mt-4 text-foreground font-bold leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
            >
              Der koden møter
              <br />
              <span className="text-muted-foreground font-normal">den virkelige verden.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOMAINS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all"
              >
                <d.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-[18px] font-semibold text-foreground">{d.title}</h3>
                <p className="mt-2 text-muted-foreground text-[15px] leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-24 md:py-32 px-8 md:px-16">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            className="text-foreground font-bold leading-[1.12] tracking-tight"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            Klar for å bygge noe som betyr noe?
          </h2>
          <p className="mt-4 text-muted-foreground text-[17px] leading-relaxed max-w-xl mx-auto">
            Vi ser etter erfarne embedded-utviklere som vil jobbe med reelle produkter, i et sterkt fagmiljø.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-lg text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Mer om STACQ
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-border px-8 md:px-16 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <img src={stacqLogoBlack} alt="STACQ" className="h-5 mb-4" />
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Øvre Slottsgate 27, 0157 Oslo
              <br />
              Org.nr. 931 871 389
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 text-[14px]">
            <a href="mailto:post@stacq.no" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
              post@stacq.no
            </a>
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Om STACQ
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-border">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} STACQ AS. Alle rettigheter reservert.
          </p>
        </div>
      </footer>

      {/* Floating chat */}
      <FloatingChat />

      {/* Overlay */}
      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
