import { useState } from "react";
import { motion } from "framer-motion";
import OverlayPanel from "@/components/OverlayPanel";
import TerminalChat from "@/components/TerminalChat";
import stacqLogo from "@/assets/stacq-logo-black.png";

const DOMAINS = ["Forsvar", "Medtech", "Industri", "Energi"];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[45%_55%]">
        {/* Left — Info */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-0"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-[420px]">
            <motion.div variants={fadeUp}>
              <img src={stacqLogo} alt="STACQ" className="h-7 mb-12" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-foreground font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
            >
              Embedded konsulenter
              <br />
              <span className="text-muted-foreground font-normal">for lavnivåprogrammering.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-muted-foreground text-[17px] leading-relaxed">
              Vi skriver firmware, systemsoftware og maskinvarenær kode for selskaper som bygger fysiske produkter.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-2">
              {DOMAINS.map((d, i) => (
                <span key={d} className="flex items-center gap-2">
                  <span className="text-foreground text-[15px] font-medium">{d}</span>
                  {i < DOMAINS.length - 1 && (
                    <span className="text-border text-[15px]">·</span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Mer om STACQ
                <span className="text-[16px]">→</span>
              </button>
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOverlayOpen(true);
                }}
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:bg-secondary transition-colors no-underline"
              >
                Kontakt oss
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — Chat */}
        <div className="flex items-center justify-center px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-secondary">
          <div className="w-full max-w-[560px] h-[600px] md:h-[680px]">
            <TerminalChat />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 md:px-16 py-6 border-t border-border">
        <p className="text-[13px] text-muted-foreground">
          STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
        </p>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
