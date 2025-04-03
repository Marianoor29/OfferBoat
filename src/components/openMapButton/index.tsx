import { Alert, Linking, Pressable } from 'react-native';
import { LargeText } from '../text';
import styles from './styles';
import AppColors from '../../utills/AppColors';

interface OpenMapButtonProps {
  address: string;
}

const OpenMapButton = ({ address }:OpenMapButtonProps) => {
  const openMap = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open the map');
    });
  };

  return (
    <Pressable  onPress={() => openMap(address)} style={styles.buttonStyle}>
    <LargeText size={3} color={AppColors.skyBlue}>Click here to view location on the map</LargeText>
    </Pressable>
  );
};

export default OpenMapButton;
