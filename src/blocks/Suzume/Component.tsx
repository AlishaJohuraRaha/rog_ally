'use client'

import React, { useRef, useState, useEffect } from 'react'
import type { JSX } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader } from 'three'
import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { trace } from 'console'

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
    Suzanne: THREE.Mesh
  }
  materials: {
    floor: THREE.MeshBasicMaterial
    suzume: THREE.MeshBasicMaterial
  }
  animations: any[]
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/suzume.glb') as unknown as GLTFResult
  const suzumeTexture = useLoader(TextureLoader, '/suzume.png')
  const floorTexture = useLoader(TextureLoader, '/floor.png')

  // Ensure textures are not flipped vertically for GLTF UVs
  suzumeTexture.flipY = false
  floorTexture.flipY = false
  suzumeTexture.colorSpace = THREE.SRGBColorSpace;
  floorTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane.geometry}
        material={new THREE.MeshBasicMaterial({ map: floorTexture })}
      />
      <mesh
        geometry={nodes.Suzanne.geometry}
        material={new THREE.MeshBasicMaterial({ map: suzumeTexture })}
        position={[0, 0.553, 0]}
        rotation={[-0.596, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/suzume.glb')

const SuzumeModel = (props: any) => {
  const gltf = useLoader(GLTFLoader, '/suzume.glb')
  const suzumeTexture = useLoader(TextureLoader, '/suzume.png')
  const floorTexture = useLoader(TextureLoader, '/floor.png')
  const suzumeRef = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useEffect(() => {
    // Ensure textures are not flipped vertically for GLTF UVs
    suzumeTexture.flipY = false
    floorTexture.flipY = false

    if (gltf && gltf.scene) {
      gltf.scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          console.log('Mesh name:', mesh.name) // Debug mesh names
          if (mesh.name === 'Suzanne') {
            if (mesh.material) (mesh.material as THREE.Material).dispose() // Dispose existing material
            mesh.material = new THREE.MeshBasicMaterial({ map: suzumeTexture })
            // suzumeTexture.center.set(1, 1)
            // suzumeTexture.rotation = Math.PI / 2
          } else if (mesh.name === 'Plane') {
            if (mesh.material) (mesh.material as THREE.Material).dispose()
            mesh.material = new THREE.MeshBasicMaterial({ map: floorTexture })
          }
        }
      })
    }
  }, [gltf, suzumeTexture, floorTexture])

  useFrame((_, delta) => {
    if (suzumeRef.current) {
      suzumeRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <primitive
      object={gltf.scene}
      ref={suzumeRef}
      scale={clicked ? 1.1 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    />
  )
}

export const SuzumeScene = ({ title }: { title?: string }) => {
  return (
    <div className="w-full h-[400px] z-10 mt-20">
      <Canvas
      style={{ background: 'transparent' }}
      gl={{ outputColorSpace: THREE.SRGBColorSpace , toneMapping: THREE.NoToneMapping}}
      >
      <ambientLight intensity={10} />
      <OrbitControls enableZoom={false} />
      {/* <SuzumeModel /> */}
      <Model/>
      </Canvas>
    </div>
  )
}
