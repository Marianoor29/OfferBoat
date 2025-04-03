import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import {
  AppLoader,
  LargeText,
  NotificationBar,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

const Notification = ({ navigation, route }: any) => {
  const userType = route.params.userType;
  const baseURL = apiUrl;
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${baseURL}/userData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data._id);
      }
    } catch (err) {
      console.log('Failed to fetch user ID');
    }
  };

  const fetchNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/notification/getNotifications/${userId}`);
      const sortedNotifications = response.data.notifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotifications(sortedNotifications);
      setLoading(false);
    } catch (err) {
      setErrorMessage("You Don't Have Any Notifications Yet!");
      setLoading(false);
    }
  };
  const handleNotificationPress = async (item: any) => {
    try {
      // Mark notification as read
      await axios.put(`${baseURL}/notification/markNotificationAsRead/${item._id}`);

      if (item.title === 'New Booking Request') {
        // Fetch booking data using bookingId
        const bookingId = item.data._id;
        const bookingResponse = await axios.get(`${baseURL}/notification/getBookingData/${bookingId}`);
        const bookingData = bookingResponse.data;
        const userImage = item.userId.profilePicture;

        navigation.navigate(OwnerScreenNames.OWNERTRIPDETAILS, {
          trip: bookingData,
          ownerImage: userImage,
          userType: 'BoatOwner',
          rating: item.userId.rating
        });
      } else if (item.title === 'Boat Request Rejected') {
        const userImage = item.userId.profilePicture;

        navigation.navigate(OwnerScreenNames.OWNERTRIPDETAILS, {
          trip: item.data,
          ownerImage: userImage,
          userType: 'BoatOwner',
          rating: item.userId.rating
        });
      } else if (item.title === 'Boat Request Accepted') {
        const userImage = item.userId.profilePicture;

        navigation.navigate(OwnerScreenNames.OWNERTRIPDETAILS, {
          trip: item.data,
          ownerImage: userImage,
          userType: 'BoatOwner',
          rating: item.userId.rating
        });
      } else if (item.title === 'Booking Request Accepted') {
        const ownerImage = item.ownerId.profilePicture;

        navigation.navigate(ScreenNames.TRIPDETAILS, {
          trip: item.data,
          ownerImage: ownerImage,
          userType: 'BoatRenter'
        });
      } else if (item.title === 'Booking Request Rejected') {
        const ownerImage = item.ownerId.profilePicture;

        navigation.navigate(ScreenNames.TRIPDETAILS, {
          trip: item.data,
          ownerImage: ownerImage,
          userType: 'BoatRenter'
        });
      } else if (item.title === 'New Boat Request') {
        const offerId = item.data._id;
        // Check if the offer exists in the SentOffer collection
        const offerCheckResponse = await axios.get(`${baseURL}/notification/checkOfferExists/${offerId}`);
        const offerExists = offerCheckResponse.data.exists;
        const ownerImage = item.ownerId.profilePicture;
        const images = item.data.images.map((image: any) => `${image}`)
        // Determine the type based on the existence of the offer
        {
          offerExists ?
            navigation.navigate(ScreenNames.OFFERDETAILS, {
              offer: item.data,
              ownerImage: ownerImage,
              images: images,
              type: 'OwnerOffer'
            }) :
            navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, {
              offer: item.data,
              ownerImage: ownerImage,
              type: 'OfferDetail'
            })
        }
      } else if (item.title === 'New Review Received') {
        navigation.navigate(ScreenNames.REVIEWS, {
          userId: item.data.ratingId,
          userType: item.data.userType,
          type: "Notification"
        });
      } else if (item.title === 'New Reply Received') {
        navigation.navigate(ScreenNames.LEAVERATING, {
          ownerId: item.data.ownerId,
          userType: userType,
          userId: item.data.userId,
          bookingId: item.data.bookingId
        });
      } else if (item.title === 'New Message Received') {
        navigation.navigate(ScreenNames.GETHELP, {
          userdata: item.data.userdata,
        }) }
        else {
        navigation.goBack();
      }
    } catch (err) {
      console.log('Failed to handle notification press', err);
    }
  };

  const handleClearAll = async () => {
    if (!userId) return;
    try {
      await axios.delete(`${baseURL}/notification/deleteNotifications/${userId}`);
      fetchNotifications();
    } catch (err) {
      console.log('Failed to clear notifications', err);
    }
  };

  const renderGalleryItems = ({ item }: any) => {
    const senderImage = item.userId.profilePicture;
    const receiverImage = item.ownerId.profilePicture;
      const messageId = item.data.messageId
    const createdAtDate = new Date(item.createdAt);
    const time = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = createdAtDate.toLocaleDateString();

    return (
      <NotificationBar
        senderImage={userType === 'BoatOwner' ? senderImage : receiverImage }
        title={userType === 'BoatOwner' && messageId ? `${item.title} by OfferBoat` : userType === 'BoatRenter' && messageId ? `${item.title} by OfferBoat`: userType === 'BoatOwner' ? `${item.title} by ${item.userId.firstName} ${item.userId.lastName}`  : `${item.title} by ${item.ownerId.firstName} ${item.ownerId.lastName}`}
        body={item.body}
        item={item}
        status={item.read}
        time={time}
        date={date}
        onPress={handleNotificationPress}
      />
    );
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Notifications</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        <FlatList
          data={notifications}
          renderItem={renderGalleryItems}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        {!loading && notifications.length <= 0 ? (
          <View style={styles.emptyView}>
            <LottieView
              source={require('../../../../assets/gif/Sorry.json')}
              style={styles.animatedImageStyle}
              autoPlay
              loop={true}
            />
            <LargeText size={4}>{errorMessage ? errorMessage : `You Don't Have Any Notifications Yet!`}</LargeText>
          </View>
        ) : <></>}

        {notifications.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearAllTextView}>
            <LargeText size={3.4} color={AppColors.grey}>Clear All</LargeText>
          </Pressable>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Notification;


