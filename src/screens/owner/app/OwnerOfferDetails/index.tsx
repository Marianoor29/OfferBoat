import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppLoader, BoatDetails, Button, LargeText, MediumText, ModalWrapper, OfferDetailCard, OpenMapButton, PhotosSlider, ReviewBox, ScreenWrapper, ShareButton, SimpleHeader, SmallText, UserInfo } from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ScreenNames from '../../../../navigation/routes';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

const OwnerOfferDetails = ({ navigation, route }: any) => {
  const baseURL = apiUrl;
  const offer = route.params.offer
  const type = route.params.type
  const ownerImage = route.params.ownerImage
  const images = offer?.images.map((image: any) => `${image}`);
  const modalRef = useRef<ModalHandles>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = offer.description.slice(0, 300);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const userType = 'BoatOwner'
  const userId = offer.ownerId._id

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
    const ownerImage = item.renterId.profilePicture;
    return (
      <ReviewBox
        reviewerName={`${item.renterId.firstName} ${item.renterId.lastName}`}
        reviewerImage={ownerImage}
        reviewDate={new Date(item.createdAt).toLocaleDateString()}
        reviewText={item.reviewText}
        rating={item.rating}
      />
    );
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
          RightIcon={false}
          emptyViewStyle={styles.emptyView}
          emptyView={
            <View style={styles.iconView}>
            <ShareButton offerId={offer._id} />
            {type === 'Listing' ? 
            <Pressable onPress={() => navigation.navigate(OwnerScreenNames.IMAGESELECTION, { images: offer.images , type : 'editImages', id : offer._id})}
            style={styles.editImagesButton}>
             <AntDesign name="edit" color={AppColors.white} size={width(4)} /> 
             </Pressable>
             : null}
            </View>
          }
        />
      }}
      footerUnScrollable={() => (
        offer?.listingId?.message === 'This listing has been deleted' && (
          <View style={styles.footerToShowInRenterSide}>
            <LargeText size={3.4} color={AppColors.white}>Boat not available</LargeText>
          </View>
        )
      )} >
      <View style={styles.container}>
        <PhotosSlider
          images={images}
          sliderImageWidth={width(100)}
          sliderImageHeight={width(70)}
          sliderStyle={styles.image}
          sliderContainer={styles.sliderContainer}
          enableZoom={true}
          arrowHeight={130}
        />
        <View style={styles.innerContainer}>
        {offer.status === 'Blocked' && (
        <View style={styles.blockTextStyle}>
      <LargeText size={3} color={AppColors.red}>
      This listing has been blocked by public due to multiple reports and will be automatically removed from the platform within 24 hours.
        </LargeText>
      </View>
      )}
          <View style={styles.topContainer}>
            <UserInfo
              image={ownerImage ? ownerImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
              rating={offer.ownerId.rating}
              name={`${offer.ownerId.firstName} ${offer.ownerId.lastName}`}
            />
            {type === 'Listing' && (
              <Pressable style={styles.editButton}
                onPress={() => navigation.navigate(OwnerScreenNames.EDITOFFER, { offer: offer })}>
                <AntDesign name="edit" color={AppColors.black} size={width(5)} />
              </Pressable>
            )}
          </View>
          <View style={styles.addressAndTitleView}>
            <LargeText size={4.6} color={AppColors.black} textStyles={styles.title}>{offer.title}</LargeText>
            <MediumText size={3.3} color={AppColors.grey}>{offer.location}</MediumText>
          </View>
        </View>
        {offer.message && (
          <View style={styles.ownerMessageView}>
            <LargeText size={3.4}>Your Message</LargeText>
            <SmallText size={3.4}>{offer.message}</SmallText>
          </View>
        )}
        <OfferDetailCard
          packages={offer.packages}
          members={offer.numberOfPassengers}
          rating={offer.ownerId.rating}
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
            <Pressable onPress={() => navigation.navigate(ScreenNames.REVIEWS, { userId: offer.ownerId._id, userType: 'BoatOwner', type: type === 'OfferDetail' ? 'offerDetail' : 'ownerOfferDetail' })}>
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
          <TouchableOpacity onPress={() => navigation.navigate(OwnerScreenNames.FEATURELIST, { features: offer.features })}>
            <LargeText size={4} textStyles={styles.readMoreText}>View all</LargeText>
          </TouchableOpacity>
        )}
        <ModalWrapper
          ref={modalRef}
          onClose={() => modalRef?.current?.hide()}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2} >Your booking request{'\n'} sent to the owner</MediumText>
              <Button
                text='CONTINUE'
                onPress={() => {
                  modalRef?.current?.hide()
                  setTimeout(() => {
                    navigation.goBack()
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

export default OwnerOfferDetails;
