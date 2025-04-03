import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  location: string;
}

const initialState: LocationState = {
  location: ''
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    removeLocation: (state) => {
      state.location = '';
    },
  }
});

export const { addLocation, removeLocation } = locationSlice.actions;

export default locationSlice.reducer;
