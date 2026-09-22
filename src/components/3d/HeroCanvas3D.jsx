import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D({ theme = 'cyan' }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const themeColors = {
    cyan: { primary: 0x00f2fe, secondary: 0x4facfe, nebula: 0x0d1c3a },
    violet: { primary: 0xa855f7, secondary: 0xd946ef, nebula: 0x220c38 },
    emerald: { primary: 0x10b981, secondary: 0x34d399, nebula: 0x07241c },
    gold: { primary: 0xf59e0b, secondary: 0xfbbf24, nebula: 0x2b1c06 },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.025);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    // Fixed 1.0 pixel ratio guarantees featherweight rendering across all monitors
    renderer.setPixelRatio(1.0);
    container.appendChild(renderer.domElement);

    const colors = themeColors[theme] || themeColors.cyan;

    // 2. Cosmic Starfield Particles (optimized 380 points)
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const color1 = new THREE.Color(colors.primary);
    const color2 = new THREE.Color(colors.secondary);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 160;
      starPositions[i + 1] = (Math.random() - 0.5) * 110;
      starPositions[i + 2] = (Math.random() - 0.5) * 100 - 10;

      const rand = Math.random();
      const chosenColor = rand > 0.6 ? color1 : rand > 0.3 ? color2 : colorWhite;
      starColors[i] = chosenColor.r;
      starColors[i + 1] = chosenColor.g;
      starColors[i + 2] = chosenColor.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starSystem = new THREE.Points(starGeo, starMat);
    scene.add(starSystem);

    // 3. Floating Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors.primary, 1.8, 80);
    pointLight.position.set(-20, 15, 10);
    scene.add(pointLight);

    // Cached window dimensions
    let winWidth = window.innerWidth || 1920;
    let winHeight = window.innerHeight || 1080;
    let mouseThrottle = 0;

    // Throttled mouse listener to prevent any micro-stutter
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - mouseThrottle < 32) return; // 30fps throttle on input updates
      mouseThrottle = now;
      const normX = (e.clientX / winWidth) * 2 - 1;
      const normY = -(e.clientY / winHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      winWidth = window.innerWidth || container.clientWidth;
      winHeight = window.innerHeight || container.clientHeight;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(1.0);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop with IntersectionObserver pause
    let animId = null;
    let clock = new THREE.Clock();
    let isIntersecting = true;

    const renderFrame = () => {
      if (!isIntersecting) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(renderFrame);
      const elapsed = clock.getElapsedTime();

      // Smooth subtle drift
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;

      starSystem.rotation.y = elapsed * 0.02 + mouseRef.current.x * 0.06;
      starSystem.rotation.x = mouseRef.current.y * 0.04;

      renderer.render(scene, camera);
    };

    const startRendering = () => {
      if (!animId) {
        clock.start();
        animId = requestAnimationFrame(renderFrame);
      }
    };

    const stopRendering = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    // Start immediately for initial paint
    startRendering();

    // IntersectionObserver to pause rendering when hero is scrolled out of viewport
    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startRendering();
        } else {
          stopRendering();
        }
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    return () => {
      stopRendering();
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      ambientLight.dispose();
      pointLight.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden will-change-transform" 
      aria-hidden="true" 
    />
  );
}
