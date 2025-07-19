const PATH_POINTS = [
  [0, 0, 0], // Start point
  [5, 2, -5],
  [-3, 4, -10],
  [7, -1, -15],
  [-5, -3, -20],
  [0, 0, -25], // End point
];

const projects = [
  {
    id: 'project-1',
    name: 'Project Alpha',
    description: 'This is the first project, focusing on WebGL performance.',
    color: '#FF6B6B', 
    position: [PATH_POINTS[1][0] + 0.5, PATH_POINTS[1][1] + 0.5, PATH_POINTS[1][2] + 0.5],
    texturePath: '/textures/planet_alpha.jpg',
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
    position: [PATH_POINTS[2][0] - 0.5, PATH_POINTS[2][1] + 0.5, PATH_POINTS[2][2] - 0.5],
    texturePath: '/textures/planet_beta.jpg',
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
    position: [PATH_POINTS[3][0] + 0.5, PATH_POINTS[3][1] - 0.5, PATH_POINTS[3][2] + 0.5],
    texturePath: '/textures/planet_gamma.jpg',
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
    position: [PATH_POINTS[4][0] - 0.5, PATH_POINTS[4][1] - 0.5, PATH_POINTS[4][2] - 0.5],
    texturePath: '/textures/planet_delta.jpg',
    details: {
      techStack: ['GLSL', 'Three.js', 'Web Workers'],
      github: 'https://github.com/your/project-delta',
      liveDemo: 'https://live.project-delta.com',
    },
  },
];

export default projects;
