// store/usePointsFilter.ts
import { BusinessSelectList } from '@/interfaces/Business'
import { Category } from '@/interfaces/Category'
import { Location } from '@/interfaces/Location'
import { PointFilter } from '@/interfaces/Point'
import { create } from 'zustand'

interface PointsFilter {
  filter: PointFilter
  setCategory: (category: Category) => void
  setLocation: (location: Location) => void
  setBusiness: (business: BusinessSelectList) => void
  resetFilter: () => void
}

const initialState:PointFilter = {
  business: {
    id: 0,
    name: 'All Businesses'
  },
  category: {
    id: 0,
    name: 'All'
  },
  location: {
    id: 0,
    city: 'All Cities'
  }
}

export const usePointsFilter = create<PointsFilter>((set) => ({
  filter: initialState,

  setCategory: (category: Category) =>
    set((state) => ({
      filter: {
        ...state.filter,
        category: category
      }
    })),

  setLocation: (location: Location) =>
    set((state) => ({
      filter: {
        ...state.filter,
        location: location
      }
    })),

  setBusiness: (business: BusinessSelectList) =>
    set((state) => ({
      filter: {
        ...state.filter,
        business: business
      }
    })),

    resetFilter: () =>
      set(() => ({
        filter: initialState
      })),
}))
