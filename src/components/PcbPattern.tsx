const PcbPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{
        maskImage: 'radial-gradient(ellipse 80% 80% at 35% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 35% 50%, black 25%, transparent 100%)',
      }}>
        {/* Minor grid — fine, subtle */}
        <div className="grid-drift absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border-subtle)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border-subtle)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.18,
          width: '100%',
          height: 'calc(100% + 60px)',
        }} />
        {/* Major grid — stronger, structural */}
        <div className="grid-drift absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.45,
          width: '100%',
          height: 'calc(100% + 60px)',
        }} />
      </div>
    </div>
  );
};

export default PcbPattern;
