import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../../config';

interface Offer {
    userImage: string;
    renterName: string;
    date: string;
    time: string;
    tripInstructions: string;
    hours: string;
    captain: boolean;
    passengers: number;
    location: string;
    rating: number;
    price: string;
    status: string;
    createdAt: string;
    id: string;
}

interface CustomOffersState {
    offers: Offer[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomOffersState = {
    offers: [],
    loading: false,
    error: null,
};

export const getAllOffers = createAsyncThunk(
  'customOffers/getAllOffers',
  async ({ ownerId, location }: { ownerId: string; location: string }) => {
    let response;
        if (ownerId) {
            response = await axios.get(`${apiUrl}/getAllOffers?ownerId=${ownerId}&location=${location}`);
        } else {
            response = await axios.get(`${apiUrl}/customOffersByLocation?location=${location}`);
        }

        const offers = response.data.offers || response.data;

      const sortedOffers = offers.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; 
      });
      
      return sortedOffers;
  }
);

const customOffersSlice = createSlice({
    name: 'customOffers',
    initialState,
    reducers: {
         // New action to remove an offer by its ID
         removeOffer: (state, action) => {
            state.offers = state.offers.filter((offer: { id: any; }) => offer.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOffers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.offers = action.payload; // Update offers with fetched data
            })
            .addCase(getAllOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch offers';
            });
    },
});

export const { removeOffer } = customOffersSlice.actions; 
export const selectCustomOffers = (state: any) => state.customOffers.offers; 
export const selectLoading = (state: any) => state.customOffers.loading;
export const selectError = (state: any) => state.customOffers.error;

export default customOffersSlice.reducer;
