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
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-background border-l border-border shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center gap-3 p-8 bg-background/95 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </button>
        </div>

        <div className="px-8 md:px-12 pb-24 space-y-12">
          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-10">
              Senior Embedded Developer
            </h2>

            <div className="space-y-10">
              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-3">Teknologi</span>
                <div className="code-block">
                  C, C++, Embedded Linux, Yocto, Bare-metal, RTOS, FPGA
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-3">Vi ser etter</span>
                <div className="space-y-2 text-foreground text-[15px] leading-[1.7]">
                  <p>5+ års erfaring</p>
                  <p>Sterk forståelse for lavnivåprogrammering</p>
                  <p>Hardware-nær utvikling</p>
                  <p>Gode samarbeidsevner</p>
                  <p>Norsk eller skandinavisk språk</p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-3">Vi tilbyr</span>
                <div className="space-y-2 text-foreground text-[15px] leading-[1.7]">
                  <p>Konkurransedyktig lønn</p>
                  <p>Sterkt fagmiljø</p>
                  <p>Spennende teknologiprosjekter</p>
                  <p>Kontinuerlig faglig utvikling</p>
                  <p>Fleksibilitet</p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-3">Håndbok</span>
                <a href="#" className="text-[15px] text-foreground hover:text-primary transition-colors">
                  STACQ Handbook →
                </a>
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
      {/* Subtle dim — NOT full black overlay */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: "rgba(36,41,47,0.08)" }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full md:w-[44%] md:min-w-[420px] bg-background border-l border-border shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-y-auto animate-slide-in-right transition-opacity duration-200 ${isJobOpen ? "opacity-40" : "opacity-100"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-8 bg-background/95 backdrop-blur-sm">
          <img src={stacqLogo} alt="STACQ" className="h-5 w-auto" />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Lukk">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-12 pb-24 space-y-16">
          {/* STACQ */}
          <section>
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-4">STACQ</span>
            <div className="space-y-4 text-foreground text-[15px] leading-[1.7] max-w-[420px]">
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
            <div
              className="max-w-[520px] mt-6"
              style={{
                background: '#F6F8FA',
                border: '1px solid hsl(213, 18%, 83%)',
                borderRadius: '8px',
                padding: '24px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              <div style={{ color: '#64748B', marginBottom: '18px' }}>kompetanse</div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ color: '#0F172A', fontWeight: 600 }}>språk:</div>
                <div style={{ color: '#334155' }}>C, C++, Assembly, Python</div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ color: '#0F172A', fontWeight: 600 }}>plattformer:</div>
                <div style={{ color: '#334155' }}>Embedded Linux, Yocto, Mikrokontrollere</div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ color: '#0F172A', fontWeight: 600 }}>systemnivå:</div>
                <div style={{ color: '#334155' }}>Bare-metal, RTOS, FPGA</div>
              </div>

              <div>
                <div style={{ color: '#0F172A', fontWeight: 600 }}>fagområder:</div>
                <div style={{ color: '#334155' }}>Systemarkitektur, Sikkerhet, Ytelsesoptimalisering</div>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section>
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-4">Jobb hos oss</span>
            <button
              onClick={() => setIsJobOpen(true)}
              className="text-[15px] text-foreground hover:text-primary transition-colors"
            >
              Jobb hos oss →
            </button>
          </section>

          {/* Håndbok */}
          <section>
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-4">Håndbok</span>
            <a href="#" className="text-[15px] text-foreground hover:text-primary transition-colors">
              STACQ Handbook →
            </a>
          </section>

          {/* Kontakt */}
          <section>
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase block mb-4">Kontakt</span>
            <div className="space-y-2 text-[15px] text-foreground">
              <p>Jon Richard Nygaard</p>
              <a href="tel:93287267" className="block hover:text-primary transition-colors">93287267</a>
              <a href="mailto:jr@stacq.no" className="block hover:text-primary transition-colors">jr@stacq.no</a>
            </div>
          </section>
        </div>
      </div>

      <JobOverlay isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} />
    </div>
  );
};

export default OverlayPanel;
