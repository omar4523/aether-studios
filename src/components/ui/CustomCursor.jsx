import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hovered interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth follower animation frame
    let animId;
    let currentX = -100;
    let currentY = -100;

    const animateFollower = () => {
      currentX += (pos.x - currentX) * 0.22;
      currentY += (pos.y - currentY) * 0.22;
      setFollowerPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(animateFollower);
    };

    animId = requestAnimationFrame(animateFollower);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
          backgroundColor: 'rgb(var(--color-primary))',
          boxShadow: '0 0 10px rgb(var(--color-primary))',
        }}
      />

      {/* Trailing Fluid Halo Ring */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out"
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
          width: isHovered ? '48px' : isClicking ? '24px' : '32px',
          height: isHovered ? '48px' : isClicking ? '24px' : '32px',
          borderColor: isHovered ? 'rgb(var(--color-primary))' : 'rgba(255, 255, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(var(--color-primary), 0.12)' : 'transparent',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
      />
    </>
  );
}
