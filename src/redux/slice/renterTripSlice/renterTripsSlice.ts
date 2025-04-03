import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../config';

export interface Booking {
  _id: string;
  date: string;
  createdAt: string;
  time: string;
  status: string;
  location: string;
  userId: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    location: string;
    rating: number;
  };
  listingId: {
    location: string;
    title: string;
    images: string[]
  };
  ownerId: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    rating: number;
    location: string;
  };
  packages: {
    price: number;
  }[];
}

interface RenterTripsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: RenterTripsState = {
  bookings: [],
  loading: false,
  error: null,
};

// Async thunk to fetch bookings
export const fetchRenterBookings = createAsyncThunk(
    'renterTrips/fetchRenterBookings',
    async (userId: string) => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/renterBookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
// Check if populatedBookings exist and sort them
let bookingsData: Booking[] = response.data.nonPendingBookings || [];
bookingsData = bookingsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

return bookingsData; // Return the sorted bookings
}
);

const renterTripsSlice = createSlice({
  name: 'renterTrips',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // This is the new reducer to update a specific booking
    updateRenterBooking: (state, action) => {
      const updatedBooking = action.payload;
      const index = state.bookings.findIndex((booking: { _id: any; }) => booking._id === updatedBooking._id);
      if (index !== -1) {
        state.bookings[index] = updatedBooking; // Update the booking in the array
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRenterBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRenterBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        // Optionally sort the bookings here if needed
      })
      .addCase(fetchRenterBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      });
  },
});

export const { setBookings, setLoading, setError, updateRenterBooking } = renterTripsSlice.actions;
export default renterTripsSlice.reducer;
