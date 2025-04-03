import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppLoader, ButtomButton, LargeText, MediumText, OfferDetailCard, OpenMapButton, PhotosSlider, ReviewBox, ScreenWrapper, ShareButton, SimpleHeader, UserInfo } from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

type OwnerId = {
  _id: any;
  firstName: string;
  lastName: string;
  rating: number;
  profilePicture: string;
};

type Offer = {
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

const LinkOfferDetails = ({ navigation, route }: any) => {
  const offerId = route.params.offerId;
  const [offer, setOffer] = useState<Offer>({
    message: '',
    time: null,
    date: null,
    listingId: null,
    userId: null,
    offerId: null,
    _id: null,
    reviews: [],
    owner: null,
    description: '',
    images: [],
    boatOwnerImage: '',
    location: '',
    title: '',
    price: 0,
    members: 0,
    duration: 0,
    rules: [],
    features: [],
    numberOfPassengers: 0,
    packages: [{ price: '', hours: '' }],
    ownerId: {
      _id: null,
      firstName: '',
      lastName: '',
      rating: 0,
      profilePicture: ''
    }
  });  
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = offer?.description.slice(0, 300);
  const userData = useAppSelector((state: RootState) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const dispatch = useAppDispatch();
  const userType = 'BoatOwner'
  const userId = offer?.ownerId._id
  const baseURL = apiUrl
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      dispatch(setAppLoader(true)); 
      setErrorMessage(''); 
      try {
        const response = await axios.get(`${baseURL}/listing/getListingById/${offerId}`);
  
        if (response.status === 200) {
          setOffer(response.data); // Store offer details in state
        } else {
          setErrorMessage('This Boat Is Not Available now');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch offer details'); 
      } finally {
        setTimeout(() => (
          dispatch(setAppLoader(false))
        ),2000)
      }
    };
  
    fetchOfferDetails();
  }, [offerId]);
  
  const toggleSave = async () => {
    const endpoint = isSaved ? `${apiUrl}/listing/removeSavedListing` : `${apiUrl}/listing/addSavedListing`;
  
    try {
      const response = await axios.post(endpoint, {
        userId: userData._id,
        listingId: offer?._id,
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
            listingId: offer?._id,
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
  }, [offer?._id, userData._id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
    const reviewerImage = item?.renterId?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
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
            onPressFirstIcon={() => userData.token ? navigation.goBack() : navigation.navigate(ScreenNames.SHAREDSCREENS)}
            iconView={styles.headerIconView}
            container={styles.headerContainer}
            arrowColor={AppColors.white}
            RightIcon={false}
            emptyViewStyle={styles.emptyView}
            emptyView={
              <View style={styles.iconView}>
            <ShareButton offerId={offer?._id} />
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
          fisrtButtonTitle={'Book Now'}
          secondButtonTitle={'Make Offer'}
          onPressFirstButton={() =>
              navigation.navigate(ScreenNames.BOOKING, { offer: offer, type: 'OwnerList', offerId: '' })}
          onPressSecondButton={() =>
              navigation.navigate(ScreenNames.SENDOFFER, { offer: offer, location: offer?.location, type: 'SendListOffer' })}
        />
      )}
    >
      <View style={styles.container}>
      {errorMessage ? (
        <LargeText size={4.6} >
          {errorMessage} 
        </LargeText>
      ) : (
        <>
        <PhotosSlider
          images={offer?.images || []}
          sliderImageWidth={width(100)}
          sliderImageHeight={width(70)}
          sliderStyle={styles.image}
          sliderContainer={styles.sliderContainer}
          enableZoom={true}
          arrowHeight={130}
        />
        <View style={styles.innerContainer}>
          <UserInfo
            image={offer?.ownerId?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            rating={offer?.ownerId?.rating}
            name={`${offer?.ownerId?.firstName} ${offer?.ownerId?.lastName}`}
            onPress={() => userData.userType === 'BoatRenter' ? navigation.navigate(ScreenNames.TOPDESTINATIONDETAILS, { TopDestination: offer?.ownerId._id, type: "OwnerListing" }) : null}
            userImageStyle={styles.userImageStyle}
            dropDown = {userData.token ? true : false}
            handleHideAndReport={hideListing}
            userId={userData._id}
            listingId={offer?._id}
            handleHide={blockUser} 
            blockUserId={offer?.ownerId._id}  
          />
          <View style={styles.addressAndTitleView}>
            <LargeText size={4.6} color={AppColors.black} textStyles={styles.title}>{offer?.title}</LargeText>
            <MediumText size={3.3} color={AppColors.grey}>{offer?.location}</MediumText>
          </View>
        </View>
        <OfferDetailCard
          packages={offer?.packages}
          members={offer?.numberOfPassengers}
          rating={offer?.ownerId?.rating}
          ratingTitle="Owner's Rating"
          packageTitle={offer?.packages.length === 1 ? "Package" : "Packages"}
        />
        <View style={styles.descriptionView}>
          <LargeText size={4.6}>The Boat</LargeText>
          <MediumText size={4} textAlign={'justify'}>
            {showFullDescription ? offer?.description : truncatedDescription}
            {offer.description?.length > 300 && (
              <TouchableOpacity onPress={toggleDescription}>
                <LargeText size={4} textStyles={styles.readMoreText}>{showFullDescription ? 'Read Less' : 'Read More'}</LargeText>
              </TouchableOpacity>
            )}
          </MediumText>
        </View>
        <OpenMapButton address={offer?.location} />
        <View style={styles.lineView}></View>
        <LargeText size={4.6} textStyles={styles.headingStyle}>Things to Know</LargeText>
        {(offer?.rules || []).map((item: string, index: number) => (
          <View key={index} style={styles.featuresView}>
            <MediumText textStyles={styles.rulesText}>{item}</MediumText>
            <MaterialIcons name='rule' size={width(5)} color={AppColors.green} />
          </View>
        ))}
        <View style={styles.lineView}></View>
        <View style={styles.reviewHeadingView}>
          <LargeText size={4.6}>Reviews</LargeText>
          {reviews.length > 0 ? (
            <Pressable onPress={() => navigation.navigate(ScreenNames.REVIEWS, { userId: offer?.ownerId._id, userType: 'BoatOwner', type: 'offerDetail' })}>
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
        {(offer?.features || []).slice(0, 5).map((item: string, index: number) => (
          <View key={index} style={styles.featuresView}>
            <MediumText textStyles={styles.rulesText}>{item}</MediumText>
            <Feather name='check-circle' size={width(5)} color={AppColors.green} />
          </View>
        ))}
        {offer.features.length > 5 && (
          <TouchableOpacity onPress={() => navigation.navigate('FullFeatureList', { features: offer?.features })}>
            <LargeText size={4} textStyles={styles.readMoreText}>View all</LargeText>
          </TouchableOpacity>
        )}
          </>
      )}
      </View>
    </ScreenWrapper>
  );
};

export default LinkOfferDetails;
