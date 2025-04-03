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
import { setAppLoader } from '../../../../redux/slice/config/loaderSlice';
import { useAppDispatch } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';
import { setUserData } from '../../../../redux/slice/user/userSlice';

const EditOwnerCoverPicture = ({ navigation , route}: any) => {
  const userId = route.params.id;
  const coverImage = route.params.coverImage;
  const dispatch = useAppDispatch();
  const modalRef = useRef<ModalHandles>(null);
  const showProfileModal = useRef<FilePickerModalRef>(null);
  const [image, setImage] = useState(coverImage);
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = apiUrl;

  const updateCoverPicture = async () => {
    dispatch(setAppLoader(true));
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('coverPicture', {
        uri: image,
        type: 'image/jpeg',
        name: 'coverPicture.jpg'
      });

      const response = await axios.post(`${baseURL}/uploadCoverPicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTimeout(() => {
        dispatch(setUserData({coverPicture: image}))
        modalRef?.current?.show();
      },600)
    } catch (error) {
      setErrorMessage('Failed to update cover picture. Please try again.');
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
        emptyView={<LargeText size={4}>Edit your cover picture</LargeText>}
        arrowColor={AppColors.green}
      />
    )}
  >
    <View style={styles.container}>
      <View>
        <Image source={{ uri: image }} style={styles.userImage} />
        <Pressable style={styles.cameraIconView} onPress={() => showProfileModal?.current?.show()}>
          <FontAwesome name={'camera'} size={width(5)} color={AppColors.black} />
        </Pressable>
      </View>
      <FilePickerModal
        ref={showProfileModal}
        onFilesSelected={(k) => setImage(k.path)}
        imageWidth={1024}
        imageHeight={780}
        compressImageQuality={ 0.2 } 
      />
      {errorMessage ? (
        <MediumText textAlign="center" textStyles={{ color: AppColors.red }}>
          {errorMessage}
        </MediumText>
      ) : null}
      <View style={styles.btnContainer}>
        <Button
          onPress={updateCoverPicture}
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
              Your cover picture has {'\n'} been updated
            </MediumText>
            <Button
              text='Close'
              buttonStyle={styles.closeBtn}
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

export default EditOwnerCoverPicture;
