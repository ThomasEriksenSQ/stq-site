import { useState } from "react";
import heroBg from "@/assets/hero-bg.mp4";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src={heroBg} type="video/mp4" />
      </video>

      {/* Gradient overlay on video */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center space-y-6">
          <h1 className="font-mono text-5xl md:text-7xl font-medium tracking-tight text-foreground">
            STACQ
          </h1>
          <div className="space-y-2">
            <p className="font-mono text-lg md:text-xl text-muted-foreground tracking-wide">
              Embedded-systemer
            </p>
            <p className="text-sm md:text-base text-muted-foreground/70 tracking-widest">
              fra prototype til produksjon
            </p>
          </div>
          <div className="pt-8">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="font-mono text-sm border border-border px-8 py-3 rounded text-foreground/80 hover:border-primary hover:text-primary transition-all duration-300"
            >
              Åpne STACQ →
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Panel */}
      <OverlayPanel
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
};

export default Index;
