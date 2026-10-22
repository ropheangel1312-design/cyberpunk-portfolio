import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ParallaxHero3DProps {
  isReducedMotion?: boolean;
}

export const ParallaxHero3D: React.FC<ParallaxHero3DProps> = ({ isReducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Target and interpolated position
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isPointerInside = useRef(false);

  // Layer DOM refs for zero-react-render continuous lerping
  const layerSkylineRef = useRef<HTMLDivElement | null>(null);
  const layerHologramRef = useRef<HTMLDivElement | null>(null);
  const layerCharacterRef = useRef<HTMLDivElement | null>(null);
  const layerHudRef = useRef<HTMLDivElement | null>(null);
  const layerGlowRef = useRef<HTMLDivElement | null>(null);

  const characterImage = PORTFOLIO_DATA.hero.characterImage;

  useEffect(() => {
    if (isReducedMotion) return;

    // Check pointer fine support (desktop mouse / precision trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Calculate normalized coords relative to container center (-1 to 1)
      const nx = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      const ny = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));

      // Clamp to -1.2 to 1.2
      mousePos.current.x = Math.max(-1.2, Math.min(1.2, nx));
      mousePos.current.y = Math.max(-1.2, Math.min(1.2, ny));
      isPointerInside.current = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.x = 0;
      mousePos.current.y = 0;
      isPointerInside.current = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      // Window listener for broader capture when near container
      window.addEventListener('mousemove', (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // If within 250px of container bounds, react subtly
        if (
          e.clientX >= rect.left - 250 &&
          e.clientX <= rect.right + 250 &&
          e.clientY >= rect.top - 200 &&
          e.clientY <= rect.bottom + 200
        ) {
          const nx = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
          const ny = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
          mousePos.current.x = Math.max(-1.3, Math.min(1.3, nx));
          mousePos.current.y = Math.max(-1.3, Math.min(1.3, ny));
        }
      });
    }

    // Animation Loop with Smooth Damped LERP (Linear Interpolation)
    const updateParallax = () => {
      // Lerp speed: 0.08 for smooth, organic damping
      const ease = 0.08;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;

      const cx = currentPos.current.x;
      const cy = currentPos.current.y;

      // 1. Distant Skyline Layer (moves opposite, subtle, deep Z)
      if (layerSkylineRef.current) {
        const sx = -cx * 14;
        const sy = -cy * 10;
        layerSkylineRef.current.style.transform = `translate3d(${sx.toFixed(2)}px, ${sy.toFixed(2)}px, -60px) scale(1.08)`;
      }

      // 2. Midground Holograms & Grid (mid depth, slight perspective)
      if (layerHologramRef.current) {
        const hx = -cx * 24;
        const hy = -cy * 18;
        layerHologramRef.current.style.transform = `translate3d(${hx.toFixed(2)}px, ${hy.toFixed(2)}px, -15px)`;
      }

      // 3. Foreground Character Artwork (Major 3D plane with rotation & depth)
      if (layerCharacterRef.current) {
        const rotX = -cy * 11;
        const rotY = cx * 14;
        const tx = cx * 22;
        const ty = cy * 16;
        layerCharacterRef.current.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 35px)`;
        layerCharacterRef.current.style.boxShadow = `${(-cx * 28).toFixed(1)}px ${(cy * 24 + 18).toFixed(1)}px 45px rgba(0, 0, 0, 0.95), 0 0 35px rgba(252, 238, 10, 0.2)`;
      }

      // 4. Floating HUD Reticles & Diagnostics (Closest to viewer, prominent translation)
      if (layerHudRef.current) {
        const hx = cx * 38;
        const hy = cy * 30;
        layerHudRef.current.style.transform = `translate3d(${hx.toFixed(2)}px, ${hy.toFixed(2)}px, 85px)`;
      }

      // 5. Specular Ambient Glare Follower
      if (layerGlowRef.current) {
        const gx = (cx + 1) * 50;
        const gy = (cy + 1) * 50;
        layerGlowRef.current.style.background = `radial-gradient(circle 380px at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(252, 238, 10, 0.22), rgba(226, 232, 240, 0.08) 40%, transparent 75%)`;
      }

      rafRef.current = requestAnimationFrame(updateParallax);
    };

    rafRef.current = requestAnimationFrame(updateParallax);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg aspect-[3/4] mx-auto select-none"
      style={{
        perspective: isReducedMotion ? 'none' : '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* LAYER 0: Distant Night City Industrial Skyline & Beacons */}
      <div
        ref={layerSkylineRef}
        className="absolute inset-0 pointer-events-none transition-transform will-change-transform"
        style={{ transform: 'translate3d(0, 0, -60px)' }}
      >
        <div className="absolute inset-2 bg-[#06080d] cyber-chamfer border border-slate-800/80 overflow-hidden">
          {/* Skyline silhouette SVG */}
          <div className="absolute bottom-0 inset-x-0 h-40 opacity-40">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover" preserveAspectRatio="none">
              <path d="M0,200 L0,110 L25,110 L25,150 L50,150 L50,80 L80,80 L80,120 L110,120 L110,60 L140,60 L140,160 L180,160 L180,95 L210,95 L210,50 L230,50 L230,140 L260,140 L260,70 L290,70 L290,110 L330,110 L330,40 L350,40 L350,130 L380,130 L380,90 L400,90 L400,200 Z" fill="#0c101a" />
              <line x1="110" y1="60" x2="110" y2="40" stroke="#FCEE0A" strokeWidth="1.5" opacity="0.8" />
              <line x1="220" y1="50" x2="220" y2="30" stroke="#FCEE0A" strokeWidth="1.5" opacity="0.8" />
              <line x1="340" y1="40" x2="340" y2="15" stroke="#FCEE0A" strokeWidth="1.5" opacity="0.8" />
            </svg>
          </div>
          {/* Cyber grid & distance fog */}
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />
        </div>
      </div>

      {/* LAYER 1: Midground Holographic Vectors & Scaffolding */}
      <div
        ref={layerHologramRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, 0, -15px)' }}
      >
        <div className="absolute top-4 left-4 font-mono-cyber text-[10px] text-[#FCEE0A] tracking-widest bg-black/70 px-2 py-0.5 border border-[#FCEE0A]/30">
          NODE // NC_SANTO_DOMINGO_07
        </div>
        <div className="absolute top-12 right-4 font-mono-cyber text-[9px] text-slate-400">
          GRID: 35.6895° N, 139.6917° E
        </div>
        {/* Subtle holographic diagonal guidelines */}
        <div className="absolute inset-8 border border-dashed border-[#FCEE0A]/15 pointer-events-none" />
      </div>

      {/* LAYER 2: Foreground Character Artwork (Central 3D Chamfered Frame) */}
      <div
        ref={layerCharacterRef}
        className="relative w-full h-full cyber-chamfer bg-gradient-to-br from-[#121622] via-[#090b10] to-[#050608] border-2 border-[#FCEE0A] p-2.5 shadow-[0_0_35px_rgba(252,238,10,0.25)] transition-shadow will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 35px)'
        }}
      >
        {/* Outer Corner Metal Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-[#FCEE0A] z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-[#FCEE0A] z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-[#FCEE0A] z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-[#FCEE0A] z-20" />

        {/* Inner Character Art Container */}
        <div className="relative w-full h-full cyber-chamfer-sm overflow-hidden bg-[#07090e]">
          <img
            src={characterImage.localUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).src = characterImage.url;
            }}
            alt="Rophe Angel - Neon Mercenary Character"
            className="w-full h-full object-cover object-top filter brightness-100 contrast-105"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Atmospheric Scanlines & Gradients */}
          <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />

          {/* Dynamic Specular Chrome Glare Layer */}
          <div
            ref={layerGlowRef}
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
          />

          {/* Embedded Character Bottom Metadata Banner */}
          <div className="absolute bottom-3 inset-x-3 p-3 bg-[#080b13]/90 border border-slate-700/80 backdrop-blur-md cyber-chamfer-sm text-xs font-mono-cyber">
            <div className="flex items-center justify-between text-[#FCEE0A] font-bold mb-0.5">
              <span className="font-orbitron tracking-wider">TARGET: ROPHE ANGEL</span>
              <span className="text-[10px] bg-[#FCEE0A] text-black px-1.5 py-0.2 font-bold rounded-xs">
                NETRUNNER
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-rajdhani font-semibold tracking-wider">
              CSE Undergrad · Builder · Research Architect
            </p>
          </div>
        </div>
      </div>

      {/* LAYER 3: Floating Foreground HUD Overlays (Closer to Camera) */}
      <div
        ref={layerHudRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, 0, 85px)' }}
      >
        {/* Top-Left Floating System Chip */}
        <div className="absolute -top-4 -left-4 p-2 bg-[#0c101a]/95 border border-[#FCEE0A] shadow-[0_4px_16px_rgba(0,0,0,0.8)] cyber-chamfer-sm text-left">
          <div className="text-[9px] font-mono-cyber text-[#FCEE0A] font-bold tracking-wider">
            BIO_ANOMALY
          </div>
          <div className="text-xs font-orbitron font-extrabold text-white">
            CLASS: OVERDRIVE
          </div>
        </div>

        {/* Bottom-Right Floating System Chip */}
        <div className="absolute -bottom-4 -right-4 p-2.5 bg-[#0c101a]/95 border border-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.8)] cyber-chamfer-sm text-right">
          <div className="text-[9px] font-mono-cyber text-slate-400">
            SEC_CHANNEL
          </div>
          <div className="text-xs font-mono-cyber font-bold text-[#FCEE0A]">
            ICE: BYPASSED // 100%
          </div>
        </div>

        {/* Acid Yellow Floating Reticle Ring */}
        <div className="absolute top-1/3 right-2 w-8 h-8 rounded-full border border-dashed border-[#FCEE0A]/60 flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FCEE0A]" />
        </div>
      </div>
    </div>
  );
};
