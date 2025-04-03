import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { logoHat } from '../../../assets/images';
import {
  LargeText,
  ScreenWrapper
} from '../../../components';
import ScreenNames from '../../../navigation/routes';
import AppColors from '../../../utills/AppColors';
import styles from './styles';
import { useAppSelector } from '../../../redux/store/hook';
import { RootState } from '../../../redux/store';
import OwnerScreenNames from '../../../navigation/ownerRoutes';

const Splash = ({ navigation, route }: any) => {
  const userData = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    setTimeout(() => {
      if(userData.userType) {
       if( userData.userType === 'BoatRenter' ){
        navigation.navigate(ScreenNames.HOMEBASE)
       } else {
        navigation.navigate(OwnerScreenNames.HOMEBASE)
       }
      }
      else {
        navigation.navigate(ScreenNames.SELECTTYPE)
      }
    }, 1000)
  }, [])
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={logoHat} style={styles.image} resizeMode='contain' />
        <LargeText size={4} color={AppColors.yellow}>Your Budget, Our Boats</LargeText>
      </View>
    </ScreenWrapper>
  );
};

export default Splash;
