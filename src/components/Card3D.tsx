import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number; // degrees, default 6
  depth?: number; // translateZ in px, default 15
  showGlare?: boolean;
  glareColor?: string;
  isReducedMotion?: boolean;
}

export const Card3D = forwardRef<HTMLDivElement, Card3DProps>(({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 6,
  depth = 15,
  showGlare = true,
  glareColor = 'rgba(252, 238, 10, 0.15)',
  isReducedMotion = false,
  style,
  ...restProps
}, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    const card = innerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = -ny * (maxTilt * 2);
    const tiltY = nx * (maxTilt * 2);
    const glareX = (nx + 0.5) * 100;
    const glareY = (ny + 0.5) * 100;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!card) return;
      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(${depth}px) translateY(-2px)`;
      card.style.boxShadow = `${(-tiltY * 1.5).toFixed(1)}px ${(tiltX * 1.5 + 12).toFixed(1)}px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(252, 238, 10, 0.12)`;
      
      if (glareRef.current && showGlare) {
        glareRef.current.style.opacity = '0.2';
        glareRef.current.style.background = `radial-gradient(circle 300px at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.22), ${glareColor} 45%, transparent 75%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsHovered(false);
    const card = innerRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
      card.style.boxShadow = '';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      className={`w-full flex ${containerClassName}`}
      style={{
        perspective: isReducedMotion ? 'none' : '1000px',
        perspectiveOrigin: 'center center'
      }}
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: isReducedMotion ? 'flat' : 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
          transition: isHovered
            ? 'border-color 0.2s ease-out'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease-out',
          ...style
        }}
        className={`relative group w-full ${className}`}
        {...restProps}
      >
        {showGlare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300 z-20"
          />
        )}
        {children}
      </div>
    </div>
  );
});

Card3D.displayName = 'Card3D';
