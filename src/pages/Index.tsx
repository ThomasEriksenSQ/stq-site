import { useState } from "react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import heroBg from "@/assets/hero-circuit.png";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-neutral-900">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/50" />
      {/* Hero Content - left aligned */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-5xl">
        <div className="space-y-8">
          <img src={stacqLogo} alt="STACQ" className="h-8 md:h-10 w-auto invert" />
          <h1 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] text-white">
            Embedded konsulenter
            <br />
            som former fremtiden
          </h1>
          <div className="pt-6">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="font-sans text-base font-medium bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg shadow-[#4caf50]/30"
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
