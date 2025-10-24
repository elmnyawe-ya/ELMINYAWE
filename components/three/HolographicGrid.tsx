import React from 'react';

const HolographicGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Diagonal scan lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-neon-red/30 to-transparent"
            style={{
              top: `${20 * i}%`,
              left: 0,
              right: 0,
              animation: `scan-line ${4 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-red/40" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-neon-red/40" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-neon-red/40" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-red/40" />

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-neon-red/10 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neon-red/10 -rotate-12 animate-rotate-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-neon-red rounded-full animate-glow-pulse" />
      <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-neon-red rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Central holographic effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(0 100% 50% / 0.3) 0%, transparent 70%)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
};

export default HolographicGrid;
