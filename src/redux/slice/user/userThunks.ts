import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setUser  from './userSlice';

export const initializeUser = createAsyncThunk(
  'user/initializeUser',
  async (_, { dispatch }) => {
    const isLoginString = await AsyncStorage.getItem('isLogin');
    if (isLoginString !== null) {
      const isLogin = JSON.parse(isLoginString);
      dispatch(setUser(isLogin));
    }
  }
);
