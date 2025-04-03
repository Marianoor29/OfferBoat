import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppLoader, BoatDetails, ButtomButton, Button, LargeText, MediumText, ModalWrapper, OfferDetailCard, OpenMapButton, PhotosSlider, ReviewBox, ScreenWrapper, ShareButton, SimpleHeader, SmallText, UserInfo } from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { height, width } from '../../../../utills/Dimension';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

type OwnerId = {
  _id: any;
  firstName: string;
  lastName: string;
  rating: number
};

type Offer = {
  captain: boolean;
  boatCategory: string | undefined;
  boatManufacturer: string | undefined;
  lengthRange: string | undefined;
  message: string;
  time: any;
  date: any;
  listingId: any;
  userId: any;
  offerId: any;
  _id: any;
  reviews: ArrayLike<any> | null | undefined;
  owner: any;
  description: string;
  images: string[];
  boatOwnerImage: string;
  location: string;
  title: string;
  price: number;
  members: number;
  duration: number;
  rules: string[];
  features: string[];
  numberOfPassengers: number;
  packages: [{ price: string, hours: string }];
  ownerId: OwnerId
};

const OfferDetails = ({ navigation, route }: any) => {
  const { offer }: { offer: Offer } = route.params;
  const OfferType = route.params.type;
  const ownerImage = route.params.ownerImage
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = offer.description.slice(0, 300);
  const userData = useAppSelector((state: RootState) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const dispatch = useAppDispatch();
  const confirmModalRef = useRef<ModalHandles>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const userType = 'BoatOwner'
  const userId = offer.ownerId._id
  const baseURL = apiUrl
  const modalRef = useRef<ModalHandles>(null);
  const [listingImages, setListingImages] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = async () => {
    const endpoint = isSaved ? `${apiUrl}/listing/removeSavedListing` : `${apiUrl}/listing/addSavedListing`;
  
    try {
      const response = await axios.post(endpoint, {
        userId: userData._id,
        listingId: offer._id,
      });
  
      if (response.status === 200) {
        setIsSaved(!isSaved); 
      } else {
        console.log('Error toggling save status:', response.data.message);
      }
    } catch (error:any) {
      console.log('Error toggling save status:', error.message);
    }
  };

  const OnNavigateToLogin = () => {
    navigation.navigate(ScreenNames.SHAREDSCREENS)
  }

  useEffect(() => {
    const checkIfSaved = async () => {
      if (userData.token) {
      try {
        const response = await axios.get(`${apiUrl}/listing/isSaved`, {
          params: {
            userId: userData._id,
            listingId: offer._id,
          },
        });
  
        if (response.status === 200) {
          setIsSaved(response.data.isSaved);
        } else {
          console.log('Failed to check saved status:', response.data.message);
        }
      } catch (error:any) {
        console.log('Error checking saved status:', error.message);
      }
    };
    }
    checkIfSaved();
  }, [offer._id, userData._id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const loadListingImages = async () => {
      if (OfferType === "HomeListing" || OfferType === "Listing") {
        const response = await axios.get(`${apiUrl}/listing/listingsImages/${offer._id}/images`);
        const data = response.data.images;  
        setListingImages(data|| []);
      }
    };
    loadListingImages();
  }, [OfferType, offer._id]);

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

  const onReject = async () => {
    try {
      dispatch(setAppLoader(true));
      const response = await axios.delete(`${baseURL}/deleteOffer`, {
        params: {
          offerId: offer._id,
          userId: offer.userId,
          ownerId: offer.ownerId._id,
          listingId: offer.listingId,
          packages: offer.packages,
          location: offer.location,
          date: offer.date,
          time: offer.time,
          numberOfPassengers: offer.numberOfPassengers,
        }
      });
      if (response) {
        navigation.navigate(ScreenNames.OFFERS);
        dispatch(setAppLoader(false));
      }
    } catch (error) {
      dispatch(setAppLoader(false));
      // Handle error as needed
    }
  };

  const handlePayment = async () => {
    const priceInDollars = parseFloat(offer.packages[0].price.replace(/[^0-9.-]+/g, ""));
    const amountInCents = Math.round(priceInDollars * 10); // Convert to 10% amount

    try {
      // Fetch payment intent from your server
      const response = await fetch(`${baseURL}/payment/create-payment-intent-on-listing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amountInCents, userId: offer.userId._id })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const { clientSecret, paymentIntentId } = await response.json();

      // Initialize payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: clientSecret
      });

      if (initResponse.error) {
        return;
      }

      const presentResponse = await presentPaymentSheet();

      if (presentResponse.error) {
        return;
      }

      // Accept booking request after confirming the payment
      await sendBookingHandler(paymentIntentId); // Pass paymentIntentId
    } catch (error: any) {
      console.log('Payment Error:', `Payment processing error: ${error.message}`);
    }
  };

  const sendBookingHandler = async (paymentIntentId: string) => {
    const bookingData = {
      userId: offer.userId,
      listingId: offer.listingId,
      ownerId: offer.ownerId._id,
      date: offer.date,
      time: offer.time,
      package: offer.packages[0],
      numberOfPassenger: offer.numberOfPassengers,
      location: offer.location,
      status: 'Accepted',
      paymentIntentId: paymentIntentId,
    };

    dispatch(setAppLoader(true));

    try {
      // Send the booking request
      const response = await fetch(`${baseURL}/bookingRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        try {
          // Update the status of the offer
          const updateStatus = await axios.put(`${baseURL}/updateOwnerOfferStatus/${offer._id}`, {
            status: 'RequestAccepted',
          });

          if (updateStatus.status === 200) {
            try {
              // Delete the custom offer
              await axios.delete(`${baseURL}/deleteCustomOffer/${offer.offerId}`);
              modalRef?.current?.show();
              setTimeout(() => {
                modalRef?.current?.hide();
                navigation.navigate(ScreenNames.TRIP);
              }, 1000);
            } catch (error) {
              setErrorMessage('Failed to delete custom offer, please try again.');
              setTimeout(() => {
                setErrorMessage('');
              }, 1000);
            }
          } else {
            setErrorMessage('Failed to update offer status, please try again.');
            setTimeout(() => {
              setErrorMessage('');
            }, 1000);
          }
        } catch (error) {
          setErrorMessage('Failed to update offer status, please try again.');
          setTimeout(() => {
            setErrorMessage('');
          }, 1000);
        }
      } else {
        setErrorMessage('Failed to book this trip, please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    } catch (error) {
      setErrorMessage('Failed to book this trip, please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }

    dispatch(setAppLoader(false));
  };

  const hideListing = async (userId: any, listingId: any) => {
    dispatch(setAppLoader(true)); 
    try {
      const response = await fetch(`${apiUrl}/listing/hideListing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, listingId }),
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate(ScreenNames.HOME, { refresh: true })
      } else {
        console.log('Failed to hide listing:', data.message);
      }
    } catch (error) {
      console.log('Error hiding listing:', error);
    } finally {
      dispatch(setAppLoader(false)); 
    }
  };

const blockUser = async (userId: any, blockUserId: any) => {
  dispatch(setAppLoader(true)); 
  try {
    const response = await fetch(`${apiUrl}/listing/blockUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, blockUserId }),
    });
    const data = await response.json();
    if (response.ok) {
      navigation.navigate(ScreenNames.HOME, { refresh: true }) 
    } else {
      console.log('Failed to block user:', data.message);
    }
  } catch (error) {
    console.log('Error blocking user:', error);
  } finally {
    dispatch(setAppLoader(false)); 
  }
};

  return (
    <ScreenWrapper
      scrollEnabled
      translucent={true}
      statusBarColor={AppColors.transparent}
      barStyle={'light-content'}
      headerUnScrollable={() => {
        return (
          <SimpleHeader
            onPressFirstIcon={() => navigation.goBack()}
            iconView={styles.headerIconView}
            container={styles.headerContainer}
            arrowColor={AppColors.white}
            RightIcon={false}
            emptyViewStyle={styles.emptyView}
            emptyView={
              <View style={styles.iconView}>
            <ShareButton offerId={offer._id} />
            <Pressable onPress={userData.token ? toggleSave : OnNavigateToLogin} style={styles.savedView}>
         <Icon
           name={isSaved ? 'heart' : 'heart-o'}
           size={width(4)} 
           color={AppColors.white}
         />
       </Pressable>
            </View>
          }
          />
        );
      }}
      footerUnScrollable={() => (
        <ButtomButton
          fisrtButtonTitle={OfferType === "OwnerOffer" ? 'Accept' : 'Book Now'}
          secondButtonTitle={OfferType === "OwnerOffer" ? 'Reject' : 'Make Offer'}
          onPressFirstButton={() =>
            OfferType === "OwnerOffer" ?
              confirmModalRef?.current?.show() :
              navigation.navigate(ScreenNames.BOOKING, { offer: offer, type: 'OwnerList', offerId: '' })}
          onPressSecondButton={() =>
            OfferType === "OwnerOffer" ?
              onReject() :
              navigation.navigate(ScreenNames.SENDOFFER, { offer: offer, location: offer.location, type: 'SendListOffer' })}
        />
      )}
    >
      <View style={styles.container}>
        <PhotosSlider
          images={(OfferType === "HomeListing" || OfferType === "Listing") && listingImages.length > 0 ? listingImages : offer.images}
          sliderImageWidth={width(100)}
          sliderImageHeight={width(70)}
          sliderStyle={styles.image}
          sliderContainer={styles.sliderContainer}
          enableZoom={true}
          arrowHeight={130}
        />
        <View style={styles.innerContainer}>
          <UserInfo
            image={ownerImage}
            rating={offer.ownerId?.rating}
            name={`${offer.ownerId?.firstName} ${offer.ownerId?.lastName}`}
            onPress={() => navigation.navigate(ScreenNames.TOPDESTINATIONDETAILS, { TopDestination: offer.ownerId._id, type: "OwnerListing" })}
            userImageStyle={styles.userImageStyle}
            dropDown = {userData.token && (OfferType === "HomeListing" || OfferType === "Listing") ? true : false}
            handleHideAndReport={hideListing}
            userId={userData._id}
            listingId={offer._id}
            handleHide={blockUser} 
            blockUserId={offer.ownerId._id}  
          />
          <View style={styles.addressAndTitleView}>
            <LargeText size={4.6} color={AppColors.black} textStyles={styles.title}>{offer.title}</LargeText>
            <MediumText size={3.3} color={AppColors.grey}>{offer.location}</MediumText>
          </View>
        </View>
        {offer.message && (
          <View style={styles.ownerMessageView}>
            <LargeText size={3.4}>Owner's Message</LargeText>
            <SmallText size={3.4}>{offer.message}</SmallText>
          </View>
        )}
        <OfferDetailCard
          packages={offer?.packages}
          members={offer.numberOfPassengers}
          rating={offer.ownerId?.rating}
          ratingTitle="Owner's Rating"
          packageTitle={offer.packages.length === 1 ? "Package" : "Packages"}
        />
        <View style={styles.descriptionView}>
          <LargeText size={4.6}>The Boat</LargeText>
          <MediumText size={4} textAlign={'left'}>
            {showFullDescription ? offer.description : truncatedDescription}
            {offer.description.length > 300 && (
              <TouchableOpacity onPress={toggleDescription}>
                <LargeText size={4} textStyles={styles.readMoreText}>{showFullDescription ? 'Read Less' : 'Read More'}</LargeText>
              </TouchableOpacity>
            )}
          </MediumText>
        </View>
        <BoatDetails
          Length={offer?.lengthRange || 'Not Mention'}
          Model = {offer?.boatManufacturer || "Not Mention"}
          Category = {offer?.boatCategory || "Not Mention"}
         />
        <OpenMapButton address={offer.location} />
        <View style={styles.lineView}></View>
        <LargeText size={4.6} textStyles={styles.headingStyle}>Things to Know</LargeText>
        {(offer.rules || []).map((item: string, index: number) => (
          <View key={index} style={styles.featuresView}>
            <MediumText textStyles={styles.rulesText}>{item}</MediumText>
            <MaterialIcons name='rule' size={width(5)} color={AppColors.green} />
          </View>
        ))}
        <View style={styles.lineView}></View>
        <View style={styles.reviewHeadingView}>
          <LargeText size={4.6}>Reviews</LargeText>
          {reviews.length > 0 ? (
            <Pressable onPress={() => navigation.navigate(ScreenNames.REVIEWS, { userId: offer.ownerId._id, userType: 'BoatOwner', type: 'offerDetail' })}>
              <LargeText size={3}>View all</LargeText>
            </Pressable>
          ) : (
            <LargeText size={3.4}>This owner has no reviews yet!</LargeText>
          )}
        </View>
        <AppLoader isLoader={loading} />
        <FlatList
          data={reviews}
          renderItem={renderReviewList}
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListEmptyComponent={() => (
            <LargeText size={3.4}>{errorMessage}</LargeText>
          )}
        />
        <View style={styles.lineView}></View>
        <LargeText size={4.6} textStyles={styles.headingStyle}>Features</LargeText>
        {(offer.features || []).slice(0, 5).map((item: string, index: number) => (
          <View key={index} style={styles.featuresView}>
            <MediumText textStyles={styles.rulesText}>{item}</MediumText>
            <Feather name='check-circle' size={width(5)} color={AppColors.green} />
          </View>
        ))}
        {offer.features.length > 5 && (
          <TouchableOpacity onPress={() => navigation.navigate('FullFeatureList', { features: offer.features })}>
            <LargeText size={4} textStyles={styles.readMoreText}>View all</LargeText>
          </TouchableOpacity>
        )}
        <ModalWrapper
          ref={confirmModalRef}
          close={false}
          modalContainer={{ justifyContent: "center" }}
          children={
            <>
              <MediumText textAlign="center" textStyles={CommonStyles.marginTop_5}>Are you sure you want to accept this offer?</MediumText>
              <View style={styles.confirmModalButton}>
                <Button
                  text={'Yes'}
                  onPress={() => {
                    confirmModalRef?.current?.hide();
                    setTimeout(() => {
                      handlePayment();
                    }, 600)
                  }}
                  buttonStyle={styles.yesBtn}
                />
                <Button
                  text={'No'}
                  onPress={() => confirmModalRef?.current?.hide()}
                  buttonStyle={styles.noBtn}
                />
              </View>
            </>
          }
        />
        <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedModalImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Your trip has been booked</MediumText>
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default OfferDetails;
