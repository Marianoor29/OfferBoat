import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  CurrencyInput,
  HourSelector,
  InputField,
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
import { width } from '../../../../utills/Dimension';
import { tripInstructionsSchema } from '../../../../utills/validationSchemas';
import styles from './styles';


type FormValues = {
  tripInstructions?: string,
};

// Google Geocoding API base URL
const GOOGLE_GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';

// Utility function to get city and country from Google API
async function getCityAndCountryFromGoogle(location: string) {
  const apiKey = 'AIzaSyDiY4TiK....8nYjMpxxQ3Gxig';
  const url = `${GOOGLE_GEOCODING_API}?address=${encodeURIComponent(location)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const addressComponents = data.results[0].address_components;
      let city = '';

      addressComponents.forEach((component: {
        short_name: string; types: string | string[]; long_name: string; 
}) => {
        if (component.types.includes('postal_town')) {
          city = component.long_name;
        } 
        else if (!city && component.types.includes('locality')) {
          city = component.long_name; 
        }
      });
      return city || 'USA';

    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

const SendOffer = ({ navigation, route }:any) => {
  const location = route.params.location;
  const offer = route.params.offer;
  const type = route.params.type;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [captainSelected, setCaptainSelected] = useState(false);
  const [price, setPrice] = useState('$0.00');
  const todayDate = new Date().toISOString().split('T')[0];
  const modalRef = useRef<ModalHandles>(null);
  const [numberOfPassenger, setNumberOfPassenger] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [disabledSend, setDisabledSend] = useState(true);
  const [selectedHours, setSelectedHours] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [fieldMessage, setFieldMessage] = useState('');
  const userData = useAppSelector((state: RootState) => state.user);
  const userId = userData._id
  const baseURL = apiUrl
  const hours = ['2', '3', '4', '6', '8'];
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const [offerLocation, setOfferLocation] = useState('');

useEffect(() => {
  async function fetchLocation() {
    const cityCountry = await getCityAndCountryFromGoogle(location);
    if (cityCountry) {
      setOfferLocation(cityCountry);
    }
  }

  fetchLocation();
}, [location]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      tripInstructions: '',
    },
    resolver: yupResolver(tripInstructionsSchema),
  });


  const decreaseMembers = () => {
    if (numberOfPassenger > 0) {
      setNumberOfPassenger(numberOfPassenger - 1);
    }
  };

  const validateFields = () => {
    if (selectedDate && selectedTime && price !== '$0.00' && numberOfPassenger > 0 && selectedHours) {
      setDisabledSend(false);
    } else {
      setDisabledSend(true);
    }
  };

  useEffect(() => {
    validateFields();
  }, [selectedDate, selectedTime, price, numberOfPassenger, selectedHours]);
 
  useEffect(() => {
    if (!selectedDate) {
      setFieldMessage('Please select a date.');
    } else if (!selectedTime) {
      setFieldMessage('Please select a time.');
    } else if (price === '$0.00') {
      setFieldMessage('Please enter a price.');
    } else if (!numberOfPassenger) {
      setFieldMessage('Please select a number of passenger.');
    } else if (!selectedHours) {
      setFieldMessage('Please select a hours.');
    } else {
      setFieldMessage('');
    }
  }, [selectedDate, selectedTime, price, numberOfPassenger,selectedHours ]);

  const sendOfferHandler = async (data: FormValues) => {
    dispatch(setAppLoader(true));
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/createOffer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location : type === 'SendCustomOffer' ? location : offerLocation,
          date: selectedDate,
          time: selectedTime,
          price,
          tripInstructions : data.tripInstructions,
          numberOfPassenger,
          hours: selectedHours,
          captain: captainSelected
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(()=>{
          modalRef?.current?.show();
        },600)
      } else {
        setErrorMessage('Failed to create offer, please try again');
      }
    } catch (error) {
      setErrorMessage('Failed to create offer, please try again');
    }
    dispatch(setAppLoader(false));
  };

  const handlePayment = async (data: FormValues) => {
    if (!price) {
      return;
    }
  
    const priceInDollars = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const amountInCents = Math.round(priceInDollars * 10); // 10 percent of total price
  
    try {
      // Fetch payment intent from your server
      const response = await fetch(`${baseURL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amountInCents, userId }) // Pass the amount and necessary IDs
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      // Extract client secret and paymentIntentId from the response
      const { clientSecret, paymentIntentId } = await response.json();
  
      // Initialize payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: clientSecret
      });
  
      if (initResponse.error) {
        return;
      }
  
      // Present the payment sheet and await the result
      const paymentResult = await presentPaymentSheet();
  
      if (paymentResult.error) {
        return; // Exit the function if payment was not successful
      }
  
      // Send booking request after confirming the payment
      await sendOfferOnList(paymentIntentId, data);
    } catch (error: any) {
      console.log('Payment Error', `Payment processing error: ${error.message}`);
    }
  };
  
  const sendOfferOnList = async (paymentIntentId: string, data: FormValues) => {
    dispatch(setAppLoader(true));
    const token = await AsyncStorage.getItem('token');
  
    try {
      // Create the request body
      const requestBody: any = {
        userId: userId,
        ownerId: offer.ownerId._id,
        listingId: offer._id,
        location: type === 'SendCustomOffer' ? location : offerLocation,
        date: selectedDate,
        time: selectedTime,
        packages: { price: price, hours: selectedHours },
        numberOfPassenger,
        captain: captainSelected,
        paymentIntentId: paymentIntentId
      };

        // Conditionally add tripInstructions if it's not empty
        if (data.tripInstructions && data.tripInstructions.trim() !== '') {
          requestBody.tripInstructions = data.tripInstructions; // Add tripInstructions only if it's not empty
      }
  
      // Send the request
      const response = await fetch(`${baseURL}/createListOffer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
         await response.json();
        setTimeout(() => {
          modalRef?.current?.show();
        }, 600);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.log('Error creating offer:', error);
    }
  
    dispatch(setAppLoader(false));
  };

  const handleDateConfirm = (date:any) => {
    const formattedDate = format(date, 'dd-MM-yyyy'); 
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
  };
  
  const submitHandler = handleSubmit((data: FormValues) => {
    // Here we determine which action to take based on the type
    if (type === 'SendCustomOffer') {
        sendOfferHandler(data); // Pass the form data to sendOfferHandler
    } else {
        handlePayment(data); // Call handlePayment directly
    }
});

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader 
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>{userData.token ? (`Publish a custom offer`) : ('')}</LargeText>}
        />
      )}
    >
        {!userData.token ? (
         <WelcomeCard
         title='Ready to Make an Offer?'
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
        <TimeSelector initialTime="08:00 AM" onTimeSelected={(time : string) => setSelectedTime(time)} />
        <View style={styles.durationView}>
          <SmallText size={3}>Budget</SmallText>
          <CurrencyInput
            value={price}
            onValueChange={setPrice}
            placeholder="Enter price"
          />
        </View>
          <InputField
           title="Trip Instructions"
            multiline
            control={control}
            name={'tripInstructions'}
            numberOfLines={6}
            inputContainer={styles.reviewContainer}
            containerStyle={styles.inputcontainerStyle}
            placeholder='Enter detailed instructions for your trip, including any special requests or preferences.'
            error={errors.tripInstructions && errors.tripInstructions.message}
            errorView={styles.errorView}
          />
        <View style={styles.hoursView}>
          <HourSelector hours={hours} onSelect={(hour:string) => setSelectedHours(hour)} />
        </View>
        <View style={styles.captionView}>
          <Pressable style={captainSelected ? styles.selectedCaptainText : styles.captionTextView} onPress={() => setCaptainSelected(true)}>
            <LargeText size={3.6}>Captained</LargeText>
          </Pressable>
          <Pressable style={captainSelected ? styles.captionTextView : styles.selectedCaptainText} onPress={() => setCaptainSelected(false)}>
            <LargeText size={3.6}>No captain</LargeText>
          </Pressable>
        </View>
        <View style={styles.membersView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={decreaseMembers}>
            <AntDesign name="minus" size={width(5)} color={AppColors.black} />
          </TouchableOpacity>
          <LargeText size={4}>{numberOfPassenger} Passengers</LargeText>
          <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={() => setNumberOfPassenger(numberOfPassenger + 1)}>
            <AntDesign name="plus" size={width(5)} color={AppColors.black} />
          </TouchableOpacity>
        </View>
        <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Your offer is has been published, check your offers tab for updates.</MediumText>
              <Button
                text='CONTINUE'
                onPress={() => {
                  modalRef?.current?.hide();
                  setTimeout(() => {
                    navigation.navigate(ScreenNames.OFFERS)
                  }, 600);
                }}
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
          text={'Publish Offer'}
          buttonStyle={styles.footerBtnStyle}
          onPress={submitHandler}
           disabled={disabledSend}
        />
         <View style={styles.bottomText}>
        <SmallText textAlign={'justify'} size={3.4} textStyles={CommonStyles.marginTop_2}>
        If a boat owner accepts your custom offer, Offerboat will apply a 10% booking fee. Please note that the full payment for your trip must be made directly to the boat owner.
        </SmallText>
        </View>
      </View>
      )}
    </ScreenWrapper>
  );
};

export default SendOffer;
