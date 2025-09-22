import React from 'react';

interface SmokeParticle {
  id: number;
  className: string;
  style: React.CSSProperties;
}

interface SmokeAnimationProps {
  /** Position from where smoke should emanate (relative to container) */
  sourceX?: string;
  sourceY?: string;
  /** Number of smoke particles (default: 5) */
  particleCount?: number;
  /** Whether the animation should be active */
  isActive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export default function SmokeAnimation({ 
  sourceX = '60%', 
  sourceY = '40%', 
  particleCount = 5,
  isActive = true,
  className = ''
}: SmokeAnimationProps) {
  // Generate smoke particles with varied positions near the source
  const smokeParticles: SmokeParticle[] = React.useMemo(() => {
    const particles: SmokeParticle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particleClass = `smoke-particle smoke-${(i % 16) + 1}`;
      
      // Add slight random offset from the source position
      const offsetX = Math.random() * 80 - 40; // -40px to +40px for wider spread
      const offsetY = Math.random() * 60 - 30; // -30px to +30px for higher spread
      
      particles.push({
        id: i,
        className: particleClass,
        style: {
          left: `calc(${sourceX} + ${offsetX}px)`,
          top: `calc(${sourceY} + ${offsetY}px)`,
          animationDelay: `${i * 0.4}s`, // More frequent animations
        }
      });
    }
    
    return particles;
  }, [sourceX, sourceY, particleCount]);

  if (!isActive) {
    return null;
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {smokeParticles.map((particle) => (
        <div
          key={particle.id}
          className={particle.className}
          style={particle.style}
        />
      ))}
    </div>
  );
}

// Named export for different smoke positions/configurations
export function ShishaSmokeAnimation({ className = '' }: { className?: string }) {
  return (
    <SmokeAnimation 
      sourceX="65%" 
      sourceY="45%" 
      particleCount={8}
      className={className}
    />
  );
}

// For multiple smoke sources (like multiple shisha pipes)
export function MultiSourceSmoke({ sources = [] }: { sources?: Array<{x: string, y: string}> }) {
  if (sources.length === 0) {
    return <ShishaSmokeAnimation />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sources.map((source, index) => (
        <SmokeAnimation 
          key={index}
          sourceX={source.x}
          sourceY={source.y}
          particleCount={4}
        />
      ))}
    </div>
  );
}
