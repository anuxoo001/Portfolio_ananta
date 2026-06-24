import React, { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.transform = `translate3d(${currentX - 120}px, ${currentY - 120}px, 0)`;
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // Note: GSAP import kept so the rest of the app can use it consistently.
  // This component uses rAF for ultra-low-latency mouse glow.
  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-10 h-[240px] w-[240px] translate-x-0 translate-y-0"
    >
      <div className="h-full w-full rounded-full bg-neon-cyan/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-magenta/70 blur-[10px]" />
    </div>
  );
}

