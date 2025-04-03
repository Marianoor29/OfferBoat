import { Image, TouchableOpacity, View } from 'react-native';
import { logoHat } from '../../../assets/images';
import {
  Button,
  LargeText,
  ScreenWrapper
} from '../../../components';
import ScreenNames from '../../../navigation/routes';
import AppColors from '../../../utills/AppColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { width } from '../../../utills/Dimension';
import { useState } from 'react';
import CommonStyles from '../../../utills/CommonStyles';
import { useAppDispatch } from '../../../redux/store/hook';
import { setUserType } from '../../../redux/slice/auth/authSlice';
import OwnerScreenNames from '../../../navigation/ownerRoutes';
import { OwnerOfferScreen } from '../../owner/app';

type UserType = 'BoatOwner' | 'BoatRenter';

const SelectType = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState<UserType>('BoatRenter');
  const userTypes = [
    { name: 'Boat Renter', value: 'BoatRenter' as UserType },
    { name: 'Boat Owner', value: 'BoatOwner' as UserType }
  ];

  const handleSelect = (value: UserType) => {
    setSelectedType(value);
  };

  const ButtonHandler = () => {
    dispatch(setUserType(selectedType))
    
    if (selectedType === 'BoatRenter') {
      // Navigate to the BoatRenter home base
      navigation.navigate(ScreenNames.HOMEBASE, {
        screen: ScreenNames.HOME,
      });
    } else {
      // Navigate to the BoatOwner's Offer Screen directly within the OwnerTab
      navigation.navigate(OwnerScreenNames.HOMEBASE, {
        screen: OwnerScreenNames.OWNEROFFERSCREEN,
      });
    }
  }
  
  return (
    <ScreenWrapper
    footerUnScrollable={() => (
      <Button
      text={'Next'}
      buttonStyle={styles.btnStyle}
      onPress={ButtonHandler}
      />
    )}>
      <View style={styles.container}>
        <Image source={logoHat} style={styles.image} resizeMode='contain'/>
        <View style={styles.innerContainer}>
      <LargeText size={3.3} color={AppColors.black} textStyles={CommonStyles.marginBottom_2} textAlign={'center'}>Welcome! Are you a Boat Owner or a Boat Renter?</LargeText>
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
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SelectType;
