import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { logo } from '../../../../assets/images';
import { AppLoader, Button, LargeText, OfferCard, OwnerHeader, ScreenWrapper, WelcomeCard } from '../../../../components';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { fetchOwnerListings, selectError, selectListings, selectLoading } from '../../../../redux/slice/listingsSlice/listingsSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import styles from './styles';
import { RootState } from '../../../../redux/store';

const OwnerListingScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const listings = useAppSelector(selectListings);
  const loading = useAppSelector(selectLoading);
  const errorMessage = useAppSelector(selectError);
  const userData = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userData._id){
    dispatch(fetchOwnerListings());
    }
    }, [dispatch, userData._id])

    useFocusEffect(
      useCallback(() => {
      if (route.params?.refresh) {
        dispatch(fetchOwnerListings());
        navigation.setParams({ refresh: false });
      }
    }, [route.params?.refresh]))

  const renderOfferItem = ({ item }: any) => {   
    const imagesWithBaseURL = item.images.map((image: any) => `${image}`); 
    const ownerImage = item.ownerId?.profilePicture;
    return (
      <OfferCard
        images={imagesWithBaseURL}
        blockedView={item.status === 'Blocked' ? true : false}
        boatOwnerImage={ownerImage}
        title={item.title}
        description={item.description}
        location={item.location}
        members={item.numberOfPassengers}
        buttonTitle="View Details"
        ButtonColor={AppColors.green}
        onPressImage={() => navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: item, ownerImage: ownerImage , type: 'Listing'})}
        onPress={() => navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: item, ownerImage: ownerImage , type: 'Listing'})}
      />
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          userData.token ? (
            <OwnerHeader
              source={logo}
              onPressFirstIcon1={() => navigation.navigate(ScreenNames.NOTIFICATION, {userType : 'BoatOwner'})}
              onPressFirstIcon2={() => navigation.navigate(OwnerScreenNames.OWNERLOCATIONSCREEN,{type : 'addLocation'})}
            /> 
          ) : (
            <></>
          )
        );
      }}
    >
         {!userData.token ? (
            <WelcomeCard
            subTitle='Create an account or sign in to showcase your boat, reach more customers, and start earning today!'
            onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
            btnColor={AppColors.green}
            />
        ) : (
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        {!loading && listings.length === 0 ? (
          <View style={styles.emptyView}>
            <LottieView
              source={require('../../../../assets/gif/Sorry.json')}
              style={styles.animatedImageStyle}
              autoPlay
              loop
            />
            <LargeText size={3.4} textStyles={CommonStyles.marginBottom_1}>{errorMessage ? errorMessage : `You Don't Have Any Listing Yet!`}</LargeText>
            <Button text='Add Listing' buttonStyle={styles.buttonStyle} onPress={() => navigation.navigate(OwnerScreenNames.OWNERLOCATIONSCREEN,{type : 'addLocation'})}/>
          </View>
        ) : (
          <FlatList
            data={listings}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
        )}
    </ScreenWrapper>
  );
};

export default OwnerListingScreen;
