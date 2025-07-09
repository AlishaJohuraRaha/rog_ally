'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ParticleSystem component to manage the cool air jet effect
export const ParticleSystem: React.FC<{
  count: number
  fanPosition: [number, number, number]
}> = ({ count, fanPosition }) => {
  const pointsRef = useRef<THREE.Points>(null)
  const particles = useRef<
    {
      position: THREE.Vector3
      velocity: THREE.Vector3
      opacity: number
      size: number
    }[]
  >([])

  // Load a texture for particles (soft circle)
  const texture = useLoader(THREE.TextureLoader, '/circle.png') // Placeholder: create or use a soft circle texture
  texture.colorSpace = THREE.SRGBColorSpace

  // Initialize particles
  useMemo(() => {
    particles.current = new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        fanPosition[0] + Math.random() * 0.37,
        0.22 + Math.random() * 0.25,
        0,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        -1 - Math.random() * 0.5,
      ),
      opacity: 0.1,
      size: 0.1 + Math.random() * 0.05, // Random size between 0.1 and 0.15
    }))
  }, [count, fanPosition])

  // Set up geometry and material
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const opacities = new Float32Array(count)
    const sizes = new Float32Array(count)

    particles.current.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      opacities[i] = particle.opacity
      sizes[i] = particle.size
    })

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geom
  }, [count])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        map: texture,
        transparent: true,
        opacity: 0.3,
        size: 0.075,
        vertexColors: false,
        color: new THREE.Color('#87CEEB'), // Light blue for cool air
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [texture],
  )

  // Animate particles
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position
      const opacitiesAttr = pointsRef.current.geometry.attributes.opacity
      if (!positionAttr || !opacitiesAttr) return
      const positions = positionAttr.array as Float32Array
      const opacities = opacitiesAttr.array as Float32Array

      particles.current.forEach((particle, i) => {
        // Update position
        particle.position.addScaledVector(particle.velocity, delta)

        // Fade out as particles move away
        particle.opacity = Math.max(0, 1 - Math.abs(particle.position.z) / 1) // Fade out by z=5
        // Respawn if particle is too far or fully transparent
        if (particle.position.z < -1 || particle.opacity <= 0) {
          particle.position.set(
            fanPosition[0] + Math.random() * 0.37,
            0.22 + Math.random() * 0.25,
            0,
          )
          particle.velocity.set(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            -1 - Math.random() * 0.5,
          )
          //   particle.opacity = 1
        }

        // Update geometry attributes
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z
        opacities[i] = particle.opacity
      })

      if (
        pointsRef.current.geometry.attributes.opacity &&
        pointsRef.current.geometry.attributes.position
      ) {
        pointsRef.current.geometry.attributes.position.needsUpdate = true
        pointsRef.current.geometry.attributes.opacity.needsUpdate = true
      }
    }
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// // Simple fan model (box for simplicity)
// const FanModel: React.FC = () => {
//   return (
//     <mesh position={[0, 0, 0]}>
//       <boxGeometry args={[0.5, 0.5, 0.2]} />
//       <meshStandardMaterial color="#666666" />
//     </mesh>
//   )
// }

// // Main CoolAirJet component
// export const CoolAirJet: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useGSAP(() => {
//     // Initialize canvas opacity to 0
//     if (canvasRef.current) {
//       canvasRef.current.style.opacity = '0'
//     }

//     // ScrollTrigger for canvas opacity
//     if (containerRef.current && canvasRef.current) {
//       gsap.to(canvasRef.current, {
//         opacity: 1,
//         duration: 0.5,
//         ease: 'power2.out',
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top 80%',
//           end: 'bottom 20%',
//           toggleActions: 'play none none reverse',
//         },
//       })
//     }

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//       if (canvasRef.current) {
//         canvasRef.current.style.opacity = '0'
//       }
//     }
//   }, [])

//   return (
//     <div ref={containerRef} className="relative w-[100vw] h-[100vh]">
//       <Canvas
//         ref={canvasRef}
//         style={{ background: '#1a1a1a' }}
//         gl={{ outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.NoToneMapping }}
//         camera={{ position: [0, 0, 3], fov: 50 }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[5, 5, 5]} intensity={1} />
//         <FanModel />
//         <ParticleSystem count={100} fanPosition={[0, 0, 0]} />
//       </Canvas>
//     </div>
//   )
// }
