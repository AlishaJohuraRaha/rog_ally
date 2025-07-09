import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

// This component loads your GLTF model
export default function ROGAllyModel({ modelPath, ...props }) {
  const group = useRef();
  const { scene } = useGLTF(modelPath);

  // You might want to optimize the model here (e.g., set materials, scale, position)
  // For simplicity, we're relying on the GLTF's baked properties.
  // Example: scene.traverse(child => { if (child.isMesh) child.castShadow = child.receiveShadow = true; });

  return <primitive object={scene} {...props} ref={group} />;
}