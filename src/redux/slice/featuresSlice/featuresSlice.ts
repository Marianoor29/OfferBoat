import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeaturesState {
  features: string[];
}

const initialState: FeaturesState = {
  features: [],
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    addFeature(state, action: PayloadAction<string>) {
      state.features = [...state.features, action.payload];   
     },
    removeFeature(state, action: PayloadAction<string>) {
      state.features = state.features.filter((feature: string) => feature !== action.payload);
    },
    clearFeatures(state){
      state.features = []
    }
  },
});

export const { addFeature, removeFeature, clearFeatures, } = featuresSlice.actions;

export default featuresSlice.reducer;
