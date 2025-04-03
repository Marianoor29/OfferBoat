import { Pressable } from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import { LargeText } from '../text';
import styles from './styles';

type buttonProps = {
  title?: string,
  subTitle?: string,
  onPress?: () => void
};
const InfoCards = ({
  title,
  subTitle,
  onPress = () => null
}: buttonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
       <LargeText size={4}>{subTitle}</LargeText>
       <LargeText size={2.8} textAlign={'center'} textStyles={CommonStyles.marginTop_2}>{title}</LargeText>
    </Pressable>
  );
};

export default InfoCards;
