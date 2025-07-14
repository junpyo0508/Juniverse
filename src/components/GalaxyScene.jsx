import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import ProjectPlanet from './ProjectPlanet';
import projects from '../data/projects';
import useProjectStore from '../store/useProjectStore';

function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { selectedProject, isDetailOpen } = useProjectStore();

  // Store target positions to avoid re-creating Vector3 every frame
  const targetCameraPosition = useRef(new Vector3());
  const targetControlsTarget = useRef(new Vector3());
  const initialCameraPosition = useRef(new Vector3(0, 0, 5));
  const initialControlsTarget = useRef(new Vector3(0, 0, 0));

  // Effect to update target positions when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      // Set target for camera to be slightly in front of the planet
      targetCameraPosition.current.set(...selectedProject.position);
      targetCameraPosition.current.z += 2; // Adjust Z to be in front

      // Set target for OrbitControls to be the planet's center
      targetControlsTarget.current.set(...selectedProject.position);
    } else {
      // Reset targets to initial scene view
      targetCameraPosition.current.copy(initialCameraPosition.current);
      targetControlsTarget.current.copy(initialControlsTarget.current);
    }
  }, [selectedProject]); // Dependency on selectedProject

  useFrame(() => {
    // Always lerp camera position towards its target
    camera.position.lerp(targetCameraPosition.current, 0.05); // Smoother lerp factor
    // Always lerp controls target towards its target
    controlsRef.current.target.lerp(targetControlsTarget.current, 0.05); // Smoother lerp factor

    // Update controls after lerping
    controlsRef.current.update();

    // Disable OrbitControls when detail UI is open
    if (controlsRef.current) {
      controlsRef.current.enabled = !isDetailOpen;
    }
  });

  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />; // 부드러운 움직임을 위해 enableDamping 추가
}

function GalaxyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      {/* 주변광: 모든 오브젝트에 고르게 빛을 비춥니다. */}
      <ambientLight intensity={0.5} />
      {/* 방향성 광원: 특정 방향에서 오는 빛 (태양광과 유사) */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 프로젝트 행성들 렌더링 */}
      {projects.map((project) => (
        <ProjectPlanet
          key={project.id}
          position={project.position}
          color={project.color}
          name={project.name}
        />
      ))}

      {/* 카메라 제어 컴포넌트 */}
      <CameraController />
    </Canvas>
  );
}

export default GalaxyScene;
