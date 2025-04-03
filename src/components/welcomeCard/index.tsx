import { Image, View } from 'react-native';
import { logo } from '../../assets/images';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import Button from '../button';
import { LargeText, SmallText } from '../text';
import styles from './styles';

type CardProps ={
  title?: string
  subTitle?: string
  onPress?: ()=>void
  btnColor?: any
}
const WelcomeCard = ({
  title = 'Ready to Join Us?',
  subTitle = 'Create an account or sign in now, and start your next adventure on the water!',
  onPress,
  btnColor= AppColors.secondaryRenter
  }:CardProps
) => {
  return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <LargeText size={4} textStyles={CommonStyles.marginBottom_2}>{title}</LargeText>
        <SmallText size={3.4} textAlign={'justify'} textStyles={CommonStyles.marginBottom_2}>{subTitle}</SmallText>
        <Button
        text={'GET STARTED!'}
        onPress={onPress}
        buttonStyle={{backgroundColor: btnColor}}
        />
      </View>
  );
};

export default WelcomeCard;
