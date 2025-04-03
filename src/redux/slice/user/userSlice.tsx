import { createSlice } from '@reduxjs/toolkit';

// Define the initial state type
interface UserState {
  _id: string; 
  firstName: string;
  lastName: string;
  profilePicture: string;
  location: string;
  rating: number;
  phoneNumber: string | number; 
  coverPicture: string;
  email: string;
  userType: string;
  token: string;
}

// Initial state
const initialState: UserState = {
  _id: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  location: '',
  rating: 0,
  phoneNumber: '', 
  coverPicture: '',
  email: '',
  userType: '',
  token: '',
};

// Create a slice for user data
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => initialState, 
  },
});

// Export actions and reducer
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
