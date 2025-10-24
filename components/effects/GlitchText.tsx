import React from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 opacity-70"
        style={{
          color: 'hsl(0 100% 50%)',
          transform: 'translate(-2px, 0)',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          animation: 'glitch 2s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 opacity-70"
        style={{
          color: 'hsl(0 70% 30%)',
          transform: 'translate(2px, 0)',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          animation: 'glitch 3s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default GlitchText;
