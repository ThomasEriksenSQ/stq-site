import { useState } from "react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import heroBg from "@/assets/hero-circuit.png";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Content - left aligned */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-5xl">
        <div className="space-y-8">
          <img src={stacqLogo} alt="STACQ" className="h-8 md:h-10 w-auto" />
          <h1 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] text-neutral-900">
            Embedded konsulenter
            <br />
            som former fremtiden
          </h1>
          <div className="pt-6">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="font-sans text-base font-medium bg-[hsl(220,80%,50%)] hover:bg-[hsl(220,80%,45%)] text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg shadow-[hsl(220,80%,50%)/0.3]"
            >
              Dette er STACQ
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Panel */}
      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
