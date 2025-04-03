import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import {
  Button,
  LargeText,
  LocationSelector,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import { clearFeatures } from '../../../../redux/slice/featuresSlice/featuresSlice';
import { clearImages } from '../../../../redux/slice/imagesSlice/imagesSlice';
import { addLocation } from '../../../../redux/slice/locationSlice/locationSlice';
import { clearRules } from '../../../../redux/slice/rulesSlice/rulesSlice';
import { useAppDispatch } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

const OwnersLocationScreen = ({ navigation, route }: any) => {
  const type = route.params.type;
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState('');
  const [enableButton, setEnableButton] = useState(true);
  
  const onSubmitHandle = (data: any) => {
    setLocation(data.description);
    setEnableButton(false);
  };

  const onSubmitLocation = (data: any) => {
    setLocation(data.description);
    dispatch(addLocation(data.description)); 
    setEnableButton(false);
  };

  const handleGoBack = () => {
    if (type !== 'updateLocation') {
      dispatch(clearImages());
      dispatch(clearFeatures());
      dispatch(clearRules());
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

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
  // Disable header back button and swipe gestures
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader 
          arrowColor={AppColors.green}
          onPressFirstIcon={handleGoBack}
          emptyView={<LargeText size={4} textAlign={'center'}>Search Location</LargeText>}
        />
      )}
      footerUnScrollable={() => (
        type === 'updateLocation' ? (
          <Button
            text='Update'
            buttonStyle={styles.btn}
            onPress={() => navigation.goBack()}
            disabled={enableButton}
          />
        ) : (
          <Button
            text='Continue'
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate(OwnerScreenNames.ADDOFFER, { location })}
            disabled={enableButton}
          />
        )
      )}
    >
      <View style={styles.container}>
        <LocationSelector
          fetchDetails={true}
          onPress={type === 'updateLocation' ? onSubmitLocation : onSubmitHandle}
          isFullAddress = {true}
        />
      </View>
    </ScreenWrapper>
  );
};

export default OwnersLocationScreen;
