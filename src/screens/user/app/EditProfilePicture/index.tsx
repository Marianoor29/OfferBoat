import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  FilePickerModal,
  LargeText,
  MediumText,
  ModalWrapper,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import { FilePickerModalRef } from '../../../../components/filePickerModal';
import { ModalHandles } from '../../../../components/modalWrapper';
import apiUrl from '../../../../config';
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice'; // Adjust import path if necessary
import { useAppDispatch } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';
import { setUserData } from '../../../../redux/slice/user/userSlice';

const EditProfilePicture = ({ navigation, route }: any) => {
  const userId = route.params.id;
  const userImage = route.params.userImage;
  const dispatch = useAppDispatch();
  const modalRef = useRef<ModalHandles>(null);
  const showProfileModal = useRef<FilePickerModalRef>(null);
  const [profImage, setProfImage] = useState(userImage);
  const [errorMessage, setErrorMessage] = useState('');

  const updateProfilePicture = async () => {
    dispatch(setAppLoader(true));
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('profilePicture', {
        uri: profImage,
        type: 'image/jpeg',
        name: 'profilePicture.jpg'
      });

       await axios.post(`${apiUrl}/uploadProfilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTimeout(() => {
        dispatch(setUserData({profilePicture: profImage}))
        modalRef?.current?.show();
      },600)
    } catch (error) {
      setErrorMessage('Failed to update profile picture. Please try again.');
    } finally {
      dispatch(setAppLoader(false));
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader 
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Edit your profile picture</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
      
          <Image source={{ uri: profImage }} style={styles.userImage} />
          <Pressable style={styles.cameraIconView} onPress={() => showProfileModal?.current?.show()}>
            <FontAwesome name={'camera'} size={width(5)} color={AppColors.black} />
          </Pressable>
        
        <FilePickerModal
          ref={showProfileModal}
          onFilesSelected={(k) => setProfImage(k.path)}
          imageWidth={1024}
          imageHeight={1024}
          compressImageQuality={0.2}
        />
        {errorMessage ? (
          <MediumText textAlign="center" textStyles={{ color: AppColors.red }}>
            {errorMessage}
          </MediumText>
        ) : null}
        <View style={styles.btnContainer}>
          <Button
            onPress={updateProfilePicture}
            text={'Save'}
            buttonStyle={styles.btnStyle}
          />
          <Button
            onPress={() => navigation.goBack()}
            text={'Cancel'}
            buttonStyle={styles.btnStyle}
          />
        </View>
        <ModalWrapper
          ref={modalRef}
          onClose={() => modalRef?.current?.hide()}
          children={
            <>
              <LottieView source={require('../../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
              <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>
                Your profile picture has {'\n'} been updated
              </MediumText>
              <Button
                text='Close'
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

export default EditProfilePicture;
