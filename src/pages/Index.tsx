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

      

















































      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>);

};

export default Index;