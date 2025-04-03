import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { Button, LargeText, LocationSelector, ScreenWrapper, SimpleHeader } from '../../../components';
import apiUrl from '../../../config';
import OwnerScreenNames from '../../../navigation/ownerRoutes';
import ScreenNames from '../../../navigation/routes';
import { setUserData } from '../../../redux/slice/user/userSlice';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hook';
import { fetchRentersData } from '../../../utills/CommonFunctions';
import CommonStyles from '../../../utills/CommonStyles';
import styles from './styles';

const LocationPermission = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.user);
  const [location, setLocation] = useState<string>('')
  const [enableButton, setEnableButton] = useState(true)
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchRentersData(setUserId, dispatch, setUserData);
  }, [userId]);

  const handleLocation = async () => {
    if (!userId) return;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.post(`${apiUrl}/saveLocation`, { userId, location }, {
        headers: { Authorization: `Bearer ${token}` },
      });
     if (response.status === 200) {
      if (userData.userType === 'BoatRenter') {
        navigation.navigate(ScreenNames.HOMEBASE);
      } else {
        navigation.navigate(OwnerScreenNames.HOMEBASE);
      }
     }
    } catch (error: any) {
      console.log('Axios error:', error.response ? error.response.data : error.message);
    }
  }

  const onSubmitHandle = (data: any, detail: any) => {
    setLocation(data.description);
    setEnableButton(false)
  }
  // Disable hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <ScreenWrapper
    headerUnScrollable={() => (
      <SimpleHeader />
    )}
      footerUnScrollable={() => (
        <Button
          text="Please Continue"
          onPress={handleLocation}
          buttonStyle={styles.buttonStyle}
          disabled={enableButton}
        />
      )}
    >
      <View style={styles.container}>
        <LargeText size={3} textAlign={'justify'} textStyles={CommonStyles.marginBottom_5}>
          OfferBoat requires access to your location to show you nearby boats and offers. </LargeText>

        <LocationSelector
          fetchDetails={true}
          onPress={onSubmitHandle}
        />

      </View>
    </ScreenWrapper>
  );
};

export default LocationPermission;
