// store/usePointsFilter.ts
import { PointsFilterParams } from '@/interfaces/Point'
import { create } from 'zustand'

interface PointsFilter {
  filter: PointsFilterParams
  setCategoryId: (id: number) => void
  setLocationId: (id: number) => void
  setBusinessId: (id: number) => void
  resetFilter: () => void
}

const initialState:PointsFilterParams = {
  businessId: 0,
  categoryId: 0,
  locationId: 0
}

export const usePointsFilter = create<PointsFilter>((set) => ({
  filter: {
    businessId: 0,
    categoryId: 0,
    locationId: 0
  },

  setCategoryId: (id: number) =>
    set((state) => ({
      filter: {
        ...state.filter,
        categoryId: id
      }
    })),

  setLocationId: (id: number) =>
    set((state) => ({
      filter: {
        ...state.filter,
        locationId: id
      }
    })),

  setBusinessId: (id: number) =>
    set((state) => ({
      filter: {
        ...state.filter,
        businessId: id
      }
    })),

    resetFilter: () =>
      set(() => ({
        filter: initialState
      })),
}))
