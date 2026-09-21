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

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
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

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      // Hardware-accelerated instantaneous dot position (0ms delay)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.75 : 1})`;
    };

    const handleMouseDown = () => {
      isClicking = true;
      if (isVisible) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.75)`;
      }
    };

    const handleMouseUp = () => {
      isClicking = false;
      if (isVisible) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const interactive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      updateHoverState(!!interactive);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Smooth fluid follower ring loop
    const animateFollower = () => {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.32;
        ringY += (mouseY - ringY) * 0.32;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.88 : 1})`;
      }
      animId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    animId = requestAnimationFrame(animateFollower);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
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

      {/* Fluid Halo Follower Ring - smooth interpolation without backdrop-blur overhead */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full w-8 h-8 opacity-0 border border-white/40 transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform"
      />

      <style>{`
        .cursor-hover {
          width: 48px !important;
          height: 48px !important;
          border-color: rgb(var(--color-primary)) !important;
          background-color: rgba(var(--color-primary), 0.12) !important;
          box-shadow: 0 0 16px rgba(var(--color-primary), 0.35) !important;
        }
      `}</style>
    </>
  );
}
