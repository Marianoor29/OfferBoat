import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BackHandler, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import {
  BoatCategoryDropdown,
  Button,
  InputField,
  LargeText,
  ModalWrapper,
  PackageSelection,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { addFeature, clearFeatures } from '../../../../redux/slice/featuresSlice/featuresSlice';
import { clearImages } from '../../../../redux/slice/imagesSlice/imagesSlice';
import { removeLocation } from '../../../../redux/slice/locationSlice/locationSlice';
import { addRules, clearRules } from '../../../../redux/slice/rulesSlice/rulesSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import { addOfferSchema } from '../../../../utills/validationSchemas';
import styles from './styles';
import { BoatCategories, BoatLength, BoatManufacturer } from '../../../../utills/enum';

type FormValues = {
  title: string,
  description: string,
};

const EditOffer = ({ navigation, route }: any) => {
  const offer = route.params.offer;
  const location = offer.location;
  const [numberOfPassenger, setNumberOfPassenger] = useState<number>(offer.numberOfPassengers || 0);
  const descriptionRef = useRef<TextInput>(null);
  const dispatch: AppDispatch = useDispatch();
  const rules = useAppSelector((state: RootState) => state.rules.rules);
  const features = useAppSelector((state: RootState) => state.features.features);
  const locationSlice = useAppSelector((state: RootState) => state.location.location);
  const rulesArray = offer.rules;
  const featuresArray = offer.features
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [fieldMessage, setFieldMessage] = useState('');
  const initialPackages = offer.packages?.map((pkg: { id: any; }, index: number) => ({ ...pkg, id: pkg.id || index + 1 })) || [{ id: 1, price: '$0.00', hours: '' }];
  const [packages, setPackages] = useState(initialPackages);
  const [boatCategory, setBoatCategory] = useState<string | null>(offer?.boatCategory || 'Other');
  const [boatManufacturer, setBoatManufacturer] = useState<string | null>(offer?.boatManufacturer || 'Other');
  const [lengthRange, setLengthRange] = useState<string | null>(offer?.lengthRange || '3 inches');
  const hoursOptions = ['2', '3', '4', '6', '8'];
  const confirmModalRef = useRef<ModalHandles>(null);

  const handlePriceChange = (id: number, price: string) => {
    const updatedPackages = packages.map((pkg: { id: number; }) =>
      pkg.id === id ? { ...pkg, price } : pkg
    );
    setPackages(updatedPackages);
  };

  const handleHoursChange = (id: number, hours: string) => {
    const updatedPackages = packages.map((pkg: { id: number; }) =>
      pkg.id === id ? { ...pkg, hours } : pkg
    );
    setPackages(updatedPackages);
  };

  useEffect(() => {
    if(rulesArray.length > 0 && rulesArray === rulesArray) {
      rulesArray.map((item:any) => dispatch(addRules(item)))
    }
    if(featuresArray.length > 0 && featuresArray === featuresArray) {
      featuresArray.map((item:any) => dispatch(addFeature(item)))
    }
  }, [rulesArray,featuresArray, dispatch]);

  useEffect(() => {
    setBoatCategory(offer.boatCategory || 'Other');
    setBoatManufacturer(offer.boatManufacturer || 'Other');
    setLengthRange(offer.lengthRange || '3 inches');
  }, [offer]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      title: offer.title ? offer.title : '',
      description: offer.description ? offer.description : '',
    },
    resolver: yupResolver(addOfferSchema),
  });
  const watchFields = watch(['title', 'description']);
  
  const decreaseMembers = () => {
    if (numberOfPassenger > 0) {
      setNumberOfPassenger(numberOfPassenger - 1);
    }
  };

  useEffect(() => {
    const isTitleValid = !!watchFields[0];
    const isDescriptionValid = !!watchFields[1];
    
    // Check if any package has invalid hours or price
    const arePackagesValid = packages.every((pkg: { hours: string; price: string; }) => pkg.hours !== "" && pkg.price !== "$0.00");
    const isMembersValid = numberOfPassenger > 0;
    const isRulesValid = rules.length > 0;
    const isFeaturesValid = features.length > 0;
    const isBoatCategory = !!boatCategory;
    const isboatManufacturer = !!boatManufacturer; 
    const islengthRange = !!lengthRange; 
  
    // Check if any field is missing
    const isFormValid = isTitleValid && isDescriptionValid;
    const areAllFieldsFilled = isFormValid && arePackagesValid && isMembersValid &&  isRulesValid && isFeaturesValid && isBoatCategory && isboatManufacturer && islengthRange;
  
    // Update button state and field message
    setButtonEnabled(areAllFieldsFilled);
  
    if (!areAllFieldsFilled) {
      setFieldMessage('Please fill all fields');
    } else {
      setFieldMessage('');
    }
  }, [watchFields, packages, numberOfPassenger, rules, features, boatCategory, boatManufacturer, lengthRange]);
  

  const handleUpdateOffer = async (data: FormValues) => {
    const id = offer._id; 
    const updatedOffer = {
      title: data.title,
      description: data.description,
      rules: rules, 
      features: features,
      packages: packages,
      numberOfPassengers: numberOfPassenger,
      location: locationSlice === '' ? location : locationSlice,
      boatCategory: boatCategory,
      boatManufacturer: boatManufacturer,
      lengthRange: lengthRange,
    };
    dispatch(setAppLoader(true));
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.put(`${apiUrl}/listing/editList/${id}`, updatedOffer, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(clearFeatures());
      dispatch(clearRules());
      dispatch(removeLocation())
      navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN,{refresh : true});
    } catch (error: any) {
        setErrorMessage("Failed to Update Listing, Please Try Again Later, or Check your Internet Connection!");
    } finally {
      dispatch(setAppLoader(false));
    }

    // Clear errorMessage after 1000ms
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleCancle = () => {
    dispatch(clearFeatures());
    dispatch(clearRules());
    dispatch(removeLocation());
    navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN,{refresh : false});
  }
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

    const handleDeleteOffer = async () => {
      const id = offer._id;
      dispatch(setAppLoader(true));
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.delete(`${apiUrl}/listing/deleteList/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(clearImages());
        dispatch(clearFeatures());
        dispatch(clearRules());
        dispatch(removeLocation());
        navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN,{refresh : true});
      } catch (error) {
        setErrorMessage('Failed to delete listing. Please try again.');
      } finally {
        dispatch(setAppLoader(false));
      }
    };

  const handleCategorySelect = (value: string) => {
    setBoatCategory(value);
  };
  const handleManufacturerSelect = (value: string) => {
    setBoatManufacturer(value);
  };
  const handleLengthRange = (value: string) => {
    setLengthRange(value);
  };

  
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <SimpleHeader
            emptyView={<LargeText size={4}>Edit Offer</LargeText>}
            RightIcon={
              <Ionicons name='trash-bin' size={width(6)} color={AppColors.red} />
            }
            onPressRightIcon={() => confirmModalRef?.current?.show()}
            rightIconView={styles.headerIconView}
            emptyViewStyle={styles.headerTitle}
          />
        );
      }}>
      <View style={styles.container}>
        <View>
          <InputField
            title="Title"
            placeholder="Write a title"
            returnKeyLabel="next"
            control={control}
            name={'title'}
            onSubmitEditing={() => descriptionRef?.current?.focus()}
            containerStyle={styles.inputcontainerStyle}
          />
          <InputField
            ref={descriptionRef}
            title="Description"
            placeholder="Write a description"
            returnKeyLabel="done"
            control={control}
            name={'description'}
            multiline
            numberOfLines={3}
            inputContainer={styles.inputContainer}
            containerStyle={styles.inputcontainerStyle}
            error={errors.description && errors.description.message}
            errorView={styles.errorView}
          />
          <LargeText size={4}>Select packages</LargeText>
          <View style={styles.packageStyles}>
          <PackageSelection
            packages={packages}
            setPackages={setPackages}
            onPriceChange={handlePriceChange}
            onHoursChange={handleHoursChange}
            hoursOptions={hoursOptions}
          />
          </View>
          <View style={styles.membersView}>
            <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={() => setNumberOfPassenger(numberOfPassenger + 1)}>
              <AntDesign name="plus" size={width(5)} color={AppColors.black} />
            </TouchableOpacity>
            <LargeText size={4}>{numberOfPassenger} Passengers</LargeText>
            <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={decreaseMembers}>
              <AntDesign name="minus" size={width(5)} color={AppColors.black} />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate(OwnerScreenNames.ADDFEATURES)} style={styles.featuresBtn}>
          <LargeText size={4}>Add Features</LargeText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(OwnerScreenNames.ADDRULES)} style={styles.featuresBtn}>
          <LargeText size={4}>Add rules of the boat</LargeText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(OwnerScreenNames.OWNERLOCATIONSCREEN, {type : 'updateLocation'})} style={styles.featuresBtn}>
          <LargeText size={4}>Update location</LargeText>
        </Pressable>
        <BoatCategoryDropdown categories={BoatLength} onSelect={handleLengthRange} title="Select a Boat Length"  selectedValue={offer?.lengthRange}/>
        <BoatCategoryDropdown categories={BoatCategories} onSelect={handleCategorySelect} title="Select a Boat Category"  selectedValue={offer?.boatCategory} />
        <BoatCategoryDropdown categories={BoatManufacturer} onSelect={handleManufacturerSelect} title="Select a Boat Manufacturer"   selectedValue={offer?.boatManufacturer}/>

        {errorMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>{errorMessage}</LargeText>
        )}
         {fieldMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>
            {fieldMessage}
          </LargeText>
        )}
        <Button
          text='Update Offer'
          buttonStyle={styles.footerBtnStyle}
          onPress={handleSubmit(handleUpdateOffer)}
          disabled={!buttonEnabled}
        />
        <Button
          text='Cancel'
          onPress={handleCancle}
        />
      </View>
      <ModalWrapper
          ref={confirmModalRef}
          close={false}
          modalContainer={{ justifyContent: "center" }}
          children={
            <>
              <LargeText size={3} textAlign="center" textStyles={CommonStyles.marginTop_5}>Are you sure you want to delete this listing? {`\n`}  All pending requests related to this listing on the custom offers,{`\n`}  will also be deleted.</LargeText>
              <View style={styles.confirmModalButton}>
                <Button
                  text={'Yes'}
                  onPress={handleDeleteOffer}
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
    </ScreenWrapper>
  );
};

export default EditOffer;
