'use client'

import type { ScrollDetail } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ConsoleModel } from '../Hero3d/console'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Environment, Html, OrbitControls } from '@react-three/drei'
import ConsoleLabelHTML from './ConsoleLabelHTML'
import { ParticleSystem } from '@/components/3d/ParticleSystem'
import { Media } from '@/components/Media'

gsap.registerPlugin(ScrollTrigger)

export const ScrollDetailComp: React.FC<ScrollDetail> = ({
  heading1,
  heading2,
  heading3,
  paragraph1,
  paragraph2,
  backgroundImage,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const modelGroupRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Mutable position for GSAP to update
  const modelPosition = useRef({ x: 0.8, y: -0.2, z: 0 })
  const modelRotation = useRef({ x: -Math.PI / 7, y: -Math.PI / 4, z: -Math.PI / 7 })

  useGSAP(() => {
    setHeaderTheme('light')

    // Store the original body background color
    const originalBackgroundColor = document.body.style.backgroundColor || 'white'

    // Initialize canvas opacity to 0
    if (canvasRef.current) {
      canvasRef.current.style.opacity = '0'
    }
    if(bgRef.current) {
      bgRef.current.style.opacity = '0' 
    }

    // ScrollTrigger for background color and canvas opacity
    if (containerRef.current && canvasRef.current && bgRef.current) {
      gsap.fromTo(bgRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(document.body, {
        backgroundColor: '#1B1F23',
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(canvasRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
    }
    // Animate the mutable modelPosition instead of the Three.js object directly
    // Section 1: Model to right
    if (section1Ref.current) {
      gsap.fromTo(
        modelPosition.current,
        { x: 0.8, y: -0.2, z: 0 }, // Start from last position in section 1
        {
          x: 0.8,
          y: -0.2,
          z: 0,
          // duration: 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play none none reverse',
            scrub: true,
            // markers: true,
          },
        },
      )
      gsap.to(modelRotation.current, {
        x: -Math.PI / 7,
        y: -Math.PI / 4,
        z: -Math.PI / 5,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: section1Ref.current,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
          scrub: true,
          // markers: true,
        },
      })
    }

    // Section 2: Model to left
    if (section2Ref.current) {
      gsap.fromTo(
        modelPosition.current,
        { x: 0.8, y: -0.2, z: 0 }, // Start from last position in section 1
        {
          x: -1.2,
          y: -0.3,
          z: 0,
          // duration: 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: '-40% 50%',
            end: '30% 50%',
            toggleActions: 'play none none reverse',
            scrub: true,

            // markers: true,
          },
        },
      )

      gsap.fromTo(
        modelRotation.current,
        { x: -Math.PI / 7, y: -Math.PI / 4, z: -Math.PI / 5 }, // Start from last position in section 1
        {
          x: -Math.PI / 1.5,
          y: (-2 * Math.PI) / 6,
          z: -Math.PI / 1.5,
          // duration: 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: '-40% 50%',
            end: '30% 50%',
            toggleActions: 'play none none reverse',
            scrub: true,

            // markers: true,
          },
        },
      )
    }

    // Section 3: Model to middle
    if (section3Ref.current) {
      gsap.fromTo(
        modelPosition.current,
        { x: -1.2, y: -0.3, z: 0 }, // Start from last position in section 2
        {
          x: 0,
          y: -0.4,
          z: 1.2,
          // duration: 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: '-30% 50%',
            end: '40% 50%',
            toggleActions: 'play none none reverse',
            scrub: true,
            // markers: true,
          },
        },
      )

      gsap.fromTo(
        modelRotation.current,
        { x: -Math.PI / 1.5, y: (-2 * Math.PI) / 6, z: -Math.PI / 1.5 }, // Start from last position in section 2
        {
          x: -Math.PI / 8,
          y: 0,
          z: 0,
          // duration: 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: '-30% 50%',
            end: '40% 50%',
            toggleActions: 'play none none reverse',
            scrub: true,
            // markers: true,
          },
        },
      )
    }

    const sections = [section1Ref, section2Ref, section3Ref]
    sections.forEach((ref, idx) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 40%',
              end: 'bottom 80%',
              toggleActions: 'play reverse play reverse',
              // markers: true,
            },
          },
        )
      }
    })
    // Refresh ScrollTrigger to handle sticky layout
    ScrollTrigger.refresh()

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      document.body.style.backgroundColor = originalBackgroundColor
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '0'
      }
    }
  }, [])

  const StaticConsoleModel: React.FC<{
    position: [number, number, number]
    rotation: [number, number, number]
    gRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>
    modelPosition: React.MutableRefObject<{ x: number; y: number; z: number }>
    modelRotation: React.MutableRefObject<{ x: number; y: number; z: number }>
  }> = ({ position, rotation, gRef, modelPosition, modelRotation }) => {
    const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!)

    const [opacity, setOpacity] = React.useState(0)
    const [showParticle, setShowParticle] = React.useState(0)

    // Sync groupRef with modelGroupRef only once
    React.useEffect(() => {
      if (groupRef.current) {
        gRef.current = groupRef.current
      }
    }, [])

    // Use useFrame to update the group position from the mutable ref
    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.position.set(
          modelPosition.current.x,
          modelPosition.current.y,
          modelPosition.current.z,
        )
        groupRef.current.rotation.set(
          modelRotation.current.x,
          modelRotation.current.y,
          modelRotation.current.z,
        )
        setShowParticle(modelPosition.current.x < -0.8 ? 1 : 0) // Show particles when model is on the left side
        setOpacity(modelPosition.current.z >= 1.19 ? 1 : 0) // Set opacity to 1 when the model is rendered
      }
    })

    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        <ConsoleModel />
        <ConsoleLabelHTML opacity={opacity} />
        {showParticle >= 1 && (
          <>
            <ParticleSystem count={1000} fanPosition={[-0.55, 0, 0]} />
            <ParticleSystem count={1000} fanPosition={[0.3, 0, 0]} />
          </>
        )}
      </group>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center flex-col "
      data-theme="light"
    >
      <div className="relative w-[100vw] h-[300vh]">
        <div className="absolute h-[300vh] w-[100vw]">
          <div className="sticky top-0 w-[100vw] h-[100vh] z-0 pointer-events-none">
            <Canvas
              ref={canvasRef}
              style={{ background: 'transparent' }}
              gl={{ outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.NoToneMapping }}
              camera={{ position: [0, 0, 4.1], fov: 30 }}
            >
              <ambientLight intensity={0.0} />
              <hemisphereLight
                color={'#ffffff'}
                groundColor={'#5300B9'}
                intensity={1.5}
                position={[0, 10, 0]}
              />
              <StaticConsoleModel
                position={[1, -0.3, 0]}
                rotation={[0, 0, 0]}
                gRef={modelGroupRef}
                modelPosition={modelPosition}
                modelRotation={modelRotation}
              />
              <Environment preset="city" environmentIntensity={1} />
              {/* <directionalLight
                position={[0, 10, 0]}
                target-position={[0, 0, 0]}
                intensity={1}
                castShadow={false}
              /> */}
            </Canvas>
            <div className="w-full h-[100vh] select-none" ref={bgRef}>
              {backgroundImage && typeof backgroundImage === 'object' && (
                <Media fill imgClassName="-z-10 object-cover" priority resource={backgroundImage} />
              )}
            </div>
          </div>
        </div>
        <div className="relative select-none">
          <div
            ref={section1Ref}
            className="container w-full h-[100vh] flex items-center justify-start"
          >
            <div className="w-1/2 mb-8 z-10 relative flex items-center justify-start">
              <div className="max-w-[36.5rem]">
                <h1 className="text-6xl font-bold text-slate-100">{heading1}</h1>
                <p className="mt-10 text-slate-300">{paragraph1}</p>
              </div>
            </div>
          </div>
          <div
            ref={section2Ref}
            className="container w-full h-[100vh] flex items-center justify-center"
          >
            <div className="w-1/2"></div>
            <div className="w-1/2 mb-8 z-10 relative flex items-center justify-start">
              <div className="max-w-[36.5rem]">
                <h1 className="text-6xl font-bold text-slate-100">{heading2}</h1>
                <p className="mt-10 text-slate-300">{paragraph2}</p>
              </div>
            </div>
          </div>
          <div
            ref={section3Ref}
            className="container w-full h-[100vh] flex items-start justify-center"
          >
            <div className="w-full mb-8 z-10 relative flex items-center justify-center">
              <div className="max-w-[36.5rem]">
                <h1 className="text-2xl font-bold text-slate-100 m mt-[50px]">{heading3}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
