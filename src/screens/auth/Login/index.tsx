import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, InputField, LargeText, ScreenWrapper, SimpleHeader, SmallText, SocialButton } from '../../../components';
import apiUrl from '../../../config';
import ScreenNames from '../../../navigation/routes';
import { handleLogin } from '../../../redux/slice/auth/authSlice';
import { setAppLoader } from '../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { userLoginSchema } from '../../../utills/validationSchemas';
import styles from './styles';
import { setUserData } from '../../../redux/slice/user/userSlice';
import OwnerScreenNames from '../../../navigation/ownerRoutes';
import { Platform } from 'react-native';

GoogleSignin.configure({
  webClientId: "455920054389-u3k16vjv6....b01rhmon.apps.googleusercontent.com",
  iosClientId: "455920054389-vteqoh....t83.apps.googleusercontent.com",
  scopes: ['profile', 'email']
});


type FormValues = {
  email: string;
  password: string;
};

const Login = ({ navigation }: any) => {
  const passwordRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const [securePassword, setSecurePassword] = useState(true);
  const [showErrorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(userLoginSchema),
  });

  const logInMethod = async (data: FormValues) => {
    dispatch(setAppLoader(true)); 
    try {
      const emailLowercase = data.email.toLowerCase();
      const response = await axios.post(`${apiUrl}/signin`, {
        ...data,
        email: emailLowercase,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, userType } = response.data;
      await AsyncStorage.setItem('userInfo', JSON.stringify({ token, userType }));
      dispatch(handleLogin(token, userType));
      dispatch(setUserData({ token, userType, email: emailLowercase }));
      if (userType === "BoatRenter"){
        navigation.navigate(ScreenNames.HOMEBASE)
        } else {
        navigation.navigate(OwnerScreenNames.HOMEBASE)
        } 
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'An error occurred');
      } else if (error.request) {
        setErrorMessage('No response from server');
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      dispatch(setAppLoader(false));
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const firebaseUser = await auth().signInWithCredential(googleCredential);
      const firebaseIdToken = await firebaseUser.user.getIdToken();

      // Send the Firebase ID token to your backend
      const response = await axios.post(`${apiUrl}/google`, {
        token: firebaseIdToken,
      });

      const { isNewUser, firstName, lastName, email, profilePicture } = response.data;

      if (isNewUser) {
        navigation.navigate(ScreenNames.PHONENUMBER, {
          userdata: { firstName, lastName, email, profilePicture },
          type: "Google"
        });
      } else {
        const { token, userType } = response.data;
        await AsyncStorage.setItem('userInfo', JSON.stringify({ token, userType }));
        dispatch(handleLogin(token, userType));
        dispatch(setUserData(response.data));
        if (userType === "BoatRenter"){
          navigation.navigate(ScreenNames.HOMEBASE)
          } else {
          navigation.navigate(OwnerScreenNames.HOMEBASE)
          } 
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorMessage('User cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorMessage('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorMessage('Google Play Services not available');
      } else {
        setErrorMessage(`An error occurred during Google Sign-In: ${error.message}`);
      }
    }
  };

  const signInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
  
    const { identityToken, nonce, email, fullName } = appleAuthRequestResponse;
    const name = fullName ? `${fullName.givenName || ''} ${fullName.familyName || ''}`.trim() : '';
    
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const firebaseUser = await auth().signInWithCredential(appleCredential);
      const firebaseIdToken = await firebaseUser.user.getIdToken();
  
      // Send the Firebase ID token and available user details to your backend
      const response = await axios.post(`${apiUrl}/apple`, {
        token: firebaseIdToken,
        email,
        name,  
      });
  
      const { isNewUser, firstName, lastName, email: responseEmail, profilePicture } = response.data;
      if (isNewUser) {
        navigation.navigate(ScreenNames.PHONENUMBER, {
          userdata: { firstName, lastName, email: responseEmail, profilePicture },
          type: "Apple"
        });
      } else {
        const { token, userType } = response.data;
        await AsyncStorage.setItem('userInfo', JSON.stringify({ token, userType }));
        dispatch(handleLogin(token, userType));
        dispatch(setUserData(response.data));
        if (userType === "BoatRenter"){
          navigation.navigate(ScreenNames.HOMEBASE)
          } else {
          navigation.navigate(OwnerScreenNames.HOMEBASE)
          } 
      }
    }
  };
  

  return (
    <ScreenWrapper scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
        />
      )}>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <LargeText size={3.5} textStyles={CommonStyles.marginBottom_2}>Log in to your account</LargeText>
        <InputField
          title='Email'
          placeholder="Enter your email"
          control={control}
          name='email'
          keyboardType="email-address"
          returnKeyLabel="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          icon={<AntDesign name='user' size={width(7)} color={AppColors.grey} />}
          error={errors?.email?.message}
        />
        <InputField
          title='Password'
          ref={passwordRef}
          placeholder="Enter your password"
          returnKeyLabel="done"
          control={control}
          name='password'
          icon={<MaterialCommunityIcons name='form-textbox-password' size={width(7)} color={AppColors.grey} />}
          error={errors?.password?.message}
          secureTextEntry={securePassword}
          rightSideIcon={
            securePassword ? (
              <MaterialCommunityIcons name='eye-outline' size={width(6)} color={AppColors.grey} />
            ) : (
              <MaterialCommunityIcons name='eye-off' size={width(6)} color={AppColors.grey} />
            )
          }
          onPressRightIcon={() => setSecurePassword(!securePassword)}
        />
        <SmallText
          textAlign="right"
          size={3.4}
          onPress={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          color={AppColors.secondaryRenter}
          textStyles={styles.forgotPassTextStyle}
        >
          Forgot Password?
        </SmallText>
        <SmallText color={AppColors.red} size={3.4} textStyles={CommonStyles.marginBottom_1}>
          {showErrorMessage}
        </SmallText>
        <Button
          onPress={handleSubmit(logInMethod)}
          text='Login'
          disabled={!isValid}
          buttonStyle={CommonStyles.marginBottom_2}
        />
        <SocialButton source={require('../../../assets/images/google.png')} onPress={signInWithGoogle} />
        {Platform.OS === 'ios' && (
          <SocialButton
            source={require('../../../assets/images/apple.png')}
            title='Sign in with Apple'
            onPress={signInWithApple}
            iconStyle={styles.iconStyle}
          />
        )}
        <SmallText textStyles={CommonStyles.marginTop_5}>Don't have an account</SmallText>
        <Button
          onPress={() => navigation.navigate(ScreenNames.SIGNUP)}
          text='SignUp'
          buttonStyle={styles.signUpButtonStyle}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Login;
