import { create } from 'zustand';

const useHomeStore = create((set) => ({
  // 카테고리
  activeCategory: '전체', // 초기 상태
  setActiveCategory: (category) => set({ activeCategory: category }), // 상태 변경 함수

  // 필터링 버튼
  activeFilter: {
    관심분야: false,
    최신순: true,
    모집중: false,
    성별: false,
    연령: false,
  },
  setActiveFilter: (filters) => set({ activeFilter: filters }),
  updateFilter: (filterKey, value) => {
    set((state) => ({
      activeFilter: { ...state.activeFilter, [filterKey]: value },
    }));
  },
}));

export default useHomeStore;
