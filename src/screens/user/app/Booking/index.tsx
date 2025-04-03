import { useStripe } from '@stripe/stripe-react-native';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Button,
  LargeText,
  MediumText,
  ModalWrapper,
  ScreenWrapper,
  SimpleHeader,
  SmallText,
  TimeSelector,
  WelcomeCard
} from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import styles from './styles';

const Booking = ({ navigation, route }: any) => {
  const Offer = route.params.offer;
  const dispatch = useAppDispatch();
  const baseURL = apiUrl
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];
  const modalRef = useRef<ModalHandles>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState(true);
  const [offerPackage, setPackage] = useState<{ hours: number, price: string } | null>(null);
  const userData = useAppSelector((state: RootState) => state.user);
  const userId = userData._id
  const [errorMessage, setErrorMessage] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [fieldMessage, setFieldMessage] = useState('');

  const handleDateConfirm = (date:any) => {
    const formattedDate = format(date, 'dd-MM-yyyy');
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const renderItem = ({ item }: { item: { hours: number, price: string } }) => {
    const isSelected = offerPackage?.hours === item.hours && offerPackage?.price === item.price;
    return (
      <Pressable
        style={[styles.packagesView, isSelected && styles.selectPackageView]}
        onPress={() => setPackage(item)}
      >
        <View style={styles.packageList}>
          <MediumText size={3.4}>Hours</MediumText>
          <MediumText textStyles={styles.smallText}>{item.hours}</MediumText>
        </View>
        <View style={styles.packageList}>
          <MediumText size={3.4}>Price</MediumText>
          <MediumText textStyles={styles.smallText}>{item.price}</MediumText>
        </View>
      </Pressable>
    );
  };

  const handlePayment = async () => {
    if (!offerPackage) {
      return;
    }
  
    const priceInDollars = parseFloat(offerPackage.price.replace(/[^0-9.-]+/g, ""));
    const amountInCents = Math.round(priceInDollars * 10); // Convert to 10% amount
  
    try {
      // Fetch payment intent from your server
      const response = await fetch(`${baseURL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amountInCents, userId: userId })
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
  
      // Send booking request after confirming the payment
      await sendBookingHandler(paymentIntentId); // Pass paymentIntentId
    } catch (error: any) {
      console.log('Payment Error:', `Payment processing error: ${error.message}`);
    }
  };

  const sendBookingHandler = async (paymentIntentId: string) => {
    const bookingData = {
      userId: userId,
      listingId: Offer._id,
      ownerId: Offer.ownerId._id,
      date: selectedDate,
      time: selectedTime,
      package: offerPackage,
      numberOfPassenger: Offer.numberOfPassengers,
      location: Offer.location,
      status: 'Pending',
      paymentIntentId: paymentIntentId
    };
  
    dispatch(setAppLoader(true));
  
    try {
      const response = await fetch(`${baseURL}/bookingRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });
  
      if (response.ok) {
        setTimeout(() => {
          modalRef?.current?.show();
      }, 600)
       
      } else {
        setErrorMessage('Failed to send booking request, please try again ');
        setTimeout(() => {
          setErrorMessage("")
        },1000)
      }
    } catch (error) {
      setErrorMessage('Failed to send booking request, please try again ');
      setTimeout(() => {
        setErrorMessage("")
      },1000)
    }
  
    dispatch(setAppLoader(false));
  };

  const validateFields = () => {
    if (selectedDate && selectedTime && offerPackage !== null) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  useEffect(() => {
    validateFields();
  }, [selectedDate, selectedTime, offerPackage]);

  useEffect(() => {
    if (!selectedDate) {
      setFieldMessage('Please select a date.');
    } else if (!selectedTime) {
      setFieldMessage('Please select a time.');
    } else if (!offerPackage) {
      setFieldMessage('Please select a package.');
    } else {
      setFieldMessage('');
    }
  }, [selectedDate, selectedTime, offerPackage]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}> {userData.token ? (`Send Booking Request`) : ('')}</LargeText>}
        />
      )}
    >
      {!userData.token ? (
         <WelcomeCard
         title='Ready to Book a Trip?'
         onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
         />
      ) : userData.userType === 'BoatOwner' && userData.token ? (
        <WelcomeCard
        title='Please create a renter account to book this boat'
        onPress={() => navigation.navigate(ScreenNames.SHAREDSCREENS)}
        />
      ) : (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.calenderView} onPress={() =>  setDatePickerVisibility(true)}>
          <SmallText size={3}>Date</SmallText>
          <LargeText textStyles={styles.durationInput}>{selectedDate ? selectedDate : 'Select your trip date'}</LargeText>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={()=> setDatePickerVisibility(false)}
          minimumDate={new Date(todayDate)}
        />
        <TimeSelector initialTime="08:00 AM" onTimeSelected={(time: string) => setSelectedTime(time)} />
        <LargeText size={4}>Select Package</LargeText>
        <FlatList
          data={Offer.packages}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2} >Booking request sent!{'\n'} You will be contacted shortly</MediumText>
              <Button
                text='Close'
                onPress={() => {
                  modalRef?.current?.hide();
                  setTimeout(() => {
                    navigation.navigate(ScreenNames.OFFERS);
                  }, 300);
                }}
                buttonStyle={styles.footerBtnStyle}
              />
            </>
          }
        />
        {errorMessage && (
          <SmallText size={3.4} color={AppColors.red} textStyles={CommonStyles.marginTop_1}>{errorMessage}</SmallText>
        )}
        {fieldMessage && (
          <SmallText size={3.4} color={AppColors.red} textStyles={CommonStyles.marginTop_1}>{fieldMessage}</SmallText>
        )}
        <Button
          text="Book Now"
          buttonStyle={styles.footerBtnStyle}
          onPress={handlePayment}
          disabled={disableButton}
        />
        <View style={styles.bottomText}>
        <SmallText textAlign={'justify'} size={3.4} textStyles={CommonStyles.marginTop_2}>
         By booking now you will be charged a 10% non-refunable booking fee. The full price of your trip must be paid directly to the boat owner.
        </SmallText>
        </View>
      </View>
       )}
    </ScreenWrapper>
  );
};

export default Booking;
