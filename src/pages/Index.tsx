import { useState } from "react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <div className="max-w-[1200px] space-y-10">
        <img src={stacqLogo} alt="STACQ" className="h-6 md:h-7 w-auto opacity-80" />
        <h1 className="font-sans text-[36px] md:text-[60px] font-bold leading-[1.05] tracking-[-0.02em] text-foreground max-w-3xl">
          Embedded konsulenter
          <br />
          som former fremtiden
        </h1>
        <div className="pt-4">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="font-sans text-sm font-medium bg-foreground hover:bg-foreground/95 text-background px-5 py-2.5 rounded-lg transition-all duration-200 h-[42px]"
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
