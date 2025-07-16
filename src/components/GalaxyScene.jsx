import React, { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { useSpring, a } from '@react-spring/three';
import ProjectPlanet from './ProjectPlanet';
import projects from '../data/projects';
import useProjectStore from '../store/useProjectStore';
import { Spaceship } from './Spaceship';

// --- 3D INTRO SCREEN --- //
function Intro3D({ onEnter }) {
  const { progress } = useProgress();
  const isLoaded = progress === 100;

  return (
    <group>
      <Text
        position={[0, 0.3, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        JUNIVERSE
      </Text>
      <Html position={[0, -1, 0]} center>
        <button
          onClick={onEnter}
          disabled={!isLoaded}
          style={{
            fontSize: '1.5em',
            color: isLoaded ? 'white' : 'gray',
            backgroundColor: 'transparent',
            border: `2px solid ${isLoaded ? 'white' : 'gray'}`,
            padding: '15px 30px',
            cursor: isLoaded ? 'pointer' : 'not-allowed',
            fontFamily: 'monospace',
            transition: 'all 0.3s ease',
          }}
        >
          {isLoaded ? 'EXPLORE' : `LOADING ${Math.round(progress)}%`}
        </button>
      </Html>
    </group>
  );
}

// --- INTRO ANIMATION --- //
function IntroAnimation({ onAnimationComplete }) {
  const { camera } = useThree();

  // Animation for the camera's Z position
  const { zPosition } = useSpring({
    from: { zPosition: 5 }, // Start at the initial camera Z position
    to: { zPosition: 0 }, // Move camera forward to Z=0
    config: { mass: 1, tension: 50, friction: 20 }, // Adjust for desired speed and smoothness
    onRest: onAnimationComplete, // Notify when animation is done
  });

  useFrame(() => {
    camera.position.z = zPosition.get();
  });

  return null; // This component only controls camera, no visible elements
}

// --- CAMERA CONTROLLER --- //
function CameraController({ isAnimating }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { selectedProject, isDetailOpen } = useProjectStore();

  const targetCameraPosition = useRef(new Vector3(0, 0, 5)); // Default view
  const targetControlsTarget = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedProject) {
      const [x, y, z] = selectedProject.position;
      targetCameraPosition.current.set(x, y, z + 2);
      targetControlsTarget.current.set(x, y, z);
    } else if (!isAnimating) {
      // Go back to initial view only if not animating
      targetCameraPosition.current.set(0, 0, 5);
      targetControlsTarget.current.set(0, 0, 0);
    }
  }, [selectedProject, isAnimating]);

  useFrame(() => {
    // Enable controls only when not animating and detail view is closed
    if (controlsRef.current) {
      controlsRef.current.enabled = !isAnimating && !isDetailOpen;
    }
    camera.position.lerp(targetCameraPosition.current, 0.05);
    controlsRef.current.target.lerp(targetControlsTarget.current, 0.05);
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />;
}

// --- STARS --- //
function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial attach="material" color="white" size={0.1} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  );
}

// --- LOADER --- //
function Loader() {
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '2em' }}>Loading...</div>
    </Html>
  );
}

// --- MAIN GALAXY SCENE --- //
function GalaxyScene() {
  const { hasEntered, enterScene } = useProjectStore();
  const [isAnimating, setIsAnimating] = useState(true);

  const handleEnter = () => {
    enterScene();
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <CameraController isAnimating={isAnimating} />
        <Stars />
        {!hasEntered ? (
          <Intro3D onEnter={handleEnter} />
        ) : (
          isAnimating ? (
            <IntroAnimation onAnimationComplete={handleAnimationComplete} />
          ) : (
            <>
              <ambientLight intensity={0.3} />
              <pointLight position={[0, 0, 0]} intensity={10} decay={2} color="orange" />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              {projects.map((project) => (
                <ProjectPlanet
                  key={project.id}
                  position={project.position}
                  color={project.color}
                  name={project.name}
                  texturePath={project.texturePath}
                />
              ))}
            </>
          )
        )}
      </Suspense>
    </Canvas>
  );
}

export default GalaxyScene;