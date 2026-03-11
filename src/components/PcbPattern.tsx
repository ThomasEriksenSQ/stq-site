const PcbPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated grid */}
      <div className="absolute inset-0" style={{
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
      }}>
        <div className="grid-drift absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.35,
          width: '100%',
          height: 'calc(100% + 60px)',
        }} />
      </div>
    </div>
  );
};

export default PcbPattern;
