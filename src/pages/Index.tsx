import { useState } from "react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogo from "@/assets/stacq-logo-black.png";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <div className="max-w-[720px] space-y-6">
        <img src={stacqLogo} alt="STACQ" className="h-5" />
        <h1 className="text-[36px] md:text-[40px] font-semibold leading-[1.25] tracking-[-0.01em] text-foreground">
          Embedded utvikling
          <br />
          tett på hardware
        </h1>
        <div className="pt-2">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="text-sm font-medium bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity h-[40px]"
          >
            Om STACQ →
          </button>
        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
