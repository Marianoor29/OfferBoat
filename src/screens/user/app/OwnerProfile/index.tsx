import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { AppLoader, Button, LargeText, ProfileInfo, ReviewBox, ScreenWrapper, SimpleHeader } from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import styles from './styles';

const OwnerProfile = ({ navigation, route }: any) => {
  const userId = route.params.userId
  const baseURL = apiUrl
  const userImage = userId.profilePicture
  const ownerCoverImage = userId.coverPicture ?  userId.coverPicture
  : 'https://cdn.pixabay.com/photo/2023/02/12/12/06/ocean-7784940_1280.jpg';

  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userType = 'BoatOwner'

useEffect(() => {
  const fetchReviews = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseURL}/rating/getReviews`, {
        params: { userId, userType }
      });

      if (response.status === 200) {
        setReviews(response.data);
      } else {
       console.log('Error', 'Failed to fetch reviews.');
      }
    } catch {
      setErrorMessage('This owner has no reviews yet!')
    }
    setLoading(false)
  };

  fetchReviews();
}, [userId, userType]);

  const renderReviewList = ({ item }: any) => {
    const reviewerImage = item.renterId.profilePicture;
    return (
      <ReviewBox
        reviewerName={`${item.renterId.firstName} ${item.renterId.lastName}`}
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
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
        />
      )}
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
        <ProfileInfo
          userImage={userImage}
          coverImage={ownerCoverImage ? ownerCoverImage : 'https://cdn.pixabay.com/photo/2023/02/12/12/06/ocean-7784940_1280.jpg'}
          firstName={userId.firstName}
          lastName={userId.lastName}
          email={userId.email}
          phoneNumber={userId.phoneNumber || ''}
          address={userId.location}
          rating={userId.rating}
        />
        <View style={styles.reviewHeadingView}>
          <LargeText size={4.6}>Reviews</LargeText>
          {reviews.length > 0 && (
          <Pressable onPress={() => navigation.navigate(ScreenNames.REVIEWS,  {userId: userId._id ,userType: userType, type: 'offerDetail'})}>
            <LargeText size={3}>View all</LargeText>
          </Pressable>
          )}
        </View>
        {reviews.length <= 0 ? (
               <View style={styles.emptyView}>
               <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
               <LargeText size={4}>{errorMessage ? errorMessage : 'This owner has no reviews yet!'}</LargeText>
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
  )
}

export default OwnerProfile