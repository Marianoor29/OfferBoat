import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, InputField, LargeText, MediumText, ModalWrapper } from '../../../components';
import { ModalHandles } from '../../../components/modalWrapper';
import apiUrl from '../../../config';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/store/hook';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import { width } from '../../../utills/Dimension';
import { passwordSchema } from '../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
    currentPassword: string;
    newPassword: string
};

const ResetPassword = ({ cancelHandler, closeHandler }: any) => {
    const confirmPasswordRef = useRef<TextInput>(null);
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const modalRef = useRef<ModalHandles>(null);
    const userData = useAppSelector((state: RootState) => state.user);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        mode: 'all',
        defaultValues: {
            currentPassword: '',
            newPassword: ''
        },
        resolver: yupResolver(passwordSchema),
    });

    const UpdatePasswordHandler = async (data: FormValues) => {
        try {
            // API call to reset the password
            const response = await axios.put(`${apiUrl}/resetPasswordManually`, {
                userId: userData._id,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            if (response.data.success) {
                setErrorMessage('');
                modalRef?.current?.show();
            }
        } catch (error: any) {
            // Display error messages based on the response
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <LargeText size={3} textStyles={CommonStyles.marginTop_2}>Please enter your current password to reset password</LargeText>
            <InputField
                title="Current Password"
                placeholder="• • • • • • • • • • • • • • •"
                control={control}
                name={'currentPassword'}
                returnKeyLabel="next"
                onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
                icon={
                    <MaterialCommunityIcons
                        name={'form-textbox-password'}
                        size={width(7)}
                        color={AppColors.grey}
                    />
                }
                error={errors?.currentPassword?.message}
                secureTextEntry={securePassword}
                rightSideIcon={
                    securePassword ? (
                        <MaterialCommunityIcons
                            name={'eye-outline'}
                            size={width(6)}
                            color={AppColors.grey}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name={'eye-off'}
                            size={width(6)}
                            color={AppColors.grey}
                        />
                    )
                }
                onPressRightIcon={() => setSecurePassword(!securePassword)}
            />
            <InputField
                ref={confirmPasswordRef}
                title="New Password"
                placeholder="• • • • • • • • • • • • • • •"
                returnKeyLabel="done"
                control={control}
                name={'newPassword'}
                icon={
                    <MaterialCommunityIcons
                        name={'form-textbox-password'}
                        size={width(7)}
                        color={AppColors.grey}
                    />
                }
                error={errors?.newPassword?.message}
                secureTextEntry={secureConfirmPassword}
                rightSideIcon={
                    secureConfirmPassword ? (
                        <MaterialCommunityIcons
                            name={'eye-outline'}
                            size={width(6)}
                            color={AppColors.grey}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name={'eye-off'}
                            size={width(6)}
                            color={AppColors.grey}
                        />
                    )
                }
                onPressRightIcon={() => setSecureConfirmPassword(!secureConfirmPassword)}
            />
            {errorMessage ? (
                <MediumText size={3} textAlign="center" textStyles={{ color: AppColors.red }}>
                    {errorMessage}
                </MediumText>
            ) : null}

            <View style={styles.btnContainer}>
                <Button
                    onPress={handleSubmit(UpdatePasswordHandler)}
                    text={'Update Password'}
                    buttonStyle={styles.btnStyle}
                />
                <Button
                    onPress={cancelHandler}
                    text={'Cancel'}
                    buttonStyle={styles.btnStyle}
                />
            </View>
            <ModalWrapper
                ref={modalRef}
                onClose={() => modalRef?.current?.hide()}
                children={
                    <>
                        <LottieView source={require('../../../assets/gif/tick.json')} style={styles.animatedImageStyle} autoPlay loop={false} />
                        <MediumText textAlign="center" textStyles={CommonStyles.marginBottom_2}>
                            Your password has {'\n'} been updated
                        </MediumText>
                        <Button
                            text='Close'
                            buttonStyle={styles.closeBtn}
                            onPress={closeHandler}
                        />
                    </>
                }
            />
        </View>
    );
};

export default ResetPassword;
