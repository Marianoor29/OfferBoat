import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiUrl from '../config';

// Fetch user data
export async function fetchRentersData(setUserId: Function, dispatch: Function, setUserData: Function) {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setUserId('');
      return;
    }
    const userResponse = await axios.get(`${apiUrl}/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { _id, firstName, lastName, profilePicture, location, rating, phoneNumber, coverPicture, email, userType } = userResponse.data;
    setUserId(_id);
    dispatch(setUserData({ _id, firstName, lastName, profilePicture, location, rating, phoneNumber, coverPicture, email, userType, token }));
  } catch (error) {
    console.log('Failed to load data');
  } 
}
