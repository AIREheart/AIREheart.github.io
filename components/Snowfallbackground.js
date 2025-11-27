import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SnowfallBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Soft dove grey background
    scene.background = new THREE.Color(0xd3d3d3);
    scene.fog = new THREE.Fog(0xd3d3d3, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === SNOWFLAKES ===
    // Particle system - like molecules in Brownian motion with gravitational bias
    const snowflakeCount = 800;
    const snowGeometry = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowflakeCount * 3);
    const snowVelocities = new Float32Array(snowflakeCount * 3);
    
    for (let i = 0; i < snowflakeCount; i++) {
      const i3 = i * 3;
      // Spread across viewing volume
      snowPositions[i3] = (Math.random() - 0.5) * 100;     // x
      snowPositions[i3 + 1] = (Math.random() - 0.5) * 100; // y
      snowPositions[i3 + 2] = (Math.random() - 0.5) * 60;  // z
      
      // Each snowflake has slight random drift
      snowVelocities[i3] = (Math.random() - 0.5) * 0.02;     // x drift
      snowVelocities[i3 + 1] = -0.05 - Math.random() * 0.03; // downward
      snowVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02; // z drift
    }
    
    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    
    const snowMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    const snowflakes = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snowflakes);

    // === FOG LAYERS ===
    // Multiple semi-transparent planes creating depth like atmospheric scattering
    const fogLayers = [];
    const fogCount = 5;
    
    for (let i = 0; i < fogCount; i++) {
      const fogGeometry = new THREE.PlaneGeometry(200, 200);
      const fogMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.05,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      });
      
      const fogPlane = new THREE.Mesh(fogGeometry, fogMaterial);
      fogPlane.position.z = -10 - i * 8;
      fogPlane.position.y = (Math.random() - 0.5) * 20;
      
      // Store initial position and drift parameters
      fogPlane.userData = {
        driftSpeed: 0.003 + Math.random() * 0.002,
        driftOffset: Math.random() * Math.PI * 2,
        initialY: fogPlane.position.y
      };
      
      fogLayers.push(fogPlane);
      scene.add(fogPlane);
    }

    // === AMBIENT LIGHT ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // === ANIMATION ===
    let time = 0;
    
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Animate snowflakes - gentle falling with drift
      const positions = snowGeometry.attributes.position.array;
      
      for (let i = 0; i < snowflakeCount; i++) {
        const i3 = i * 3;
        
        // Update position based on velocity
        positions[i3] += snowVelocities[i3];         // x
        positions[i3 + 1] += snowVelocities[i3 + 1]; // y
        positions[i3 + 2] += snowVelocities[i3 + 2]; // z
        
        // Reset snowflakes that fall below view
        if (positions[i3 + 1] < -50) {
          positions[i3 + 1] = 50;
          positions[i3] = (Math.random() - 0.5) * 100;
          positions[i3 + 2] = (Math.random() - 0.5) * 60;
        }
        
        // Wrap around horizontally
        if (positions[i3] > 50) positions[i3] = -50;
        if (positions[i3] < -50) positions[i3] = 50;
      }
      
      snowGeometry.attributes.position.needsUpdate = true;

      // Animate fog layers - slow horizontal drift
      fogLayers.forEach((fog, index) => {
        const drift = Math.sin(time * fog.userData.driftSpeed + fog.userData.driftOffset);
        fog.position.x = drift * 10;
        
        // Subtle vertical oscillation
        fog.position.y = fog.userData.initialY + Math.sin(time * 0.001 + index) * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // === RESIZE HANDLER ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // === CLEANUP ===
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      snowGeometry.dispose();
      snowMaterial.dispose();
      
      fogLayers.forEach(fog => {
        fog.geometry.dispose();
        fog.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SnowfallBackground;