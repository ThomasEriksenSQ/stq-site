import { useEffect, useRef } from "react";
import { X, Mail, Linkedin } from "lucide-react";

interface OverlayPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const OverlayPanel = ({ isOpen, onClose }: OverlayPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-overlay border-l border-border overflow-y-auto animate-slide-in-right"
      >
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-end p-8">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Lukk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-16 pb-24 space-y-24">
          {/* Om STACQ */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase mb-8">
              Om STACQ
            </h2>
            <p className="text-foreground/80 leading-relaxed max-w-md">
              STACQ bygger embedded-systemer fra prototype til produksjon.
              Vi jobber tett med hardware og leverer deterministisk,
              produksjonsklar programvare for systemer som skal vare.
            </p>
          </section>

          {/* Kompetanse */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase mb-8">
              Kompetanse
            </h2>
            <div className="code-block bg-secondary/50 border border-border rounded p-6 md:p-8">
              <div>
                <span className="code-key">kompetanse</span>{" "}
                <span className="code-bracket">{"{"}</span>
              </div>
              <div className="ml-6 mt-4 space-y-4">
                <div>
                  <span className="code-key">språk:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="code-value">C</div>
                    <div className="code-value">C++</div>
                  </div>
                </div>
                <div>
                  <span className="code-key">plattformer:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="code-value">Embedded Linux</div>
                    <div className="code-value">Yocto</div>
                    <div className="code-value">Qt</div>
                  </div>
                </div>
                <div>
                  <span className="code-key">fagområder:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="code-value">robotikk</div>
                    <div className="code-value">computer vision</div>
                    <div className="code-value">edge AI</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <span className="code-bracket">{"}"}</span>
              </div>
            </div>
          </section>

          {/* Engineering */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase mb-8">
              Engineering
            </h2>
            <div className="code-block bg-secondary/50 border border-border rounded p-6 md:p-8">
              <div>
                <span className="code-key">engineering_prinsipper</span>{" "}
                <span className="code-bracket">{"{"}</span>
              </div>
              <div className="ml-6 mt-3 space-y-2">
                <div className="code-value">deterministiske systemer;</div>
                <div className="code-value">produksjonsklar kode;</div>
                <div className="code-value">testbar firmware;</div>
                <div className="code-value">lang levetid;</div>
              </div>
              <div className="mt-3">
                <span className="code-bracket">{"}"}</span>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase mb-8">
              Jobb hos oss
            </h2>
            <p className="text-foreground/80 leading-relaxed max-w-md mb-6">
              Vi søker ingeniører som bryr seg om:
            </p>
            <ul className="space-y-2 text-foreground/70 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-primary text-xs">•</span>
                ren C++
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-xs">•</span>
                systemer nær hardware
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-xs">•</span>
                kvalitet over tid
              </li>
            </ul>
            <button className="font-mono text-sm border border-border px-6 py-3 rounded text-foreground/80 hover:border-primary hover:text-primary transition-all duration-300">
              Les håndboken →
            </button>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase mb-8">
              Kontakt
            </h2>
            <p className="text-foreground/80 leading-relaxed max-w-md mb-8">
              Snakk med STACQ
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:post@stacq.no"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-sm">post@stacq.no</span>
              </a>
              <a
                href="https://linkedin.com/company/stacq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;
