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
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-background border-l border-border overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-background border-b border-border">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-accent hover:underline transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </button>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-8">
          <h2 className="text-xl font-semibold text-foreground leading-[1.25]">
            Senior Embedded Developer
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Teknologi</h3>
              <div className="code-block">
                C, C++, Embedded Linux, Yocto, Bare-metal, RTOS, FPGA
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Vi ser etter</h3>
              <ul className="space-y-1 text-foreground text-[15px] leading-[1.65]">
                <li>5+ års erfaring</li>
                <li>Sterk forståelse for lavnivåprogrammering</li>
                <li>Hardware-nær utvikling</li>
                <li>Gode samarbeidsevner</li>
                <li>Norsk eller skandinavisk språk</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Vi tilbyr</h3>
              <ul className="space-y-1 text-foreground text-[15px] leading-[1.65]">
                <li>Konkurransedyktig lønn</li>
                <li>Sterkt fagmiljø</li>
                <li>Spennende teknologiprosjekter</li>
                <li>Kontinuerlig faglig utvikling</li>
                <li>Fleksibilitet</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-border">
              <a href="#" className="text-sm text-accent hover:underline">
                STACQ Handbook →
              </a>
            </div>
          </div>
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
        style={{ background: "rgba(31,35,40,0.15)" }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full md:w-[44%] md:min-w-[420px] bg-background border-l border-border overflow-y-auto animate-slide-in-right transition-opacity duration-200 ${isJobOpen ? "opacity-40" : "opacity-100"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background border-b border-border">
          <img src={stacqLogo} alt="STACQ" className="h-5 w-auto" />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Lukk">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-10">
          {/* STACQ */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">STACQ</h3>
            <div className="space-y-3 text-foreground text-[15px] leading-[1.65] max-w-[480px]">
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
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Kompetanse</h3>
            <div
              className="max-w-[520px]"
              style={{
                background: '#F6F8FA',
                border: '1px solid hsl(210, 18%, 84%)',
                borderRadius: '6px',
                padding: '16px 20px',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                fontSize: '13px',
                lineHeight: '1.6',
              }}
            >
              <div style={{ color: '#656D76', marginBottom: '14px', fontSize: '12px' }}>kompetanse</div>

              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#1F2328', fontWeight: 600 }}>språk: </span>
                <span style={{ color: '#1F2328' }}>C, C++, Assembly, Python</span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#1F2328', fontWeight: 600 }}>plattformer: </span>
                <span style={{ color: '#1F2328' }}>Embedded Linux, Yocto, Mikrokontrollere</span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#1F2328', fontWeight: 600 }}>systemnivå: </span>
                <span style={{ color: '#1F2328' }}>Bare-metal, RTOS, FPGA</span>
              </div>

              <div>
                <span style={{ color: '#1F2328', fontWeight: 600 }}>fagområder: </span>
                <span style={{ color: '#1F2328' }}>Systemarkitektur, Sikkerhet, Ytelsesoptimalisering</span>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Jobb hos oss</h3>
            <button
              onClick={() => setIsJobOpen(true)}
              className="text-sm text-accent hover:underline"
            >
              Se ledige stillinger →
            </button>
          </section>

          {/* Håndbok */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Håndbok</h3>
            <a href="#" className="text-sm text-accent hover:underline">
              STACQ Handbook →
            </a>
          </section>

          {/* Kontakt */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-3">Kontakt</h3>
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
