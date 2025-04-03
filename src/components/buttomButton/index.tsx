import { View } from 'react-native';
import Button from '../button';
import styles from './styles';

type buttonProps = {
  onPressFirstButton?: () => void,
  onPressSecondButton?: () => void,
  fisrtButtonTitle?: string,
  secondButtonTitle?: string
 
};
const ButtomButton = ({
  onPressFirstButton = () => null,
  onPressSecondButton = () => null,
  fisrtButtonTitle = 'Book Now',
  secondButtonTitle = 'Make Offer'
}: buttonProps) => {
  return (
    <View style={styles.bottomView}>
          <Button
            text={fisrtButtonTitle}
            buttonStyle={styles.acceptBtnStyle}
            textStyle={styles.btnTextStyle}
            onPress={onPressFirstButton}
          />
          <Button
            text={secondButtonTitle}
            buttonStyle={styles.makeOfferBtnStyle}
            textStyle={styles.btnTextStyle}
            onPress={onPressSecondButton}
          />
        </View>
  );
};

export default ButtomButton;
