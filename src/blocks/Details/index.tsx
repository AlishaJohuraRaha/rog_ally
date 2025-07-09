'use client'

import type { Detail3D } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import type { Hero3D, Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ConsoleModel } from '../Hero3d/console'
import { gsap } from 'gsap'

export const Detail3DComp: React.FC<Detail3D> = ({ richText1, richText2, richText3 }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const modelGroupRef = useRef<THREE.Group>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setHeaderTheme('light')

    // Store the original body background color
    const originalBackgroundColor = document.body.style.backgroundColor || 'white'

    // Initialize canvas opacity to 0
    if (canvasRef.current) {
      canvasRef.current.style.opacity = '0'
    }

    // Create Intersection Observer for background color and canvas opacity
    const bgObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate body background to dark gray and canvas to visible
          gsap.to(document.body, {
            backgroundColor: '#43444a',
            duration: 0.5,
            ease: 'power2.out',
          })
          if (canvasRef.current) {
            gsap.to(canvasRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
          }
        } else {
          // Animate back to original background color and canvas to hidden
          gsap.to(document.body, {
            backgroundColor: originalBackgroundColor,
            duration: 0.5,
            ease: 'power2.out',
          })
          if (canvasRef.current) {
            gsap.to(canvasRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
          }
        }
      },
      {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    )

    // Create Intersection Observer for model position
    const modelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && modelGroupRef.current) {
            let targetPosition: [number, number, number]
            if (entry.target === section1Ref.current) {
              targetPosition = [1, -0.3, 0] // Right
            } else if (entry.target === section2Ref.current) {
              targetPosition = [-1, -0.3, 0] // Left
            } else if (entry.target === section3Ref.current) {
              targetPosition = [0, -0.3, 0] // Middle
            } else {
              return
            }
            // Animate model position directly on the Three.js group
            gsap.to(modelGroupRef.current.position, {
              x: targetPosition[0],
              y: targetPosition[1],
              z: targetPosition[2],
              duration: 0.8,
              ease: 'sine.inOut',
            })
          }
        })
      },
      {
        root: null, // Use viewport as root
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    )

    // Observe the container for background color and canvas opacity
    if (containerRef.current) {
      bgObserver.observe(containerRef.current)
    }

    // Observe each section for model position
    if (section1Ref.current) modelObserver.observe(section1Ref.current)
    if (section2Ref.current) modelObserver.observe(section2Ref.current)
    if (section3Ref.current) modelObserver.observe(section3Ref.current)

    // Cleanup observers on component unmount
    return () => {
      if (containerRef.current) {
        bgObserver.unobserve(containerRef.current)
      }
      if (section1Ref.current) modelObserver.unobserve(section1Ref.current)
      if (section2Ref.current) modelObserver.unobserve(section2Ref.current)
      if (section3Ref.current) modelObserver.unobserve(section3Ref.current)
      // Restore original background color and canvas opacity on unmount
      document.body.style.backgroundColor = originalBackgroundColor
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '0'
      }
    }
  }, [setHeaderTheme])

  // Component to render the model without mouse interaction
  const StaticConsoleModel: React.FC<{
    position: [number, number, number]
    rotation: [number, number, number]
  }> = ({ position, rotation }) => (
    <group ref={modelGroupRef} position={position} rotation={rotation}>
      <ConsoleModel />
    </group>
  )

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center text-white flex-col"
      data-theme="light"
    >
      <div className="relative w-[100vw] h-[300vh]">
        <div className="sticky top-0 w-[100vw] h-[100vh] z-0 pointer-events-none">
          <Canvas
            ref={canvasRef}
            style={{ background: 'transparent' }}
            gl={{ outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.NoToneMapping }}
            camera={{ position: [0, 0, 4.2], fov: 30 }}
          >
            <ambientLight intensity={2} />
            {/* <OrbitControls maxZoom={5} /> */}
            <hemisphereLight
              color={'#ffffff'}
              groundColor={'#5300B9'}
              intensity={2.75}
              position={[0, 10, 0]}
            />
            <StaticConsoleModel position={[1, -0.3, 0]} rotation={[0, -Math.PI / 3, 0]} />
          </Canvas>
        </div>
        <div className="relative">
          <div ref={section1Ref} className="container w-full h-[100vh] flex items-center justify-start">
            <div className="w-1/2 mb-8 z-10 relative flex items-center justify-start">
              <div className="max-w-[36.5rem]">
                {richText1 && (
                  <RichText className="mb-0 text-gray-900" data={richText1} enableGutter={false} />
                )}
              </div>
            </div>
          </div>
          <div ref={section2Ref} className="container w-full h-[100vh] flex items-center justify-center">
            <div className="w-1/2"></div>
            <div className="w-1/2 mb-8 z-10 relative flex items-center justify-start">
              <div className="max-w-[36.5rem]">
                {richText2 && (
                  <RichText className="mb-0 text-gray-900" data={richText2} enableGutter={false} />
                )}
              </div>
            </div>
          </div>
          <div ref={section3Ref} className="container w-full h-[100vh] flex items-start justify-center">
            <div className="w-full mb-8 z-10 relative flex items-center justify-center">
              <div className="max-w-[36.5rem]">
                {richText3 && (
                  <RichText className="mb-0 text-gray-900" data={richText3} enableGutter={false} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}