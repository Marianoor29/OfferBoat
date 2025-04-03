import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, InputField, LargeText, ScreenWrapper, SimpleHeader, SmallText } from '../../../components';
import apiUrl from '../../../config';
import ScreenNames from '../../../navigation/routes';
import { setAppLoader } from '../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { userSchema } from '../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: any;
  ConfirmPassword: any;
};

const SignUp = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [backendError, setBackendError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      ConfirmPassword: '',
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: FormValues) => {
    dispatch(setAppLoader(true));
    try {
      const formattedEmail = data.email.toLowerCase().trim();
      const response = await axios.post(`${apiUrl}/verify`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: formattedEmail,
        password: data.password,
      });
      navigation.navigate(ScreenNames.EMAILVERIFICATION, {
        userdata: response.data.userdata,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      setBackendError(errorMessage);
    } finally {
      dispatch(setAppLoader(false));
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return <SimpleHeader onPressFirstIcon={() => navigation.goBack()} />;
      }}
    >
      <View style={styles.container}>
        <LargeText textStyles={CommonStyles.marginBottom_2}>
          Register your account
        </LargeText>
        <View style={styles.nameViewStyle}>
          <View>
            <InputField
              title="First Name"
              placeholder="Enter first name"
              returnKeyLabel="next"
              control={control}
              name={'firstName'}
              error={errors?.firstName?.message}
              onSubmitEditing={() => lastNameRef?.current?.focus()}
              containerStyle={styles.nameInputContainerStyle}
              textinputStyle={styles.nameInputTextStyle}
            />
          </View>
          <View>
            <InputField
              ref={lastNameRef}
              title="Last Name"
              placeholder="Enter last name"
              returnKeyLabel="next"
              control={control}
              name={'lastName'}
              error={errors?.lastName?.message}
              onSubmitEditing={() => emailRef?.current?.focus()}
              containerStyle={styles.nameInputContainerStyle}
              textinputStyle={styles.nameInputTextStyle}
            />
          </View>
        </View>
        <InputField
          ref={emailRef}
          title="Email"
          placeholder="Enter a email address"
          control={control}
          name={'email'}
          keyboardType="email-address"
          returnKeyLabel="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          icon={
            <AntDesign name={'user'} size={width(7)} color={AppColors.grey} />
          }
          error={errors?.email?.message}
        />
        <InputField
          title="Password"
          ref={passwordRef}
          placeholder="• • • • • • • • • • • • • • •"
          control={control}
          name={'password'}
          returnKeyLabel="next"
          onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
          icon={
            <MaterialCommunityIcons
              name={'form-textbox-password'}
              size={width(7)}
              color={AppColors.grey}
            />
          }
          error={errors?.password?.message}
          secureTextEntry={securePassword}
          rightSideIcon={
            securePassword ? (
              <MaterialCommunityIcons
                name={'eye-outline'}
                size={width(6)}
                color={AppColors.grey}
              />
            ) : (
              <MaterialCommunityIcons
                name={'eye-off'}
                size={width(6)}
                color={AppColors.grey}
              />
            )
          }
          onPressRightIcon={() => setSecurePassword(!securePassword)}
        />
        <InputField
          ref={confirmPasswordRef}
          title="Confirm Password"
          placeholder="• • • • • • • • • • • • • • •"
          returnKeyLabel="done"
          control={control}
          name={'ConfirmPassword'}
          icon={
            <MaterialCommunityIcons
              name={'form-textbox-password'}
              size={width(7)}
              color={AppColors.grey}
            />
          }
          error={errors?.ConfirmPassword?.message}
          secureTextEntry={secureConfirmPassword}
          rightSideIcon={
            secureConfirmPassword ? (
              <MaterialCommunityIcons
                name={'eye-outline'}
                size={width(6)}
                color={AppColors.grey}
              />
            ) : (
              <MaterialCommunityIcons
                name={'eye-off'}
                size={width(6)}
                color={AppColors.grey}
              />
            )
          }
          onPressRightIcon={() => setSecureConfirmPassword(!secureConfirmPassword)}
        />
        {backendError ? (
          <SmallText
            size={3.4}
            color={AppColors.red}
            textStyles={CommonStyles.marginBottom_1}
          >
            {backendError}
          </SmallText>
        ) : null}
        <Button
          onPress={handleSubmit(onSubmit)}
          text={'Register'}
          disabled={!isValid}
        />
        <View style={styles.footerStyle}>
          <SmallText>Already have an account</SmallText>
          <Button
            onPress={() => navigation.navigate(ScreenNames.LOGIN)}
            text={'Login'}
            buttonStyle={styles.signUpButtonStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;
