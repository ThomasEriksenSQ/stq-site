import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft } from "lucide-react";
import stacqLogo from "@/assets/stacq-logo-black.png";

interface OverlayPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-background border-l border-border overflow-y-auto animate-slide-in-right flex flex-col">
        <div className="sticky top-0 z-10 px-8 py-4 bg-background border-b border-border">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-accent hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </button>
        </div>

        <div className="px-8 md:px-12 py-10 space-y-8">
          <h2 className="text-[22px] font-semibold text-foreground leading-[1.3]">
            Senior Embedded Developer
          </h2>

          <div className="space-y-6 max-w-[520px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Teknologi</h3>
              <div className="code-block">
                C, C++, Embedded Linux, Yocto, Bare-metal, RTOS, FPGA
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Vi ser etter</h3>
              <div className="space-y-1 text-foreground text-[15px] leading-[1.65]">
                <p>5+ års erfaring</p>
                <p>Sterk forståelse for lavnivåprogrammering</p>
                <p>Hardware-nær utvikling</p>
                <p>Gode samarbeidsevner</p>
                <p>Norsk eller skandinavisk språk</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Vi tilbyr</h3>
              <div className="space-y-1 text-foreground text-[15px] leading-[1.65]">
                <p>Konkurransedyktig lønn</p>
                <p>Sterkt fagmiljø</p>
                <p>Spennende teknologiprosjekter</p>
                <p>Kontinuerlig faglig utvikling</p>
                <p>Fleksibilitet</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <a href="#" className="text-sm text-accent hover:underline">
                STACQ Handbook →
              </a>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12 py-6 border-t border-border mt-auto">
          <p className="text-xs text-muted-foreground">
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389 MVA
          </p>
        </div>
      </div>
    </div>
  );
};

const OverlayPanel = ({ isOpen, onClose }: OverlayPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isJobOpen, setIsJobOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isJobOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isJobOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: "rgba(36,41,47,0.08)" }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full md:w-[44%] md:min-w-[420px] bg-background border-l border-border overflow-y-auto animate-slide-in-right transition-opacity duration-200 flex flex-col ${isJobOpen ? "opacity-40" : "opacity-100"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background border-b border-border">
          <img src={stacqLogo} alt="STACQ" className="h-5" />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Lukk">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-12 py-10 space-y-10 max-w-[600px]">
          {/* Intro */}
          <section className="space-y-4">
            <h1 className="text-[28px] font-semibold text-foreground leading-[1.3]">STACQ</h1>
            <div className="space-y-3 text-foreground text-[16px] leading-[1.65]">
              <p>
                STACQ er et norsk konsulentselskap med spisskompetanse innen embedded-systemer og lavnivåprogrammering.
              </p>
              <p>
                Vi utvikler programvare tett på hardware for systemer med høye krav til stabilitet, ytelse og kontroll. Våre konsulenter arbeider tett med kundens utviklingsteam og leverer produksjonsklar kode for avanserte teknologiprodukter.
              </p>
            </div>
          </section>

          {/* Kompetanse */}
          <section className="space-y-3">
            <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Kompetanse</h2>
            <div className="code-block max-w-[520px] space-y-3">
              <div>
                <span className="font-semibold">språk: </span>
                <span>C, C++, Assembly, Python</span>
              </div>
              <div>
                <span className="font-semibold">plattformer: </span>
                <span>Embedded Linux, Yocto, Mikrokontrollere</span>
              </div>
              <div>
                <span className="font-semibold">systemnivå: </span>
                <span>Bare-metal, RTOS, FPGA</span>
              </div>
              <div>
                <span className="font-semibold">fagområder: </span>
                <span>Systemarkitektur, Sikkerhet, Ytelsesoptimalisering</span>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section className="space-y-3">
            <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Jobb hos oss</h2>
            <div className="space-y-1">
              <button
                onClick={() => setIsJobOpen(true)}
                className="block text-sm text-accent hover:underline"
              >
                Se ledige stillinger →
              </button>
              <a href="#" className="block text-sm text-accent hover:underline">
                STACQ Handbook →
              </a>
            </div>
          </section>

          {/* Kontakt */}
          <section className="space-y-3">
            <h2 className="text-[18px] font-semibold text-foreground leading-[1.35]">Kontakt</h2>
            <div className="space-y-1 text-[15px] text-foreground">
              <p>Jon Richard Nygaard</p>
              <a href="tel:93287267" className="block text-sm text-accent hover:underline">93287267</a>
              <a href="mailto:jr@stacq.no" className="block text-sm text-accent hover:underline">jr@stacq.no</a>
            </div>
          </section>
        </div>
      </div>

      <JobOverlay isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} />
    </div>
  );
};

export default OverlayPanel;
