import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Factory, Zap, Cpu, Code, Terminal, Layers, Lock, Server, GitBranch, Workflow } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import FloatingChat from "@/components/FloatingChat";
import stacqLogo from "@/assets/stacq-logo-black.png";

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
  { title: "Forsvar", desc: "Kritiske systemer med strenge krav til robusthet og sikkerhet.", icon: Shield },
  { title: "Medtech", desc: "Medisinsk-teknisk utstyr der pålitelighet redder liv.", icon: Heart },
  { title: "Industri", desc: "Automasjon, IoT og sanntidsstyring for moderne produksjon.", icon: Factory },
  { title: "Energi", desc: "Smart infrastruktur og styringssystemer for fremtidens energi.", icon: Zap },
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

          <motion.div {...stagger} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAINS.map((d) => (
              <motion.div
                key={d.title}
                variants={{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="p-6 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-colors"
              >
                <d.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-[16px] font-semibold text-foreground">{d.title}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-foreground font-bold tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
              Klar for å bygge noe
              <br />
              som betyr noe?
            </h2>
            <p className="mt-4 text-muted-foreground text-[16px] max-w-md mx-auto leading-relaxed">
              Vi er alltid på utkikk etter dyktige embedded-utviklere som vil jobbe med prosjekter som gjør en forskjell.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Mer om STACQ
                <span className="text-[16px]">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={stacqLogo} alt="STACQ" className="h-4 opacity-40" />
          <p className="text-[12px] text-muted-foreground">
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · Org.nr. 931 871 389
          </p>
        </div>
      </footer>

      {/* Overlays & Chat */}
      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      <FloatingChat />
    </div>
  );
};

export default Index;
