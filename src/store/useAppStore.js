
import { create } from 'zustand';

const useAppStore = create((set) => ({
  currentScene: 'intro', // 'intro', 'departing', 'galaxy'

  setScene: (scene) => set({ currentScene: scene }),
}));

export default useAppStore;
