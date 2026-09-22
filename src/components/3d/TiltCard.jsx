import React, { useRef } from 'react';
import { soundEffects } from '../../utils/soundFx';

export default function TiltCard({ 
  children, 
  className = "", 
  maxTilt = 12, 
  glare = true,
  onClick
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rectRef = useRef(null);
  const rafId = useRef(null);
  const isHoveredRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    soundEffects.playHover();
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      // Remove any CSS transition while tracking so RAF updates are 100% instantaneous
      cardRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    if (rafId.current) return;

    if (!rectRef.current) {
      rectRef.current = card.getBoundingClientRect();
    }

    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!cardRef.current || !isHoveredRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.opacity = '0.15';
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    rectRef.current = null;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`relative rounded-2xl overflow-hidden will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-0"
        />
      )}
    </div>
  );
}
