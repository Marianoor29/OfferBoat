import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  hours: string;
  priceRange: [number, number];
  numberOfPassengers: number;
  boatCategory?: string;
  boatManufacturer?: string;
  lengthRange?: string;
}

const initialState: FilterState = {
  hours: '',
  priceRange: [1, 5000],
  numberOfPassengers: 0,
  boatCategory: undefined,
  boatManufacturer: undefined,
  lengthRange: undefined,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => initialState,
  },
});

export const { setFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
