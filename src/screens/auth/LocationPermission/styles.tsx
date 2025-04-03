import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { height, width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal:width(3)
  },
  animatedImageStyle: {
    height: width(30),
    width:width(30),
  },
  buttonStyle:{
    alignSelf:'center',
    marginBottom:Platform.OS === 'ios' ? height(2) : height(1)
  },
});

export default styles;
