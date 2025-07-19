import { create } from 'zustand';

const useProjectStore = create((set) => ({
  selectedProject: null,
  isDetailOpen: false,
  
  // 프로젝트 선택 및 상세 UI 열기
  selectProject: (project) => set({ selectedProject: project, isDetailOpen: true }),
  
  // 상세 UI 닫기
  closeDetail: () => set({ isDetailOpen: false, selectedProject: null }),
}));

export default useProjectStore;
