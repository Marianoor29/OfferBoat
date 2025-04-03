import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logoHat } from '../../../assets/images';
import { Button, FilePickerModal, LargeText, LoadingButton, ScreenWrapper, SmallText } from '../../../components';
import { FilePickerModalRef } from '../../../components/filePickerModal';
import apiUrl from '../../../config';
import ScreenNames from '../../../navigation/routes';
import { handleLogin } from '../../../redux/slice/auth/authSlice';
import { setAppLoader } from '../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import { width } from '../../../utills/Dimension';
import styles from './styles';
import { setUserData } from '../../../redux/slice/user/userSlice';
import OwnerScreenNames from '../../../navigation/ownerRoutes';

type UserType = 'BoatOwner' | 'BoatRenter';

const ChooseUserType = ({ navigation, route }: any) => {
  const userdata = route.params.userdata;
  const phoneNumber = route.params.phoneNumber;
  const type = route.params.type;
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const showModal = useRef<FilePickerModalRef>(null);
  const showBackModal = useRef<FilePickerModalRef>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [showErrorMessage, setErrorMessage] = useState<string | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [termsConditions, setTermsConditions] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const userTypes = [
    { name: 'Boat Renter', value: 'BoatRenter' as UserType },
    { name: 'Boat Owner', value: 'BoatOwner' as UserType }
  ];
  const handleSelect = (value: UserType) => {
    setSelectedType(value);
  };

  const dispatch = useAppDispatch();

  const SignUpMethod = async () => {
    if (!selectedType) {
      setErrorMessage('Please select user type');
      return;
    }

    setButtonLoading(true)
    try {
      if (selectedType === 'BoatOwner') {
        const formData = new FormData();
        formData.append('email', userdata?.email);
        formData.append('frontImage', {
          uri: frontImage,
          type: 'image/jpeg', 
          name: 'frontImage.jpg'
        });
        formData.append('backImage', {
          uri: backImage,
          type: 'image/jpeg',
          name: 'backImage.jpg'
        });

        const uploadResponse = await axios.post(`${apiUrl}/uploadDocuments`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (uploadResponse.status !== 200) {
          throw new Error('Failed to upload documents');
        }
      }
     if( type === 'signUp' ) {
        const userData = {
          email: userdata?.email,
          userType: selectedType,
          phoneNumber: phoneNumber,
          firstName: userdata?.firstName,
          lastName: userdata?.lastName,
          password: userdata?.password,
          rating:0,
          termsAndPolicies: termsConditions,
        }
        const response = await axios.post(`${apiUrl}/signup`, userData);
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        dispatch(handleLogin(token, selectedType)); 
        dispatch(setUserData({token, userType : selectedType, email: userdata?.email,  phoneNumber: phoneNumber, firstName: userdata?.firstName, lastName: userdata?.lastName,  rating:0, })); 
        navigation.navigate(ScreenNames.SHAREDSCREENS, {
          screen: ScreenNames.LOCATIONPERMISSION,
        });
     } else {
      const userData = {
        email: userdata?.email,
        userType: selectedType,
        phoneNumber: phoneNumber,
        firstName: userdata?.firstName,
        lastName: userdata?.lastName,
        rating:0,
        termsAndPolicies: termsConditions,
        profilePicture: userdata?.profilePicture
      }
      const response = await axios.post(`${apiUrl}/googleSignup`, userData);
      const { token,} = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      dispatch(handleLogin(token, selectedType)); 
      dispatch(setUserData({token, userType : selectedType, email: userdata?.email,  phoneNumber: phoneNumber, firstName: userdata?.firstName, lastName: userdata?.lastName,  rating:0,  profilePicture: userdata?.profilePicture})); 
     navigation.navigate(ScreenNames.SHAREDSCREENS, {
      screen: ScreenNames.LOCATIONPERMISSION,
    });
     }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setButtonLoading(false)
    }
  };

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

  // Disable header back button and swipe gestures
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedType === 'BoatOwner') {
      setIsButtonEnabled(!!frontImage && !!backImage && !!termsConditions);
    } else if (selectedType === 'BoatRenter' && termsConditions) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedType, frontImage, backImage, termsConditions]);

  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <View style={styles.bottomView}>
          <LargeText color={AppColors.red} size={4}>{showErrorMessage}</LargeText>
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setTermsConditions(!termsConditions)}
            >
              <MaterialCommunityIcons
                name={termsConditions === true ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
                size={width(7)}
                color={AppColors.black}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row'}}>
            <LargeText size={3}>
              I agree to the{' '}
            </LargeText>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.TERMCONDITION)}>
                <LargeText size={3} color={'blue'}>Terms of Service</LargeText>
              </TouchableOpacity>
              <LargeText size={3}> & </LargeText>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.PRIVACYPOLICY)}>
                <LargeText size={3} color={'blue'}>Privacy Policy</LargeText>
              </TouchableOpacity>
              </View>
          </View>
          <LoadingButton
            onPress={SignUpMethod}
            text={'SignUp'}
            buttonStyle={styles.signInButtonStyle}
            disabled={!isButtonEnabled}
            isLoading={buttonLoading} 
          />
        </View>
      )}
    >
      <View style={styles.container}>
        <Image source={logoHat} style={styles.image} resizeMode='contain' />
        <LargeText textStyles={styles.label}>Select User Type</LargeText>
        {userTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.selectionView}
            activeOpacity={0.8}
            onPress={() => handleSelect(item.value)}
          >
            <MaterialCommunityIcons
              name={selectedType === item.value ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
              size={width(7)}
              color={AppColors.black}
            />
            <LargeText size={4.4}>{item.name}</LargeText>
          </TouchableOpacity>
        ))}
        {selectedType === 'BoatOwner' && (
          <View style={styles.UploadIdView}>
            <View style={styles.imageView}>
              <SmallText size={3}>Upload front side of ID</SmallText>
              <Image source={{ uri: frontImage ? frontImage : 'https://cdn.pixabay.com/photo/2021/01/02/07/44/card-5880831_1280.png' }}
                style={styles.IdImage} />
              <TouchableOpacity activeOpacity={0.8} style={styles.camera}
                onPress={() => showModal?.current?.show()}>
                <FontAwesome
                  name={'camera'}
                  size={width(5)}
                  color={AppColors.white}
                />
              </TouchableOpacity>
            </View>
            <FilePickerModal
              ref={showModal}
              onFilesSelected={(k) => setFrontImage(k.path)}
              imageWidth={1024}  // Larger resolution for better image quality
              imageHeight={680}
            />
            <View style={styles.imageView}>
              <SmallText size={3}>Upload back side of ID</SmallText>
              <Image source={{ uri: backImage ? backImage : 'https://cdn.pixabay.com/photo/2020/09/17/22/47/bank-card-5580506_1280.png' }}
                style={styles.IdImage} />
              <TouchableOpacity activeOpacity={0.8} style={styles.camera}
                onPress={() => showBackModal?.current?.show()}>
                <FontAwesome
                  name={'camera'}
                  size={width(5)}
                  color={AppColors.white}
                />
              </TouchableOpacity>
            </View>
            <FilePickerModal
              ref={showBackModal}
              onFilesSelected={(k) => setBackImage(k.path)}
              imageWidth={1024}  // Larger resolution for better image quality
              imageHeight={680}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ChooseUserType;
