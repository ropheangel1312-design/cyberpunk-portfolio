import React, { useEffect, useRef } from 'react';

export const RainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rain drop particles
    const dropCount = Math.min(Math.floor(width / 16), 75);
    interface Drop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      cyanTint: boolean;
    }

    const drops: Drop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 12 + Math.random() * 20,
      speed: 12 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.25,
      cyanTint: Math.random() > 0.6
    }));

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.length);

        ctx.strokeStyle = d.cyanTint
          ? `rgba(0, 240, 255, ${d.opacity * 0.6})`
          : `rgba(160, 200, 255, ${d.opacity * 0.4})`;
        ctx.stroke();

        d.y += d.speed * delta;
        d.x -= 1.5 * delta;

        if (d.y > height) {
          d.y = -d.length;
          d.x = Math.random() * (width + 100);
        }
        if (d.x < -10) {
          d.x = width + 10;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
