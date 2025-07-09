'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import type { Hero3D, Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useFrame, Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ConsoleModel } from './console'
import ActionButton from '@/components/ui/actionbutton'

export const Hero3DRenderer: React.FC<Hero3D> = ({
  links,
  backgroundImage,
  richText,
  whiteGradient,
  shadow,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Reference for the model group
  const modelRef = useRef<THREE.Group>(null)
  // Store mouse position
  const mouse = useRef({ x: 0, y: 0 })
  // Store target rotation for damping
  const targetRotation = useRef({ x: 0, y: 0 })

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to [-1, 1] range
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Component to handle model rotation
  const RotatingConsoleModel: React.FC<{ position: [number, number, number], rotation: [number, number, number] }> = ({ position, rotation }) => {
    useFrame(() => {
      if (modelRef.current) {
      // Calculate target rotations based on mouse position
      const maxRotation = Math.PI / 6 // Limit rotation angle
      targetRotation.current.y = mouse.current.x * maxRotation
      targetRotation.current.x = mouse.current.y * maxRotation 
      // Apply damping to smooth the rotation
      const dampingFactor = 0.05
      modelRef.current.rotation.y += (targetRotation.current.y - modelRef.current.rotation.y) * dampingFactor
      modelRef.current.rotation.x += (targetRotation.current.x - modelRef.current.rotation.x) * dampingFactor - Math.PI / 180

      // Move the model slightly towards the mouse
      const maxOffset = 0.2
      const targetX = mouse.current.x * maxOffset * 2
      const targetY = -mouse.current.y * maxOffset / 20 - .2
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * dampingFactor
      modelRef.current.position.y += (targetY - modelRef.current.position.y) * dampingFactor

      // Add sine wave motion to the model's position
      const time = performance.now() * 0.001
      const waveAmplitude = 0.002
      const waveFrequency = 2
      modelRef.current.position.y += Math.sin(time * waveFrequency) * waveAmplitude
      }
    })

    return (
      <group ref={modelRef} position={position} rotation={rotation}>
        <ConsoleModel />
      </group>
    )
  }

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white flex-col"
      data-theme="light"
    >
      <div className="relative w-[800px] h-[400px] z-20 mt-40">
        <Canvas
          style={{ background: 'transparent' }}
          gl={{ outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.NoToneMapping }}
          camera={{ position: [0, 0, 2.2], fov: 30 }}
        >
          <ambientLight intensity={1} />
          {/* <OrbitControls maxZoom={5} /> */}
          <hemisphereLight
            color={'#ffffff'}
            groundColor={'#5300B9'}
            intensity={2.75}
            position={[0, 10, 0]} 
          />
          <Environment preset='city'/>
          {/* <directionalLight castShadow/> */}
          <RotatingConsoleModel position={[0, -0.3, 0]} rotation={[-Math.PI / 7, 0, 0]} />
        </Canvas>
      </div>
      <div className="absolute w-full h-[500px] select-none bottom-20 left-0 right-0 flex items-center justify-center">
        {shadow && typeof shadow === 'object' && (
          <Media imgClassName="z-0 object-cover" priority resource={shadow} />
        )}
      </div>
      <div className=" mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText className="mb-0 text-gray-900" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  {/* <CMSLink {...link} /> */}
                  <ActionButton
                    label={link.label}
                    link={link.url ?? ''}
                    className="inline-block group"
                    width={i==0 ? 152 : 130}
                    />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full select-none">
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={backgroundImage} />
        )}
      </div>
    </div>
  )
}