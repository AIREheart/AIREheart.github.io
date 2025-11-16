// components/three/CastleScene.js
// REDESIGNED FANTASY CASTLE - Cohesive and Beautiful

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

// Tower component - More elegant design
function Tower({ position, height, radius, color, label, onClick, onHoverChange }) {
  const [hovered, setHovered] = useState(false)
  const towerRef = useRef()
  const crystalRef = useRef()
  
  useFrame((state) => {
    // Gentle pulsing animation
    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.5
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9
      crystalRef.current.scale.setScalar(pulse)
    }
    
    if (hovered && towerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.01
      towerRef.current.scale.setScalar(scale)
    } else if (towerRef.current) {
      towerRef.current.scale.setScalar(1)
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHoverChange && onHoverChange(label, true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    onHoverChange && onHoverChange(label, false)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick && onClick(label)
  }
  
  return (
    <group position={position}>
      {/* Main tower body - smoother, more elegant */}
      <mesh
        ref={towerRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
      >
        <cylinderGeometry args={[radius, radius * 1.1, height, 16]} />
        <meshStandardMaterial 
          color={hovered ? color : '#4a5568'}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.4 : 0}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {/* Stone rings around tower */}
      {[0.3, 0.6].map((heightRatio, idx) => (
        <mesh
          key={idx}
          position={[0, -height / 2 + height * heightRatio, 0]}
          castShadow
        >
          <torusGeometry args={[radius * 1.15, 0.15, 8, 16]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Crenellated top */}
      <group position={[0, height / 2, 0]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius * 0.9,
                0.6,
                Math.sin(angle) * radius * 0.9
              ]}
              castShadow
            >
              <boxGeometry args={[0.6, 1.2, 0.6]} />
              <meshStandardMaterial color="#2d3748" roughness={0.9} />
            </mesh>
          )
        })}
        
        {/* Top platform */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[radius * 0.95, radius, 0.3, 16]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} />
        </mesh>
      </group>
      
      {/* Conical roof */}
      <mesh position={[0, height / 2 + 1.8, 0]} castShadow>
        <coneGeometry args={[radius * 1.2, 2.5, 8]} />
        <meshStandardMaterial 
          color={hovered ? color : '#1a202c'}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
          roughness={0.6}
        />
      </mesh>
      
      {/* Magical crystal at top */}
      <group ref={crystalRef} position={[0, height / 2 + 3.5, 0]}>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.0 : 0.6}
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
        {/* Crystal glow */}
        <pointLight 
          color={color} 
          intensity={hovered ? 2.0 : 1.0} 
          distance={8}
        />
      </group>
      
      {/* Arched windows */}
      {[0, 1, 2].map((level) => (
        <group key={level}>
          {[0, 2, 4, 6].map((i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * (radius + 0.05),
                  -height / 2 + 2 + level * (height / 4),
                  Math.sin(angle) * (radius + 0.05)
                ]}
                rotation={[0, -angle, 0]}
              >
                {/* Window frame */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.8, 1.2, 0.1]} />
                  <meshStandardMaterial color="#2d3748" />
                </mesh>
                {/* Window glow */}
                <mesh position={[0, 0, 0.02]}>
                  <planeGeometry args={[0.6, 1.0]} />
                  <meshStandardMaterial 
                    color="#d4af37"
                    emissive="#d4af37"
                    emissiveIntensity={hovered ? 1.2 : 0.6}
                  />
                </mesh>
                {hovered && (
                  <pointLight 
                    color="#d4af37" 
                    intensity={0.8} 
                    distance={4}
                  />
                )}
              </group>
            )
          })}
        </group>
      ))}
      
      {/* Tower entrance at base */}
      <group position={[0, -height / 2 + 1.2, radius + 0.05]}>
        <mesh>
          <boxGeometry args={[1.2, 2.4, 0.1]} />
          <meshStandardMaterial color="#1a202c" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// Connecting wall segment
function WallSegment({ start, end, height = 4 }) {
  const geometry = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start)
    const length = dir.length()
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const angle = Math.atan2(dir.z, dir.x)
    
    return { length, midpoint, angle }
  }, [start, end])
  
  return (
    <group position={geometry.midpoint} rotation={[0, geometry.angle, 0]}>
      {/* Main wall */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[geometry.length, height, 0.6]} />
        <meshStandardMaterial 
          color="#4a5568" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Crenellations on top */}
      {Array.from({ length: Math.floor(geometry.length / 2) }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -geometry.length / 2 + (i + 0.5) * 2,
            height / 2 + 0.4,
            0
          ]}
          castShadow
        >
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Decorative stone band */}
      <mesh position={[0, height / 3, 0.35]}>
        <boxGeometry args={[geometry.length, 0.2, 0.1]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </group>
  )
}

