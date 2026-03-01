import { useState } from "react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <div className="max-w-[1200px] space-y-10">
        <img src={stacqLogo} alt="STACQ" className="h-6 md:h-7 w-auto opacity-80" />
        <h1 className="font-sans text-[40px] md:text-[68px] font-bold leading-[0.98] tracking-tight text-foreground max-w-3xl">
          Embedded konsulenter
          <br />
          som former fremtiden
        </h1>
        <div className="pt-4">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="font-sans text-sm font-medium bg-foreground hover:bg-foreground/90 text-background px-6 py-3.5 rounded-[11px] transition-all duration-200"
          >
            Dette er STACQ
          </button>
        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
