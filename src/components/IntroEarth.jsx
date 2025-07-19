import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import earthTexture from '/textures/earth2.jpg';

function IntroEarth() {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, earthTexture);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // 지구 자전 애니메이션
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1.5, 0]} scale={[3, 3, 3]}> {/* 지구 크기 및 위치 조정 */}
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default IntroEarth;
