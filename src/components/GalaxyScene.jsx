import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';
import ProjectPlanet from './ProjectPlanet';
import projects from '../data/projects';
import useProjectStore from '../store/useProjectStore';

function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { selectedProject, isDetailOpen } = useProjectStore();

  const targetCameraPosition = useRef(new Vector3());
  const targetControlsTarget = useRef(new Vector3());
  const initialCameraPosition = useRef(new Vector3(0, 0, 5));
  const initialControlsTarget = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedProject) {
      targetCameraPosition.current.set(...selectedProject.position);
      targetCameraPosition.current.z += 2; 

      targetControlsTarget.current.set(...selectedProject.position);
    } else {
      targetCameraPosition.current.copy(initialCameraPosition.current);
      targetControlsTarget.current.copy(initialControlsTarget.current);
    }
  }, [selectedProject]);

  useFrame(() => {
    camera.position.lerp(targetCameraPosition.current, 0.05);
    controlsRef.current.target.lerp(targetControlsTarget.current, 0.05);

    controlsRef.current.update();

    if (controlsRef.current) {
      controlsRef.current.enabled = !isDetailOpen;
    }
  });

  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />; 
}

function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200; // -100에서 100 사이의 랜덤 위치
    }
    return positions;
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color="white" size={0.1} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  );
}

function GalaxyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      {/* 주변광: 모든 오브젝트에 고르게 빛을 비춥니다. */}
      <ambientLight intensity={0.3} /> {/* 주변광 강도 약간 낮춤 */}
      {/* 중앙 태양 (강한 점 광원) */}
      <pointLight position={[0, 0, 0]} intensity={10} decay={2} color="orange" />
      {/* 방향성 광원 (행성들을 비추는 주 광원) */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* 프로젝트 행성들 렌더링 */}
      {projects.map((project) => (
        <ProjectPlanet
          key={project.id}
          position={project.position}
          color={project.color}
          name={project.name}
          texturePath={project.texturePath} // texturePath prop 추가
        />
      ))}

      {/* 별 필드 */}
      <Stars />

      {/* 카메라 제어 컴포넌트 */}
      <CameraController />
    </Canvas>
  );
}

export default GalaxyScene;
