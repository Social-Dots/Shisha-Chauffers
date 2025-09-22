import React, { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface TrailParticle {
  id: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
  velocityX: number;
  velocityY: number;
}

interface GlobalSmokeCursorProps {
  enabled?: boolean;
  intensity?: number;
  trailLength?: number;
  mobileOptimized?: boolean;
}

export default function GlobalSmokeCursor({ 
  enabled = true,
  intensity = 0.8,
  trailLength = 25,
  mobileOptimized = true
}: GlobalSmokeCursorProps) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 50, y: 50 });
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number>();
  const lastUpdate = useRef<number>();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse/touch movement globally
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!enabled) return;

    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    
    if (!clientX || !clientY) return;

    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    
    setMousePos({ x, y });
    setIsVisible(true);

    // Create trail particle with mobile optimization
    const now = Date.now();
    const updateInterval = isMobile && mobileOptimized ? 50 : 25; // Slower updates on mobile
    const currentTrailLength = isMobile && mobileOptimized ? Math.floor(trailLength * 0.6) : trailLength;
    
    if (now - (lastUpdate.current || 0) > updateInterval) {
      const newParticle: TrailParticle = {
        id: `trail-${now}-${Math.random()}`,
        x,
        y,
        opacity: isMobile ? 0.6 : 0.8,
        size: Math.random() * (isMobile ? 12 : 15) + (isMobile ? 8 : 10), // Smaller on mobile
        life: 0,
        maxLife: (isMobile ? 2000 : 2500) + Math.random() * (isMobile ? 1000 : 1500), // Shorter life on mobile
        velocityX: (Math.random() - 0.5) * 0.1,
        velocityY: -Math.random() * 0.3 - 0.1, // Gentle upward drift
      };

      setTrailParticles(prev => {
        const filtered = prev.filter(p => p.life < p.maxLife).slice(-currentTrailLength);
        return [...filtered, newParticle];
      });

      lastUpdate.current = now;
    }
  }, [enabled, trailLength]);

  // Hide cursor when mouse leaves window
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      setTrailParticles(prev => 
        prev.map(particle => ({
          ...particle,
          life: particle.life + 16,
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          opacity: Math.max(0, (1 - particle.life / particle.maxLife) * 0.7),
        })).filter(particle => particle.life < particle.maxLife)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  // Event listeners
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('touchmove', handleMouseMove, { passive: true });
    document.addEventListener('touchstart', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchstart', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'screen' }}>
      {/* Shisha cursor */}
      {isVisible && (
        <div
          className="absolute transition-all duration-75 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: intensity,
          }}
        >
          {/* Mini Shisha Icon */}
          <div className="relative">
            {/* Shisha base */}
            <div 
              className="absolute"
              style={{
                width: '20px',
                height: '12px',
                background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(184, 134, 11, 0.6) 100%)',
                borderRadius: '0 0 50% 50%',
                left: '-10px',
                top: '0px',
                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))',
              }}
            />
            {/* Shisha pipe/stem */}
            <div 
              className="absolute"
              style={{
                width: '2px',
                height: '25px',
                background: 'linear-gradient(180deg, rgba(139, 69, 19, 0.8) 0%, rgba(101, 67, 33, 0.6) 100%)',
                left: '-1px',
                top: '-25px',
                borderRadius: '1px',
                filter: 'drop-shadow(0 0 4px rgba(139, 69, 19, 0.3))',
              }}
            />
            {/* Bowl at top */}
            <div 
              className="absolute"
              style={{
                width: '8px',
                height: '6px',
                background: 'linear-gradient(180deg, rgba(139, 69, 19, 0.9) 0%, rgba(101, 67, 33, 0.7) 100%)',
                borderRadius: '50% 50% 30% 30%',
                left: '-4px',
                top: '-28px',
                filter: 'drop-shadow(0 0 6px rgba(139, 69, 19, 0.4))',
              }}
            />
            {/* Active smoke from bowl */}
            <div 
              className="absolute animate-pulse"
              style={{
                width: '12px',
                height: '12px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)',
                borderRadius: '50%',
                left: '-6px',
                top: '-35px',
                filter: 'blur(1px)',
                animation: 'float 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}

      {/* Trail particles */}
      {trailParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)',
            borderRadius: '50%',
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
          }}
        />
      ))}
    </div>
  );
}

// Hook for controlling the global smoke cursor
export function useSmokeCursor(enabled: boolean = true) {
  useEffect(() => {
    if (enabled) {
      document.body.style.cursor = 'none'; // Hide default cursor
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [enabled]);

  return { enabled };
}
