import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountSetting, ChooseUserType, EmailVerification, ForgotPassword, LocationPermission, Login, PhoneNumber, PrivacyPolicy, ResetPassword, SignUp, TermsConditions, UserLocation } from '../screens/auth';
import { Saved } from '../screens/user/app';
import ScreenNames from './routes';

const SharedStack = createNativeStackNavigator();

const SharedScreens = () => {
  return (
    <SharedStack.Navigator screenOptions={{ headerShown: false }}>
      <SharedStack.Screen name={ScreenNames.LOGIN} component={Login} />
      <SharedStack.Screen name={ScreenNames.SIGNUP} component={SignUp} />
      <SharedStack.Screen name={ScreenNames.FORGOTPASSWORD} component={ForgotPassword} />
      <SharedStack.Screen name={ScreenNames.CHOOSEUSERTYPE} component={ChooseUserType} />
      <SharedStack.Screen name={ScreenNames.EMAILVERIFICATION} component={EmailVerification} />
      <SharedStack.Screen name={ScreenNames.RESETPASSWORD} component={ResetPassword} />
      <SharedStack.Screen name={ScreenNames.PHONENUMBER} component={PhoneNumber} />
      <SharedStack.Screen name={ScreenNames.TERMCONDITION} component={TermsConditions} />
      <SharedStack.Screen name={ScreenNames.PRIVACYPOLICY} component={PrivacyPolicy} />
      <SharedStack.Screen name={ScreenNames.ACCOUNTSETTING} component={AccountSetting} />
      <SharedStack.Screen name={ScreenNames.USERLOCATION} component={UserLocation} />
      <SharedStack.Screen name={ScreenNames.LOCATIONPERMISSION} component={LocationPermission} />
      <SharedStack.Screen name={ScreenNames.SAVED} component={Saved} />
    </SharedStack.Navigator>
  );
};

export default SharedScreens;
