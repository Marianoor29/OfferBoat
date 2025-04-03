/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { height, width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  forgotPassTextStyle:{
    alignSelf:'flex-end',
    marginBottom:height(2),
    width:width(90)
  },
  socialBtnViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginVertical:height(3)
  },
  logo: {
    width: width(50),
    height: width(20),
    marginVertical:height(2)
  },
  signUpButtonStyle: {
    backgroundColor: AppColors.lightBlue,
    marginTop:height(1),
    marginBottom:height(1)
  },
  iconStyle: {
    height: width(6.5),
    width: width(6.5),
  },
});

export default styles;
