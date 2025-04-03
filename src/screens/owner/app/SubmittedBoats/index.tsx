import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, FlatList, Platform, Text, View } from 'react-native';
import { Button, LargeText, ListCard, MediumText, ModalWrapper, ScreenWrapper, SimpleHeader } from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';
import { ModalHandles } from '../../../../components/modalWrapper';
import CommonStyles from '../../../../utills/CommonStyles';
import LottieView from 'lottie-react-native';

const SubmittedBoats = ({ navigation, route }: any) => {
  const ownerId = route.params.ownerId;
  const [errorMessage, setErrorMessage] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<ModalHandles>(null);
  const confirmModalRef = useRef<ModalHandles>(null);
  const [selectedOfferId, setSelectedOfferId] = useState(null);


  const fetchSubmittedOffers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getSendOffersByUser/${ownerId}`);
      if (response.data.sendOffers) {
        // Sort offers by createdAt in descending order
        const sortedOffers = response.data.sendOffers.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setOffers(sortedOffers);
      } else {
        setErrorMessage('No submitted boats found.');
      }
    } catch (error) {
      setErrorMessage('No submitted boats found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmittedOffers();
  }, []);

const onHandleDelete = async (offerId: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/listing/DeleteBoatRequest`, {
      data: { offerId },
    });
    if (response.status === 200) {
      modalRef?.current?.show();
      setTimeout(() => {
        modalRef?.current?.hide();
        setSelectedOfferId(null);
        navigation.navigate(OwnerScreenNames.OWNEROFFERSCREEN, {refresh : true});
      }, 1000);
    }
  } catch (error) {
    console.log('Error deleting offer:', error);
  }
};

  const renderOffer = ({ item }:any) => {
    const userDetails = item.userId;
    const userProfilePicture = userDetails.profilePicture;
      const ownerImage = item.ownerId.profilePicture;
      return (
    <ListCard
        userImage={userProfilePicture}
        renterName={`${userDetails.firstName} ${userDetails.lastName}`}
        date={item.date}
        time={item.time}
        status='Pending'
        tripInstructions={item.tripInstructions}
        hours={item.packages[0].hours}
        captain={item.captain}
        passengers={item.numberOfPassengers}
        location={item.location}
        rating={userDetails.rating}
        price={item.packages[0].price}
        onPress={() => navigation.navigate(OwnerScreenNames.OWNEROFFERDETAILS, { offer: item , ownerImage: ownerImage, type: 'OfferDetail' })}
        buttonTitle={'Check Your Submitted Listing'}
        deleteRequest={true}
        onDeletePress={() => {
          setSelectedOfferId(item._id); 
          confirmModalRef?.current?.show();
        }}
  
      />
  )}

      // Disable hardware back button
      useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          };
        }, [])
      );
      
          useEffect(() => {
            navigation.setOptions({
              headerLeft: () => null,
              gestureEnabled: false,
            });
          }, [navigation]);
    
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.navigate(OwnerScreenNames.OWNEROFFERSCREEN, { refresh : true})}
          emptyView={<LargeText size={4}>Your Submitted Boats</LargeText>}
          arrowColor={AppColors.green}
        />
      )}
    >
      <View style={styles.container}>
        <LargeText size={Platform.OS === 'android' ? 3.4 : 3} textStyles={styles.subTitleStyles}>
          You Submitted These Boats for Renter's Consideration Through Their Custom Offers
        </LargeText>

        {loading ? (
          <ActivityIndicator size="large" color={AppColors.green} />
        ) : errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : (
          <FlatList
            data={offers}
            renderItem={renderOffer}
            scrollEnabled={false}
            keyExtractor={(item, index) => String(index)}
          />
        )}
       <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedModalImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Your boat request has been successfully deleted.</MediumText>
            </>
          }
        />
         <ModalWrapper
          ref={confirmModalRef}
          close={false}
          modalContainer={{ justifyContent: "center" }}
          children={
            <>
              <MediumText textAlign="center" textStyles={CommonStyles.marginTop_5}>Are you sure you want to delete this request?</MediumText>
              <View style={styles.confirmModalButton}>
                <Button
                  text={'Yes'}
                  onPress={() => {
                    confirmModalRef?.current?.hide();
                    if (selectedOfferId) {
                      onHandleDelete(selectedOfferId); 
                    }
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
}

export default SubmittedBoats;
