import { useState } from 'react';
import { View } from 'react-native';
import { Button, LargeText, LocationSelector, ScreenWrapper, SimpleHeader } from '../../../components';
import ScreenNames from '../../../navigation/routes';
import styles from './styles';

const UserLocation = ({ navigation, route }: any) => {
  const [location, setLocation] = useState('');

  const onSubmitLocation = (data: any) => {
    setLocation(data.description);
  };

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
            text='Update'
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate(ScreenNames.ACCOUNTSETTING, {location :location})}
          />
        )}
    >
      <View style={styles.container}>
        <LocationSelector
          fetchDetails={true}
          onPress={onSubmitLocation}
          isFullAddress = {true}
        />
      </View>
    </ScreenWrapper>
  );
};

export default UserLocation;
