import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import {
  BoatCategoryDropdown,
  Button,
  DropDownButton,
  InputField,
  LargeText,
  PackageSelection,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { clearFeatures } from '../../../../redux/slice/featuresSlice/featuresSlice';
import { clearImages } from '../../../../redux/slice/imagesSlice/imagesSlice';
import { clearRules } from '../../../../redux/slice/rulesSlice/rulesSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import { BoatCategories, BoatLength, BoatManufacturer } from '../../../../utills/enum';
import { addOfferSchema } from '../../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  title: string,
  description: string,
};

const AddOffer = ({ navigation, route }: any) => {
  const location = route.params.location;
  const [numberOfPassenger, setNumberOfPassenger] = useState<number>(0);
  const descriptionRef = useRef<TextInput>(null);
  const dispatch: AppDispatch = useDispatch();
  const rules = useAppSelector((state: RootState) => state.rules.rules);
  const images = useAppSelector((state: RootState) => state.images.selectedImages);
  const features = useAppSelector((state: RootState) => state.features.features);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const userData = useAppSelector((state: RootState) => state.user);
  const ownerId = userData._id;
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [fieldMessage, setFieldMessage] = useState('');
  const [boatCategory, setBoatCategory] = useState<string | undefined>(undefined);
  const [boatManufacturer, setBoatManufacturer] = useState<string | undefined>(undefined);
  const [lengthRange, setLengthRange] = useState<string | undefined>(undefined);
  const [packages, setPackages] = useState([
    { id: 1, price: '$0.00', hours: '' }
  ]);
  const hoursOptions = ['2', '3', '4', '6', '8'];

  const handlePriceChange = (id: number, price: string) => {
    const updatedPackages = packages.map(pkg =>
      pkg.id === id ? { ...pkg, price } : pkg
    );
    setPackages(updatedPackages);
  };

  const handleHoursChange = (id: number, hours: string) => {
    const updatedPackages = packages.map(pkg =>
      pkg.id === id ? { ...pkg, hours } : pkg
    );
    setPackages(updatedPackages);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
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
    const arePackagesValid = packages.every(pkg => pkg.hours !== "" && pkg.price !== "$0.00");
    const isMembersValid = numberOfPassenger > 0;
    const isImageValid = images.length > 0 && images.length <= 20;
    const isRulesValid = rules.length > 0;
    const isFeaturesValid = features.length > 0;
    const isBoatCategory = !!boatCategory;
    const isboatManufacturer = !!boatManufacturer; 
    const islengthRange = !!lengthRange; 
  
    // Check if any field is missing
    const isFormValid = isTitleValid && isDescriptionValid;
    const areAllFieldsFilled = isFormValid && arePackagesValid && isMembersValid && isImageValid && isRulesValid && isFeaturesValid && isBoatCategory && isboatManufacturer && islengthRange;
  
    if (images.length > 20) {
      setWarningMessage('No more than 20 images allowed'); // Fixed the message to 10 as per your condition
    } else {
      setWarningMessage('');
    }
    // Update button state and field message
    setButtonEnabled(areAllFieldsFilled);
  
    if (!areAllFieldsFilled) {
      setFieldMessage('Please fill all fields');
    } else {
      setFieldMessage('');
    }
  }, [watchFields, packages, numberOfPassenger, images, rules, features, boatCategory, boatManufacturer, lengthRange]);
  

  const onCreateOffer = async (data: FormValues) => {
    if (!buttonEnabled) {
      // Prevent submission if the button is disabled
      setFieldMessage('Please fill all fields');
      return;
    }
    const newOffer = {
      location: location,
      title: data.title,
      description: data.description,
      packages: packages,
      numberOfPassengers: numberOfPassenger,
      features: features,
      images: images,
      rules: rules,
      ownerId: ownerId,
      boatCategory: boatCategory,
      boatManufacturer: boatManufacturer,
      lengthRange: lengthRange,
    };

    try {
      dispatch(setAppLoader(true)); // Show loader
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('location', newOffer.location);
      formData.append('title', newOffer.title);
      formData.append('description', newOffer.description);
      formData.append('numberOfPassengers', newOffer.numberOfPassengers);
      formData.append('ownerId', newOffer.ownerId);
      formData.append('boatCategory', newOffer.boatCategory);
      formData.append('boatManufacturer', newOffer.boatManufacturer);
      formData.append('lengthRange', newOffer.lengthRange);
      newOffer.packages.forEach((pkg, index) => {
        formData.append(`packages[${index}][hours]`, pkg.hours);
        formData.append(`packages[${index}][price]`, pkg.price);
      });
      newOffer.features.forEach((feature: any, index: any) => {
        formData.append(`features[${index}]`, feature);
      });

      newOffer.rules.forEach((rule: any, index: any) => {
        formData.append(`rules[${index}]`, rule);
      });

      images.forEach((imagePath: any, index: any) => {
        console.log(imagePath, index ,'index')
        formData.append('images', {
          uri: imagePath,
          name: `image${index}.jpg`,
          type: 'image/jpeg'
        });
      });

      const response = await axios.post(
        `${apiUrl}/listing/createList`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      // Clear data after successful submission
      dispatch(clearImages());
      dispatch(clearFeatures());
      dispatch(clearRules());
      dispatch(setAppLoader(false)); // Hide loader

      // Navigate to another screen or show a confirmation message
      navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN,{refresh : true});
    } catch (error: any) {
      setErrorMessage("Failed to Create Listing, Please Try Again Later, or Check your Internet Connection!");
      dispatch(setAppLoader(false)); // Hide loader

      // Clear errorMessage after 1000ms
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCancle = () => {
    dispatch(clearImages());
    dispatch(clearFeatures());
    dispatch(clearRules());
    navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN);
  }

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
            onPressFirstIcon={() => navigation.goBack()}
            emptyView={<LargeText size={4}>Create a new list</LargeText>}
            arrowColor={AppColors.green}
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
            error={errors.title && errors.title.message}
            errorView={styles.errorView}
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
            <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={decreaseMembers}>
              <AntDesign name="minus" size={width(5)} color={AppColors.black} />
            </TouchableOpacity>
            <LargeText size={4}>{numberOfPassenger} Passengers</LargeText>
            <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={() => setNumberOfPassenger(numberOfPassenger + 1)}>
              <AntDesign name="plus" size={width(5)} color={AppColors.black} />
            </TouchableOpacity>
          </View>
        </View>
        <DropDownButton
          title="Select Images"
          onPress={() => navigation.navigate(OwnerScreenNames.IMAGESELECTION, {images: null, type : 'AddImages', id : null})}
          onPressEdit={() => navigation.navigate(OwnerScreenNames.IMAGESELECTION, {images: null, type : 'AddImages', id : null})}
        />
        <Pressable onPress={() => navigation.navigate(OwnerScreenNames.ADDFEATURES)} style={styles.featuresBtn}>
          <LargeText size={4}>Add Features</LargeText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(OwnerScreenNames.ADDRULES)} style={styles.featuresBtn}>
          <LargeText size={4}>Add rules of the boat</LargeText>
        </Pressable>
        <BoatCategoryDropdown 
        categories={BoatLength} 
        onSelect={handleLengthRange} 
        title="Select a Boat Length" 
        selectedValue={lengthRange}
        />
        <BoatCategoryDropdown 
        categories={BoatCategories} 
        onSelect={handleCategorySelect} 
        title="Select a Boat Category" 
        selectedValue={boatCategory}
        />
        <BoatCategoryDropdown 
        categories={BoatManufacturer} 
        onSelect={handleManufacturerSelect} 
        title="Select a Boat Manufacturer"
        selectedValue={boatManufacturer}
        />
        {errorMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>{errorMessage}</LargeText>
        )}
        {warningMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>{warningMessage}</LargeText>
        )}
        {fieldMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>
            {fieldMessage}
          </LargeText>
        )}
        <Button
          text="Create Offer"
          buttonStyle={styles.footerBtnStyle}
          onPress={handleSubmit(onCreateOffer)}
          disabled={!buttonEnabled}
        />
        <Button
          text='Cancel'
          onPress={handleCancle}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddOffer;
