import { useRef, useState } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-input'; 
import {
  Button,
  LargeText,
  ScreenWrapper,
  SmallText
} from '../../../components';
import ScreenNames from '../../../navigation/routes';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import styles from './styles';

const PhoneNumber = ({ navigation, route }: any) => {
  const userdata = route.params.userdata;
  const type = route.params.type;
  const phoneInput = useRef<any>(null); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinue = () => {
    const isValid = phoneInput.current?.isValidNumber(phoneNumber);
    if (!phoneNumber) {
      setErrorMessage('Please enter your phone number');
    } else if (!isValid) {
      setErrorMessage('Please enter a valid phone number');
    } else {
      setErrorMessage(''); // Clear any existing error message
      navigation.navigate(ScreenNames.CHOOSEUSERTYPE, {
        phoneNumber: phoneInput.current.getValue(),
        userdata: userdata,
        type: type
      });
    }
  };

  return (
    <ScreenWrapper scrollEnabled>
      <View style={styles.container}>
        <LargeText textStyles={CommonStyles.marginBottom_2}>
          Add Phone Number
        </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4}>
          Please enter your phone number.
        </SmallText>
        <PhoneInput
          ref={phoneInput}
          initialValue={phoneNumber} 
          initialCountry="us" 
          onChangePhoneNumber={setPhoneNumber} 
          style={styles.phoneInput} 
        />
        <SmallText size={3.4} color={AppColors.red} textStyles={styles.errorMessageStyle}>
          {errorMessage}
        </SmallText>
        <Button text="Continue" onPress={handleContinue} />
      </View>
    </ScreenWrapper>
  );
};

export default PhoneNumber;
