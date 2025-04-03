import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, LargeText, MediumText, OfferDetailCard, ScreenWrapper, SimpleHeader, SmallText } from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import { ORDER_STATUSES } from '../../../../utills/enum';
import styles from './styles';

const OwnerTripDetails = ({ navigation, route }: any) => {
  const { trip } = route.params;
  const userImage = route.params.ownerImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const userType = route.params.userType;
  const rating = trip.userId.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const baseURL = apiUrl;
  const ownerImage = trip.ownerId.profilePicture;
  const dispatch = useAppDispatch();
  const [bookingStatus, setBookingStatus] = useState(trip.status);


  const renderStars = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={width(5)} color={AppColors.starColor} />);
    }
    if (halfStar) {
      stars.push(<Icon key="half" name="star" size={width(5)} color={AppColors.starColor} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={width(5)} color={AppColors.starColor} />);
    }
    return stars;
  };

  const updateBookingStatus = async (status: string, paymentIntentId: string) => {
    dispatch(setAppLoader(true)); // Show loader
    try {
      const response = await axios.put(`${baseURL}/updateBookingStatus`, {
        bookingId: trip._id,
        status,
        userId: trip.userId._id,
        ownerId: trip.ownerId._id,
        listingId: trip.listingId._id
      });

      if (response.status === 200) {
        setBookingStatus(status);
        if (status === 'Accepted') {
          await confirmPayment(paymentIntentId); // Capture the payment if booking is accepted
        } else if (status === 'Rejected') {
          await cancelPayment(paymentIntentId); // Cancel the payment if booking is rejected
        }
      } else {
        console.log('Error', 'Failed to update booking status');
      }
    } catch (error) {
      console.log('Error updating booking status:', error);
    }
    dispatch(setAppLoader(false)); // Hide loader
  };

  const confirmPayment = async (paymentIntentId: string) => {
    try {
      const response = await axios.post(`${baseURL}/payment/capture-payment`, { paymentIntentId });
    } catch (error) {
      console.log('Failed to capture payment', error);
    }
  };
  const cancelPayment = async (paymentIntentId: string) => {
    try {
      await axios.post(`${baseURL}/payment/cancel-payment`, { paymentIntentId });
    } catch (error: any) {
      console.log('Failed to cancel payment:', error.response ? error.response.data : error.message);
    }
  };

  const handleAccept = async () => {
    updateBookingStatus('Accepted', trip.paymentIntentId)
  };

  const handleReject = async () => {
    await updateBookingStatus('Rejected', trip.paymentIntentId);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      translucent={true}
      statusBarColor={AppColors.transparent}
      barStyle={'light-content'}
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          iconView={styles.headerIconView}
          container={styles.headerContainer}
          arrowColor={AppColors.white}
        />
      )}
    >
      <View style={styles.container}>
        <Image source={require('../../../../assets/images/trip.jpeg')} style={styles.image} />
        <LargeText textStyles={styles.myTripHeadingStyle}>Trip</LargeText>
        <View style={styles.innerContainer}>
          <View style={styles.tripInfoView}>
            <View>
              <View style={styles.textRowStyle}>
                <Entypo name="location" size={width(4.6)} color={AppColors.black} />
                <MediumText size={3.4} textStyles={CommonStyles.marginLeft_2}>{trip.location}</MediumText>
              </View>
              <View style={styles.textRowStyle}>
                <Entypo name="calendar" size={width(4.6)} color={AppColors.black} />
                <MediumText size={3.4} textStyles={CommonStyles.marginLeft_2}>{trip.date}</MediumText>
              </View>
              {trip.expiresAt && (
                <View style={styles.textRowStyle}>
                  <MaterialCommunityIcons name="timer-settings-outline" size={width(4.6)} color={AppColors.black} />
                  <MediumText size={3} textStyles={CommonStyles.marginLeft_2}>This offer will expire at {format(new Date(trip.expiresAt), 'hh:mm a')} </MediumText>
                </View>
              )}
            </View>
            <View style={styles.statusView}>
              <LargeText color={
                bookingStatus === 'Rejected' ? AppColors.red :
                  bookingStatus === 'Pending' ? AppColors.red :
                    bookingStatus === 'Accepted' ? AppColors.green :
                      bookingStatus === 'Completed' ? AppColors.green :
                        AppColors.black}
                size={4}>{bookingStatus}</LargeText>
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            {trip.status === ORDER_STATUSES.CONFIRMED || trip.status === ORDER_STATUSES.COMPLETED ? (
              <Pressable onPress={() => navigation.navigate(OwnerScreenNames.RENTERPROFILE, { userId: trip.userId, type: 'trips' })}>
                <Image source={{ uri: userImage }} style={styles.ownerImage} />
              </Pressable>
            ) : (
              <Image source={{ uri: userImage }} style={styles.ownerImage} />
            )}
            <View style={styles.userInfo}>
              <LargeText size={4}>{`${trip.userId.firstName} ${trip.userId.lastName}`}</LargeText>
              <SmallText size={3.4}>Boat Renter</SmallText>
            </View>
            <View style={styles.Ratingcontainer}>
              <View style={styles.starsContainer}>{renderStars()}</View>
            </View>
          </View>
          <OfferDetailCard
            price={trip.packages[0].price}
            members={trip.numberOfPassenger}
            hours={trip.packages[0].hours}
            container={styles.OfferDetailCardStyles}
            startTime={trip.time}
            ratingTitle="Renter's Rating"
            rating={trip.userId.rating}
            captain={trip.captain}
            instruction={trip?.tripInstructions}
            emailTtile="Renter's Email"
            userEmail={trip.userId.email}
            phoneNumber={trip.userId?.phoneNumber}
            checkDetailsTitle="Check Renter's Detail"
            ifOffer={bookingStatus}
            onPressUserDetail={() => navigation.navigate(OwnerScreenNames.RENTERPROFILE, { userId: trip.userId })}
          />
        </View>
        <View>
          {bookingStatus === 'Pending' && (
            <View style={styles.bottomButtonRow}>
              <Button
                text='Accept'
                buttonStyle={styles.rowButtom}
                onPress={handleAccept}
              />
              <Button
                text='Reject'
                buttonStyle={styles.rejectButtom}
                onPress={handleReject}
              />
            </View>
          )}
          {bookingStatus === 'Completed' && (
            <Button
              text='Leave Rating'
              buttonStyle={styles.ratingBtnStyle}
              textStyle={{ color: AppColors.secondaryRenter }}
              onPress={() => navigation.navigate(ScreenNames.LEAVERATING, { userType: userType, ownerId: trip.ownerId._id, userId: trip.userId._id, bookingId: trip._id })}
            />
          )}
          {bookingStatus !== 'Completed' && (
            trip.listingId?.message !== "This listing has been deleted" ? (
              <Button
                text={'Check Listing Detail'}
                buttonStyle={styles.footerBtnStyle}
                onPress={() => navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: trip.listingId, ownerImage: ownerImage, type: 'OfferDetail'})}
              />
            ) :
              trip.status === 'Rejected' ?
                (
                  <LargeText size={3.4} color={AppColors.red} textAlign={'center'} textStyles={CommonStyles.marginBottom_2}>
                    {trip.listingId?.message === "This listing has been deleted"
                      ? 'This listing has been deleted. All pending requests for this listing have been rejected' : ''}
                  </LargeText>
                ) : (
                  <LargeText size={3.4} color={AppColors.red} textAlign={'center'} textStyles={CommonStyles.marginBottom_2}>
                    {trip.listingId?.message === "This listing has been deleted"
                      ? 'This listing has been deleted.' : ''}
                  </LargeText>
                )
          )}
        </View>

      </View>
    </ScreenWrapper>
  );
};

export default OwnerTripDetails;
