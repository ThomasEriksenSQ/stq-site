import { useState } from "react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogo from "@/assets/stacq-logo-black.png";
import heroCircuit from "@/assets/hero-circuit.png";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroCircuit})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 30%, black 70%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 30%, black 70%)',
        }}
      />
      <div className="relative max-w-[820px] space-y-8">
        <img src={stacqLogo} alt="STACQ" className="h-7 md:h-8" />
        <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-8xl">
          Embedded konsulenter som former fremtiden
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-muted-foreground max-w-[560px]">
          We develop firmware and embedded Linux solutions for products with high requirements for stability,
          performance, and control.
        </p>
        <div className="flex flex-wrap gap-2">
          {["C/C++", "Rust", "Assembly", "Embedded Linux", "Yocto", "STM32"].map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-muted/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="text-[15px] font-medium bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity h-[46px]"
          >
            Dette er STACQ →
          </button>
        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
