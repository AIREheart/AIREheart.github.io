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
    <group position={[20, 26, -60]}>
      <mesh>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>
      <pointLight color="#e8f1f5" intensity={0.3} distance={80} />
    </group>
  )
}

function Lake() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current?.material?.uniforms?.time) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -25, 10]}>
      <planeGeometry args={[250, 250, 100, 100]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#0a1a2e') },
          color2: { value: new THREE.Color('#1a3a4e') },
        }}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          varying vec3 vNormal;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Large slow waves (more dramatic)
            float wave1 = sin(pos.x * 0.2 + time * 0.15) * 0.4;
            float wave2 = sin(pos.z * 0.15 + time * 0.1) * 0.35;
            
            // Medium rolling waves
            float wave3 = sin((pos.x + pos.z) * 0.12 + time * 0.12) * 0.25;
            float wave4 = cos(pos.x * 0.18 - pos.z * 0.15 + time * 0.08) * 0.3;
            
            // Small choppy waves/ripples (VERY VISIBLE)
            float ripple1 = sin(pos.x * 0.8 + pos.z * 0.6 + time * 0.6) * 0.08;
            float ripple2 = cos(pos.x * 0.6 - pos.z * 0.8 + time * 0.7) * 0.07;
            float ripple3 = sin(pos.x * 1.2 + pos.z * 0.4 + time * 0.5) * 0.06;
            
            // Combine all waves with MORE height variation
            pos.y += wave1 + wave2 + wave3 + wave4 + ripple1 + ripple2 + ripple3;
            
            vElevation = pos.y;
            
            // Calculate normal for better lighting
            vec3 tangent1 = vec3(1.0, 0.0, 0.0);
            vec3 tangent2 = vec3(0.0, 0.0, 1.0);
            vNormal = normalize(cross(tangent1, tangent2));
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          varying vec3 vNormal;
          
          void main() {
            // Dynamic color mixing based on depth and elevation
            float depthGradient = vUv.y * 0.4 + 0.6;
            vec3 baseColor = mix(color1, color2, depthGradient);
            
            // Elevation affects color (wave peaks are lighter)
            float elevationFactor = smoothstep(-0.3, 0.5, vElevation);
            baseColor = mix(baseColor, color2, elevationFactor * 0.6);
            
            // DRAMATIC moonlight reflection (much more visible)
            float reflectionStrength = smoothstep(0.3, 0.7, vUv.x);
            float wavePeakReflection = smoothstep(0.2, 0.4, vElevation);
            vec3 moonlight = vec3(0.4, 0.4, 0.35) * reflectionStrength;
            
            // Add bright highlights on wave peaks (foam effect)
            float foam = smoothstep(0.35, 0.5, vElevation) * 0.5;
            vec3 foamColor = vec3(0.6, 0.6, 0.55);
            
            // Shimmer effect (animated)
            float shimmer = sin(vUv.x * 20.0 + time * 2.0) * 
                           cos(vUv.y * 20.0 + time * 1.5) * 0.05;
            shimmer *= elevationFactor;
            
            // Combine all effects
            vec3 finalColor = baseColor + moonlight + (foamColor * foam) + vec3(shimmer);
            
            // Add some depth darkening
            finalColor *= (0.7 + depthGradient * 0.3);
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
        transparent={false}
      />
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

function Fireflies() {
  const firefliesRef = useRef()
  
  // Generate firefly positions and properties
  const { positions, speeds, phases } = useMemo(() => {
    const positions = []
    const speeds = []
    const phases = []
    
    for (let i = 0; i < 40; i++) {
      // Spread around the lake area
      positions.push(
        (Math.random() - 0.5) * 50,
        Math.random() * 12 - 10,  // Float above water
        (Math.random() - 0.5) * 50
      )
      
      // Each firefly has its own speed and phase
      speeds.push(Math.random() * 0.5 + 0.3)
      phases.push(Math.random() * Math.PI * 2)
    }
    
    return {
      positions: new Float32Array(positions),
      speeds,
      phases
    }
  }, [])
  
  useFrame((state) => {
    if (firefliesRef.current) {
      const time = state.clock.elapsedTime
      const geometry = firefliesRef.current.geometry
      const posArray = geometry.attributes.position.array
      
      for (let i = 0; i < posArray.length; i += 3) {
        const index = Math.floor(i / 3)
        
        // Gentle floating motion - up and down
        posArray[i + 1] = positions[i + 1] + 
          Math.sin(time * speeds[index] + phases[index]) * 1.5 +
          Math.cos(time * speeds[index] * 0.5 + phases[index]) * 0.8
        
        // Slight horizontal drift
        posArray[i] = positions[i] + Math.sin(time * 0.15 + phases[index]) * 0.3
        posArray[i + 2] = positions[i + 2] + Math.cos(time * 0.15 + phases[index]) * 0.3
      }
      
      geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={firefliesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#d4af37"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
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
        <Fireflies /> 
        
        <ambientLight intensity={0.12} />
      </Canvas>
    </div>
  )
}