// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../../store/index'; // Adjust the path if necessary

// Define the initial state type
interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    userType: string | null;
}

// Initial state
const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    userType: null,
};

// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; userType: string }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userType = action.payload.userType;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userType = null;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
    },
});

// Export actions
export const { login, logout, setUserType } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Async actions to handle side effects
export const handleLogin = (token: string, userType: string) => async (dispatch: AppDispatch) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userType', userType); 
    dispatch(login({ token, userType }));
};

export const handleLogout = () => async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userType'); // Remove userType from AsyncStorage
    dispatch(logout());
};

export const initializeAuth = () => async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token');
    const userType = await AsyncStorage.getItem('userType'); // Retrieve userType from AsyncStorage
    if (token && userType) {
        dispatch(login({ token, userType }));
    }
};
