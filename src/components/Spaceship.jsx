import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Spaceship(props) {
  const { scene } = useGLTF('/models/spaceship.glb');

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
