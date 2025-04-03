import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { logo } from '../../../../assets/images';
import {
  AppLoader,
  Button,
  Header,
  LargeText,
  ListCard,
  ScreenWrapper,
  TripOrders,
  WelcomeCard
} from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

interface CustomOffer {
  createdAt: string | number | Date;
  userId: string;
  location: string;
  date: string;
  time: string;
  price: string;
  tripInstructions: string;
  numberOfPassenger: number;
  hours: string;
  captain: boolean;
  status?: string;
  userImage?: string;
  userName?: string;
  userRating?: number;
}

const Offer = ({ navigation, route }: any) => {
  const [customOffers, setCustomOffers] = useState<CustomOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bookings, setBookings] = useState([]);
  const userData = useAppSelector((state: RootState) => state.user);
  const userId = userData._id
  const baseURL = apiUrl

  const renderItem = ({ item }: any) => {
    const ownerImage = item?.ownerId?.profilePicture;
    return (
      <TripOrders
        date={item.date}
        ownerName={`${item.ownerId.firstName} ${item.ownerId.lastName}`}
        address={item?.location}
        price={item.packages[0].price}
        time={item.time}
        image={ownerImage}
        statusView={item.status}
        rating={item.ownerId.rating}
        onPressDetails={() => navigation.navigate(ScreenNames.TRIPDETAILS, { trip: item, ownerImage: ownerImage })}
      />
    );
  };

  const fetchPendingBookings = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/pendingBookings/${userId}`);
      if (response.data && Array.isArray(response.data.populatedBookings)) {
        const sortedBookings = response.data.populatedBookings.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBookings(sortedBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomOffer = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/customOffers/${userId}`);
      if (response.data && Array.isArray(response.data)) {
        const sortedOffers = response.data.sort(
          (a: CustomOffer, b: CustomOffer) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCustomOffers(sortedOffers);
      } else {
        setCustomOffers([]);
        setErrorMessage('No custom offers found.');
      }
    } catch (error) {
      setCustomOffers([]);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useFocusEffect(
    useCallback(() => {
    if (userId) {
      fetchCustomOffer(userId);
      fetchPendingBookings(userId);
    }
  }, [userId]));

  const renderOfferItem = ({ item }: any) => {
    const userImage = userData.profilePicture;
    return (
      <ListCard
        userImage={userImage}
        renterName={`${userData.firstName} ${userData.lastName}`}
        date={item.date}
        time={item.time}
        tripInstructions={item.tripInstructions}
        hours={item.hours}
        captain={item.captain}
        passengers={item.numberOfPassenger}
        location={item.location}
        rating={userData.rating}
        price={item.price}
        ButtonStyles={styles.offersButton}
        seeMoreTextColor={AppColors.secondaryRenter}
        onPress={() => navigation.navigate(ScreenNames.CUSTOMOFFERS, { offer: item, userData: userData, userImage: userImage,})}
        buttonTitle={'Check Details'}
      />
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          userData.token && (
          <Header
            source={logo}
            onPressFirstIcon2={() => navigation.navigate(ScreenNames.NOTIFICATION, { userType: 'BoatRenter' })}
          />
        )
        );
      }}
    >
        {!userData.token ? (
            <WelcomeCard
            onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
            />
        ) : (
        <View style={styles.container}>
        <AppLoader isLoader={loading} />
        {bookings.length > 0 && (
          <>
            <LargeText size={3} textStyles={styles.bookingsHeading}>Your Bookings Requests</LargeText>
            <FlatList
              data={bookings}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.bookingListView}
            />
          </>
        )}
        {customOffers.length > 0 && (
          <>
            <LargeText size={3} textStyles={styles.heading}>Your Custom Offers</LargeText>
            <FlatList
              data={customOffers}
              renderItem={renderOfferItem}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </>
        )}
        {customOffers.length === 0 && bookings.length === 0 && (
          <View style={styles.emptyView}>
            <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
            <LargeText size={3.4}>{errorMessage ? errorMessage : 'You have no offers yet!'}</LargeText>
            <Button text='Make Offer' onPress={() => navigation.navigate(ScreenNames.MAKEOFFER)}
              buttonStyle={styles.offerButton} />
          </View>
        )}
      </View>
    )}
    </ScreenWrapper>
  );
};

export default Offer;
