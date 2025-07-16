import React from 'react';
import { useGLTF } from '@react-three/drei';
import GalaxyScene from './components/GalaxyScene';
import ProjectDetailUI from './components/ProjectDetailUI';
import './App.css';

// 앱이 시작될 때 우주선 모델을 미리 로드합니다.
useGLTF.preload('/models/spaceship.glb');

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <GalaxyScene />
      <ProjectDetailUI />
    </div>
  );
}

export default App;

