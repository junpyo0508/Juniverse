import React from 'react';
import useProjectStore from '../store/useProjectStore';

function ProjectDetailUI() {
  const { selectedProject, isDetailOpen, closeDetail } = useProjectStore();

  if (!isDetailOpen || !selectedProject) {
    return null; // 상세 UI가 닫혀있거나 선택된 프로젝트가 없으면 아무것도 렌더링하지 않습니다.
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '500px',
      zIndex: 1000, // 3D 캔버스 위에 오도록 z-index 설정
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      border: '1px solid cyan',
    }}>
      <h2>{selectedProject.name}</h2>
      <p>{selectedProject.description}</p>
      <h3>기술 스택:</h3>
      <ul>
        {selectedProject.details.techStack.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        {selectedProject.details.github && (
          <a href={selectedProject.details.github} target="_blank" rel="noopener noreferrer" style={{ color: 'cyan', marginRight: '10px' }}>
            GitHub
          </a>
        )}
        {selectedProject.details.liveDemo && (
          <a href={selectedProject.details.liveDemo} target="_blank" rel="noopener noreferrer" style={{ color: 'cyan' }}>
            Live Demo
          </a>
        )}
      </div>
      <button
        onClick={closeDetail}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.5em',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
    </div>
  );
}

export default ProjectDetailUI;
