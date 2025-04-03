import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Platform, RefreshControl, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { Socket, io } from 'socket.io-client';
import { logo } from '../../../../assets/images';
import {
  AppLoader,
  Header,
  LargeText,
  OfferCard,
  ScreenWrapper,
  TopDestinationCard
} from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { setUserData } from '../../../../redux/slice/user/userSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import {
  fetchRentersData
} from '../../../../utills/CommonFunctions';
import { height, width } from '../../../../utills/Dimension';
import { TopDestinationList } from '../../../../utills/enum';
import { getFcmToken, updateFcmToken } from '../../../../utills/notificationService';
import styles from './styles';

const LIMIT = 40;

const RentersHome = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const userData = useAppSelector((state: RootState) => state.user);
  const filterState = useAppSelector((state: RootState) => state.filter); 
  const socketRef = useRef<Socket | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dataProvider = new DataProvider((r1, r2) => r1._id !== r2._id).cloneWithRows(offers);
  const layoutProvider = new LayoutProvider(
    (index) => 'DEFAULT',
    (type, dim) => {
      dim.width = width(100);
      dim.height = Platform.OS === 'ios' ? height(32) : height(35);
    }
  );

  useFocusEffect(
    useCallback(() => {
      fetchRentersData(setUserId, dispatch, setUserData);
    }, [userId])
  );

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/listing/listingsWithLocationForHome`, {
        params: {
          location: 'Miami',
          limit: LIMIT,
          userId: userId,
          ...filterState
        },
      });
      setOffers(response.data.listings);
    } catch (error) {
      setErrorMessage('No boats found in Miami or nearby locations!');
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [filterState]); 
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOffers();
    setRefreshing(false);
  };

  useEffect(() => {
    const initializeSocket = async () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (userId) {
        try {
          // Retrieve the token from AsyncStorage
          const token = await AsyncStorage.getItem('token');
          // Initialize Socket.IO connection
          socketRef.current = io(`${apiUrl}`, {
            query: { ownerId: userId, token },
            transports: ['websocket'], // You can add other transports if needed
          });

          socketRef.current.on('message', async (message) => {
            const cityName = message.listing.location;
            if (cityName == 'Miami' && message.type === 'LISTINGS_DELETE') {
              await onRefresh();
            }
          });
        } catch (error) {
          console.log('Error retrieving token from AsyncStorage:', error);
        }
      }
    };

    initializeSocket();
    // Cleanup function to disconnect the socket on component unmount or dependency change
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, dispatch]);

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        if (userId) {
          const fcmToken = await getFcmToken();
          if (fcmToken) {
            await updateFcmToken(userId);
          }
          const unsubscribe = messaging().onTokenRefresh(newToken => {
            updateFcmToken(userId);
          });

          return () => unsubscribe();
        }
      }
      initialize();
    }, [userId]));

  useFocusEffect(
    useCallback(() => {
      const refreshOffers = async () => {
        if (route.params?.refresh) {
          await onRefresh();
          navigation.setParams({ refresh: false });
        }
      };

      refreshOffers();
    }, [route.params?.refresh])
  );

  const renderGalleryItem = (type : any, item: any) => {
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

  const renderTopDestinationItems = ({ item }: any) => (
    <TopDestinationCard
      title={item.title}
      source={item.source}
      onPress={() => navigation.navigate(ScreenNames.TOPDESTINATIONDETAILS, { TopDestination: item, type: "TopDestination" })}
    />
  );

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          userData.token ? (
            <Header
              source={logo}
              onPressFirstIcon2={() => navigation.navigate(ScreenNames.NOTIFICATION, { userType: 'BoatRenter' })}
              onPressFirstIcon1={() => navigation.navigate(ScreenNames.SEARCH)}
            />
          ) : (
            <Header
              source={logo}
              onPressFirstIcon1={() => navigation.navigate(ScreenNames.SEARCH)}
            />
          )
        )
      }}
    >
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        <View style={styles.topFlatListStyles}>
          <LargeText size={3} textStyles={styles.headingStyle}>Top destinations</LargeText>
          <FlatList
            data={TopDestinationList}
            renderItem={renderTopDestinationItems}
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.productContainer}
          />
        </View>
        <View style={styles.bottomFlatListStyles}>
          <LargeText size={3} textStyles={styles.headingStyle}>Boats in Miami</LargeText>
          {loading ? (
            <View style={styles.emptyView}>
              <AppLoader isLoader={loading} />
            </View>
          ) : offers.length === 0 ? (
            <View style={styles.emptyView}>
              <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
              <LargeText size={4}>{errorMessage || 'No Offers Found'}</LargeText>
            </View>
          ) : (
            <RecyclerListView
            style={{ flex: 1, width: '100%', height: '100%' }}
              layoutProvider={layoutProvider}
              dataProvider={dataProvider}
              rowRenderer={renderGalleryItem}
              scrollViewProps={{
                refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }}
              renderFooter={() => (
                <TouchableOpacity onPress={onRefresh} style={styles.reloadButton}>
                <LargeText size={3} >Reload Offers</LargeText>
              </TouchableOpacity>
              )
              }
            />
          )}
        </View>
        <View style={styles.filterView}>
          <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.FILTER)}
            style={styles.filter} activeOpacity={0.8}>
            <Icon name="filter" size={width(5)} color={AppColors.white} />
            <LargeText size={2.8} color={AppColors.white}>Filter</LargeText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default RentersHome;
