import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuthCanvas3D({ theme = 'cyan' }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const themeColors = {
    cyan: { primary: 0x00f2fe, secondary: 0x4facfe, core: 0x8a2387, ambient: 0x071126 },
    violet: { primary: 0xa855f7, secondary: 0xd946ef, core: 0x6366f1, ambient: 0x180726 },
    emerald: { primary: 0x10b981, secondary: 0x34d399, core: 0x0284c7, ambient: 0x061c16 },
    gold: { primary: 0xf59e0b, secondary: 0xfbbf24, core: 0xef4444, ambient: 0x241403 },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.02);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const colors = themeColors[theme] || themeColors.cyan;

    // 2. Central 3D Cyber Crystal / Quantum Core
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Inner glowing crystal
    const innerGeo = new THREE.OctahedronGeometry(4.2, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: colors.primary,
      emissive: colors.core,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.75,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    crystalGroup.add(innerCrystal);

    // Outer wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(5.6, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    crystalGroup.add(wireCage);

    // Dynamic Orbital Gimbal Rings
    const ringGeo1 = new THREE.TorusGeometry(7.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.6,
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitalRing1.rotation.x = Math.PI / 3;
    crystalGroup.add(orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(8.4, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      transparent: true,
      opacity: 0.4,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.y = Math.PI / 4;
    crystalGroup.add(orbitalRing2);

    // Floating Data Node Satellites
    const satGroup = new THREE.Group();
    const satCount = 6;
    const satGeo = new THREE.OctahedronGeometry(0.35, 0);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const satellites = [];

    for (let i = 0; i < satCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 6.8 + (i % 2) * 1.5;
      satMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 3, Math.sin(angle) * radius);
      satellites.push({ mesh: satMesh, speed: 0.015 + (i * 0.003), angle, radius });
      satGroup.add(satMesh);
    }
    crystalGroup.add(satGroup);

    // 3. Cyber Dust & Star Particle Cloud
    const particleCount = 750;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const partColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(colors.primary);
    const c2 = new THREE.Color(colors.secondary);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 35;

      const r = Math.random();
      const col = r > 0.6 ? c1 : r > 0.3 ? c2 : cWhite;
      partColors[i] = col.r;
      partColors[i + 1] = col.g;
      partColors[i + 2] = col.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    scene.add(particleSystem);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(colors.primary, 3, 50);
    mainLight.position.set(10, 10, 15);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(colors.secondary, 2, 40);
    rimLight.position.set(-12, -8, -10);
    scene.add(rimLight);

    // Interactive mouse listener
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    let animId = null;
    let clock = new THREE.Clock();
    let isIntersecting = true;

    const animate = () => {
      if (!isIntersecting) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate central 3D crystal with mouse inertia
      crystalGroup.rotation.y = elapsed * 0.25 + mouseRef.current.x * 0.5;
      crystalGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15 + mouseRef.current.y * 0.3;

      wireCage.rotation.x = -elapsed * 0.18;
      wireCage.rotation.z = elapsed * 0.12;

      orbitalRing1.rotation.z = elapsed * 0.35;
      orbitalRing2.rotation.x = elapsed * 0.28;

      // Pulse inner core
      const scalePulse = 1 + Math.sin(elapsed * 2) * 0.05;
      innerCrystal.scale.set(scalePulse, scalePulse, scalePulse);

      // Orbit satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.rotation.x += 0.03;
        sat.mesh.rotation.y += 0.04;
      });

      // Ambient particle slow drift
      particleSystem.rotation.y = elapsed * 0.02;

      // Subtle dynamic camera float
      camera.position.x = mouseRef.current.x * 1.8;
      camera.position.y = mouseRef.current.y * 1.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animId) {
          clock.start();
          animate();
        }
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    animate();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      partGeo.dispose();
      partMat.dispose();
      ambientLight.dispose();
      mainLight.dispose();
      rimLight.dispose();
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
