import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import LottieView from 'lottie-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { AppLoader, InfoCards, LargeText, ModalWrapper, ScreenWrapper, SmallText, TripOrders, WelcomeCard } from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { setUserData } from '../../../../redux/slice/user/userSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import { getFcmToken, updateFcmToken } from '../../../../utills/notificationService';
import styles from './styles';

const OwnerHome = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
    const today = format(new Date(), 'yyyy-MM-dd');
    const modalRef = useRef<ModalHandles>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [userId, setUserId] = useState('');
    const userData = useAppSelector((state: RootState) => state.user); 
    const userName = `${userData.firstName} ${userData.lastName}`;
    const userImage = userData.profilePicture;
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [numberOfNotifications, setNumberOfNotifications] = useState(0);
    const [completedBookings, setCompletedBookings] = useState<Number>(0);
    const baseURL = apiUrl;

    const fetchOwnerData = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                setUserId('');
                return;
            }
            const userResponse = await axios.get(`${baseURL}/userData`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setUserData(userResponse.data)); 
            const { _id,} = userResponse.data;
            setUserId(_id);
            const bookingsResponse = await axios.get(`${baseURL}/BookingsForOwnerHome/${_id}`);
            setTrips(bookingsResponse.data.OwnerBookings || []);
            const numberofCompletedBookings = await axios.get(`${baseURL}/getCompletedBookingsByOwner/${userId}`);
            setCompletedBookings(numberofCompletedBookings.data.completedBookings);

        } catch (error) {
            setErrorMessage(`You Don't have any bookings`)
            setTrips([]);
        } finally {
            setLoading(false);
        }
    };

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

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        modalRef?.current?.show();
    };

    const onHandleTripDetail = ({ item, ownerImage }: any) => {
        modalRef?.current?.hide();
        setTimeout(() => {
            navigation.navigate(OwnerScreenNames.OWNERTRIPDETAILS, { trip: item, ownerImage: ownerImage, userType: 'BoatOwner' });
        }, 400);
    };

    const renderTripItem = ({ item }: any) => {
        const ownerImage = item.userId.profilePicture;
        return (
            <TripOrders
                date={item.date}
                ownerName={`${item.userId.firstName} ${item.userId.lastName}`}
                address={item.location}
                price={item.packages[0].price}
                time={item.time}
                image={ownerImage}
                buttonColor={AppColors.green}
                rating={item.userId.rating}
                statusView={item.status}
                onPressDetails={() => onHandleTripDetail({ item, ownerImage })}
            />
        );
    };

  
    const fetchNumberOfNotifications = async () => {
        try {
          const response = await axios.get(`${apiUrl}/notification/countUnreadNotifications/${userId}`);
          if (response.status === 200) {
            setNumberOfNotifications(response.data.count);
          } else {
            console.log('Failed to fetch notification count:', response.status);
          }
        } catch (error) {
          console.log('Error fetching notification count:', error);
        }
      };

    useFocusEffect(
      useCallback(() => {
        const checkPermissions = async () => {
          await fetchOwnerData();
          await fetchNumberOfNotifications();
        };
        checkPermissions();
      }, [userId])
    );

    // Filter trips by status
    const pendingTrips = trips.filter((trip: any) => trip.status === 'Pending');
    const upcomingTrips = trips.filter((trip: any) => trip.status === 'Accepted');

    // Filter trips by selected date
    const formattedSelectedDate = selectedDate ? format(parseISO(selectedDate), 'dd-MM-yyyy') : null;
    const tripsBySelectedDate = formattedSelectedDate ? trips.filter((trip: any) => trip.date === formattedSelectedDate) : [];

    return (
        <ScreenWrapper
            scrollEnabled
            statusBarColor={AppColors.transparent}
            barStyle='light-content'
            translucent={true}
        >
            {!userData.token ? (
            <WelcomeCard
            subTitle='Create an account or sign in to showcase your boat, reach more customers, and start earning today!'
            onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
            btnColor={AppColors.green}
            />
        ) : (
            <View style={styles.container}>
                <Image source={{ uri: 'https://st2.depositphotos.com/2760050/11954/i/450/depositphotos_119546210-stock-photo-yacht-floating-on-green-water.jpg' }} style={styles.image} />
                <View style={styles.topIconsView}>
                    <Pressable onPress={() => navigation.navigate(OwnerScreenNames.OWNERLOCATIONSCREEN, { type: 'addLocation' })}>
                        <Icon name='post-add' size={width(7)} color={AppColors.white} />
                    </Pressable>
                    <View>
                        <View style={styles.badgeStyle}>
                            <SmallText size={2.4} color={AppColors.white}>{numberOfNotifications}</SmallText>
                        </View>
                        <Pressable style={styles.bellIcon} onPress={() => navigation.navigate(ScreenNames.NOTIFICATION, {userType : 'BoatOwner'})}>
                            <Octicons name="bell-fill" color={AppColors.white} size={width(5)} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.topView}>
                    <Image source={{ uri: userImage ? userImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.userPhoto} />
                    <LargeText size={5} color={AppColors.white} textStyles={{width: width(70)}} >{userName}</LargeText>
                </View>
                <View style={styles.innerContainer}>
                    <View style={CommonStyles.rowJustifySpaceBtw}>
                        <InfoCards
                            title='Completed Trips'
                            subTitle={completedBookings.toString()}
                            onPress={() => navigation.navigate(OwnerScreenNames.OWNERTRIPSCREEN)}
                        />
                        <InfoCards
                            title='Upcoming Trips'
                            subTitle={upcomingTrips.length.toString()}
                            onPress={() => navigation.navigate(OwnerScreenNames.OWNERTRIPSCREEN)}
                        />
                        <InfoCards
                            title='Pending Offers'
                            subTitle={pendingTrips.length.toString()}
                            onPress={() => navigation.navigate(OwnerScreenNames.OWNERTRIPSCREEN)}
                        />
                    </View>
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [today]: { selected: true, marked: true, selectedColor: AppColors.darkGreen },
                        }}
                    />
                    <ModalWrapper
                        ref={modalRef}
                        onClose={() => modalRef?.current?.hide()}
                        innerContainerStyles={styles.innerContainerStyles}
                    >
                        <AppLoader isLoader={loading} />
                        <View style={styles.listView}>
                            <LargeText size={4} textStyles={CommonStyles.marginBottom_1}>Your Trips</LargeText>
                            <FlatList
                                data={tripsBySelectedDate}
                                renderItem={renderTripItem}
                                keyExtractor={(item: any) => item._id} // Assuming item has an _id field
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyView}>
                                        <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
                                        <LargeText size={4}>{errorMessage}</LargeText>
                                    </View>
                                )}
                            />
                        </View>
                    </ModalWrapper>
                </View>
            </View>
        )}
        </ScreenWrapper>
    );
};

export default OwnerHome;
