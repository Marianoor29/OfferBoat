import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import apiUrl from './config';
import MainNavigation from './navigation/navigation';
import { store } from './redux/store';
import { handleNotificationNavigation, initializeNotificationServices, setNavigationRef } from './utills/notificationService';

const App = () => {
  const baseURL = apiUrl;
  const [userId, setUserId] = useState('');

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setUserId('');
        return;
      }
      const userResponse = await axios.get(`${baseURL}/userData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { _id } = userResponse.data;
      setUserId(_id);
    } catch (error) {
      console.log('Failed to load data');
    }
  };

  
  useEffect(() => {
    const initialize = async () => {
        await initializeNotificationServices();
        await fetchUserId();
    }
    initialize();
    handleNotificationNavigation(); 
}, [userId]);

  return (
    <StripeProvider publishableKey="pk_live_51O......AR9kkCDjXk7jrbEqKVr3AmLw1wV0p0vw7lxpNXUzXq06J000xsmRtwX">
      <Provider store={store}>
        <MainNavigation setNavigationRef={setNavigationRef}/>
      </Provider>
    </StripeProvider>
  );
}

export default App;
