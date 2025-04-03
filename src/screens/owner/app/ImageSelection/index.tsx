import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator, BackHandler, FlatList, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  FilePickerModal,
  LargeText,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import { FilePickerModalRef } from '../../../../components/filePickerModal';
import { addSelectedImages, clearImages, removeSelectedImage, } from '../../../../redux/slice/imagesSlice/imagesSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import styles from './styles';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import apiUrl from '../../../../config';
import OwnerScreenNames from '../../../../navigation/ownerRoutes';
import ImageResizer from 'react-native-image-resizer';
import { useFocusEffect } from '@react-navigation/native';

const ImageSelection = ({ navigation, route }: any) => {
  const images =  route.params.images
  const listingId =  route.params.id
  const type =  route.params.type
  const dispatch = useAppDispatch();
  const selectedImages = useAppSelector((state: RootState) => state.images.selectedImages)
  const filePickerRef = useRef<FilePickerModalRef>(null);
  const [localSelectedImages, setLocalSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (type === "editImages"){
    if (images.length > 0 && images === images) {
      dispatch(addSelectedImages(images));
    } 
  }
  }, [images]);
  
  useEffect(() => {
    const totalImages = [...selectedImages, ...localSelectedImages];
    const isImageValid = totalImages.length > 0 && totalImages.length <= 20;
    setButtonEnabled(isImageValid);
  
    if (totalImages.length > 20) {
      setErrorMessage('No more than 20 images allowed');
    } else {
      setErrorMessage('');
    }
  }, [selectedImages, localSelectedImages]);
  

  const handleFilesSelected = async (images: any) => {
    setLoading(true); 
    const compressedImages: string[] = [];
    const imagePaths = Array.isArray(images) ? images.map((image) => image.path) : [images.path];

  for (const imagePath of imagePaths) {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        imagePath,   
        800, 
        600,
        'JPEG',
        60  
      );
      compressedImages.push(resizedImage.uri);
    } catch (error) {
      compressedImages.push(imagePath);
    }
  }
  setLocalSelectedImages(prevState => [...prevState, ...compressedImages]);
  setLoading(false); 
};

  const openFilePicker = () => {
    filePickerRef.current?.show();
  };

  const handleAddImages = () => {
    dispatch(addSelectedImages(localSelectedImages));
    setLocalSelectedImages([]); 
    navigation.goBack()

  };

  const handleDeleteImage = (image: string) => {
    setLocalSelectedImages(prevState => prevState.filter(img => img !== image));
    dispatch(removeSelectedImage(image));
  };

  const goBackHandler = () => {
    if (type === "editImages"){
      dispatch(clearImages());
      navigation.goBack()
    } else {
      navigation.goBack()
    }
  }

  const UpdateListingImages = async () => {
      dispatch(setAppLoader(true));
      const totalImages = [...selectedImages, ...localSelectedImages];
      try {
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        totalImages.forEach((image: any, index: any) => {
          if (typeof image === 'string') {
            // If image is a string (file path), append it directly
            formData.append('images', {
              uri: image,
              name: `image_${index}.jpg`,
              type: 'image/jpeg'
            });
          }
        });
    
        const response = await axios.put(`${apiUrl}/listing/editListingImages/${listingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(clearImages());
        navigation.navigate(OwnerScreenNames.OWNERLISTINGSCREEN,{refresh : true});
      } catch (error: any) {
          setErrorMessage("Failed to Update Listing, Please Try Again Later, or Check your Internet Connection!");
      } finally {
        dispatch(setAppLoader(false));
      }
  
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    };

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

    const handleCancle = () => {
      dispatch(clearImages());
      navigation.goBack();
    }
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return <SimpleHeader
          onPressFirstIcon={goBackHandler}
          emptyView={  <LargeText size={4}>Select images for the list</LargeText>}
          arrowColor={AppColors.green}
        />
      }}
      footerUnScrollable={() => {
        return(
          type === "editImages" ? (
            <>
            <Button text="Update Images" disabled={!buttonEnabled} onPress={UpdateListingImages} buttonStyle={styles.addButtonStyle}/>
            <Button text='Cancel' onPress={handleCancle} buttonStyle={styles.cancleButtonStyle} />
          </>
          ) : (
            <Button text="Add Images" onPress={handleAddImages} buttonStyle={styles.addButtonStyle}/>
          )
        )
      }}
     >
    <View style={styles.container}>
        <Button text="Select Images" onPress={openFilePicker} buttonStyle={styles.addButtonStyle} />
        {loading ? (
          <ActivityIndicator size="large" color={AppColors.green} />
        ) : (
        <FlatList
          scrollEnabled={false}
          data={[...selectedImages,...localSelectedImages]}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
              <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteImage(item)}>
                <Icon name="trash" size={width(4)} color={AppColors.black} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      )}
        <FilePickerModal ref={filePickerRef} onFilesSelected={handleFilesSelected} multiple 
        compressImageQuality={0.5}  imageWidth={1520} imageHeight={680}  maxFiles={20}/>
      </View>
      {errorMessage && (
          <LargeText size={3.4} color={AppColors.red} textStyles={styles.errorMessage}>{errorMessage}</LargeText>
        )}
    </ScreenWrapper>
  );
};

export default ImageSelection;
