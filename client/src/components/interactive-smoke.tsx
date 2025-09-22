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

interface InteractiveSmokeProps {
  intensity?: number; // How much smoke follows the mouse (0-1)
  trailLength?: number; // Number of trail particles
  className?: string;
}

export default function InteractiveSmoke({ 
  intensity = 0.7, 
  trailLength = 15,
  className = '' 
}: InteractiveSmokeProps) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 50, y: 50 }); // Start in center for visibility
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastMouseUpdate = useRef<number>(0);

  // Track global mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Only track mouse when it's within the hero section
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      setMousePos({ x, y });

      // Add new trail particle
      const now = Date.now();
      if (now - lastMouseUpdate.current > 30) { // More frequent particles
        const newParticle: TrailParticle = {
          id: `trail-${now}-${Math.random()}`,
          x: x,
          y: y,
          opacity: 0.9,
          size: Math.random() * 25 + 20, // Bigger particles
          life: 0,
          maxLife: 3000 + Math.random() * 2000, // 3-5 seconds
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: -Math.random() * 0.6 - 0.3, // Always drift upward
        };

        setTrailParticles(prev => {
          const filtered = prev.filter(p => p.life < p.maxLife).slice(-trailLength);
          return [...filtered, newParticle];
        });

        lastMouseUpdate.current = now;
      }
    }
  }, [trailLength]);

  // Animation loop for trail particles
  useEffect(() => {
    const animate = () => {
      setTrailParticles(prev => 
        prev.map(particle => ({
          ...particle,
          life: particle.life + 16, // ~60fps
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          opacity: Math.max(0, (1 - particle.life / particle.maxLife) * 0.8),
          size: particle.size + 0.1, // Slowly grow
        })).filter(particle => particle.life < particle.maxLife)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Add global mouse event listeners
  useEffect(() => {
    // Use global mouse events since the container has pointer-events-none
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        background: 'transparent',
      }}
    >
      {/* Mouse-following smoke particles */}
      <div
        className="absolute transition-all duration-100 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity: intensity,
        }}
      >
        {/* Primary mouse smoke - made more visible */}
        <div 
          className="smoke-particle" 
          style={{
            width: '35px',
            height: '35px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(2px)',
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)',
            animation: 'smokeRise 4s ease-out infinite',
          }}
        />
        <div 
          className="smoke-particle" 
          style={{
            width: '28px',
            height: '28px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)',
            borderRadius: '50%',
            filter: 'blur(1.5px)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            transform: 'translate(15px, -8px)',
            animation: 'smokeDrift 5s ease-out infinite',
            animationDelay: '0.5s',
          }}
        />
        <div 
          className="smoke-particle" 
          style={{
            width: '32px',
            height: '32px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 60%, transparent 90%)',
            borderRadius: '50%',
            filter: 'blur(2.5px)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.25)',
            transform: 'translate(-12px, 10px)',
            animation: 'smokeTwirl 6s ease-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Trail particles */}
      {trailParticles.map((particle) => (
        <div
          key={particle.id}
          className="smoke-trail"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

// Enhanced smoke that combines static + interactive
export function EnhancedShishaSmoke({ className = '' }: { className?: string }) {
  return (
    <>
      {/* Static base smoke from shisha */}
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        {/* Primary smoke source */}
        <div style={{ position: 'absolute', left: '65%', top: '45%' }}>
          {/* Main smoke particles */}
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={`static-${i}`}
              className={`smoke-particle smoke-${(i % 16) + 1}`}
              style={{
                left: `${(Math.random() - 0.5) * 80}px`,
                top: `${(Math.random() - 0.5) * 60}px`,
              }}
            />
          ))}
          
          {/* Dense background smoke */}
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={`dense-${i}`}
              className={`smoke-dense smoke-dense-${i + 1}`}
              style={{
                left: `${(Math.random() - 0.5) * 100}px`,
                top: `${(Math.random() - 0.5) * 80}px`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Interactive mouse-following smoke */}
      <InteractiveSmoke intensity={0.8} trailLength={20} className="z-30" />
    </>
  );
}
