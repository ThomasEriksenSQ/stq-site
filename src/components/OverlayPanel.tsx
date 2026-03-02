import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import jonRichardImg from "@/assets/jon-richard-nygaard.avif";
import thomasEriksenImg from "@/assets/thomas-eriksen.avif";
import HandbookOverlay from "@/components/HandbookOverlay";

interface OverlayPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const slidePanel = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300, mass: 0.8 } },
  exit: { x: "100%", transition: { type: "spring" as const, damping: 35, stiffness: 400, mass: 0.6 } },
};

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
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const fadeUpItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const JobOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div {...fadeBackdrop} className="absolute inset-0" onClick={onClose} />
          <motion.div
            {...slideSecondary}
            className="absolute right-0 top-0 h-full w-[92%] md:w-[45%] md:min-w-[370px] bg-background border-l border-border overflow-y-auto flex flex-col shadow-lg"
          >
            <div className="sticky top-0 z-10 px-6 md:px-[96px] py-4 bg-background border-b border-border">
              <div className="max-w-[640px] w-full">
                <button onClick={onClose} className="flex items-center gap-1.5 text-accent hover:underline text-[13px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Tilbake
                </button>
              </div>
            </div>

            <motion.div className="p-6 md:p-[96px] flex-1" variants={staggerContent} initial="initial" animate="animate">
              <div className="max-w-[640px] w-full space-y-10">
                <motion.h2 variants={fadeUpItem} className="text-[34px] font-bold text-foreground leading-[1.15]">Senior Embedded Konsulent</motion.h2>

                <motion.div variants={fadeUpItem} className="space-y-3 text-foreground text-[16px] leading-[1.7]">
                  <p>
                    STACQ er et rendyrket konsulentselskap for embedded-utviklere. Vi jobber kun med embedded og lavnivå –
                    og leverer kode som brukes i virkelige produkter.
                  </p>
                </motion.div>

                <motion.div variants={fadeUpItem} className="space-y-10">
                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground mb-4">Hvorfor STACQ</h3>
                    <ul className="space-y-2 text-foreground text-[16px] leading-[1.7]">
                      {["Rendyrket fokus på embedded og lavnivå", "Prosjekter med reell betydning", "Sterkt fagmiljø (lavt ego, høy standard)", "Faglig utvikling på dine premisser", "Fleksibilitet og tillit i hverdagen", "Markedsledende betingelser"].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-[2px]">–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground mb-4">Vi ser etter</h3>
                    <ul className="space-y-2 text-foreground text-[16px] leading-[1.7]">
                      {["5+ års erfaring", "C / C++ / Rust (ett eller flere)", "Embedded systemer / RTOS / Embedded Linux", "Trives i team og tar ansvar for kvalitet"].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-[2px]">–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground mb-4">Ta kontakt</h3>
                    <p className="text-foreground text-[16px] leading-[1.7]">
                      Send en kort søknad eller ta kontakt for en uformell prat.
                    </p>
                    <div className="mt-4 space-y-1">
                      <a href="mailto:jr@stacq.no" className="block text-[14px] text-accent hover:underline">jr@stacq.no</a>
                      <a href="tel:93287267" className="block text-[14px] text-accent hover:underline">93287267</a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <a href="#" className="text-[14px] text-accent hover:underline">STACQ Handbook →</a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="px-6 md:px-[96px] py-6 border-t border-border mt-auto">
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

const OverlayPanel = ({ isOpen, onClose }: OverlayPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isJobOpen && !isHandbookOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isJobOpen, isHandbookOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            {...fadeBackdrop}
            className="absolute inset-0"
            style={{ background: "rgba(36,41,47,0.08)" }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            {...slidePanel}
            className={`absolute right-0 top-0 h-full w-full md:w-[55%] md:min-w-[440px] bg-background border-l border-border overflow-y-auto flex flex-col shadow-lg transition-opacity duration-200 ${isJobOpen || isHandbookOpen ? "opacity-40" : "opacity-100"}`}
          >
            <div className="sticky top-0 z-10 px-6 md:px-[96px] py-4 bg-background border-b border-border md:hidden">
              <button onClick={onClose} className="flex items-center gap-1.5 text-accent hover:underline text-[13px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Tilbake
              </button>
            </div>
            <motion.div className="p-6 md:p-[96px] flex-1" variants={staggerContent} initial="initial" animate="animate">
              <div className="max-w-[640px] w-full space-y-10">
                {/* Intro */}
                <motion.section variants={fadeUpItem} className="space-y-5">
                  <h1 className="text-[38px] font-bold text-foreground leading-[1.15] pb-5 border-b border-border">
                    Embedded- og lavnivåspesialister
                  </h1>
                  <p className="text-foreground text-[16px] leading-[1.7]">
                    STACQ er et norsk konsulentselskap innen embedded- og lavnivåprogrammering.
                  </p>
                  <p className="text-foreground text-[16px] leading-[1.7]">
                    Vi arbeider med utvikling av firmware og systemsoftware i pågående prosjekter for både etablerte selskaper og vekstbedrifter.
                  </p>
                </motion.section>

                {/* Kjernekompetanse */}
                <motion.section variants={fadeUpItem} className="space-y-3">
                  <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Kjernekompetanse</h2>
                  <ul className="space-y-1.5 text-foreground text-[16px] leading-[1.7]">
                    {["C / C++", "RTOS og sanntidssystemer", "Embedded Linux", "Secure Boot / TrustZone", "Yocto og board bring-up"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-[2px]">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>

                {/* Bransjeerfaring */}
                <motion.section variants={fadeUpItem} className="space-y-3">
                  <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Bransjeerfaring</h2>
                  <ul className="space-y-1.5 text-foreground text-[16px] leading-[1.7]">
                    {["Forsvar", "Helse / medtech", "Industri", "Energi"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-[2px]">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>

                {/* Jobb hos oss */}
                <motion.section variants={fadeUpItem} className="space-y-3">
                  <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Jobb hos oss</h2>
                  <p className="text-foreground text-[16px] leading-[1.7]">
                    Vi søker flere dyktige og hyggelige kollegaer.
                  </p>
                  <div className="space-y-1 pt-1">
                    <button onClick={() => setIsJobOpen(true)} className="block text-[14px] text-accent hover:underline">
                      Se ledige stillinger →
                    </button>
                    <button
                      onClick={() => setIsHandbookOpen(true)}
                      className="block text-[14px] text-muted-foreground hover:text-accent hover:underline"
                    >
                      STACQ Handbook →
                    </button>
                  </div>
                </motion.section>

                {/* Kontakt */}
                <motion.section variants={fadeUpItem} className="space-y-6">
                  <h2 className="text-[20px] font-semibold text-foreground leading-[1.35]">Kontakt</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <img src={jonRichardImg} alt="Jon Richard Nygaard" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-foreground">
                          Jon Richard Nygaard <span className="font-normal text-muted-foreground">| Partner</span>
                        </p>
                        <a href="tel:93287267" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                          <Phone className="w-3.5 h-3.5" /> 93 287 267
                        </a>
                        <a href="mailto:jr@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                          <Mail className="w-3.5 h-3.5" /> jr@stacq.no
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <img src={thomasEriksenImg} alt="Thomas Eriksen" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-foreground">
                          Thomas Eriksen <span className="font-normal text-muted-foreground">| Partner</span>
                        </p>
                        <a href="tel:97500321" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                          <Phone className="w-3.5 h-3.5" /> 97 500 321
                        </a>
                        <a href="mailto:thomas@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                          <Mail className="w-3.5 h-3.5" /> thomas@stacq.no
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>
            </motion.div>

            <div className="px-6 md:px-[96px] py-6 border-t border-border mt-auto">
              <div className="max-w-[640px] w-full">
                <p className="text-[13px] text-muted-foreground">
                  STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
                </p>
              </div>
            </div>
          </motion.div>

          <JobOverlay isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} />
          <HandbookOverlay isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default OverlayPanel;
