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
 image:{
  height:width(40),
  width:width(40),
  marginBottom:height(2)
 }
});

export default styles;
