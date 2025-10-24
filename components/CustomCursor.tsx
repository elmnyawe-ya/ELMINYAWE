import React, { useState, useEffect } from 'react';

const PROGRAMMING_SYMBOLS = ['<>', '</>', '()', '{}', '=>', '//'];
const CYCLE_INTERVAL = 10000; // 10 seconds

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);

  // Cycle through symbols every 10 seconds
  useEffect(() => {
    const symbolInterval = setInterval(() => {
      setCurrentSymbolIndex((prevIndex) => (prevIndex + 1) % PROGRAMMING_SYMBOLS.length);
    }, CYCLE_INTERVAL);

    return () => clearInterval(symbolInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const currentSymbol = PROGRAMMING_SYMBOLS[currentSymbolIndex];
  const scale = isPointer ? 1.5 : 1;

  return (
    <>
      {/* Main cursor symbol */}
      <div
        style={{
          position: 'fixed',
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.2s ease-out',
        }}
        className="select-none"
      >
        <span
          className="text-2xl font-bold glow-text-subtle"
          style={{
            color: 'hsl(0, 70%, 40%)', // Dark red
            textShadow: `
              0 0 10px hsl(0 100% 50% / 0.6),
              0 0 20px hsl(0 100% 50% / 0.4),
              0 0 30px hsl(0 100% 50% / 0.2)
            `,
            filter: isPointer ? 'brightness(1.5)' : 'brightness(1)',
            transition: 'filter 0.2s ease',
          }}
        >
          {currentSymbol}
        </span>
      </div>

      {/* Trailing effect */}
      <div
        style={{
          position: 'fixed',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: isPointer ? '40px' : '30px',
          height: isPointer ? '40px' : '30px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'all 0.15s ease-out',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: '2px solid hsl(0 100% 50% / 0.3)',
            background: isPointer ? 'hsl(0 100% 50% / 0.1)' : 'transparent',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
