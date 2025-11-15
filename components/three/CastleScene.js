// components/three/CastleScene.js
// COMPLETE WORKING FILE - Copy this exactly

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

// Tower component
function Tower({ position, height, radius, color, label, onClick }) {
  const [hovered, setHovered] = useState(false)
  const towerRef = useRef()
  const flagRef = useRef()
  
  useFrame((state) => {
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
    
    if (hovered && towerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.02
      towerRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <group position={position}>
      {/* Main tower */}
      <mesh
        ref={towerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick && onClick(label)}
        castShadow
      >
        <cylinderGeometry args={[radius, radius * 1.2, height, 8]} />
        <meshStandardMaterial 
          color={hovered ? color : '#3a3a3a'}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          roughness={0.8}
        />
      </mesh>
      
      {/* Battlements */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * radius,
            height / 2 + 0.5,
            Math.sin((i / 8) * Math.PI * 2) * radius
          ]}
          castShadow
        >
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Roof */}
      <mesh position={[0, height / 2 + 1.5, 0]} castShadow>
        <coneGeometry args={[radius * 1.3, 2, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      
      {/* Flag pole */}
      <group ref={flagRef} position={[0, height / 2 + 3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Flag */}
        <mesh position={[0.5, 0.8, 0]}>
          <planeGeometry args={[1, 0.6]} />
          <meshStandardMaterial 
            color={color} 
            side={THREE.DoubleSide}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      
      {/* Windows */}
      {[0, 1, 2].map((level) => (
        <group key={level}>
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * (radius + 0.1),
                  -height / 2 + 2 + level * 3,
                  Math.sin(angle) * (radius + 0.1)
                ]}
                rotation={[0, -angle, 0]}
              >
                <mesh>
                  <planeGeometry args={[0.6, 0.8]} />
                  <meshStandardMaterial 
                    color="#d4af37"
                    emissive="#d4af37"
                    emissiveIntensity={hovered ? 0.8 : 0.3}
                  />
                </mesh>
                {hovered && (
                  <pointLight 
                    color="#d4af37" 
                    intensity={0.5} 
                    distance={3}
                  />
                )}
              </group>
            )
          })}
        </group>
      ))}
      
      {/* Floating label */}
      {hovered && (
        <mesh position={[0, height / 2 + 5, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

// Wall component
function Wall({ start, end, height }) {
  const direction = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start)
    return {
      length: dir.length(),
      midpoint: new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5),
      angle: Math.atan2(dir.z, dir.x)
    }
  }, [start, end])
  
  return (
    <mesh 
      position={direction.midpoint} 
      rotation={[0, direction.angle, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[direction.length, height, 0.8]} />
      <meshStandardMaterial 
        color="#4a4a4a" 
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

// Gate component
function Gate({ position }) {
  const [isOpen, setIsOpen] = useState(false)
  const gateRef = useRef()
  
  useFrame(() => {
    if (gateRef.current) {
      const targetRotation = isOpen ? -Math.PI / 2 : 0
      gateRef.current.rotation.y = THREE.MathUtils.lerp(
        gateRef.current.rotation.y,
        targetRotation,
        0.05
      )
    }
  })
  
  return (
    <group position={position}>
      {/* Gate frame */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[4, 6, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>
      
      {/* Door */}
      <mesh 
        ref={gateRef}
        position={[0, 1.5, 0.3]}
        castShadow
      >
        <boxGeometry args={[3.5, 5.5, 0.3]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Button to open gate */}
      <mesh
        position={[0, 1, -3]}
        onClick={() => setIsOpen(!isOpen)}
        onPointerOver={(e) => {
          e.object.material.emissiveIntensity = 0.5
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.object.material.emissiveIntensity = 0
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#d4af37"
          emissive="#d4af37"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

// Main castle scene component
function CastleContent() {
  const [selectedTower, setSelectedTower] = useState(null)
  
  const towers = useMemo(() => [
    {
      position: [-8, 4, -8],
      height: 8,
      radius: 1.5,
      color: '#cd7f32',
      label: 'Biochemistry'
    },
    {
      position: [8, 4, -8],
      height: 10,
      radius: 1.5,
      color: '#d4af37',
      label: 'Computation'
    },
    {
      position: [0, 4, 8],
      height: 9,
      radius: 1.5,
      color: '#800020',
      label: 'Philosophy'
    }
  ], [])
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <hemisphereLight 
        skyColor="#e8f1f5" 
        groundColor="#0a1128" 
        intensity={0.4} 
      />
      <directionalLight
        position={[20, 30, 10]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Ground */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#1a2a1a" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Towers */}
      {towers.map((tower, i) => (
        <Tower
          key={i}
          {...tower}
          onClick={setSelectedTower}
        />
      ))}
      
      {/* Walls */}
      <Wall 
        start={new THREE.Vector3(-8, 4, -8)} 
        end={new THREE.Vector3(8, 4, -8)} 
        height={6}
      />
      <Wall 
        start={new THREE.Vector3(8, 4, -8)} 
        end={new THREE.Vector3(0, 4, 8)} 
        height={6}
      />
      <Wall 
        start={new THREE.Vector3(0, 4, 8)} 
        end={new THREE.Vector3(-8, 4, -8)} 
        height={6}
      />
      
      {/* Gate */}
      <Gate position={[0, 0, -8]} />
      
      {/* Selected tower indicator */}
      {selectedTower && (
        <mesh position={[0, 15, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </>
  )
}

// Export default component
export default function CastleScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 15, 25], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a1128']} />
        <fog attach="fog" args={['#0a1128', 20, 80]} />
        <CastleContent />
      </Canvas>
    </div>
  )
}