import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import {
  AppLoader,
  Button,
  LargeText,
  MediumText,
  ModalWrapper,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../../redux/store/hook';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

const LeaveRating = ({ navigation, route }: any) => {
  const modalRef = useRef<ModalHandles>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [existingReview, setExistingReview] = useState<any>(null);
  const { userType, userId, ownerId, bookingId } = route.params;
  const [loading, setLoading] = useState(true);
  const [disabledSend, setDisabledSend] = useState(true);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = apiUrl

useEffect(() => {
  const fetchExistingReview = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/rating/getRating`, {
        params: {
          bookingId,
          ownerId: ownerId ,
          renterId: userId ,
          userType: userType
        },
      });

      if (response.status === 200) {
        setExistingReview(response.data);
      }
    } catch {
      console.log('Error fetching existing review');
    }
    setLoading(false);
  };

  fetchExistingReview();
}, [bookingId, ownerId, userId, userType]);

  const handleRatingCompleted = (rating: number) => {
    setRating(rating);
  };

  const handleSendReview = async () => {
    dispatch(setAppLoader(true)); 
    try {
      const apiUrl = userType === 'BoatOwner'
        ? `${baseURL}/rating/ownerLeaveRating`
        : `${baseURL}/rating/renterLeaveRating`;

      const requestBody = {
        reviewText,
        rating,
        renterId: userId,
        ownerId: ownerId,
        bookingId: bookingId,
        userType: userType
      };

      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 201) {
        setTimeout(() => {
          modalRef?.current?.show();
        },600)
      } else {
        setErrorMessage('Failed to submit rating and review.');
      }
    } catch (error) {
      setErrorMessage('Error submitting review');
    }
    dispatch(setAppLoader(false)); 
  };

  const validateFields = () => {
    if (reviewText && rating) {
      setDisabledSend(false);
    } else {
      setDisabledSend(true);
    }
  };

  useEffect(() => {
    validateFields();
  }, [reviewText, rating]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
        />
      }}
      footerUnScrollable={() => (
        !existingReview && (
          <Button
            text='Send Review'
            buttonStyle={styles.footerBtnStyle}
            onPress={handleSendReview}
            disabled={disabledSend}
          />
        )
      )}
    >
      <View style={styles.container}>
      <AppLoader isLoader={loading} />
        {existingReview ? (
          <>
            <LargeText size={3.4} textStyles={CommonStyles.marginBottom_5}>You have already submitted a review for this trip.</LargeText>
            <LargeText size={4} textStyles={CommonStyles.marginBottom_2}>Your Rating</LargeText>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={width(8)}
              readonly
              startingValue={existingReview.rating}
            />
            <LargeText size={4} textStyles={CommonStyles.marginTop_5}>Your Review</LargeText>
            <Text style={styles.reviewTextContainer}>{existingReview.reviewText}</Text>
          
            {existingReview?.replies && existingReview?.replies?.length > 0 && (
              <>
                <LargeText size={4}>Reply on your Review</LargeText>
                <FlatList
                scrollEnabled={false}
                  data={existingReview.replies}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.replyContainer}>
                      <LargeText size={3.4}>{item.replierName}</LargeText>
                      <SmallText size={3}>{new Date(item.createdAt).toLocaleDateString()}</SmallText>
                      <SmallText size={3.5}>{item.replyText}</SmallText>
                    </View>
                  )}
                />
              </>
            )}
          </>
        ) : (
          <>
            <LargeText size={4}>Write your review here</LargeText>
            <TextInput
              multiline
              numberOfLines={6}
              style={styles.reviewContainer}
              value={reviewText}
              onChangeText={setReviewText}
            />
            <Rating
              type="star"
              ratingCount={5}
              imageSize={width(8)}
              startingValue={0} 
              onFinishRating={handleRatingCompleted}
            />
          </>
        )}
        <LargeText size={4} textStyles={CommonStyles.marginBottom_2}>{errorMessage}</LargeText>
        <ModalWrapper
          ref={modalRef}
          onClose={() => modalRef?.current?.hide()}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Thank you for sharing your experience. Your feedback is appreciated!</MediumText>
              <Button
                text='Close'
                onPress={() => {
                  modalRef?.current?.hide();
                  setTimeout(() => {
                    navigation.goBack();
                  }, 600);
                }}
              />
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default LeaveRating;
