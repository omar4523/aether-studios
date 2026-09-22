import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuthCanvas3D({ mode = 'signin', theme = 'cyan' }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.02);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1.0);
    container.appendChild(renderer.domElement);

    // 2. Interactive Celestial Particles / Stardust
    const particleCount = 280;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const partColors = new Float32Array(particleCount * 3);

    const isLogin = mode === 'signin';
    const cPrimary = new THREE.Color(isLogin ? 0x00f2fe : 0xa855f7);
    const cSecondary = new THREE.Color(isLogin ? 0x38bdf8 : 0x6366f1);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 35;

      const rand = Math.random();
      const col = rand > 0.6 ? cPrimary : rand > 0.3 ? cSecondary : cWhite;
      partColors[i] = col.r;
      partColors[i + 1] = col.g;
      partColors[i + 2] = col.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    scene.add(particleSystem);

    // 3. Subtle Floating Orbiting Glass Orbs
    const orbGroup = new THREE.Group();
    const orbCount = 3;
    const orbMeshes = [];
    const orbGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    for (let i = 0; i < orbCount; i++) {
      const mesh = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / orbCount) * Math.PI * 2;
      const radius = 7.5 + (i * 1.5);
      mesh.position.set(Math.cos(angle) * radius, (i - 1) * 2.2, Math.sin(angle) * radius);
      orbMeshes.push({ mesh, angle, speed: 0.008 + i * 0.004, radius });
      orbGroup.add(mesh);
    }
    scene.add(orbGroup);

    // 4. Input handling
    let winWidth = window.innerWidth || 1920;
    let winHeight = window.innerHeight || 1080;
    let mouseThrottle = 0;

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - mouseThrottle < 32) return;
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

    // 5. Render loop
    let animId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Fluid damped mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;

      particleSystem.rotation.y = elapsed * 0.015 + mouseRef.current.x * 0.05;
      particleSystem.rotation.x = mouseRef.current.y * 0.04;

      orbMeshes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y += Math.sin(elapsed * 2 + item.angle) * 0.01;
      });

      camera.position.x = mouseRef.current.x * 0.8;
      camera.position.y = mouseRef.current.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      partGeo.dispose();
      partMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
    };
  }, [mode, theme]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden will-change-transform"
      aria-hidden="true"
    />
  );
}
