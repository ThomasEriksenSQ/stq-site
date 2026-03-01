import { useState } from "react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogo from "@/assets/stacq-logo-black.png";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <div className="max-w-[820px] space-y-8">
        <img src={stacqLogo} alt="STACQ" className="h-7 md:h-8" />
        <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-8xl">
          Embedded konsulenter som former fremtiden
          <br />
          close to the hardware.
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-muted-foreground max-w-[560px]">
          We develop firmware and embedded Linux solutions for products with high requirements for stability,
          performance, and control.
        </p>
        <div className="pt-4">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="group relative text-[15px] font-medium bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] pl-7 pr-6 py-3 rounded-lg hover:shadow-[0_4px_20px_hsl(var(--cta)/0.35)] transition-all duration-300 ease-out hover:-translate-y-[1px] h-[48px] inline-flex items-center gap-3"
          >
            Dette er STACQ
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
