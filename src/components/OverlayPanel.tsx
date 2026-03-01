import { useState, useEffect, useRef } from "react";
import { X, Mail, Phone } from "lucide-react";
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center justify-between p-8 bg-white/90 backdrop-blur-sm">
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">Stilling</span>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-800 transition-colors" aria-label="Lukk">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-16 pb-24 space-y-16">
          <section>
            <h2 className="font-sans text-2xl font-semibold text-neutral-900 mb-10">
              Senior Embedded Developer
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-4">Teknologi</h3>
                <p className="font-mono text-sm text-neutral-600">
                  C, C++, Embedded Linux, Yocto, Bare-metal, RTOS, FPGA
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-4">Vi ser etter</h3>
                <div className="space-y-2 text-neutral-600 text-sm">
                  <p>5+ års erfaring</p>
                  <p>Sterk forståelse for lavnivåprogrammering</p>
                  <p>Hardware-nær utvikling</p>
                  <p>Gode samarbeidsevner</p>
                  <p>Norsk eller skandinavisk språk</p>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-4">Vi tilbyr</h3>
                <div className="space-y-2 text-neutral-600 text-sm">
                  <p>Konkurransedyktig lønn</p>
                  <p>Sterkt fagmiljø</p>
                  <p>Spennende teknologiprosjekter</p>
                  <p>Kontinuerlig faglig utvikling</p>
                  <p>Fleksibilitet</p>
                </div>
              </div>
            </div>
          </section>
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white border-l border-neutral-200 overflow-y-auto animate-slide-in-right"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-8 bg-white/90 backdrop-blur-sm">
          <img src={stacqLogo} alt="STACQ" className="h-6 w-auto" />
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-800 transition-colors" aria-label="Lukk">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-16 pb-24 space-y-20">
          {/* STACQ */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-6">STACQ</h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed max-w-md">
              <p>
                STACQ er et norsk konsulentselskap med spisskompetanse innen embedded-systemer og lavnivåprogrammering.
              </p>
              <p>
                Vi utvikler programvare tett på hardware for systemer med høye krav til stabilitet, ytelse og kontroll. Våre konsulenter arbeider tett med kundens utviklingsteam og leverer produksjonsklar kode for avanserte teknologiprodukter.
              </p>
            </div>
          </section>

          {/* Kompetanse */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">Kompetanse</h2>
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-1">Språk</span>
                <p className="font-mono text-sm text-neutral-700">C, C++, Assembly, Python</p>
              </div>
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-1">Plattformer</span>
                <p className="font-mono text-sm text-neutral-700">Embedded Linux, Yocto, Mikrokontrollere</p>
              </div>
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-1">Systemnivå</span>
                <p className="font-mono text-sm text-neutral-700">Bare-metal, RTOS, FPGA</p>
              </div>
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-1">Fagområder</span>
                <p className="font-mono text-sm text-neutral-700">Systemarkitektur, Sikkerhet, Ytelsesoptimalisering</p>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-6">Jobb hos oss</h2>
            <button
              onClick={() => setIsJobOpen(true)}
              className="font-mono text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Jobb hos oss →
            </button>
          </section>

          {/* Håndbok */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-6">Håndbok</h2>
            <a href="#" className="font-mono text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
              STACQ Handbook →
            </a>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-6">Kontakt</h2>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>Jon Richard Nygaard</p>
              <a href="tel:93287267" className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                93287267
              </a>
              <a href="mailto:jr@stacq.no" className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                jr@stacq.no
              </a>
            </div>
          </section>
        </div>
      </div>

      <JobOverlay isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} />
    </div>
  );
};

export default OverlayPanel;
