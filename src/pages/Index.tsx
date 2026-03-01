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
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 30%, black 70%)'
        }} />

      <div className="relative max-w-[820px] space-y-8">
        <img src={stacqLogo} alt="STACQ" className="h-7 md:h-8" />
        <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-7xl">
          Embedded konsulenter som former fremtiden
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-muted-foreground max-w-[560px]">
          We develop firmware and embedded Linux solutions for products with high requirements for stability,
          performance, and control.
        </p>
        <div className="flex flex-wrap gap-2">
          {["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((tag) =>
          <span
            key={tag}
            className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-muted/50">

              {tag}
            </span>
          )}
        </div>
        <div className="pt-2 flex flex-col items-start gap-3">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="group relative text-[15px] font-medium tracking-[0.08em] uppercase px-9 py-3.5 rounded-lg h-[48px] flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
            style={{
              background: '#1a1d21',
              color: '#f0f0f0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.15), 0 0 0 1px rgba(184,148,108,0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
              border: '1px solid rgba(184,148,108,0.12)',
              transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(184,148,108,0.15), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(184,148,108,0.04)';
              el.style.borderColor = 'rgba(184,148,108,0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 1px 2px rgba(0,0,0,0.15), 0 0 0 1px rgba(184,148,108,0.08), inset 0 1px 0 rgba(255,255,255,0.03)';
              el.style.borderColor = 'rgba(184,148,108,0.12)';
            }}
          >
            <span>STACQ</span>
            <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 opacity-60 group-hover:opacity-90">›</span>
          </button>
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="text-[15px] font-semibold text-foreground hover:opacity-70 transition-opacity">
            Vi er STACQ ›
          </button>
        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>);

};

export default Index;