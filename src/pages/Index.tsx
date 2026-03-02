import { useState } from "react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import heroBgChip from "@/assets/hero-bg-chip.png";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBgChip})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-[820px] space-y-8">
        <img src={stacqLogoWhite} alt="STACQ" className="h-7 md:h-8" />
        <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-7xl">
          Embedded konsulenter som former fremtiden
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-white/70">Spesialister i C, C++, Rust, Embedded, Firmware og Security


        </p>
        <div className="flex flex-wrap gap-2">
          {["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((tag) =>
          <span
            key={tag}
            className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-white/20 text-white/80 bg-white/5">
              {tag}
            </span>
          )}
          <span className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-white/20 text-white/60 bg-white/5">
            + More
          </span>
        </div>
        <div className="pt-2 flex flex-col items-start gap-3">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="group text-[15px] font-medium tracking-[0.04em] px-7 py-3 rounded-lg h-[46px] flex items-center gap-2.5 transition-colors duration-200 bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30">

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
              strokeLinejoin="round">

              <path d="M4.5 11.5L11.5 4.5" />
              <path d="M5.5 4.5H11.5V10.5" />
            </svg>
          </button>
          




        </div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>);

};

export default Index;