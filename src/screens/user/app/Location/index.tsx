import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  LargeText,
  LocationSelector,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import ScreenNames from '../../../../navigation/routes';
import styles from './styles';

const Location = ({ navigation }: any) => {
  const [location, setLocation] = useState()
  const [enableButton, setEnableButton] = useState(true)
  const onSubmitHandle = (data: any, detail: any) => {
    setLocation(data.description);
    setEnableButton(false)
  }

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader 
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>Search Location</LargeText>}
        />
      )}
      footerUnScrollable={() => (
        <Button
        disabled={enableButton}
          text='Continue'
          buttonStyle={styles.btn}
          onPress={() => navigation.navigate(ScreenNames.SENDOFFER, {location : location})}
        />
      )}>
      <View style={styles.container}>
        <LocationSelector
          fetchDetails={true}
          onPress={onSubmitHandle}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Location;
