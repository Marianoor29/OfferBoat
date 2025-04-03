import { SetStateAction, useState } from 'react';
import { View } from 'react-native';
import { logo } from '../../../../assets/images';
import {
  Button,
  Header,
  LargeText,
  LocationSelector,
  MediumText,
  ScreenWrapper,
  WelcomeCard
} from '../../../../components';
import ScreenNames from '../../../../navigation/routes';
import CommonStyles from '../../../../utills/CommonStyles';
import styles from './styles';
import { useAppSelector } from '../../../../redux/store/hook';
import { RootState } from '../../../../redux/store';

const MakeOffer = ({ navigation }: any) => {
  const [location, setLocation] = useState()
  const [enableButton, setEnableButton] = useState(true)
  const userData = useAppSelector((state: RootState) => state.user);
  const onSubmitHandle = (data: any, detail: any) => {
    setLocation(data.description);
    setEnableButton(false)
  }

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          userData.token && (
        <Header
          source={logo}
          onPressFirstIcon2={() => navigation.navigate(ScreenNames.NOTIFICATION, {userType : 'BoatRenter'})}
        />
      )
      );
    }}
      footerUnScrollable={() => {
        return (
          userData.token && (
        <Button
        disabled={enableButton}
          text='Continue'
          buttonStyle={styles.btn}
          onPress={() => navigation.navigate(ScreenNames.SENDOFFER, {location : location, offer : '', type: 'SendCustomOffer'})}
        />
      )
      )}}
      >
          {!userData.token ? (
            <WelcomeCard
            onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
            />
        ) : (
      <View style={styles.container}>
        <LargeText size={3} textStyles={CommonStyles.marginBottom_2}>Publish a custom offer</LargeText>
        <LocationSelector
          fetchDetails={true}
          onPress={onSubmitHandle}
        />
        <MediumText size={3.4} textAlign="justify" textStyles={styles.textStyle}>The offers published here will be public. Interested boat owners will respond by sending you details about their available boats. Check your "My Offers" tab for updates.</MediumText>
      </View>
        )}
    </ScreenWrapper>
  );
};

export default MakeOffer;
