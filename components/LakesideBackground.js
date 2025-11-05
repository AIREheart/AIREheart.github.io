import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Stars() {
  const starsRef = useRef()
  
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = Math.random() * 80
      const z = (Math.random() - 0.5) * 200
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.003
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
        size={0.12}
        color="#e8f1f5"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function Moon() {
  return (
    <group position={[30, 35, -50]}>
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>
      <pointLight color="#e8f1f5" intensity={0.2} distance={100} />
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
        color: { value: new THREE.Color('#0a1a2e') },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float wave1 = sin(pos.x * 0.25 + time * 0.18) * 0.25;
          float wave2 = sin(pos.z * 0.18 + time * 0.12) * 0.18;
          float wave3 = sin((pos.x + pos.z) * 0.08 + time * 0.08) * 0.12;
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
          
          float shimmer = vElevation * 0.15 + 0.85;
          finalColor *= shimmer;
          
          float reflection = smoothstep(0.25, 0.75, vUv.x) * 0.2;
          finalColor += vec3(reflection * 0.3);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
    })
  }, [])
  
  // Moved lake DOWN so it's at the bottom of viewport
  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -25, 10]}>
      <planeGeometry args={[250, 250, 90, 90]} />
      <primitive object={waterMaterial} attach="material" />
    </mesh>
  )
}

function Swan() {
  const swanRef = useRef()
  
  useFrame((state) => {
    if (swanRef.current) {
      swanRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.5 - 20
      swanRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.2 + Math.PI / 3
    }
  })
  
  // Moved swan DOWN with the lake
  return (
    <group ref={swanRef} position={[20, -20, 15]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.6} 
          transparent 
          emissive="#e8f1f5"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.9, 0.9, 0]} rotation={[0, 0, Math.PI / 4.5]}>
        <cylinderGeometry args={[0.25, 0.35, 2.2, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.6} 
          transparent
          emissive="#e8f1f5"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.6, 2.1, 0]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.6} 
          transparent
          emissive="#e8f1f5"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default function LakesideBackground() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ 
          position: [0, 0, 35],  // Moved camera FORWARD and centered
          fov: 70 
        }}
        gl={{ alpha: false, antialias: true }}
      >
        <color attach="background" args={['#0a1128']} />
        <fog attach="fog" args={['#0a1128', 30, 120]} />
        
        <Stars />
        <Moon />
        <Lake />
        <Swan />
        
        <ambientLight intensity={0.12} />
      </Canvas>
    </div>
  )
}