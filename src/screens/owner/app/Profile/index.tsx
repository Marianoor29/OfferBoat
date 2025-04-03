import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { logo } from '../../../../assets/images';
import { OwnerHeader, ProfileInfo, ScreenRow, ScreenWrapper, WelcomeCard } from '../../../../components';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { handleLogout } from '../../../../redux/slice/auth/authSlice';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { clearUserData, setUserData } from '../../../../redux/slice/user/userSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector, } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';
import { fetchRentersData } from '../../../../utills/CommonFunctions';
import { useEffect, useState } from 'react';

const OwnerProfileScreen = ({ navigation}: any) => {
  const userData = useAppSelector((state: RootState) => state.user); 
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState('');
  const profilePicture = userData?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const coverPicture = userData.coverPicture || 'https://cdn.pixabay.com/photo/2023/02/12/12/06/ocean-7784940_1280.jpg';

  const logoutHandler = async () => {
    dispatch(setAppLoader(true)); // Dispatch loader action
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Dispatch logout action
      dispatch(handleLogout());
      dispatch(clearUserData()); 
    } catch (error) {
      console.log('Error during logout:', error);
    }
    dispatch(setAppLoader(false)); // Dispatch loader action
  };

  useEffect(() => {
      fetchRentersData(setUserId, dispatch, setUserData);
    }, [userData.token])

  const ScreenRowList = [
    {
      key: 2,
      source: <MaterialIcons name='star-purple500' size={width(6)} color={AppColors.black} />,
      screenName: 'Reviews',
      onPress: () => navigation.navigate(ScreenNames.REVIEWS, {userId : userId, userType:userData.userType, type : 'profile' })
    },
    {
      key: 3,
      source: <MaterialIcons name='help-outline' size={width(6)} color={AppColors.black} />,
      screenName: 'FAQ',
      onPress: () => navigation.navigate(OwnerScreenNames.OWNERFAQ)
    },
    {
      key: 4,
      source: <MaterialIcons name='assistant' size={width(6)} color={AppColors.black} />,
      screenName: 'Get Help',
      onPress: () => navigation.navigate(ScreenNames.GETHELP, {userdata: userData })
    },
    {
      key: 5,
      source: <MaterialIcons name='assignment' size={width(6)} color={AppColors.black} />,
      screenName: 'Terms & Conditions',
      onPress: () => navigation.navigate(ScreenNames.TERMCONDITION)
    },
    {
      key: 6,
      source: <MaterialIcons name='lock-person' size={width(6)} color={AppColors.black} />,
      screenName: 'Privacy Policy',
      onPress: () => navigation.navigate(ScreenNames.PRIVACYPOLICY)
    },
    {
      key: 7,
      source: <MaterialIcons name='manage-accounts' size={width(6)} color={AppColors.black} />,
      screenName: 'Account Setting',
      onPress: () =>
        navigation.navigate(ScreenNames.SHAREDSCREENS, {
          screen: ScreenNames.ACCOUNTSETTING,
        })
    },
  ]
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          userData.token ? (
        <OwnerHeader
        source={logo}
        onPressFirstIcon1={() => navigation.navigate(ScreenNames.NOTIFICATION, {userType : 'BoatOwner'})}
        onPressFirstIcon2={() => navigation.navigate(OwnerScreenNames.OWNERLOCATIONSCREEN,{type : 'addLocation'})}
      />
    ) : (
      <></>
    )
      )}}>
         {!userData.token ? (
            <WelcomeCard
            subTitle='Create an account or sign in to showcase your boat, reach more customers, and start earning today!'
            onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
            btnColor={AppColors.green}
            />
        ) : (
      <View style={styles.container}>
        <ProfileInfo
          coverImage={coverPicture}
          userImage={profilePicture}
          firstName={userData?.firstName}
          lastName={userData?.lastName}
          email={userData?.email}
          phoneNumber={userData?.phoneNumber}
          rating={userData?.rating}
          address={userData?.location}
          onPress={() => navigation.navigate(OwnerScreenNames.OWNEREDITCOVERPICTURE, {id : userId, coverImage : coverPicture})}
          onPressProfilePicture={() => navigation.navigate(OwnerScreenNames.OWNEREDITPROFILEPICTURE, {id : userId, userImage: profilePicture})}
        />
        <View style={CommonStyles.marginTop_3}>
          {ScreenRowList.map((item, key) => {
            return (
              <ScreenRow
                key={item.key}
                source={item.source}
                screenName={item.screenName}
                onPress={item.onPress}
              />
            )
          })}
          <ScreenRow
            source={<MaterialIcons name='logout' size={width(5)} color={AppColors.black} />}
            screenName={'Logout'}
            onPress={logoutHandler}
          />
        </View>
      </View>
        )}
    </ScreenWrapper>
  )
}
export default OwnerProfileScreen