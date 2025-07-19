
import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector3, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';
import useAppStore from '../store/useAppStore';
import './DepartureAnimation.css';

function WarpStars({ count = 5000 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200; // -100에서 100 사이의 랜덤 위치
    }
    return positions;
  }, [count]);

  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      // 별들이 카메라를 향해 빠르게 다가오는 효과
      ref.current.position.z += 1; // 속도 조절
      if (ref.current.position.z > 100) {
        ref.current.position.z = -100; // 일정 거리 이상 가면 다시 뒤로 보내 무한 반복
      }
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color="white" size={0.2} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  );
}

function DepartureAnimation() {
  const setScene = useAppStore((state) => state.setScene);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene('galaxy'); // 애니메이션 후 은하계 씬으로 전환
    }, 3000); // 4초 후 전환 (애니메이션 길이에 맞춰 조절)

    return () => clearTimeout(timer);
  }, [setScene]);

  return (
    <div className="departure-container">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <WarpStars count={10000} />
      </Canvas>
    </div>
  );
}

export default DepartureAnimation;
