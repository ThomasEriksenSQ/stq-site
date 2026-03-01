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
          <span className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground/80 bg-muted/50">
            + More
          </span>
        </div>
        <div className="pt-2 flex flex-col items-start gap-3">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="group text-[15px] font-medium tracking-[0.04em] px-7 py-3 rounded-lg h-[46px] flex items-center gap-2.5 transition-colors duration-200"
            style={{
              background: '#151515',
              color: '#f5f5f5',
              border: '1px solid #2a2a2a',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1f1f1f';
              e.currentTarget.style.borderColor = '#3a3a3a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#151515';
              e.currentTarget.style.borderColor = '#2a2a2a';
            }}
          >
            Dette er STACQ
            <svg
              className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 11.5L11.5 4.5" />
              <path d="M5.5 4.5H11.5V10.5" />
            </svg>
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