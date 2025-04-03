import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, LargeText, MediumText, ModalWrapper } from '../../../components';
import { ModalHandles } from '../../../components/modalWrapper';
import apiUrl from '../../../config';
import { handleLogout } from '../../../redux/slice/auth/authSlice';
import { setAppLoader } from '../../../redux/slice/config/loaderSlice';
import { clearUserData } from '../../../redux/slice/user/userSlice';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import styles from './styles';

type FormValues = {
    token: any;
  };

const DeleteAccount = ({ cancelHandler, closeHandler }: any) => {
    const userData = useAppSelector((state: RootState) => state.user);
    const [buttonDisable, setButtonDisable] = useState(true);
    const deleteModalRef = useRef<ModalHandles>(null);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const checkAcceptedBookings = async () => {
        try {
          const response = await fetch(`${apiUrl}/acceptedBookingsCount?userId=${userData._id}&userType=${userData.userType}`);
          const data = await response.json();
          if(data.acceptedBookingsCount === 0) {
            setButtonDisable(false)
          }
        } catch (error) {
          console.log('Error fetching accepted bookings count:', error);
        }
      };

      useEffect(() => {
        if (userData._id){
        checkAcceptedBookings()}
      }, [userData._id])

    const deleteUser =  async () => {
        dispatch(setAppLoader(true)); 
        try {
          const response = await axios.post(`${apiUrl}/user/deleteUserById`, { id: userData._id });
          if (response){
            await AsyncStorage.removeItem('token');
            dispatch(handleLogout());
            dispatch(clearUserData());
          }
        }
          catch (error) {
            console.log('Error deleting user');
          } finally {
            dispatch(setAppLoader(false)); 
          }
      }
    return (
        <View style={styles.deleteContainer}>
            <LargeText size={3} textAlign="center" textStyles={CommonStyles.marginTop_5}>Before deleting your account please ensure you have no 'Accepted' bookings. If you do, you won't be able to delete your account until all bookings are marked as 'Completed.' Try again once your bookings are completed.</LargeText>
            <ModalWrapper
        ref={deleteModalRef}
        onClose={() => deleteModalRef?.current?.hide()}
        modalContainer={{ justifyContent: "center" }}
        children={
          <>
            <MediumText textAlign="center" textStyles={CommonStyles.marginTop_3}>Are you sure you want to delete this account?</MediumText>
            <View style={styles.confirmModalButton}>
              <Button
                text={'Yes'}
                disabled={buttonDisable}
                onPress={() => {
                  deleteModalRef?.current?.hide();
                  setTimeout(() => {
                    deleteUser()
                  },600)
                }}
                buttonStyle={[styles.yesBtn, {backgroundColor: buttonDisable ? AppColors.green+50 : AppColors.green}]}
              />
              <Button
                text={'No'}
                onPress={() => deleteModalRef?.current?.hide()}
                buttonStyle={styles.noBtn}
              />
            </View>
          </>
        }
      />
        <Button
        onPress={() => deleteModalRef?.current?.show()}
        text={'Delete Account'}
        buttonStyle={[styles.deleteBtnStyle, {backgroundColor: buttonDisable ? AppColors.red+50 : AppColors.red}]}
        disabled={buttonDisable}
      />          
        </View>
    );
};

export default DeleteAccount;
