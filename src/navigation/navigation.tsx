import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Loader } from '../components';
import { initializeAuth } from '../redux/slice/auth/authSlice';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/store/hook';
import { PrivacyPolicy, SelectType, Splash, TermsConditions } from '../screens/auth';
import { AddFeatures, AddOffer, AddRules, EditOffer, EditOwnerCoverPicture, EditOwnerProfilePicture, FeatureList, ImageSelection, OwnerOfferDetails, OwnerTripDetails, OwnersLocationScreen, RenterProfile, SelectList, SendListing, SubmittedBoats } from '../screens/owner/app';
import OwnerFAQ from '../screens/owner/app/FAQ';
import { Booking, CustomOffers, EditProfilePicture, Filter, FullFeatureList, GetHelp, LeaveRating, LinkOfferDetails, Location, OfferDetails, OwnerProfile, Reviews, Search, SendOffer, TopDestinationDetails, Transaction, TransactionDetails, TripDetails } from '../screens/user/app';
import FAQ from '../screens/user/app/FAQ';
import Notification from '../screens/user/app/Notification';
import MyTabs from './bottom';
import OwnerTab from './ownerBottom';
import OwnerScreenNames from './ownerRoutes';
import ScreenNames from './routes';
import SharedScreens from './sharedScreens';
import { RootStackParamList } from './types';

