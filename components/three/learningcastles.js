// components/three/CastleScene.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function CastleScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Dynamic imports for Three.js (only runs in browser)
    let THREE, OrbitControls;
    let scene, camera, renderer, controls, animationId;
    let gate = { door: null, position: 0, isOpening: false, isClosing: false };

    const init = async () => {
      // Import Three.js modules
      THREE = await import('three');
      const OrbitControlsModule = await import('three/examples/jsm/controls/OrbitControls');
      OrbitControls = OrbitControlsModule.OrbitControls;

      // Setup scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x03193b);
      scene.fog = new THREE.Fog(0x0a0e27, 50, 200);

      // Setup camera
      camera = new THREE.PerspectiveCamera(
        60,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 15, 40);

      // Setup renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.appendChild(renderer.domElement);

      // Setup controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minDistance = 10;
      controls.maxDistance = 100;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x4a5f8f, 0.4);
      scene.add(ambientLight);

      const moonLight = new THREE.DirectionalLight(0xebeced, 2);
      moonLight.position.set(20, 30, 20);
      moonLight.castShadow = true;
      moonLight.shadow.mapSize.width = 2048;
      moonLight.shadow.mapSize.height = 2048;
      scene.add(moonLight);

      const torchLight1 = new THREE.PointLight(0xffaa55, 1, 20);
      torchLight1.position.set(-8, 8, 15);
      scene.add(torchLight1);

      const torchLight2 = new THREE.PointLight(0xffaa55, 1, 20);
      torchLight2.position.set(8, 8, 15);
      scene.add(torchLight2);

      // Ground
      const groundGeometry = new THREE.PlaneGeometry(200, 200);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a2332,
        roughness: 0.9,
        metalness: 0.1
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const gridHelper = new THREE.GridHelper(200, 50, 0x2a3f5f, 0x1a2535);
      gridHelper.position.y = 0.01;
      scene.add(gridHelper);

      // Build castle
      const castle = new THREE.Group();
      const castleSize = 30;
      const wallHeight = 12;
      const wallThickness = 2;

      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a5568,
        roughness: 0.9,
        metalness: 0.1
      });

      // Helper to create wall segments
      const createWall = (x, y, z, width, height, depth) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const wall = new THREE.Mesh(geometry, wallMaterial);
        wall.position.set(x, y, z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        return wall;
      };

      // Walls with gate opening
      const frontWallLeft = createWall(-11, wallHeight/2, castleSize/2, 8, wallHeight, wallThickness);
      const frontWallRight = createWall(11, wallHeight/2, castleSize/2, 8, wallHeight, wallThickness);
      const backWall = createWall(0, wallHeight/2, -castleSize/2, castleSize, wallHeight, wallThickness);
      const leftWall = createWall(-castleSize/2, wallHeight/2, 0, wallThickness, wallHeight, castleSize);
      const rightWall = createWall(castleSize/2, wallHeight/2, 0, wallThickness, wallHeight, castleSize);

      castle.add(frontWallLeft, frontWallRight, backWall, leftWall, rightWall);

      // Towers
      const createTower = () => {
        const tower = new THREE.Group();

        const bodyGeometry = new THREE.CylinderGeometry(3, 3, 16, 8);
        const body = new THREE.Mesh(bodyGeometry, wallMaterial);
        body.position.y = 8;
        body.castShadow = true;
        tower.add(body);

        const roofGeometry = new THREE.ConeGeometry(4, 6, 8);
        const roofMaterial = new THREE.MeshStandardMaterial({
          color: 0x7c3030,
          roughness: 0.7
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 19;
        roof.castShadow = true;
        tower.add(roof);

        const windowGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        const windowMaterial = new THREE.MeshStandardMaterial({
          color: 0xffdd88,
          emissive: 0xffaa33,
          emissiveIntensity: 0.5
        });
        const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
        window1.position.set(0, 12, 3.2);
        tower.add(window1);

        return tower;
      };

      const towerPositions = [
        { x: -castleSize/2, z: castleSize/2 },
        { x: castleSize/2, z: castleSize/2 },
        { x: -castleSize/2, z: -castleSize/2 },
        { x: castleSize/2, z: -castleSize/2 }
      ];

      towerPositions.forEach(pos => {
        const tower = createTower();
        tower.position.set(pos.x, 0, pos.z);
        castle.add(tower);
      });

      // Gate
      const gateGroup = new THREE.Group();
      const doorGeometry = new THREE.BoxGeometry(14, 10, 0.5);
      const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x3e2723,
        roughness: 1,
        metalness: 0
      });
      const gateDoor = new THREE.Mesh(doorGeometry, doorMaterial);
      gateDoor.position.y = 5;
      gateDoor.castShadow = true;
      gateGroup.add(gateDoor);
      gate.door = gateDoor;

      for (let i = 0; i < 3; i++) {
        const bandGeometry = new THREE.BoxGeometry(14, 0.3, 0.6);
        const bandMaterial = new THREE.MeshStandardMaterial({
          color: 0x5a5a5a,
          metalness: 0.8,
          roughness: 0.3
        });
        const band = new THREE.Mesh(bandGeometry, bandMaterial);
        band.position.set(0, 2 + i * 3, 0.3);
        gateGroup.add(band);
      }

      gateGroup.position.set(0, 0, castleSize/2);
      castle.add(gateGroup);

      // Gate arch
      const archGeometry = new THREE.TorusGeometry(6, 1, 8, 16, Math.PI);
      const archMaterial = new THREE.MeshStandardMaterial({ color: 0x6b7280 });
      const arch = new THREE.Mesh(archGeometry, archMaterial);
      arch.rotation.x = Math.PI / 2;
      arch.position.set(0, 8, castleSize/2 - 1);
      arch.castShadow = true;
      castle.add(arch);

      // Courtyard
      const courtyardGeometry = new THREE.PlaneGeometry(castleSize - 4, castleSize - 4);
      const courtyardMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d3748,
        roughness: 0.8
      });
      const courtyard = new THREE.Mesh(courtyardGeometry, courtyardMaterial);
      courtyard.rotation.x = -Math.PI / 2;
      courtyard.position.y = 0.1;
      courtyard.receiveShadow = true;
      castle.add(courtyard);

      scene.add(castle);

      // Stars
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 2000;
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 400;
        positions[i + 1] = Math.random() * 200 + 50;
        positions[i + 2] = (Math.random() - 0.5) * 400;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.8
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Event handlers
      const handleResize = () => {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      const handleKeyDown = (event) => {
        if (event.key === 'o' || event.key === 'O') {
          gate.isOpening = true;
          gate.isClosing = false;
        }
        if (event.key === 'c' || event.key === 'C') {
          gate.isClosing = true;
          gate.isOpening = false;
        }
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('keydown', handleKeyDown);

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        controls.update();

        if (gate.isOpening && gate.position < 1) {
          gate.position += 0.02;
          if (gate.position >= 1) {
            gate.position = 1;
            gate.isOpening = false;
          }
        }

        if (gate.isClosing && gate.position > 0) {
          gate.position -= 0.02;
          if (gate.position <= 0) {
            gate.position = 0;
            gate.isClosing = false;
          }
        }

        if (gate.door) {
          gate.door.position.y = 5 + (gate.position * 10);
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyDown);
        cancelAnimationFrame(animationId);
        if (controls) controls.dispose();
        if (renderer) renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#d4af37',
        background: 'rgba(10, 14, 39, 0.8)',
        padding: '15px 20px',
        borderRadius: '8px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: "'Crimson Text', serif",
        zIndex: 10
      }}>
        <h3 style={{ marginBottom: '10px', color: '#ffdd88', fontSize: '16px', margin: '0 0 10px 0' }}>
          🏰 Castle Controls
        </h3>
        <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(212, 175, 55, 0.2)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace' }}>O</kbd> - Open gate</p>
        <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(212, 175, 55, 0.2)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace' }}>C</kbd> - Close gate</p>
        <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(212, 175, 55, 0.2)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace' }}>Drag</kbd> - Orbit camera</p>
        <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(212, 175, 55, 0.2)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace' }}>Scroll</kbd> - Zoom</p>
      </div>
    </div>
  );
}