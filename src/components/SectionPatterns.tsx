/**
 * Subtle, hardware-themed SVG background patterns for page sections.
 *
 * Design rationale (rooted in visual communication research):
 * - Dot-grid → solder-pad / via arrays on PCBs
 * - Trace lines → routed copper traces (orthogonal, 45°)
 * - Crosshatch → schematic / blueprint aesthetic
 * - All patterns use extremely low opacity (2–6 %) so content
 *   stays dominant (Nielsen-Norman signal-to-noise principle).
 * - Patterns fade at edges via CSS mask-image so they never
 *   create hard visual borders (Gestalt continuity).
 */

/** Dot-grid pattern — evokes via/pad arrays */
export const DotGridPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1" fill="hsl(var(--primary))" opacity="0.35" />
        </pattern>
        <linearGradient id="dot-fade-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.15" stopColor="white" stopOpacity="1" />
          <stop offset="0.85" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="dot-mask">
          <rect width="100%" height="100%" fill="url(#dot-fade-v)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" mask="url(#dot-mask)" />
    </svg>
  </div>
);

/** Horizontal trace lines — evokes routed PCB copper */
export const TracePattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="trace-lines" width="120" height="60" patternUnits="userSpaceOnUse">
          {/* Horizontal trace */}
          <line x1="0" y1="30" x2="80" y2="30" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25" />
          {/* 90° turn down */}
          <line x1="80" y1="30" x2="80" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25" />
          {/* Pad at junction */}
          <circle cx="80" cy="30" r="2" fill="hsl(var(--primary))" opacity="0.18" />
          {/* Pad at start */}
          <circle cx="0" cy="30" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
        </pattern>
        <linearGradient id="trace-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.2" stopColor="white" stopOpacity="1" />
          <stop offset="0.8" stopColor="white" stopOpacity="1" />
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

/** Light PCB traces for dark sections (career/footer) */
export const DarkSectionPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dark-traces" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Horizontal trace */}
          <line x1="10" y1="50" x2="60" y2="50" stroke="hsl(var(--primary-foreground))" strokeWidth="0.5" opacity="0.04" />
          {/* Vertical trace */}
          <line x1="60" y1="50" x2="60" y2="100" stroke="hsl(var(--primary-foreground))" strokeWidth="0.5" opacity="0.04" />
          {/* Pad */}
          <circle cx="60" cy="50" r="2" fill="hsl(var(--primary-foreground))" opacity="0.03" />
          {/* Dot grid */}
          <circle cx="30" cy="25" r="0.8" fill="hsl(var(--primary-foreground))" opacity="0.05" />
          <circle cx="80" cy="75" r="0.8" fill="hsl(var(--primary-foreground))" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dark-traces)" />
    </svg>
  </div>
);

/** Micro-chip pin grid — evokes IC pin-outs for compact sections */
export const PinGridPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pin-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          {/* Square pad */}
          <rect x="22" y="22" width="4" height="4" rx="0.5" fill="hsl(var(--primary))" opacity="0.06" />
          {/* Trace stub */}
          <line x1="26" y1="24" x2="36" y2="24" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.05" />
        </pattern>
        <linearGradient id="pin-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.25" stopColor="white" stopOpacity="1" />
          <stop offset="0.75" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="pin-mask">
          <rect width="100%" height="100%" fill="url(#pin-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#pin-grid)" mask="url(#pin-mask)" />
    </svg>
  </div>
);
