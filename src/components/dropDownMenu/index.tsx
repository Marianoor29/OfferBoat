import { TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { SmallText } from "../text";
import styles from './styles';

type DropDownMenuProps = {
  isVisible?: boolean;
  onClose?: () => void;
  onPressFirstBtn?: () => void;
  onPressSecondBtn?: () => void;
  firstBtnText?: string;
  secondBtnText?: string;
  thirdText?: string;
  onPressThirdBtn?: () => void;
}

const DropDownMenu = ({
  isVisible = false,
  onClose = () => {},
  onPressFirstBtn = () => {},
  onPressSecondBtn = () => {},
  firstBtnText,
  secondBtnText,
  thirdText,
  onPressThirdBtn = () => {}
}: DropDownMenuProps) => {
  return (
    <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    animationIn="fadeInUpBig"
    animationInTiming={1000}
  >
    <View style={styles.modalContainer}>
      <View style={styles.buttonContainer}>
        {firstBtnText && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={onPressFirstBtn}
          >
            <SmallText>{firstBtnText}</SmallText>
          </TouchableOpacity>
        )}
        <View style={styles.line} />
        {secondBtnText && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnDlt}
            onPress={onPressSecondBtn}
          >
            <SmallText>{secondBtnText}</SmallText>
          </TouchableOpacity>
        )}
        {thirdText && (
          <>
            <View style={styles.line} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnDlt}
              onPress={onPressThirdBtn}
            >
              <SmallText>{thirdText}</SmallText>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cancelBtn}
        onPress={onClose}
      >
        <SmallText>Cancel</SmallText>
      </TouchableOpacity>
    </View>
  </Modal>
  );
};
export default DropDownMenu;