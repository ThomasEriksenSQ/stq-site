import { useEffect, useRef } from "react";
import { X, Mail, Linkedin } from "lucide-react";
import stacqLogo from "@/assets/stacq-logo-black.png";

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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel - white background */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white border-l border-neutral-200 overflow-y-auto animate-slide-in-right"
      >
        {/* Header with logo and close */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-8 bg-white/90 backdrop-blur-sm">
          <img src={stacqLogo} alt="STACQ" className="h-6 w-auto" />
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-800 transition-colors"
            aria-label="Lukk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-16 pb-24 space-y-24">
          {/* Om STACQ */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">
              Om STACQ
            </h2>
            <p className="text-neutral-700 leading-relaxed max-w-md">
              STACQ bygger embedded-systemer fra prototype til produksjon.
              Vi jobber tett med hardware og leverer deterministisk,
              produksjonsklar programvare for systemer som skal vare.
            </p>
          </section>

          {/* Kompetanse */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">
              Kompetanse
            </h2>
            <div className="font-mono text-sm leading-relaxed bg-neutral-50 border border-neutral-200 rounded p-6 md:p-8">
              <div>
                <span className="text-neutral-900">kompetanse</span>{" "}
                <span className="text-neutral-400">{"{"}</span>
              </div>
              <div className="ml-6 mt-4 space-y-4">
                <div>
                  <span className="text-neutral-900">språk:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="text-neutral-600">C</div>
                    <div className="text-neutral-600">C++</div>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-900">plattformer:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="text-neutral-600">Embedded Linux</div>
                    <div className="text-neutral-600">Yocto</div>
                    <div className="text-neutral-600">Qt</div>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-900">fagområder:</span>
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="text-neutral-600">robotikk</div>
                    <div className="text-neutral-600">computer vision</div>
                    <div className="text-neutral-600">edge AI</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-neutral-400">{"}"}</span>
              </div>
            </div>
          </section>

          {/* Engineering */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">
              Engineering
            </h2>
            <div className="font-mono text-sm leading-relaxed bg-neutral-50 border border-neutral-200 rounded p-6 md:p-8">
              <div>
                <span className="text-neutral-900">engineering_prinsipper</span>{" "}
                <span className="text-neutral-400">{"{"}</span>
              </div>
              <div className="ml-6 mt-3 space-y-2">
                <div className="text-neutral-600">deterministiske systemer;</div>
                <div className="text-neutral-600">produksjonsklar kode;</div>
                <div className="text-neutral-600">testbar firmware;</div>
                <div className="text-neutral-600">lang levetid;</div>
              </div>
              <div className="mt-3">
                <span className="text-neutral-400">{"}"}</span>
              </div>
            </div>
          </section>

          {/* Jobb hos oss */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">
              Jobb hos oss
            </h2>
            <p className="text-neutral-700 leading-relaxed max-w-md mb-6">
              Vi søker ingeniører som bryr seg om:
            </p>
            <ul className="space-y-2 text-neutral-600 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">•</span>
                ren C++
              </li>
              <li className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">•</span>
                systemer nær hardware
              </li>
              <li className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">•</span>
                kvalitet over tid
              </li>
            </ul>
            <button className="font-mono text-sm border border-neutral-300 px-6 py-3 rounded text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300">
              Les håndboken →
            </button>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-8">
              Kontakt
            </h2>
            <p className="text-neutral-700 leading-relaxed max-w-md mb-8">
              Snakk med STACQ
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:post@stacq.no"
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-sm">post@stacq.no</span>
              </a>
              <a
                href="https://linkedin.com/company/stacq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
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
