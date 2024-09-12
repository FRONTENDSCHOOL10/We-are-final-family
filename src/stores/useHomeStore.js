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

  // 필터 모달 상태
  isFilterModalOpen: '',
  setIsFilterModalOpen: (filterType) => set({ isFilterModalOpen: filterType }),

  // 현재 필터 타입
  currentFilterType: '',
  setCurrentFilterType: (filterType) => set({ currentFilterType: filterType }),

  // 필터 값
  filterValues: {}, // 초기 상태
  setFilterValues: (values) => {
    set({ filterValues: values });
  },

  // 현재 사용자
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // 사용자 위치
  userLocation: '',
  setUserLocation: (location) => set({ userLocation: location }),
}));

export default useHomeStore;
