import { Image, TouchableOpacity } from 'react-native';
import { LargeText } from '../text';
import styles from './styles';
import CommonStyles from '../../utills/CommonStyles';

type buttonProps = {
  onPress?: () => void,
  disabled?: boolean,
  isLoading?: boolean,
  loaderColor?: string,
  activeOpacity?: number,
  containerStyle?: object,
  iconStyle?: object,
  source?: any,
  title?: string
};
const SocialButton = ({
  onPress = () => null,
  disabled = false,
  isLoading = false,
  title = 'Sign in with Google',
  activeOpacity = 0.9,
  containerStyle = {},
  iconStyle = {},
  source,
}: buttonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
        <LargeText size={3.8} textStyles={CommonStyles.marginRight_2}>{title}</LargeText>
        <Image source={source} style={[styles.iconStyle, iconStyle]} />
    </TouchableOpacity>
  );
};

export default SocialButton;
