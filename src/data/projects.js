import Planet_Alpha from '../assets/textures/planet_alpha.jpg';
import Planet_Beta from '../assets/textures/planet_beta.jpg';
import Planet_Gamma from '../assets/textures/planet_gamma.jpg';
import Planet_Delta from '../assets/textures/planet_delta.jpg';

const projects = [
  {
    id: 'project-1',
    name: 'Project Alpha',
    description: 'This is the first project, focusing on WebGL performance.',
    color: '#FF6B6B', 
    position: [-2, 1, 0],
    texturePath: Planet_Alpha,
    details: {
      techStack: ['Three.js', 'React', 'GLSL'],
      github: 'https://github.com/your/project-alpha',
      liveDemo: 'https://live.project-alpha.com',
    },
  },
  {
    id: 'project-2',
    name: 'Project Beta',
    description: 'An interactive data visualization using Three.js.',
    color: '#4ECDC4', 
    position: [2, -1, 0],
    texturePath: Planet_Beta, // 새로운 텍스처 경로 추가
    details: {
      techStack: ['Three.js', 'D3.js', 'Zustand'],
      github: 'https://github.com/your/project-beta',
      liveDemo: 'https://live.project-beta.com',
    },
  },
  {
    id: 'project-3',
    name: 'Project Gamma',
    description: 'A 3D product configurator built with R3F.',
    color: '#45B7D1', 
    position: [0, 0, -3],
    texturePath: Planet_Gamma, // 새로운 텍스처 경로 추가
    details: {
      techStack: ['React Three Fiber', 'Blender', 'GSAP'],
      github: 'https://github.project-gamma.com',
      liveDemo: 'https://live.project-gamma.com',
    },
  },
  {
    id: 'project-4',
    name: 'Project Delta',
    description: 'Procedural terrain generation with custom shaders.',
    color: '#FED766', 
    position: [0, 3, 1],
    texturePath: Planet_Delta, // 새로운 텍스처 경로 추가
    details: {
      techStack: ['GLSL', 'Three.js', 'Web Workers'],
      github: 'https://github.com/your/project-delta',
      liveDemo: 'https://live.project-delta.com',
    },
  },
];

export default projects;
