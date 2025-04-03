import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagesState {
  selectedImages: string[];
}

const initialState: ImagesState = {
  selectedImages: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addSelectedImages(state, action: PayloadAction<string[]>) {
      state.selectedImages = [...state.selectedImages, ...action.payload];
    },
    removeSelectedImage(state, action: PayloadAction<string>) {
      state.selectedImages = state.selectedImages.filter((image: string) => image !== action.payload);
    },
    clearImages(state){
      state.selectedImages = []
    }
  },
});

export const { addSelectedImages, removeSelectedImage , clearImages} = imagesSlice.actions;

export default imagesSlice.reducer;
