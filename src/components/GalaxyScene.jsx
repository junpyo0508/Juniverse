import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { Vector3, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, CatmullRomCurve3 } from 'three';
import ProjectPlanet from './ProjectPlanet';
import projects from '../data/projects';
import useProjectStore from '../store/useProjectStore';
import useAppStore from '../store/useAppStore';
import PathTube from './PathTube'; // PathTube import 추가
import ContactInfo from './ContactInfo'; // ContactInfo import 추가

// 경로 정의
const PATH_POINTS = [
  [0, 0, 0], // 시작점
  [5, 2, -5],
  [-3, 4, -10],
  [7, -1, -15],
  [-5, -3, -20],
  [0, 0, -25], // 끝점
];

function CameraController({ pathCurve }) {
  const { camera } = useThree();
  const { selectProject, closeDetail } = useProjectStore();
  const currentScene = useAppStore((state) => state.currentScene);

  const pathProgress = useRef(0); // 0.0 to 1.0
  const lookAtTarget = useRef(new Vector3(...pathCurve.getPointAt(0.01).toArray())); // 부드러운 lookAt 목표
  const lastSelectedProjectRef = useRef(null); // 마지막으로 선택된 프로젝트 추적
  const hasArrived = useRef(false); // hasArrived 선언 추가

  // 초기 카메라 위치 설정 (경로의 시작점)
  useEffect(() => {
    if (currentScene === 'galaxy' && !hasArrived.current) {
      camera.position.set(0, 0, 200); // 매우 먼 곳에서 시작
      pathProgress.current = 0;
      // Scene이 시작될 때 lookAtTarget도 초기화합니다.
      const initialLookAt = pathCurve.getPointAt(0.01);
      lookAtTarget.current.set(initialLookAt.x, initialLookAt.y, initialLookAt.z);
      hasArrived.current = true;
    }
  }, [currentScene, camera, pathCurve]); // pathCurve를 의존성 배열에 추가합니다.

  useEffect(() => {
    const handleWheel = (event) => {
      if (currentScene !== 'galaxy') return;

      const scrollSpeed = 0.0001; // 스크롤 속도 조절
      pathProgress.current += event.deltaY * scrollSpeed;
      pathProgress.current = Math.max(0, Math.min(1, pathProgress.current)); // 0과 1 사이로 제한
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentScene]);

  useFrame(() => {
    if (currentScene !== 'galaxy') return;

    const currentProgress = pathProgress.current;

    // 카메라 위치를 부드럽게 업데이트합니다.
    const currentPoint = pathCurve.getPointAt(currentProgress);
    camera.position.lerp(currentPoint, 0.1); 

    // 카메라는 항상 경로의 앞쪽을 바라보도록 설정합니다.
    const lookDelta = 0.01;
    const lookAtProgress = currentProgress + lookDelta;
    const clampedLookAtProgress = Math.max(0, Math.min(1, lookAtProgress));
    const targetPoint = pathCurve.getPointAt(clampedLookAtProgress);
    
    // lookAt 목표 지점을 부드럽게 보간합니다.
    lookAtTarget.current.lerp(targetPoint, 0.1);
    // 부드럽게 움직이는 목표 지점을 바라봅니다.
    camera.lookAt(lookAtTarget.current);

    // 행성 근접 감지 로직
    let closestProject = null;
    let minDistance = Infinity;
    const proximityThreshold = 3; // 행성 근접 임계값

    projects.forEach(project => {
      const projectPos = new Vector3(...project.position);
      const distance = camera.position.distanceTo(projectPos);

      if (distance < proximityThreshold) {
        if (!closestProject || distance < minDistance) {
          closestProject = project;
          minDistance = distance;
        }
      }
    });

    if (closestProject && lastSelectedProjectRef.current !== closestProject.id) {
      selectProject(closestProject);
      lastSelectedProjectRef.current = closestProject.id;
    } else if (!closestProject && lastSelectedProjectRef.current) {
      closeDetail();
      lastSelectedProjectRef.current = null;
    }
  });

  return null; 
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
  const pathCurve = useMemo(() => {
    const points = PATH_POINTS.map(p => new Vector3(p[0], p[1], p[2]));
    return new CatmullRomCurve3(points);
  }, []);

  return (
    <Canvas camera={{ position: PATH_POINTS[0], fov: 75 }}> {/* 카메라 초기 위치를 경로 시작점으로 설정 */}
      <color attach="background" args={['black']} />
      {/* 주변광: 모든 오브젝트에 고르게 빛을 비춥니다. */}
      <ambientLight intensity={0.3} /> {/* 주변광 강도 약간 낮춤 */}
      {/* 중앙 태양 (강한 점 광원) */}
      <pointLight position={[0, 0, 0]} intensity={10} decay={2} color="orange" />
      {/* 방향성 광원 (행성들을 비추는 주 광원) */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* 경로 튜브 렌더링 */}
      <PathTube pathPoints={PATH_POINTS} />

      {/* 프로젝트 행성들 렌더링 */}
      {projects.map((project) => (
        <ProjectPlanet
          key={project.id}
          position={project.position}
          color={project.color}
          name={project.name}
          texturePath={project.texturePath}
        />
      ))}

      {/* 별 필드 */}
      <Stars />

      {/* 카메라 제어 컴포넌트 */}
      <CameraController pathCurve={pathCurve} />

      {/* 연락처 정보 */}
      <ContactInfo position={[0, 0, -25]} />
    </Canvas>
  );
}

export default GalaxyScene;
