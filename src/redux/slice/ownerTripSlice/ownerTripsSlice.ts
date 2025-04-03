import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../config';
import { ORDER_STATUSES } from '../../../utills/enum';

export interface Booking {
  _id: string;
  date: string;
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

interface OwnerTripsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: OwnerTripsState = {
  bookings: [],
  loading: false,
  error: null,
};

// Async thunk to fetch bookings
export const fetchOwnerBookings = createAsyncThunk(
    'ownerTrips/fetchOwnerBookings',
    async (userId: string) => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/ownerBookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
// Check if populatedBookings exist and sort them
let bookingsData: Booking[] = response.data.populatedBookings || [];

 // Sort bookings
 bookingsData.sort((a: Booking, b: Booking) => {
  // Priority: PENDING > Completed/Rejected > Accepted
  if (a.status === ORDER_STATUSES.PENDING) return -1; // a comes before b
  if (b.status === ORDER_STATUSES.PENDING) return 1;  // b comes before a

  // For Completed or Rejected status, sort by date, newest first
  if (a.status === ORDER_STATUSES.COMPLETED || a.status === ORDER_STATUSES.CANCELLED) {
    if (b.status === ORDER_STATUSES.COMPLETED || b.status === ORDER_STATUSES.CANCELLED) {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
    }
    return -1; // a comes before b if b is Accepted
  }

  // For Accepted status, sort by date, oldest first
  if (a.status === ORDER_STATUSES.CONFIRMED && b.status === ORDER_STATUSES.CONFIRMED) {
    return new Date(a.date).getTime() - new Date(b.date).getTime(); // Oldest first
  }

  // If one is Accepted and the other is Completed/Rejected, show Accepted after
  if (a.status === ORDER_STATUSES.CONFIRMED) return 1; // a comes after b
  if (b.status === ORDER_STATUSES.CONFIRMED) return -1; // b comes before a

  return 0; // Equal priority
});

return bookingsData; // Return the sorted bookings
}
);

const ownerTripsSlice = createSlice({
  name: 'ownerTrips',
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
     // New reducer to remove a specific booking
     removeOwnerBooking: (state, action) => {
      const bookingIdToRemove = action.payload; // The booking ID to remove
      state.bookings = state.bookings.filter((booking: { _id: any; }) => booking._id !== bookingIdToRemove);
    },
    // This is the new reducer to update a specific booking
    updateOwnerBooking: (state, action) => {
      const updatedBooking = action.payload;
      const index = state.bookings.findIndex((booking: { _id: any; }) => booking._id === updatedBooking._id);
      if (index !== -1) {
        state.bookings[index] = updatedBooking; // Update the booking in the array
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        // Optionally sort the bookings here if needed
      })
      .addCase(fetchOwnerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      });
  },
});

export const { setBookings, setLoading, setError, updateOwnerBooking, removeOwnerBooking  } = ownerTripsSlice.actions;
export default ownerTripsSlice.reducer;
