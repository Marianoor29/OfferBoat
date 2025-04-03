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
  footerView:{
    width:width(90),
    alignSelf:"center",
    marginTop:height(10)
  }
});

export default styles;