// Grand entrance gate
function MainGate({ position }) {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const leftDoorRef = useRef()
  const rightDoorRef = useRef()
  
  useFrame(() => {
    if (leftDoorRef.current && rightDoorRef.current) {
      const targetRotation = isOpen ? Math.PI / 2.5 : 0
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetRotation,
        0.08
      )
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRotation,
        0.08
      )
    }
  })
  
  return (
    <group position={position}>
      {/* Gate arch structure */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[5, 7, 1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
      
      {/* Arch opening */}
      <mesh position={[0, 2.5, 0.3]} castShadow>
        <boxGeometry args={[3, 5, 0.5]} />
        <meshStandardMaterial color="#1a202c" roughness={0.9} />
      </mesh>
      
      {/* Left door */}
      <group position={[-1.5, 2.5, 0.5]}>
        <mesh 
          ref={leftDoorRef}
          position={[1.5, 0, 0]}
          castShadow
        >
          <boxGeometry args={[3, 5, 0.3]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
        </mesh>
      </group>
      
      {/* Right door */}
      <group position={[1.5, 2.5, 0.5]}>
        <mesh 
          ref={rightDoorRef}
          position={[-1.5, 0, 0]}
          castShadow
        >
          <boxGeometry args={[3, 5, 0.3]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
        </mesh>
      </group>
      
      {/* Decorative arch top */}
      <mesh position={[0, 6.5, 0]} castShadow>
        <boxGeometry args={[6, 1, 1.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
      
      {/* Magical control orb */}
      <mesh
        position={[3, 2, 0]}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setButtonHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setButtonHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={buttonHovered ? 1.2 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Orb mount */}
      <mesh position={[3, 2, -0.3]}>
        <cylinderGeometry args={[0.2, 0.3, 0.6, 8]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </group>
  )
}

// Courtyard elements
function Courtyard() {
  return (
    <group>
      {/* Central fountain */}
      <group position={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[2, 2.5, 0.6, 16]} />
          <meshStandardMaterial color="#4a5568" roughness={0.8} />
        </mesh>
        {/* Upper basin */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[1.2, 1.5, 1, 16]} />
          <meshStandardMaterial color="#4a5568" roughness={0.8} />
        </mesh>
        {/* Water surface */}
        <mesh position={[0, 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.1, 32]} />
          <meshStandardMaterial 
            color="#1e40af"
            emissive="#1e40af"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Corner braziers */}
      {[[-6, -6], [6, -6], [-6, 6], [6, 6]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.3, 0.5, 1, 8]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial 
              color="#ff6b35"
              emissive="#ff6b35"
              emissiveIntensity={0.8}
            />
          </mesh>
          <pointLight color="#ff6b35" intensity={1.5} distance={8} />
        </group>
      ))}
    </group>
  )
}

// Main castle scene
function CastleContent({ onTowerInteraction }) {
  const [selectedTower, setSelectedTower] = useState(null)
  
  const handleTowerClick = (label) => {
    setSelectedTower(label)
    onTowerInteraction && onTowerInteraction(label, 'click')
  }

  const handleTowerHover = (label, isHovering) => {
    onTowerInteraction && onTowerInteraction(label, isHovering ? 'hover' : 'unhover')
  }
  
  const towers = useMemo(() => [
    {
      position: [-10, 5, -10],
      height: 10,
      radius: 2,
      color: '#cd7f32',
      label: 'Biochemistry'
    },
    {
      position: [10, 5, -10],
      height: 12,
      radius: 2,
      color: '#d4af37',
      label: 'Computation'
    },
    {
      position: [0, 5, 10],
      height: 11,
      radius: 2,
      color: '#800020',
      label: 'Philosophy'
    }
  ], [])
  
  return (
    <>
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={18}
        maxDistance={70}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
      />

      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <hemisphereLight 
        skyColor="#e8f1f5" 
        groundColor="#0a1128" 
        intensity={0.5} 
      />
      <directionalLight
        position={[25, 35, 15]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      
      {/* Moonlight */}
      <pointLight position={[0, 30, 20]} color="#e8f1f5" intensity={0.6} />
      
      {/* Ground */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial 
          color="#2d3748" 
          roughness={0.95}
        />
      </mesh>
      
      {/* Inner courtyard floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial 
          color="#4a5568" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Towers */}
      {towers.map((tower, i) => (
        <Tower
          key={i}
          {...tower}
          onClick={handleTowerClick}
          onHoverChange={handleTowerHover}
        />
      ))}

      
      
      {/* Connecting walls */}
      <WallSegment 
        start={new THREE.Vector3(-10, 3, -10)} 
        end={new THREE.Vector3(10, 3, -10)} 
      />
      <WallSegment 
        start={new THREE.Vector3(10, 3, -10)} 
        end={new THREE.Vector3(0, 3, 10)} 
      />
      <WallSegment 
        start={new THREE.Vector3(0, 3, 10)} 
        end={new THREE.Vector3(-10, 3, -10)} 
      />
      
      {/* Main gate */}
      <MainGate position={[0, 0, -10]} />
      
      {/* Courtyard */}
      <Courtyard />
      
      {/* Selection indicator */}
      {selectedTower && (
        <group position={[0, 18, 0]}>
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
          <pointLight color="#d4af37" intensity={2} distance={12} />
        </group>
      )}
    </>
  )
}

export default function CastleScene({ onTowerInteraction }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 20, 35], fov: 55 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a1128']} />
        <fog attach="fog" args={['#0a1128', 30, 100]} />
        <CastleContent onTowerInteraction={onTowerInteraction} />
      </Canvas>
    </div>
  )
}

