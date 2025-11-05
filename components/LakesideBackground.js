import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Stars() {
  const starsRef = useRef()
  
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1500; i++) {
      const x = (Math.random() - 0.5) * 150
      const y = Math.random() * 60 + 10
      const z = (Math.random() - 0.5) * 150
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.005
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.length / 3}
          array={stars}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#e8f1f5"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Moon() {
  return (
    <group position={[20, 25, -40]}>
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>
      <pointLight color="#e8f1f5" intensity={0.3} distance={80} />
    </group>
  )
}

function Lake() {
  const waterRef = useRef()
  
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })
  
  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#0d1b2a') },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Gentle waves
          float wave1 = sin(pos.x * 0.3 + time * 0.2) * 0.2;
          float wave2 = sin(pos.z * 0.2 + time * 0.15) * 0.15;
          float wave3 = sin((pos.x + pos.z) * 0.1 + time * 0.1) * 0.1;
          pos.y += wave1 + wave2 + wave3;
          
          vElevation = pos.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec3 finalColor = color;
          
          // Subtle shimmer
          float shimmer = vElevation * 0.2 + 0.8;
          finalColor *= shimmer;
          
          // Moonlight reflection on water
          float reflection = smoothstep(0.3, 0.7, vUv.x) * 0.25;
          finalColor += vec3(reflection * 0.4, reflection * 0.4, reflection * 0.3);
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
    })
  }, [])
  
  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -15, 0]}>
      <planeGeometry args={[200, 200, 80, 80]} />
      <primitive object={waterMaterial} attach="material" />
    </mesh>
  )
}

function Swan() {
  const swanRef = useRef()
  
  useFrame((state) => {
    if (swanRef.current) {
      swanRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4 - 12
      swanRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15 + Math.PI / 4
    }
  })
  
  return (
    <group ref={swanRef} position={[15, -12, -5]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 20, 20]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          opacity={0.5} 
          transparent 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, Math.PI / 5]}>
        <cylinderGeometry args={[0.2, 0.3, 1.8, 12]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          opacity={0.5} 
          transparent
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Head */}
      <mesh position={[1.3, 1.7, 0]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          opacity={0.5} 
          transparent
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

export default function LakesideBackground() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 8, 30], fov: 65 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#0a1128']} />
        <fog attach="fog" args={['#0a1128', 20, 100]} />
        
        <Stars />
        <Moon />
        <Lake />
        <Swan />
        
        <ambientLight intensity={0.15} />
      </Canvas>
    </div>
  )
}