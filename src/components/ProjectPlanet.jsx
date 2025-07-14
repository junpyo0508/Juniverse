import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import useProjectStore from '../store/useProjectStore';
import projects from '../data/projects';

function ProjectPlanet({ position, color, name, texturePath }) {
  const { selectProject } = useProjectStore();
  const meshRef = useRef();

  const texture = texturePath ? useLoader(TextureLoader, texturePath) : null;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003; 

    }
  });

  const handleClick = () => {
    const project = projects.find(p => p.name === name);
    if (project) {
      selectProject(project);
    }
  };

  return (
    <mesh ref={meshRef} position={position} onClick={handleClick}>
      <sphereGeometry args={[0.5, 32, 32]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={color} />
      )}
    </mesh>
  );
}

export default ProjectPlanet;
