import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  InputField,
  LargeText,
  MediumText,
  ModalWrapper,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../components';
import { ModalHandles } from '../../../components/modalWrapper';
import apiUrl from '../../../config';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { ForgotPasswordSchema } from '../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  email: string,
};

const ForgotPassword = ({ navigation }: any) => {
  const modalRef = useRef<ModalHandles>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const handleRequestReset = async (data: FormValues) => {
    try {
        const emailLowercase = data.email.toLowerCase();
        const response = await axios.post(`${apiUrl}/forgotPasswordRequest`, { email : emailLowercase });
        modalRef?.current?.show()
        setTimeout(() => {
          modalRef?.current?.hide()
          navigation.navigate('ResetPassword', { resetToken: response.data.resetToken });
        },1000)
    } catch (error) {
      setErrorMessage(`We're having trouble sending the password reset email. Please try again later.`);
    }
};
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader 
        onPressFirstIcon={() => navigation.goBack()}
        />
      )}>
      <View style={styles.container}>
        <LargeText textStyles={CommonStyles.marginBottom_2}> Forgot Password?</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4}>Enter The E-Mail Address Associated With Your Account.</SmallText>
        <InputField
          title='Email'
          placeholder="Enter a email"
          control={control}
          name={'email'}
          keyboardType="email-address"
          returnKeyLabel="done"
          icon={
            <AntDesign name={'user'} size={width(7)} color={AppColors.grey} />
          }
          error={errors?.email?.message}
        />
          {errorMessage ? <SmallText size={3.4} color={AppColors.red} textStyles={CommonStyles.marginBottom_1}>{errorMessage}</SmallText> : null}
        <Button
          onPress={handleSubmit(handleRequestReset)}
          text={'Submit'}
          disabled={!isValid}
          buttonStyle={styles.signInButtonStyle}
        />
        <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2} >Password reset code sent {'\n'} to your email</MediumText>
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
