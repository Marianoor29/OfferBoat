import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { logo } from '../../../../assets/images';
import {
  AppLoader,
  Button,
  Header,
  LargeText,
  ListCard,
  LocationSelector,
  OwnerHeader,
  ScreenWrapper
} from '../../../../components';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { getAllOffers } from '../../../../redux/slice/offerSlice/customOffersSlice';
import { setUserData } from '../../../../redux/slice/user/userSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { fetchRentersData } from '../../../../utills/CommonFunctions';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

interface Offer {
  userImage: string;
  renterName: string;
  date: string;
  time: string;
  tripInstructions: string;
  hours: string;
  captain: boolean;
  passengers: number;
  location: string;
  rating: number;
  price: string;
  status: string;
  createdAt: string;
}

const OwnerOfferScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState('');
  const [filteredListing, setFilteredListing] = useState<Offer[]>([]);
  const locationRef = useRef<GooglePlacesAutocompleteRef>(null);
  const userData = useAppSelector((state: RootState) => state.user);
  const {offers, loading} = useAppSelector((state: RootState) => state.customOffers); 
  const [userId, setUserId] = useState('');
  const ownerId = userData._id;

  useFocusEffect(
    useCallback(() => {
      fetchRentersData(setUserId, dispatch, setUserData);
    }, [userId])
  );

  const getCityName = (location?: string) => {
    if (location && typeof location === 'string') {
      return location.split(',')[0].toLowerCase().trim();
    }
    return ''; 
  };
  
  const ownerCity = getCityName(userData.location); 
  const ownerLocation = userData.location ? ownerCity : 'Miami'

  const clearFilter = () => {
    setLocation('');
    if (locationRef.current) {
      locationRef.current.clear();
    }
    setFilteredListing(offers.filter((item: any) => getCityName(item.location).includes(ownerLocation)));
    dispatch(getAllOffers({ ownerId, location : ownerLocation}));
  };

  useEffect(() => {
    if (location) {
      setFilteredListing(
        offers.filter((item: any) => getCityName(item.location).includes(getCityName(location)))
      );
    } else {
      setFilteredListing(offers.filter((item: any) => getCityName(item.location).includes(ownerLocation)));
    }
  }, [location, offers, ownerLocation]);

useFocusEffect(
  useCallback(() => {
  if (route.params?.refresh) {
    dispatch(getAllOffers({ ownerId, location: location }));
    navigation.setParams({ refresh: false });
  }
}, [route.params?.refresh]))

  useEffect(() => {
      const fetchData = async () => {
        if (!location) { 
          setLocation(ownerLocation); 
        }
        await dispatch(getAllOffers({ ownerId, location }));
      };
      fetchData();
    }, [ownerId, location, dispatch])

  const renderOfferItem = ({ item }: any) => {
    const userDetails = item.userId;
    const userProfilePicture = userDetails.profilePicture;
    return (
      <ListCard
        userImage={userProfilePicture}
        renterName={`${userDetails.firstName} ${userDetails.lastName}`}
        date={item.date}
        time={item.time}
        tripInstructions={item.tripInstructions}
        hours={item.hours}
        captain={item.captain}
        passengers={item.numberOfPassenger}
        location={item.location}
        rating={userDetails.rating}
        price={item.price}
        userImageStyle={styles.userImageStyle}
        onPressImage={() => navigation.navigate(OwnerScreenNames.RENTERPROFILE,  { userId: item.userId , type: 'Offer'})}
        onPress={() => navigation.navigate(OwnerScreenNames.SELECTLIST, { offer: item })}
        buttonTitle={'Offer Your Boat'}
      />
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <>
            {userData.token ? (
             <OwnerHeader
             source={logo}
             iconName='grading'
             SecondIconTitle='Submitted Boats'
             onPressFirstIcon1={() => navigation.navigate(ScreenNames.NOTIFICATION, {userType : 'BoatOwner'})}
             onPressFirstIcon2={() => navigation.navigate(OwnerScreenNames.SUBMITTEDBOATS, {ownerId : ownerId})}
           />
          ) : (
            <Header
            source={logo} 
            />
          )}
            <View style={styles.locationView}>
              <LocationSelector
                fetchDetails={true}
                onPress={(data) =>  setLocation(data.description)}
                containerWidth={width(80)}
                textInputBackgroundColor={AppColors.white}
                listcontainerWidth={width(70)}
                ref={locationRef}
              />
              <Button
                text='Clear Filter'
                onPress={clearFilter}
                buttonStyle={styles.createOfferButton}
              />
            </View>
          </>
        );
      }}
    >
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        {!loading && filteredListing.length === 0 ? (
          <View style={styles.emptyView}>
            <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop />
            <LargeText size={3.4}>{offers.length === 0 && 'No offers found in this area.'}</LargeText>
          </View>
        ) : (
          <FlatList
            data={filteredListing}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default OwnerOfferScreen;