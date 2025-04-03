import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { AppLoader, Button, LargeText, OfferCard, ScreenWrapper, SimpleHeader, SmallText } from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import { RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import styles from './styles';

interface Offer {
  _id: string;
  owner: string;
  location: string;
  title: string;
  description: string;
  packages: any[];
  numberOfPassengers: number;
  images: string[];
  features: string[];
  rules: string[];
  boatOwnerImage?: string; 
}

const SelectList = ({ navigation, route }: any) => {
  const data = route.params.offer;
  const [offer, setOffer] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userData = useAppSelector((state: RootState) => state.user);
  const ownerId = userData._id;
  const ownerName = `${userData.firstName} ${userData.lastName}`
  const ownerRating = userData.rating
  const ownerImage =userData.profilePicture
  const baseURL = apiUrl;

  const fetchOffers = async (currentOwnerId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/listing/listingsWithLocationForUser`, {
        params: {
          location: data.location,
          userId: currentOwnerId,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
     
      if (response.status === 200) {
        setOffer(response.data.listings);
      } else {
        setErrorMessage('Failed to fetch offers');
      }
    } catch (error) {
      setErrorMessage('No offers found!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      fetchOffers(ownerId);
    }
  }, [ownerId]);

  const renderOfferItem = ({ item }: { item: Offer }) => {
    const imagesWithBaseURL = item.images.map((image:any) => `${image}`);
    return (
      <OfferCard
        images={imagesWithBaseURL}
        boatOwnerImage={ownerImage}
        title={item.title}
        description={item.description}
        location={item.location}
        members={item.numberOfPassengers}
        buttonTitle='Send'
        ButtonColor={AppColors.green}
        onPress={() => navigation.navigate(OwnerScreenNames.SENDLISTING, {selectedListing : item, customOfferData: data,  ownerId : ownerId})}
        onPressImage={() => navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: item, ownerImage, ownerName, ownerRating, type: 'OfferDetail'})}
      />
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Select a listing to send</LargeText>}
          arrowColor={AppColors.green}
        />
      )}
    >
      <View style={styles.container}>
        {errorMessage && (
          <LargeText size={3.4} color={AppColors.red} textAlign="center" textStyles={CommonStyles.marginBottom_2}>{errorMessage}</LargeText>
        )}
        <AppLoader isLoader={loading} />
        {!loading && offer.length === 0 ? (
          <View style={styles.emptyView}>
            <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
            <LargeText size={4}>You have no listing in {data.location}!</LargeText>
            <Button text='Create a Listing' buttonStyle={styles.btnStyle}
             onPress={() => navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN)}/>
          </View>
        ) : (
          <FlatList
            data={offer}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={true}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

export default SelectList;
