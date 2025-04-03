import { StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { height, width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  animatedImageStyle: {
    height: width(20),
    width: width(20),
  },
  signInButtonStyle: {
    marginBottom: height(2),
  },
  input:{
    width:width(80),
    backgroundColor:AppColors.inputWhite,
    borderRadius: width(2),
    paddingHorizontal:width(4)
  },
  otpButtonStyle:{
    width:width(40),
    paddingVertical: height(0.6),
    marginTop:height(2)
  },
  errorMessageStyle:{
    marginVertical:height(2)
  },
  phoneInput:{ 
    width:width(90),
    padding:height(2),
    borderColor: 'gray', 
    borderRadius:5,
    borderWidth: 1 
  }
});

export default styles;
