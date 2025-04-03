import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
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
import ScreenNames from '../../../navigation/routes';
import { setAppLoader } from '../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { VerificationCodeSchema } from '../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  code: any,
};

const BlockUsers = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const userdata = route.params.userdata;
  const {email} = route.params.userdata;
  const modalRef = useRef<ModalHandles>(null);
  const [verificationCode, setVerificationCode] = useState(route.params.userdata.VerificationCode);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      code: null,
    },
    resolver: yupResolver(VerificationCodeSchema),
  });
 useEffect(() => {
  setVerificationCode
 }, [verificationCode])

 const VerifyUser = async (data: FormValues) => {
  const userCode = data.code
  dispatch(setAppLoader(true));
  if (userCode == verificationCode) {
      navigation.navigate(ScreenNames.PHONENUMBER, { userdata: userdata, type: 'signUp'});
  } else {
    setErrorMessage('Incorrect verification code');
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  }
  dispatch(setAppLoader(false));
};

  const ResendCode = async () => {
    dispatch(setAppLoader(true));
    try {
      const response = await axios.post(`${apiUrl}/resendCode`, { email });
      setVerificationCode(response.data.verificationCode);
      setResendMessage('Verification code resent successfully.');
    } catch (error) {
      setResendMessage('Failed to resend verification code. Please try again.');
    }
    dispatch(setAppLoader(false));
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
        />
      )}
      >
      <View style={styles.container}>
        <LargeText textStyles={CommonStyles.marginBottom_2}>Verify Email</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4}>
          Enter the 6-digit code sent to your email.
        </SmallText>
        <InputField
          title='Verification Code'
          placeholder="Enter 6-digit code"
          control={control}
          name={'code'}
          keyboardType="number-pad"
          returnKeyLabel="done"
          error={errors?.code?.message}
          errorView={CommonStyles.marginBottom_1}
        />
        {errorMessage ? <SmallText size={3.4} color={AppColors.red} textStyles={CommonStyles.marginBottom_1}>{errorMessage}</SmallText> : null}
        {resendMessage ? <SmallText size={3.4} color={AppColors.green} textStyles={CommonStyles.marginBottom_1}>{resendMessage}</SmallText> : null}
        <Button
          onPress={handleSubmit(VerifyUser)}
          text={'Verify'}
          disabled={!isValid}
          buttonStyle={styles.signInButtonStyle}
        />
        <SmallText textStyles={CommonStyles.marginTop_2} size={3.4} onPress={ResendCode} color={AppColors.secondaryRenter}>
          Resend Code
        </SmallText>
        <View style={styles.footerView}>
        <SmallText size={3.4} textAlign='justify' textStyles={CommonStyles.marginBottom_2} color={AppColors.grey}>Thank you for registering with us! To complete your registration, please verify your email address.</SmallText>
        <SmallText size={3.4} textAlign='justify' textStyles={CommonStyles.marginBottom_2} color={AppColors.grey}>
        <Text style={{ fontWeight: 'bold' }}>Please Note:</Text> Sometimes, our verification emails may end up in your spam or junk folder. If you do not see the email in your inbox, kindly check these folders. If you still cannot find the verification email, you may request a new one.
        </SmallText>
        <SmallText size={3.4} textAlign='justify' color={AppColors.grey}>Thank you for your patience.</SmallText>
        </View>
        <ModalWrapper
          ref={modalRef}
          onClose={() => modalRef?.current?.hide()}
          children={
            <>
              <LottieView source={require('../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>
                Your email has been verified successfully!
              </MediumText>
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default BlockUsers;