type MainNavigationProps = {
  setNavigationRef: (ref: NavigationContainerRef<RootStackParamList> | null) => void;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = ({ setNavigationRef }: MainNavigationProps) => {
  const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    setNavigationRef(navigationRef.current);
  }, [navigationRef, setNavigationRef]);

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeAuth());
      } catch (error) {
        console.log('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [dispatch]);

  const linking = {
    prefixes: ['https://www.offerboat.com/'], 
    config: {
          screens: {
            [ScreenNames.LINKOFFERDETAILS]: 'app/:offerId', 
          },
    },
  };
  

  return (
    <NavigationContainer ref={navigationRef} linking={linking} >
      <Loader />
      {!auth.userType ? (
        <Stack.Navigator
          initialRouteName={ScreenNames.SPLASH}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={ScreenNames.SPLASH} component={Splash} />
          <Stack.Screen name={ScreenNames.SELECTTYPE} component={SelectType} />
          <Stack.Screen name={ScreenNames.LINKOFFERDETAILS} component={LinkOfferDetails} />
          <Stack.Screen name={ScreenNames.SHAREDSCREENS} component={SharedScreens} />
          <Stack.Screen name={ScreenNames.SENDOFFER} component={SendOffer} />
          <Stack.Screen name={ScreenNames.BOOKING} component={Booking} />
        </Stack.Navigator>
      ) : (
        auth.userType === 'BoatRenter' ? (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ScreenNames.HOMEBASE}>
            <Stack.Screen name={ScreenNames.HOMEBASE} component={MyTabs} />
            <Stack.Screen name={ScreenNames.NOTIFICATION} component={Notification} />
            <Stack.Screen name={ScreenNames.SEARCH} component={Search} />
            <Stack.Screen name={ScreenNames.TOPDESTINATIONDETAILS} component={TopDestinationDetails} />
            <Stack.Screen name={ScreenNames.OFFERDETAILS} component={OfferDetails} />
            <Stack.Screen name={ScreenNames.REVIEWS} component={Reviews} />
            <Stack.Screen name={ScreenNames.FULLFEATURELIST} component={FullFeatureList} />
            <Stack.Screen name={ScreenNames.SENDOFFER} component={SendOffer} />
            <Stack.Screen name={ScreenNames.TRIPDETAILS} component={TripDetails} />
            <Stack.Screen name={ScreenNames.LEAVERATING} component={LeaveRating} />
            <Stack.Screen name={ScreenNames.TRANSACTION} component={Transaction} />
            <Stack.Screen name={ScreenNames.TRANSACTIONDETAILS} component={TransactionDetails} />
            <Stack.Screen name={ScreenNames.EDITPROFILEPICTURE} component={EditProfilePicture} />
            <Stack.Screen name={ScreenNames.OWNERPROFILE} component={OwnerProfile} />
            <Stack.Screen name={ScreenNames.BOOKING} component={Booking} />
            <Stack.Screen name={ScreenNames.LOCATION} component={Location} />
            <Stack.Screen name={ScreenNames.CUSTOMOFFERS} component={CustomOffers} />
            <Stack.Screen name={OwnerScreenNames.OWNEROFFERDETAILS} component={OwnerOfferDetails} />
            <Stack.Screen name={ScreenNames.GETHELP} component={GetHelp} />
            <Stack.Screen name={ScreenNames.TERMCONDITION} component={TermsConditions} />
          <Stack.Screen name={ScreenNames.PRIVACYPOLICY} component={PrivacyPolicy} />
          <Stack.Screen name={ScreenNames.FAQ} component={FAQ} />
          <Stack.Screen name={ScreenNames.SHAREDSCREENS} component={SharedScreens} />
          <Stack.Screen name={ScreenNames.LINKOFFERDETAILS} component={LinkOfferDetails} />
          <Stack.Screen name={ScreenNames.FILTER} component={Filter} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={OwnerScreenNames.HOMEBASE}>
            <Stack.Screen name={OwnerScreenNames.HOMEBASE} component={OwnerTab} />
            <Stack.Screen name={OwnerScreenNames.ADDOFFER} component={AddOffer} />
            <Stack.Screen name={OwnerScreenNames.IMAGESELECTION} component={ImageSelection} />
            <Stack.Screen name={OwnerScreenNames.ADDFEATURES} component={AddFeatures} />
            <Stack.Screen name={OwnerScreenNames.ADDRULES} component={AddRules} />
            <Stack.Screen name={OwnerScreenNames.OWNEROFFERDETAILS} component={OwnerOfferDetails} />
            <Stack.Screen name={OwnerScreenNames.EDITOFFER} component={EditOffer} />
            <Stack.Screen name={OwnerScreenNames.FEATURELIST} component={FeatureList} />
            <Stack.Screen name={OwnerScreenNames.OWNERTRIPDETAILS} component={OwnerTripDetails} />
            <Stack.Screen name={ScreenNames.NOTIFICATION} component={Notification} />
            <Stack.Screen name={OwnerScreenNames.RENTERPROFILE} component={RenterProfile} />
            <Stack.Screen name={OwnerScreenNames.SUBMITTEDBOATS} component={SubmittedBoats} />
            <Stack.Screen name={ScreenNames.LEAVERATING} component={LeaveRating} />
            <Stack.Screen name={ScreenNames.TRANSACTIONDETAILS} component={TransactionDetails} />
            <Stack.Screen name={ScreenNames.EDITPROFILEPICTURE} component={EditProfilePicture} />
            <Stack.Screen name={ScreenNames.REVIEWS} component={Reviews} />
            <Stack.Screen name={OwnerScreenNames.OWNERLOCATIONSCREEN} component={OwnersLocationScreen} />
            <Stack.Screen name={OwnerScreenNames.SELECTLIST} component={SelectList} />
            <Stack.Screen name={ScreenNames.SEARCH} component={Search} />
            <Stack.Screen name={OwnerScreenNames.SENDLISTING} component={SendListing} />
            <Stack.Screen name={OwnerScreenNames.OWNEREDITPROFILEPICTURE} component={EditOwnerProfilePicture} />
            <Stack.Screen name={OwnerScreenNames.OWNEREDITCOVERPICTURE} component={EditOwnerCoverPicture} />
            <Stack.Screen name={ScreenNames.GETHELP} component={GetHelp} />
            <Stack.Screen name={ScreenNames.TERMCONDITION} component={TermsConditions} />
          <Stack.Screen name={ScreenNames.PRIVACYPOLICY} component={PrivacyPolicy} />
          <Stack.Screen name={OwnerScreenNames.OWNERFAQ} component={OwnerFAQ} />
          <Stack.Screen name={ScreenNames.SHAREDSCREENS} component={SharedScreens} />
          <Stack.Screen name={ScreenNames.SENDOFFER} component={SendOffer} />
          <Stack.Screen name={ScreenNames.BOOKING} component={Booking} />
          <Stack.Screen name={ScreenNames.LINKOFFERDETAILS} component={LinkOfferDetails} />
          </Stack.Navigator>
        )
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
