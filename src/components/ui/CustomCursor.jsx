import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor-active');

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let hasMoved = false;
    let animId = null;

    const updateHoverState = (hovered) => {
      if (isHovered === hovered) return;
      isHovered = hovered;
      if (isHovered) {
        ring.classList.add('cursor-hover');
      } else {
        ring.classList.remove('cursor-hover');
      }
    };

    // Zero DOM manipulation in mousemove event callback to prevent main-thread stutter
    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = targetX;
        ringY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      hasMoved = true;
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        (target.closest && target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer'))
      );
      updateHoverState(isInteractive);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // High-performance RAF animation loop:
    // 1. Synchronized with display vsync
    // 2. Hardware-accelerated GPU translate3d + scale (0 layout reflow)
    // 3. Snappy 0.62 factor eliminating sluggish rubber-band dragging sensation
    const animateCursor = () => {
      if (isVisible && hasMoved) {
        // Instantaneous core dot position (0ms delay)
        const dotScale = isClicking ? 0.75 : 1;
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${dotScale})`;

        // Snappy responsive follower halo
        ringX += (targetX - ringX) * 0.62;
        ringY += (targetY - ringY) * 0.62;

        const ringScale = isHovered ? (isClicking ? 1.25 : 1.5) : (isClicking ? 0.8 : 1);
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }
      animId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animId = requestAnimationFrame(animateCursor);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot - zero lag, instantaneous */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full w-2 h-2 opacity-0 transition-opacity duration-150 will-change-transform"
        style={{
          backgroundColor: 'rgb(var(--color-primary))',
          boxShadow: '0 0 10px rgb(var(--color-primary))',
        }}
      />

      {/* Fluid Halo Follower Ring - 100% GPU-composited scale transform (zero layout reflow) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full w-8 h-8 opacity-0 border border-white/40 transition-[border-color,background-color,box-shadow,opacity] duration-150 ease-out will-change-transform"
      />

      <style>{`
        .cursor-hover {
          border-color: rgb(var(--color-primary)) !important;
          background-color: rgba(var(--color-primary), 0.15) !important;
          box-shadow: 0 0 16px rgba(var(--color-primary), 0.35) !important;
        }
      `}</style>
    </>
  );
}
