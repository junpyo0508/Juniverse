import React from 'react';
import GalaxyScene from './components/GalaxyScene';
import ProjectDetailUI from './components/ProjectDetailUI';
import IntroScene from './components/IntroScene';
import DepartureAnimation from './components/DepartureAnimation';
import useAppStore from './store/useAppStore';
import './App.css';

function App() {
  const currentScene = useAppStore((state) => state.currentScene);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {currentScene === 'intro' && <IntroScene />}
      {currentScene === 'departing' && <DepartureAnimation />}
      {currentScene === 'galaxy' && (
        <>
          <GalaxyScene />
          <ProjectDetailUI />
        </>
      )}
    </div>
  );
}

export default App;

