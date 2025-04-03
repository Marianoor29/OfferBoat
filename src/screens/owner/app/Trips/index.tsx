import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { Socket, io } from 'socket.io-client';
import { logo } from '../../../../assets/images';
import { AppLoader, HeaderTab, LargeText, OwnerHeader, ScreenWrapper, TripOrders, WelcomeCard } from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { fetchOwnerBookings, removeOwnerBooking, updateOwnerBooking } from '../../../../redux/slice/ownerTripSlice/ownerTripsSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import { ORDER_STATUSES } from '../../../../utills/enum';
import styles from './styles';

interface Booking {
  _id: string;
  date: string;
  time: string;
  status: string;
  location: string;
  userId: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    location: string;
    rating: number;
  };
  listingId: {
    location: string;
    title: string;
    images: string[]
  };
  ownerId :{
    firstName: string;
    lastName: string;
    profilePicture: string;
    rating: number;
    location: string;
  };
  packages: {
    price: number;
  }[];
}

interface OwnerTripsScreenProps {
  navigation: any;
}

const OwnerTripsScreen: React.FC<OwnerTripsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector((state: RootState) => state.ownerTrips); 
  const [currentTabArray, setCurrentTabArray] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(15); 
  const [totalPagesCurrent, setTotalPagesCurrent] = useState<number>(0);
  const [totalPagesPrevious, setTotalPagesPrevious] = useState<number>(0); 
  const [paginatedCurrentTrips, setPaginatedCurrentTrips] = useState<Booking[]>([]);
  const [paginatedPreviousTrips, setPaginatedPreviousTrips] = useState<Booking[]>([]);
  const [selectedTopTab, setSelectedTopTab] = useState<string>("Current Trips");
  const tabBarHeight = useBottomTabBarHeight();
  const flatListRef = useRef<FlatList<Booking>>(null); 
  const socketRef = useRef<Socket | null>(null);
  const userData = useAppSelector((state: RootState) => state.user); 
  const  userId = userData._id
  const userType = userData.userType
  const tabs = [
    { id: 1, name: "Current Trips" },
    { id: 2, name: "Previous Trips" },
  ];

  const onPressTab = (state: string) => {
    setSelectedTopTab(state);
    filterTabArray(state, bookings);
    setCurrentPage(1); // Reset page to 1 on tab change
  };

 useEffect(() => {
  const initializeSocket = async () => {
     // Ensure any existing socket connection is closed before initializing a new one
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

        socketRef.current.on('message', (message) => {
          // Handle incoming messages based on their type
          if ( message.type === 'NEW_BOOKING_REQUEST' || message.type === 'BOOKING_STATUS_UPDATE') {
            const updatedBooking = message.booking;
        
                // Update the Redux store directly with the updated booking
                dispatch(updateOwnerBooking(updatedBooking)); 
        
                if (userId) {
                  dispatch(fetchOwnerBookings(userId)); // Refetch the bookings
                }
              } else if ( message.type === 'REMOVE_BOOKING') {
                const removeBooking = message.booking;
                dispatch(removeOwnerBooking(removeBooking));
              }  else if (message.type === 'BOOKING_COMPLETED') {
                dispatch(fetchOwnerBookings(userId)); // Refetch the bookings
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
}, [userId]);

 useEffect(() => {
  if (userId) {
    dispatch(fetchOwnerBookings(userId)); // Fetch bookings only initially
  }
}, [userId, dispatch, bookings.length]);

  const filterTabArray = (tab: string, bookingsData: Booking[]) => {
    let filteredArray: Booking[];
    if (tab === "Current Trips") {
      filteredArray = bookingsData.filter(
        (item: Booking) =>
          item.status === ORDER_STATUSES.CONFIRMED ||
          item.status === ORDER_STATUSES.PENDING
      );
      setTotalPagesCurrent(Math.ceil(filteredArray.length / pageSize));
      setPaginatedCurrentTrips(filteredArray.slice(0, pageSize));
    } else {
      filteredArray = bookingsData.filter(
        (item: Booking) =>
          item.status === ORDER_STATUSES.CANCELLED ||
          item.status === ORDER_STATUSES.COMPLETED
      );
      setTotalPagesPrevious(Math.ceil(filteredArray.length / pageSize));
      setPaginatedPreviousTrips(filteredArray.slice(0, pageSize));
    }
    setCurrentTabArray(filteredArray);
  };

  useEffect(() => {
    filterTabArray(selectedTopTab, bookings);
  }, [bookings, selectedTopTab]);

  useEffect(() => {
    if (selectedTopTab === "Current Trips") {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedCurrentTrips(currentTabArray.slice(startIndex, endIndex));
    } else {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedPreviousTrips(currentTabArray.slice(startIndex, endIndex));
    }
  }, [currentPage, currentTabArray, selectedTopTab]);

  useEffect(() => {
    // Scroll to top when page changes
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [currentPage, selectedTopTab]);

  const renderItem: ListRenderItem<Booking> = ({ item }) => {
    const ownerImage = item.userId.profilePicture;
    return (
      <TripOrders
        date={item.date}
        ownerName={`${item.userId.firstName} ${item.userId.lastName}`}
        address={item?.location}
        price={item.packages[0].price}
        time={item.time}
        image={ownerImage}
        buttonColor={AppColors.green}
        rating={item.userId.rating}
        statusView={item.status}
        onPressDetails={() =>
          navigation.navigate(OwnerScreenNames.OWNERTRIPDETAILS, {
            trip: item,
            ownerImage: ownerImage,
            userType: userType,
          })
        }
      />
    );
  };

  const renderPageControls = (totalPages: number) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
      <View style={styles.pageControlContainer}>
        {pages.map(page => (
          <TouchableOpacity
            key={page}
            style={[styles.pageButton, currentPage === page && styles.activePageButton]}
            onPress={() => {
              setCurrentPage(page);
              if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
              }
            }}
          >
            <LargeText size={4}>{page}</LargeText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderEmptyState = (tab: string) => {
    return (
      <View style={styles.emptyView}>
        <LottieView
          source={require('../../../../assets/gif/Sorry.json')}
          style={styles.animatedImageStyle}
          autoPlay
          loop={true}
        />
        <LargeText size={3.4}>
          {tab === "Current Trips"
            ? `You Don't Have Any Trips Yet!`
            : 'You have no previous trips yet!'}
        </LargeText>
      </View>
    );
  };

  const currentTabHasBookings = currentTabArray.length > 0;
  const hasCurrentTrips = bookings.some(
    (item: Booking) =>
      item.status === ORDER_STATUSES.CONFIRMED ||
      item.status === ORDER_STATUSES.PENDING
  );
  const hasPreviousTrips = bookings.some(
    (item: Booking) =>
      item.status === ORDER_STATUSES.CANCELLED ||
      item.status === ORDER_STATUSES.COMPLETED
  );

  const renderErrorState = () => (
    <View style={styles.emptyView}>
      <LargeText size={3.4}>{error}</LargeText>
    </View>
  );

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
      )}}
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
        {error ? renderErrorState() : (hasCurrentTrips || hasPreviousTrips ? (
          <>
            <HeaderTab
              tabs={tabs}
              selectedTopTab={selectedTopTab}
              onPress={onPressTab}
              selectedTabColor={AppColors.green}
            />
            <View style={{ paddingBottom: tabBarHeight, width: width(100) }}>
              <FlatList
                ref={flatListRef}
                data={selectedTopTab === "Current Trips" ? paginatedCurrentTrips : paginatedPreviousTrips}
                contentContainerStyle={styles.flatList}
                renderItem={renderItem}
                keyExtractor={(item: Booking) => item._id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={selectedTopTab === "Current Trips" ? renderPageControls(totalPagesCurrent) : renderPageControls(totalPagesPrevious)}
                ListEmptyComponent={() => renderEmptyState(selectedTopTab)}
              />
            </View>
          </>
        ) : (
          renderEmptyState(selectedTopTab)
        ))}
      </View>
        )}
    </ScreenWrapper>
  );
};

export default OwnerTripsScreen;
