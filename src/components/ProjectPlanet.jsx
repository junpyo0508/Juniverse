import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import useProjectStore from '../store/useProjectStore';
import projects from '../data/projects';
import { useSpring, a } from '@react-spring/three';

function ProjectPlanet({ position, color, name, texturePath }) {
  const { selectProject } = useProjectStore();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  });

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
    <a.mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={color} />
      )}
    </a.mesh>
  );
}

export default ProjectPlanet;
