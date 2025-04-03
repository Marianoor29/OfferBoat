import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AppLoader,
  Button,
  MediumText,
  ModalWrapper,
  OfferCard,
  OfferDetailCard,
  ScreenWrapper,
  SimpleHeader,
  SmallText,
  UserInfo
} from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

interface BoatListing {
  _id: string;
  location: string;
  dateSent: string;
  price: string;
  description: string;
  numberOfPassengers: number;
  images: string[];
  ownerId: {
    profilePicture: string;
    firstName: string;
    lastName: string;
    rating: number;
  };
  title: string;
  tripInstructions: string;
}

const CustomOffers = ({ navigation, route }: any) => {
  const baseURL = apiUrl;
  const userData = route.params.userData;
  const customOffer = route.params.offer;
  const userImage = route.params.userImage;
  const [boatListing, setBoatListing] = useState<BoatListing[]>([]);
  const [loading, setLoading] = useState(true);
  const confirmModalRef = useRef<ModalHandles>(null);
  
  const fetchBoatListings = async () => {
    try {
      const response = await axios.get(`${baseURL}/OwnerListingOnCustomOffers/${customOffer._id}`);
      const boatListingsArray = Array.isArray(response.data) ? response.data : [response.data];
      setBoatListing(boatListingsArray);
    } catch (error) {
      console.log('Error fetching boat listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoatListings();
  }, [customOffer._id]);

  const deleteCustomOffer = async () => {
    try {
       await axios.delete(`${baseURL}/deleteCustomOffer/${customOffer._id}`
      );
      setTimeout(() => {
        navigation.navigate(ScreenNames.OFFERS,{refresh: true});
      }, 300);
    } catch (error) {
      console.log('Error deleting custom offer:', error);
    }
  };

  const renderBoatListing = ({ item }: { item: BoatListing }) => {
    const imagesWithBaseURL = item.images.map((image) => `${image}`);
    const ownerImage = item.ownerId.profilePicture
    return (
      <OfferCard
        images={imagesWithBaseURL}
        boatOwnerImage={ownerImage}
        title={item.title}
        description={item.description}
        location={item.location}
        members={item.numberOfPassengers}
        buttonTitle='Check Details'
        onPress={() => navigation.navigate(ScreenNames.OFFERDETAILS, { offer: item, images: imagesWithBaseURL, ownerImage: ownerImage, type: "OwnerOffer" })}
      />
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return <SimpleHeader onPressFirstIcon={() => navigation.goBack()} />;
      }}
    >
      <View style={styles.container}>
        <View style={styles.userInfoView}>
          <UserInfo
            image={userImage}
            rating={userData?.rating}
            name={`${userData?.firstName} ${userData?.lastName}`}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.deleteView} onPress={() => confirmModalRef?.current?.show()}>
            <Ionicons name='trash-bin' size={width(6)} color={AppColors.red} />
            <SmallText size={2}>Delete Offer</SmallText>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <SmallText size={3.4} textAlign="justify" textStyles={CommonStyles.marginBottom_3}>{customOffer.tripInstructions}</SmallText>
          <OfferDetailCard
            price={customOffer.price}
            hours={customOffer.hours}
            members={customOffer.numberOfPassenger}
            startTime={customOffer.time}
            captain={customOffer.captain}
          />
        </View>
        <View style={styles.listingView}>
          {boatListing.length > 0 && (
            <SmallText size={3.4} textAlign="justify" textStyles={styles.textView}>
              These boat listings are sent by owners for your consideration through your custom offers
            </SmallText>
          )}
          {
            loading ? (
              <AppLoader isLoader={loading} />
            ) : boatListing && Array.isArray(boatListing) && boatListing.length > 0 ? (
              <FlatList
                data={boatListing}
                renderItem={renderBoatListing}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            ) : (
              <>
                <SmallText size={3}>Interested boat owners will respond by sending you details about their available boats. You can check owners boat listings on this page.</SmallText>
                <SmallText size={3} textStyles={CommonStyles.marginTop_3}>No boat listings available yet!.</SmallText>
              </>
            )
          }
        </View>
        <ModalWrapper
          ref={confirmModalRef}
          close={false}
          modalContainer={{ justifyContent: "center" }}
          children={
            <>
              <MediumText textAlign="center" textStyles={CommonStyles.marginTop_5}>Are you sure you want to delete this custom offer?</MediumText>
              <View style={styles.confirmModalButton}>
                <Button
                  text={'Yes'}
                  onPress={() => {
                    confirmModalRef?.current?.hide();
                    deleteCustomOffer()
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
      </View>
    </ScreenWrapper>
  );
};

export default CustomOffers;
