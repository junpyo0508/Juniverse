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
    name: 'AstroCrush',
    description: 'A Space Debris Cleanup Game Set in the Near Future',
    color: '#FF6B6B', 
    position: [PATH_POINTS[1][0] + 0.5, PATH_POINTS[1][1] + 0.5, PATH_POINTS[1][2] + 0.5],
    texturePath: '/textures/planet_alpha.jpg',
    imagePath: '/portfolio/AstroCrush.png',
    details: {
      techStack: ['Three.js', 'React Three Fiber', 'GLSL'],
      sound: ['Ableton Live'],
      github: 'https://github.com/junpyo0508/AstroCrush.git',
      liveDemo: 'https://junpyo0508.github.io/AstroCrush/',
    },
  },
  {
    id: 'project-2',
    name: 'CrossyRoad',
    description: '이 프로젝트는 React Three Fiber와 Three.js를 기반으로 제작된 3D 웹 게임입니다 유저는 나무와 도로 위를 달리는 자동차를 피해 캐릭터를 앞으로 이동시키며, 무한히 이어지는 스테이지를 탐험합니다.',
    color: '#4ECDC4', 
    position: [PATH_POINTS[2][0] - 0.5, PATH_POINTS[2][1] + 0.5, PATH_POINTS[2][2] - 0.5],
    texturePath: '/textures/planet_beta.jpg',
    imagePath: '/portfolio/CrossyRoad.png',
    details: {
      techStack: ['Three.js', 'React Three Fiber', 'Zustand'],
      github: 'https://github.com/junpyo0508/CrossyRoad.git',
      liveDemo: 'https://junpyo0508.github.io/CrossyRoad/',
    },
  },
  {
    id: 'project-3',
    name: 'WebShooting',
    description: 'A classic 2D space shooter game built with WebGL, offering a retro arcade experience with modern rendering techniques.',
    color: '#45B7D1', 
    position: [PATH_POINTS[3][0] + 0.5, PATH_POINTS[3][1] - 0.5, PATH_POINTS[3][2] + 0.5],
    texturePath: '/textures/planet_gamma.jpg',
    imagePath: '/portfolio/WebShooting.png',
    details: {
      techStack: ['TypeScript', 'WebGL'],
      github: 'https://github.project-gamma.com',
      liveDemo: 'https://junpyo0508.github.io/WebShooting/',
    },
  },
  {
    id: 'project-4',
    name: 'Visualization of Domestic Box Office Sales by Weight',
    description: '2000년부터 2023년까지의 국내 박스오피스 데이터를 수집·가공하여, 영화 장르와 흥행 성적의 흐름을 시각적으로 분석할 수 있는 대시보드 웹사이트입니다.',
    color: '#FED766', 
    position: [PATH_POINTS[4][0] - 0.5, PATH_POINTS[4][1] - 0.5, PATH_POINTS[4][2] - 0.5],
    texturePath: '/textures/planet_delta.jpg',
    imagePath: '/portfolio/Charting.png',
    details: {
      techStack: ['D3.js', 'React', 'Node.js'],
      github: 'https://github.com/junpyo0508/VisualizationOfDomesticBoxOffice.git',
      liveDemo: 'https://junpyo0508.github.io/VisualizationOfDomesticBoxOffice/',
    },
  },
];

export default projects;
