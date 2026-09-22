import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuthCanvas3D({ theme = 'cyan', offsetLeft = true }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const themeColors = {
    cyan: {
      primary: 0x00f2fe,
      secondary: 0x38bdf8,
      accent: 0xa855f7,
      core: 0x0284c7,
      glow: 0x00f2fe,
    },
    violet: {
      primary: 0xa855f7,
      secondary: 0xc084fc,
      accent: 0xec4899,
      core: 0x7c3aed,
      glow: 0xa855f7,
    },
    emerald: {
      primary: 0x10b981,
      secondary: 0x34d399,
      accent: 0x06b6d4,
      core: 0x059669,
      glow: 0x10b981,
    },
    gold: {
      primary: 0xf59e0b,
      secondary: 0xfbbf24,
      accent: 0xf97316,
      core: 0xd97706,
      glow: 0xf59e0b,
    },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 19);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1.0); // 1.0 fixed pixel ratio for 120fps fluid interaction
    container.appendChild(renderer.domElement);

    const colors = themeColors[theme] || themeColors.cyan;

    // 2. Quantum Nexus Master Group
    const masterGroup = new THREE.Group();
    if (offsetLeft && window.innerWidth >= 1024) {
      masterGroup.position.x = -4.2;
    }
    scene.add(masterGroup);

    // Core 1: Faceted Icosahedron Gem
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colors.primary,
      emissive: colors.core,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Core 2: Inner Pulsing Energy Octahedron
    const innerGeo = new THREE.OctahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // Core 3: Outer Tech Wireframe Cage
    const cageGeo = new THREE.DodecahedronGeometry(5.2, 0);
    const cageMat = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    masterGroup.add(cageMesh);

    // Gyroscopic Ring 1 (Horizontal Inclined)
    const ringGeo1 = new THREE.TorusGeometry(6.6, 0.05, 12, 72);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    masterGroup.add(ringMesh1);

    // Gyroscopic Ring 2 (Vertical Inclined)
    const ringGeo2 = new THREE.TorusGeometry(7.8, 0.035, 12, 72);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colors.accent,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3.8;
    masterGroup.add(ringMesh2);

    // Orbiting Quantum Node Satellites (4 nodes with trails)
    const satelliteGroup = new THREE.Group();
    const satCount = 4;
    const satellites = [];
    const satGeo = new THREE.OctahedronGeometry(0.3, 0);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 6.2 + (i % 2) * 1.6;
      sat.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
      satellites.push({
        mesh: sat,
        speed: 0.01 + (i * 0.004),
        angle,
        radius,
        elevation: (i - 1.5) * 0.8,
      });
      satelliteGroup.add(sat);
    }
    masterGroup.add(satelliteGroup);

    // Accretion Particle Disk / Stardust
    const particleCount = 360;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const partColors = new Float32Array(particleCount * 3);

    const cPrimary = new THREE.Color(colors.primary);
    const cSecondary = new THREE.Color(colors.secondary);
    const cAccent = new THREE.Color(colors.accent);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Dispersed disk & ambient field
      const theta = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 22;
      positions[i] = Math.cos(theta) * r + (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 26;
      positions[i + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 15;

      const rand = Math.random();
      const col = rand > 0.65 ? cPrimary : rand > 0.4 ? cSecondary : rand > 0.2 ? cAccent : cWhite;
      partColors[i] = col.r;
      partColors[i + 1] = col.g;
      partColors[i + 2] = col.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    scene.add(particleSystem);

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(colors.primary, 2.5, 60);
    keyLight.position.set(12, 10, 15);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(colors.accent, 2.0, 50);
    rimLight.position.set(-15, -10, -10);
    scene.add(rimLight);

    // 4. Input & Resize Handling
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

      if (offsetLeft && window.innerWidth >= 1024) {
        masterGroup.position.x = -4.2;
      } else {
        masterGroup.position.x = 0;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 5. Render Loop with IntersectionObserver
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

      // Fluid damped mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;

      // Rotate central gem
      coreMesh.rotation.y = elapsed * 0.2 + mouseRef.current.x * 0.35;
      coreMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.15 + mouseRef.current.y * 0.2;

      // Counter-rotate inner wireframe
      innerMesh.rotation.y = -elapsed * 0.3;
      innerMesh.rotation.z = elapsed * 0.2;
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.06;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Rotate cage
      cageMesh.rotation.x = -elapsed * 0.12;
      cageMesh.rotation.y = elapsed * 0.15;

      // Gimbal rings
      ringMesh1.rotation.z = elapsed * 0.28;
      ringMesh2.rotation.x = elapsed * 0.22;

      // Orbit satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(elapsed * 1.5 + sat.angle) * 0.7 + sat.elevation;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Ambient particle slow drift
      particleSystem.rotation.y = elapsed * 0.012;

      // Camera subtle parallax
      camera.position.x = mouseRef.current.x * 0.9;
      camera.position.y = mouseRef.current.y * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const startRendering = () => {
      if (!animId) {
        clock.start();
        animId = requestAnimationFrame(animate);
      }
    };

    const stopRendering = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    startRendering();

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
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      partGeo.dispose();
      partMat.dispose();
      ambientLight.dispose();
      keyLight.dispose();
      rimLight.dispose();
    };
  }, [theme, offsetLeft]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden will-change-transform"
      aria-hidden="true"
    />
  );
}
