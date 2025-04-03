import { Image, Pressable, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  LargeText,
  MediumText,
  OfferDetailCard,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../../components';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import { ORDER_STATUSES } from '../../../../utills/enum';
import styles from './styles';

const TripDetails = ({ navigation, route }: any) => {
  const { trip } = route.params;
  const ownerImage = route.params.ownerImage;
  const userType = route.params.userType;
  const images = trip.listingId.message ? "" : trip.listingId.images.map((image: string) => `${image}`);
  const rating = trip.ownerId.rating
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? true : false;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

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

  return (
    <ScreenWrapper
      scrollEnabled
      translucent={true}
      statusBarColor={AppColors.transparent}
      barStyle={'light-content'}
      headerUnScrollable={() => {
        return <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          iconView={styles.headerIconView}
          container={styles.headerContainer}
          arrowColor={AppColors.white}
        />
      }}
     >
      <View style={styles.container}>
        <Image source={require('../../../../assets/images/trip.jpeg')} style={styles.image} />
        <LargeText textStyles={styles.myTripHeadingStyle}>My Trip</LargeText>
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
            </View>
            <View style={styles.statusView}>
              <LargeText color={
                trip.status === 'Rejected' ? AppColors.red :
                  trip.status === 'Accepted' ? AppColors.green :
                    trip.status === 'Completed' ? AppColors.green :
                      trip.status === 'Pending' ? AppColors.red
                        : AppColors.black}
                size={4}>{trip.status}</LargeText>
            </View>
          </View>
          <View style={styles.userInfoContainer}>
          {  trip.status === ORDER_STATUSES.CONFIRMED || trip.status === ORDER_STATUSES.COMPLETED ? 
             <Pressable onPress={() => navigation.navigate(ScreenNames.OWNERPROFILE, {userId : trip.ownerId})}>
             <Image source={{ uri: ownerImage }} style={styles.ownerImage} /> 
             </Pressable> :
              <Image source={{ uri: ownerImage }} style={styles.ownerImage} />
            }
            <View style={styles.userInfo}>
              <LargeText size={4}>{`${trip.ownerId.firstName} ${trip.ownerId.lastName}`}</LargeText>
              <SmallText size={3.4}>Owner</SmallText>
            </View>
            <View style={styles.Ratingcontainer}>
              <View style={styles.starsContainer}>{renderStars()}</View>
            </View>
          </View>
          <OfferDetailCard
            price={trip.packages[0].price}
            hours={trip.packages[0].hours}
            members={trip.numberOfPassenger}
            startTime={trip.time}
            rating={trip.ownerId.rating}
            container={styles.OfferDetailCardStyles}
            captain={trip.captain}
            instruction={trip.tripInstructions}
            ratingTitle="Owner's Rating"
            emailTtile="Owner's Email"
            userEmail={trip.ownerId.email}
            phoneNumber={trip.ownerId?.phoneNumber}
            checkDetailsTitle="Check Owner's Detail"
            ifOffer={trip.status}
            onPressUserDetail={() => navigation.navigate(ScreenNames.OWNERPROFILE, {userId : trip.ownerId})}
          />

        </View>
        {trip.status === 'Completed' ? (
            <Button
              text='Leave Rating'
              buttonStyle={styles.ratingBtnStyle}
              textStyle={{ color: AppColors.secondaryRenter }}
              onPress={() => navigation.navigate(ScreenNames.LEAVERATING, {userType :userType, ownerId: trip.ownerId._id, userId: trip.userId, bookingId: trip._id})}
            />
          ) : (
            trip.listingId.message !== "This listing has been deleted" ? (
            <Button
              text={'Check Listing Detail'}
              buttonStyle={styles.footerBtnStyle}
              onPress={() =>  
                trip.status === 'Rejected' ?
                navigation.navigate(ScreenNames.OFFERDETAILS, { offer: trip.listingId , ownerImage:ownerImage, images: images,  type: "TripListing"  }) :
                navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: trip.listingId , ownerImage:ownerImage, images: images , type: 'OfferDetail'})}
            />
              ) :
            (
              <LargeText size={3.4} color={AppColors.red} textAlign={'center'} textStyles={CommonStyles.marginBottom_2}>
              {trip.listingId?.message === "This listing has been deleted" && trip.status !== "Accepted" 
                ? 'Boat not available' 
                : ''}
            </LargeText>
            )
          )
          }
      </View>
    </ScreenWrapper>
  );
};

export default TripDetails;
