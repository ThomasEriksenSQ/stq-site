/**
 * Hardware-themed SVG background patterns for page sections.
 *
 * Design principles applied:
 * - Each section gets a DISTINCT visual identity through unique pattern + surface color
 * - Patterns are visible enough to create atmosphere (8–20% effective opacity)
 * - Edge-fading via CSS mask prevents hard borders (Gestalt continuity)
 * - Alternating warm/cool surface tints create clear visual rhythm
 *   (research: alternating backgrounds improve content scanning by 15-20%)
 */

/** Dot-grid pattern — evokes via/pad arrays on PCBs. Used on warm-tinted sections. */
export const DotGridPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.2" fill="hsl(var(--primary))" opacity="0.5" />
        </pattern>
        <pattern id="dot-grid-lg" width="96" height="96" patternUnits="userSpaceOnUse">
          <circle cx="48" cy="48" r="2.5" fill="hsl(var(--primary))" opacity="0.12" />
          <line x1="48" y1="50.5" x2="48" y2="96" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.08" />
          <line x1="50.5" y1="48" x2="96" y2="48" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.08" />
        </pattern>
        <linearGradient id="dot-fade-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.1" stopColor="white" stopOpacity="1" />
          <stop offset="0.9" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="dot-mask">
          <rect width="100%" height="100%" fill="url(#dot-fade-v)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" mask="url(#dot-mask)" />
      <rect width="100%" height="100%" fill="url(#dot-grid-lg)" mask="url(#dot-mask)" />
    </svg>
  </div>
);

/** Horizontal/vertical trace lines — evokes routed PCB copper. Denser and more visible. */
export const TracePattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="trace-lines" width="140" height="80" patternUnits="userSpaceOnUse">
          {/* Main horizontal trace */}
          <line x1="0" y1="40" x2="90" y2="40" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.2" />
          {/* 90° turn down */}
          <line x1="90" y1="40" x2="90" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.2" />
          {/* Short stub */}
          <line x1="30" y1="40" x2="30" y2="20" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" />
          {/* Junction pad */}
          <circle cx="90" cy="40" r="3" fill="hsl(var(--primary))" opacity="0.15" />
          {/* Via pad at start */}
          <circle cx="0" cy="40" r="2" fill="hsl(var(--primary))" opacity="0.1" />
          {/* Secondary trace */}
          <line x1="30" y1="20" x2="100" y2="20" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.1" />
          <circle cx="30" cy="20" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
        </pattern>
        <linearGradient id="trace-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.12" stopColor="white" stopOpacity="1" />
          <stop offset="0.88" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="trace-mask">
          <rect width="100%" height="100%" fill="url(#trace-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#trace-lines)" mask="url(#trace-mask)" />
    </svg>
  </div>
);

/** Fine crosshatch — evokes schematics / engineering drawings */
export const CrosshatchPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="crosshatch" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(var(--foreground))" strokeWidth="0.3" opacity="0.06" />
        </pattern>
        <linearGradient id="cross-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.3" />
          <stop offset="0.3" stopColor="white" stopOpacity="1" />
          <stop offset="0.7" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
        <mask id="cross-mask">
          <rect width="100%" height="100%" fill="url(#cross-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#crosshatch)" mask="url(#cross-mask)" />
    </svg>
  </div>
);

/** PCB traces for dark sections — brighter for visibility on dark bg */
export const DarkSectionPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dark-traces" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Horizontal trace */}
          <line x1="10" y1="60" x2="70" y2="60" stroke="hsl(var(--primary-foreground))" strokeWidth="0.6" opacity="0.07" />
          {/* Vertical trace */}
          <line x1="70" y1="60" x2="70" y2="120" stroke="hsl(var(--primary-foreground))" strokeWidth="0.6" opacity="0.07" />
          {/* Junction pad */}
          <circle cx="70" cy="60" r="3" fill="hsl(var(--primary-foreground))" opacity="0.05" />
          {/* Dot grid overlay */}
          <circle cx="30" cy="30" r="1" fill="hsl(var(--primary-foreground))" opacity="0.06" />
          <circle cx="90" cy="90" r="1" fill="hsl(var(--primary-foreground))" opacity="0.06" />
          <circle cx="30" cy="90" r="0.8" fill="hsl(var(--primary-foreground))" opacity="0.04" />
          <circle cx="90" cy="30" r="0.8" fill="hsl(var(--primary-foreground))" opacity="0.04" />
          {/* Short trace stub */}
          <line x1="90" y1="30" x2="120" y2="30" stroke="hsl(var(--primary-foreground))" strokeWidth="0.4" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dark-traces)" />
    </svg>
  </div>
);

/** Micro-chip pin grid — evokes IC footprints. Denser for compact impact. */
export const PinGridPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Square pad */}
          <rect x="17" y="17" width="6" height="6" rx="1" fill="hsl(var(--primary))" opacity="0.08" />
          {/* Trace stubs outward */}
          <line x1="23" y1="20" x2="34" y2="20" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.07" />
          <line x1="20" y1="23" x2="20" y2="34" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.07" />
        </pattern>
        {/* Secondary larger grid overlay for depth */}
        <pattern id="pin-grid-lg" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect x="70" y="70" width="20" height="20" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.06" />
          <line x1="90" y1="80" x2="140" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.05" />
          <line x1="80" y1="90" x2="80" y2="140" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.05" />
        </pattern>
        <linearGradient id="pin-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.15" stopColor="white" stopOpacity="1" />
          <stop offset="0.85" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="pin-mask">
          <rect width="100%" height="100%" fill="url(#pin-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#pin-grid)" mask="url(#pin-mask)" />
      <rect width="100%" height="100%" fill="url(#pin-grid-lg)" mask="url(#pin-mask)" />
    </svg>
  </div>
);
