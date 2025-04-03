import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/index';

export interface UserState {
  setLoader: boolean;
}

const initialState: UserState = {
  setLoader: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setAppLoader: (state, action: PayloadAction<boolean>) => {
      state.setLoader = action.payload;
    },
  },
});

export default loaderSlice.reducer;
export const { setAppLoader } = loaderSlice.actions;
export const selectAppLoader = (state: RootState) => state.loader.setLoader;
