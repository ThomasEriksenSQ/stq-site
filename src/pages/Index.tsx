import { useState } from "react";
import heroBg from "@/assets/hero-bg.png";
import OverlayPanel from "@/components/OverlayPanel";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Image Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />

      {/* Hero Content - left aligned */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-3xl">
        <div className="space-y-8">
          <p className="font-mono text-sm tracking-widest text-primary uppercase">
            STACQ
          </p>
          <h1 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] text-foreground">
            Embedded konsulenter som former fremtiden
          </h1>
          <div className="flex flex-col gap-4 pt-4">
            <a href="#" className="font-sans text-xl md:text-2xl font-medium text-foreground/90 hover:text-foreground flex items-center gap-2 transition-colors w-fit">
              Hvem vi er <span className="text-primary">❯</span>
            </a>
            <a href="#" className="font-sans text-xl md:text-2xl font-medium text-foreground/90 hover:text-foreground flex items-center gap-2 transition-colors w-fit">
              Hva vi gjør <span className="text-primary">❯</span>
            </a>
            <a href="#" className="font-sans text-xl md:text-2xl font-medium text-foreground/90 hover:text-foreground flex items-center gap-2 transition-colors w-fit">
              Jobb hos oss <span className="text-primary">❯</span>
            </a>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="font-sans text-base font-medium bg-[hsl(220,80%,50%)] hover:bg-[hsl(220,80%,45%)] text-foreground px-8 py-4 rounded-lg transition-all duration-200 shadow-lg shadow-[hsl(220,80%,50%)/0.3]"
            >
              Åpne STACQ
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
