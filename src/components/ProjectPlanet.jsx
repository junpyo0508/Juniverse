import React from 'react';
import { useThree } from '@react-three/fiber';
import useProjectStore from '../store/useProjectStore';
import projects from '../data/projects'; // 프로젝트 데이터를 가져옵니다.

function ProjectPlanet({ position, color, name }) {
  const { selectProject } = useProjectStore();

  const handleClick = () => {
    const project = projects.find(p => p.name === name);
    if (project) {
      selectProject(project);
    }
  };

  return (
    <mesh position={position} onClick={handleClick}>
      <sphereGeometry args={[0.5, 32, 32]} /> {/* 행성 크기 조절 */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default ProjectPlanet;
