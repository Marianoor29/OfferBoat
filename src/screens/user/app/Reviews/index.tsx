import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import {
  AppLoader,
  LargeText,
  ReviewDetailCard,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import apiUrl from '../../../../config';
import styles from './styles';

interface Review {
  userType: string;
  userId: string;
  bookingId: string;
  _id: string;
  createdAt: string;
  reviewText: string;
  rating: number;
  replies: any[];
  renterId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  ownerId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

const Reviews = ({ navigation, route }: any) => {
  const {userId, userType, type} = route.params; 
  const [reviews, setReviews] = useState<Review[]>([]);
  const [paginatedReviews, setPaginatedReviews] = useState<Review[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); 
  const [totalPages, setTotalPages] = useState<number>(0); 
  const baseURL = apiUrl
  const flatListRef = useRef<FlatList<Review>>(null); 

  const fetchAllReviews = async () => {
    setLoading(true);
  
    try {
      let response;
      let fetchedReviews: Review[] = [];
  
      // Check if the userType is not "Notification"
      if (type !== "Notification") {
        // Fetch reviews based on userId and userType
        response = await axios.get(`${baseURL}/rating/getReviews`, {
          params: { userId, userType },
        });
  
        if (response.status === 200) {
          fetchedReviews = response.data;
  
          // Sort reviews by createdAt in descending order
          const sortedReviews = fetchedReviews.sort(
            (a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
  
          setReviews(sortedReviews);
          setTotalPages(Math.ceil(sortedReviews.length / pageSize));
          setPaginatedReviews(sortedReviews.slice(0, pageSize));
        } else {
         console.log('Error', 'Failed to fetch reviews.');
        }
      } else {
        // Fetch review by ratingId
        response = await axios.get(`${baseURL}/rating/getRatingById/${userId}`);
  
        if (response.status === 200) {
          // Since you're fetching a single review, no need to sort
          setReviews([response.data]); // Wrapping in array to maintain consistency
          setTotalPages(1);
          setPaginatedReviews([response.data]);
        } else {
          console.log('Error', 'Failed to fetch review by rating ID.');
        }
      }
    } catch (error) {
      setErrorMessage('You have no reviews yet!');
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedReviews(reviews.slice(startIndex, endIndex));
  }, [currentPage, reviews]);

  useEffect(() => {
    // Scroll to top when page changes
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [currentPage]);

  const renderReviewList: ListRenderItem<Review> = ({ item }) => {
    const renterImage = item.renterId?.profilePicture;
    const ownerImage = item.ownerId?.profilePicture;
  
    // Callback function to handle reply submission
    const handleReplySubmit = (ratingId: string, newReply: any) => {
      setReviews(prevReviews => {
        const updatedReviews = prevReviews.map(review => {
          if (review._id === ratingId) {
            return {
              ...review,
              replies: [...review.replies, newReply]
            };
          }
          return review;
        });
        return updatedReviews;
      });
    };
  
    return (
      <ReviewDetailCard
        reviewerName={userType === 'BoatOwner' ? `${item?.renterId.firstName} ${item?.renterId.lastName}` : `${item?.ownerId?.firstName} ${item?.ownerId?.lastName}`}
        reviewerImage={userType === 'BoatOwner' ?  renterImage : ownerImage }
        reviewDate={new Date(item.createdAt).toLocaleDateString()}
        reviewText={item.reviewText}
        rating={item.rating}
        replies={item.replies}
        ratingId={item._id}
        bookingId={item.bookingId}
        ownerId={item.ownerId._id}
        userId={item.renterId._id}
        userType={item.userType}
        showReplyBox={type === 'offerDetail' ? false : true}
        onReplySubmit={handleReplySubmit}
      />
    );
  };
  
  const renderPageControls = () => {
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

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader 
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Reviews</LargeText>}
        />
      )}>
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        <FlatList
          ref={flatListRef}
          data={paginatedReviews}
          renderItem={renderReviewList}
          keyExtractor={(item: Review) => item._id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <LottieView 
                source={require('../../../../assets/gif/Sorry.json')} 
                style={styles.animatedImageStyle} 
                autoPlay 
                loop={true} 
              />
              <LargeText size={4}>{errorMessage ? errorMessage : 'You have no reviews yet!'}</LargeText>
            </View>
          )}
          ListFooterComponent={renderPageControls}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Reviews;
