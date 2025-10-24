import React, { useEffect, useState } from 'react';

interface Symbol {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const SYMBOLS = ['<>', '</>', '()', '{}', '=>', '//', '[]', '&&', '||', '!=', '==', '++', '--', '**', '??'];

const FloatingSymbols: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);

  useEffect(() => {
    const generatedSymbols: Symbol[] = SYMBOLS.map((text, index) => ({
      id: index,
      text,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4, // 2-6 rem
      duration: 15 + Math.random() * 25, // 15-40 seconds
      delay: Math.random() * 5,
    }));
    setSymbols(generatedSymbols);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute opacity-10 glow-text-subtle animate-float"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}rem`,
            color: 'hsl(0 70% 40%)',
            animationDuration: `${symbol.duration}s`,
            animationDelay: `${symbol.delay}s`,
            textShadow: `
              0 0 10px hsl(0 100% 50% / 0.3),
              0 0 20px hsl(0 100% 50% / 0.2)
            `,
          }}
        >
          {symbol.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingSymbols;
