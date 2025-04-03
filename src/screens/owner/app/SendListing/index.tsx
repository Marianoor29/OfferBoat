import { yupResolver } from '@hookform/resolvers/yup';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, CurrencyInput, InputField, LargeText, MediumText, ModalWrapper, ScreenWrapper, SimpleHeader, SmallText } from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { sendListingMessageSchema } from '../../../../utills/validationSchemas';
import styles from './styles';


type FormValues = {
  message: string,
};

const SendListing = ({ navigation, route }: any) => {
  const selectedListing = route.params.selectedListing;
  const customOfferData = route.params.customOfferData;
  const ownerId = route.params.ownerId;
  const [errorMessage, setErrorMessage] = useState('');
  const [priceError, setPriceError] = useState('');
  const [price, setPrice] = useState('$0.00');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
  const modalRef = useRef<ModalHandles>(null);
  const baseURL = apiUrl;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      message: '',
    },
    resolver: yupResolver(sendListingMessageSchema),
  });
  // Watch the 'message' field to get its value
  const messageValue = watch('message');

  useEffect(() => {
    // Check if both 'price' and 'message' fields are filled to enable the button
    if (price !== '$0.00' && messageValue.trim() !== '') {
      setIsButtonDisabled(false);
      setPriceError(''); // Clear price error if conditions are met
    } else {
      setIsButtonDisabled(true); // Disable button
      if (price === '$0.00') {
        setPriceError('Price is required'); // Set price error message
      } else {
        setPriceError(''); // Clear price error if price is filled but message is empty
      }
    }
  }, [price, messageValue]);

  const sendOffer = async (data: FormValues) => {
    const offerData = {
      ownerId : ownerId,
      userId: customOfferData.userId._id,
      listingId: selectedListing._id,
      offerId: customOfferData._id,
      status: 'Pending',
      location: selectedListing.location,
      title: selectedListing.title,
      description: selectedListing.description,
      message: data.message,
      numberOfPassengers: selectedListing.numberOfPassengers,
      images: selectedListing.images,
      features: selectedListing.features,
      rules: selectedListing.rules,
      packages:{ price:price, hours:customOfferData.hours },
      date:customOfferData.date,
      time:customOfferData.time,
    };
  
    try {
      const response = await fetch(`${baseURL}/sendOffer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offerData),
      });
      if (response.ok) {
        modalRef?.current?.show();
        setTimeout(() => {
          modalRef?.current?.hide();
          navigation.navigate(OwnerScreenNames.SUBMITTEDBOATS, {ownerId : ownerId});
        }, 1000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to send offer, please try again');
      }
    } catch (error) {
      setErrorMessage('Failed to send offer, please try again');
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Send Listing</LargeText>}
          arrowColor={AppColors.green}
        />
      )}
    >
      <View style={styles.container}>
      <LargeText size={3}>Enter a price to send along with your boat listing</LargeText>
      <View style={styles.durationView}>
      <SmallText size={3}>Price</SmallText>
          <CurrencyInput
            value={price}
            onValueChange={setPrice}
            placeholder="Enter price"
          />
        </View>
        {priceError ? ( // Display price error message
            <SmallText size={3} color={AppColors.red} textAlign={'center'} textStyles={CommonStyles.marginBottom_1}>
              {priceError}
            </SmallText>
          ) : null}
      <LargeText size={3}>Write a message to send along with your boat listing</LargeText>
       <InputField
            title="Message"
            placeholder="Write a message here"
            returnKeyLabel="done"
            control={control}
            name={'message'}
            multiline
            numberOfLines={3}
            inputContainer={styles.inputContainer}
            containerStyle={styles.inputcontainerStyle}
            error={errors.message && errors.message.message}
            errorView={styles.errorView}
          />
          <SmallText size={3} color={AppColors.red} textAlign={'center'} textStyles={CommonStyles.marginBottom_1}>{errorMessage ? errorMessage : ''}</SmallText>
          <Button
          text='Send Listing'
          buttonStyle={styles.buttonStyle}
          onPress={handleSubmit(sendOffer)}
          disabled={isButtonDisabled}
          />
        <ModalWrapper
          ref={modalRef}
          close={false}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedModalImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>Your offer has been{'\n'} sent to the renter</MediumText>
            </>
          }
        />
      </View>
    </ScreenWrapper>
  );
}

export default SendListing;
