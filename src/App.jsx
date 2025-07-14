import React from 'react';
import GalaxyScene from './components/GalaxyScene';
import ProjectDetailUI from './components/ProjectDetailUI';
import './App.css'; // 기존 CSS 파일을 유지하거나 필요에 따라 수정

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <GalaxyScene />
      <ProjectDetailUI />
    </div>
  );
}

export default App;

