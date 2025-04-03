import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Listing {
  _id: string;
  title: string;
  description: string;
  location: string;
  numberOfPassengers: number;
  images: string[];
  ownerId: {
    profilePicture: string;
  };
  createdAt: string;
}

interface ListingsState {
  listings: Listing[];
  loading: boolean;
  error: string | null;
}

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
};

// Async thunk for fetching owner listings
export const fetchOwnerListings = createAsyncThunk(
  'listings/fetchOwnerListings',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/listing/ownerListings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Sort listings by `createdAt` in descending order
      const sortedListings = response.data.listings.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return sortedListings;
    } catch (error) {
      return rejectWithValue('Failed to fetch listings');
    }
  }
);

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchOwnerListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectListings = (state: any) => state.listings.listings;
export const selectLoading = (state: any) => state.listings.loading;
export const selectError = (state: any) => state.listings.error;

export default listingsSlice.reducer;
