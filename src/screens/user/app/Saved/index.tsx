import { FlatList, View, Text } from 'react-native';
import {
  AppLoader,
  LargeText,
  OfferCard,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import styles from './styles';
import { useCallback, useEffect, useState } from 'react';
import ScreenNames from '../../../../navigation/routes';
import { RootState } from '../../../../redux/store';
import axios from 'axios';
import apiUrl from '../../../../config';
import LottieView from 'lottie-react-native';
import { useAppSelector } from '../../../../redux/store/hook';

const Saved = ({ navigation, route }: any) => {
  const userData = useAppSelector((state: RootState) => state.user);
  const [savedBoats, setSavedBoats] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = userData._id || '';

  const fetchSavedListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/listing/getSavedListings/${userId}`
      );

      if (response.data.success) {
        setSavedBoats(response.data.savedListings);
        setErrorMessage('');
      } else {
        setErrorMessage(`You don't have any favorite boats yet!`);
      }
    } catch (error) {
      setErrorMessage(`You don't have any favorite boats yet!`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSavedListings();
    } else {
      setErrorMessage('You don\'t have any favorite boats yet!');
    }
  }, [userId]);

  const renderGalleryItem = (item: any) => {
    const ownerProfileImage = item.ownerId?.profilePicture;
    return (
      <OfferCard
        key={item._id}
        images={item.images}
        boatOwnerImage={ownerProfileImage}
        title={item.title}
        description={item.description}
        location={item.location}
        members={item.numberOfPassengers}
        onPress={() => handlePress(item)}
        onPressImage={() => handlePress(item)}
        maxImages={3}
      />
    );
  };

  const handlePress = useCallback((item: any) => {
    const ownerProfileImage = item.ownerId?.profilePicture;
    navigation.navigate(ScreenNames.OFFERDETAILS, {
      offer: item,
      images: item.images,
      ownerImage: ownerProfileImage,
      type: "HomeListing"
    });
  }, [navigation]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>Favorite Boats</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
        {loading ? (
          <AppLoader isLoader={loading} />
        ) : savedBoats.length > 0 ?(
          <FlatList
            data={savedBoats}
            renderItem={({ item }) => renderGalleryItem(item)}
            keyExtractor={(item, index) => String(item._id)}
          />
        ) : (
          <View style={styles.emptyView}>
            <LottieView
              source={require('../../../../assets/gif/Sorry.json')}
              style={styles.animatedImageStyle}
              autoPlay
              loop
            />
            <LargeText size={4}>{errorMessage}</LargeText>
          </View>
        )}

      </View>
    </ScreenWrapper>
  );
};

export default Saved;
