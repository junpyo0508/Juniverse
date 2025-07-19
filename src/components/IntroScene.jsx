
import React, { useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import useAppStore from '../store/useAppStore';
import './IntroScene.css';
import IntroEarth from './IntroEarth';

function IntroScene() {
  const setScene = useAppStore((state) => state.setScene);
  const starsRef = useRef([]);

  useEffect(() => {
    const numStars = 150;
    starsRef.current = Array.from({ length: numStars }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const handleExploreClick = () => {
    setScene('departing');
  };

  return (
    <div className="intro-container">
      <div className="stars">
        {starsRef.current.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          ></div>
        ))}
      </div>

      <div className="intro-content">
        <h1 className="intro-title">JUNIVERSE</h1>
        <p className="intro-subtitle">Explore the infinite.</p>
        <button className="explore-button" onClick={handleExploreClick}>
          Explore 
        </button>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="intro-canvas">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          {/* <IntroEarth /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default IntroScene;
