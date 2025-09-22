import React, { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface CursorSmokeProps {
  enabled?: boolean;
  intensity?: number;
}

export default function CursorSmoke({ enabled = true, intensity = 0.8 }: CursorSmokeProps) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const particleCount = 6;

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {/* Smoke particles following cursor */}
      <div
        className="absolute transition-all duration-75 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity: intensity,
        }}
      >
        {/* Multiple smoke particles */}
        {Array.from({ length: particleCount }, (_, i) => (
          <div
            key={i}
            className="smoke-particle absolute"
            style={{
              width: `${20 + i * 3}px`,
              height: `${20 + i * 3}px`,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(2px)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
              animation: `${['smokeRise', 'smokeDrift', 'smokeTwirl'][i % 3]} ${4 + i}s ease-out infinite`,
              animationDelay: `${i * 0.2}s`,
              left: `${(Math.random() - 0.5) * 30}px`,
              top: `${(Math.random() - 0.5) * 20}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
