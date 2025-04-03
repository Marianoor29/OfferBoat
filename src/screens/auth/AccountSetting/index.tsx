import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, TextInput, View } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  HeaderTab,
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
import { setUserData } from '../../../redux/slice/user/userSlice';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { accountSchema } from '../../../utills/validationSchemas';
import DeleteAccount from './deleteAccount';
import ResetPassword from './resetPassword';
import styles from './styles';

type FormValues = {
  firstName: string;
  lastName: string;
};

const tabs = [
  { id: 1, name: "User Info" },
  { id: 2, name: "Password" },
  { id: 3, name: "Delete Account" },
];

const AccountSetting = ({ navigation , route}: any) => {
  const lastNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const userData = useAppSelector((state: RootState) => state.user);
  const [selectedTopTab, setSelectedTopTab] = useState<string>("User Info");
  const [errorMessage, setErrorMessage] = useState('');
  const phoneInput = useRef<any>(null); 
  const [phoneNumber, setPhoneNumber] = useState((userData?.phoneNumber || '') as string);  const modalRef = useRef<ModalHandles>(null);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
    resolver: yupResolver(accountSchema),
  });
  
  const onPressTab = (state: string) => {
    setSelectedTopTab(state);
  };

  const UpdateUserInfoHandler = async (data: FormValues)  => {
    const userInfo = {
      userId: userData._id,  
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: phoneInput.current.getValue(),
      location: route?.params?.location || userData?.location
    };
    dispatch(setAppLoader(true));
    try {
      const response = await axios.put(`${apiUrl}/updateUserInfo`, userInfo);
      if (response.data.success) {
        dispatch(setUserData({firstName: data.firstName, lastName: data.lastName, location:route?.params?.location || userData?.location, phoneNumber: phoneInput.current.getValue()}))
      setTimeout(() => {
        modalRef?.current?.show();
      },600)
    }
    } catch (error) {
      setErrorMessage('Failed to update user info. Please try again.');
    } finally {
      dispatch(setAppLoader(false));
    }
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader 
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Account Settings</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
      <HeaderTab
              tabs={tabs}
              selectedTopTab={selectedTopTab}
              onPress={onPressTab}
              selectedTabColor={AppColors.secondaryRenter}
              BtnContainer={styles.headerTab}
              mainContainer={styles.headerMainContainer}
            />
            {selectedTopTab === "User Info" ? (
              <>
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
              onSubmitEditing={() => phoneRef?.current?.focus()}
              containerStyle={styles.nameInputContainerStyle}
              textinputStyle={styles.nameInputTextStyle}
            />
          </View>
        </View>
        <View style={styles.emailField}>
          <View>
          <LargeText size={3}>Email</LargeText>
          <SmallText size={4} color={AppColors.grey}>{userData.email}</SmallText>
          </View>
          <View>
            <AntDesign name='lock' color={AppColors.grey} size={width(5)} />
          </View>
        </View>
        <PhoneInput
          ref={phoneInput}
          initialValue={phoneNumber} 
          initialCountry="us" 
          onChangePhoneNumber={setPhoneNumber} 
          style={styles.phoneInput} 
        />
        <Pressable onPress={() =>  navigation.navigate(ScreenNames.SHAREDSCREENS, {
          screen: ScreenNames.USERLOCATION,
        })} 
        style={styles.phoneInput}>
          <SmallText size={3.6}>{route?.params?.location ? route?.params?.location : userData?.location }</SmallText>
        </Pressable>
          {errorMessage ? (
        <MediumText size={3} textAlign="center" textStyles={{ color: AppColors.red }}>
          {errorMessage}
        </MediumText>
      ) : null}
        <View style={styles.btnContainer}>
        <Button
          onPress={handleSubmit(UpdateUserInfoHandler)}
          text={'Update Info'}
          buttonStyle={styles.btnStyle}
        />
        <Button
          onPress={() => navigation.goBack()}
          text={'Cancel'}
          buttonStyle={styles.btnStyle}
        />
      </View>
      <ModalWrapper
        ref={modalRef}
        onClose={() => modalRef?.current?.hide()}
        children={
          <>
            <LottieView source={require('../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
            <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>
              Your info has {'\n'} been updated
            </MediumText>
            <Button
              text='Close'
              buttonStyle={styles.closeBtn}
              onPress={() => {
                modalRef?.current?.hide()
                setTimeout(() => {
                  navigation.goBack()
                }, 600);
              }}
            />
          </>
        }
      />
      </>         
      ) :
      selectedTopTab === "Password" ?  (
       <ResetPassword 
       cancelHandler={() => navigation.goBack()}
       closeHandler={() => navigation.goBack()}
       />
      ) : (
        <DeleteAccount 
        cancelHandler={() => navigation.goBack()}
        closeHandler={() => navigation.goBack()}
        />
      )}
      </View>
    </ScreenWrapper>
  );
};

export default AccountSetting;
