import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppLoader,
  Button,
  LargeText,
  ProfileInfo,
  ReviewBox,
  ScreenWrapper,
  SmallText,
} from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import styles from './styles';
import { width } from '../../../../utills/Dimension';
import AppColors from '../../../../utills/AppColors';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import { RootState } from '../../../../redux/store';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';

const RenterProfile = ({ navigation, route }: any) => {
  const userId = route.params.userId
  const type = route.params.type
  const baseURL = apiUrl;
  const userImage = userId.profilePicture;
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userType = 'BoatRenter'
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const userData = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/rating/getReviews`, {
        params: { userId: userId._id, userType }
      });

      if (response.status === 200) {
        const fetchedReviews = response.data;
        setReviews(fetchedReviews);
      } else {
        console.log('Error', 'Failed to fetch reviews.');
      }
    } catch {
      setErrorMessage('This user has no review yet!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleBlockUser  = async () => {
    dispatch(setAppLoader(true)); 
    try {
      const response = await fetch(`${apiUrl}/listing/blockUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userData._id, blockUserId : userId._id }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate(OwnerScreenNames.OWNEROFFERSCREEN, { refresh: true }) 
      } else {
        console.log('Failed to block user:', data.message);
      }
    } catch (error) {
      console.log('Error blocking user:', error);
    } finally {
      dispatch(setAppLoader(false)); 
    }
  };
  const renderReviewList = ({ item }: any) => {
    const reviewerImage = item.renterId.profilePicture;
    return (
      <ReviewBox
        reviewerName={`${item.ownerId.firstName} ${item.ownerId.lastName}`}
        reviewerImage={reviewerImage}
        reviewDate={new Date(item.createdAt).toLocaleDateString()}
        reviewText={item.reviewText}
        rating={item.rating}
      />
    );
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <Button
          text={'Close'}
          onPress={() => navigation.goBack()}
          buttonStyle={styles.footerButtonStyle}
        />
      )}
    >
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        {type === 'Offer' && userData._id && (
          <View style={styles.dotsViewStyle}>
            <Pressable onPress={() => setIsDropdownVisible(!isDropdownVisible)} style={styles.dotsStyle}>
              <MaterialCommunityIcons name="dots-vertical" size={width(5)} color={AppColors.black} />
            </Pressable>
            {isDropdownVisible && (
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={handleBlockUser} style={styles.dropdownItem}>
                  <SmallText size={3.4}>Block User</SmallText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {type === 'Offer' ? (
          <ProfileInfo
          userImage={userImage}
          firstName={userId.firstName}
          lastName={userId.lastName}
          address={userId.location}
          rating={userId.rating}
        />
        ) : (
        <ProfileInfo
          userImage={userImage}
          firstName={userId.firstName}
          lastName={userId.lastName}
          email={userId.email}
          phoneNumber={userId.phoneNumber || ''}
          address={userId.location}
          rating={userId.rating}
        />
        )}
        <View style={styles.reviewHeadingView}>
          <LargeText size={4.6}>Reviews</LargeText>
          {reviews.length > 0 && (
            <Pressable onPress={() => navigation.navigate(ScreenNames.REVIEWS, { userId: userId._id, userType: userType , type: 'offerDetail' })}>
              <LargeText size={3}>View all</LargeText>
            </Pressable>)}
        </View>
        {reviews.length <= 0 ? (
          <View style={styles.emptyView}>
            <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
            <LargeText size={4}>{errorMessage ? errorMessage : 'This user has no review yet!'}</LargeText>
          </View>
        ) : (
          <FlatList
            data={reviews}
            renderItem={renderReviewList}
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default RenterProfile;
