import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { ResetPasswordSchema } from '../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  token: string,
  password: string,
};

const ResetPassword = ({ navigation, route }: any) => {
  const { resetToken } = route.params;
  const [securePassword, setSecurePassword] = useState(true);
  const modalRef = useRef<ModalHandles>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      token: '',
      password: '',
    },
    resolver: yupResolver(ResetPasswordSchema),
  });

  const resetPassword = async (data: FormValues) => {
    if (data.token !== resetToken) {
      setErrorMessage('Invalid code');
      return;
    }

    try {
      await axios.post(`${apiUrl}/resetPassword`, { token: data.token, newPassword: data.password });
      modalRef?.current?.show();
    } catch (error) {
      setErrorMessage(`We’re unable to complete your password reset. Please try using a fresh reset code.`);
    }
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
        <LargeText textStyles={CommonStyles.marginBottom_2}> Reset Password</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4}>Enter the Reset Code sent to your email</SmallText>
        
        <InputField
          title='Reset Code'
          placeholder="Enter your code"
          returnKeyLabel="done"
          control={control}
          name={'token'}
          icon={<MaterialCommunityIcons name={'key'} size={width(7)} color={AppColors.grey} />}
          error={errors?.token?.message}
        />

        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4}>Enter your new password</SmallText>
        
        <InputField
          title='Password'
          placeholder="Enter your password"
          returnKeyLabel="done"
          control={control}
          name={'password'}
          icon={<MaterialCommunityIcons name={'form-textbox-password'} size={width(7)} color={AppColors.grey} />}
          error={errors?.password?.message}
          secureTextEntry={securePassword}
          rightSideIcon={
            securePassword ? (
              <MaterialCommunityIcons name={'eye-outline'} size={width(6)} color={AppColors.grey} />
            ) : (
              <MaterialCommunityIcons name={'eye-off'} size={width(6)} color={AppColors.grey} />
            )
          }
          onPressRightIcon={() => setSecurePassword(!securePassword)}
        />
          {errorMessage ? <SmallText size={3.4} color={AppColors.red} textStyles={CommonStyles.marginBottom_1}>{errorMessage}</SmallText> : null}
        <Button
          onPress={handleSubmit(resetPassword)}
          text={'Reset'}
          disabled={!isValid}
          buttonStyle={styles.signInButtonStyle}
        />

        <ModalWrapper
          ref={modalRef}
          onClose={() => modalRef?.current?.hide()}
          children={
            <>
              <LottieView source={require('../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Your password has been updated!</MediumText>
              <Button
                text='Login'
                onPress={() => navigation.navigate(ScreenNames.LOGIN)}
              />
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;
