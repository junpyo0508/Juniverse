
import React from 'react';
import useAppStore from '../store/useAppStore';
import './IntroScene.css'; // 인트로 씬을 위한 CSS 파일

function IntroScene() {
  const setScene = useAppStore((state) => state.setScene);

  const handleExploreClick = () => {
    setScene('departing');
  };

  return (
    <div className="intro-container">
      <h1 className="intro-title">JUNIVERSE</h1>
      <button className="explore-button" onClick={handleExploreClick}>
        Explore
      </button>
    </div>
  );
}

export default IntroScene;
