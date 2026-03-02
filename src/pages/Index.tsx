import { useState } from "react";
import { motion } from "framer-motion";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import heroBgChip from "@/assets/hero-bg-chip.png";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

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

      <div className="relative max-w-[880px]">
        <motion.img {...fadeUp(0)} src={stacqLogoWhite} alt="STACQ" className="h-5 md:h-6 mb-8 md:mb-10" />

        <motion.h1 {...fadeUp(0.15)} className="text-[36px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          Embedded konsulenter som former fremtiden
        </motion.h1>

        <motion.div {...fadeUp(0.3)} className="mt-8 md:mt-10 flex flex-wrap gap-2.5">
          {["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((tag) =>
          <span
            key={tag}
            className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-white/15 text-white/75 bg-white/[0.04] backdrop-blur-sm">
              {tag}
            </span>
          )}
          <span className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-white/10 text-white/45 bg-white/[0.03]">
            + More
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.45)} className="mt-10 md:mt-12">
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="group text-[14px] font-medium tracking-[0.03em] px-6 py-2.5 rounded-md h-[42px] flex items-center gap-2.5 transition-all duration-200 bg-white/[0.08] text-white/90 border border-white/[0.12] hover:bg-white/[0.13] hover:border-white/[0.22] hover:text-white">

            Mer om STACQ
            <svg
              className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              width="12"
              height="12"
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
        </motion.div>
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>);

};

export default Index;