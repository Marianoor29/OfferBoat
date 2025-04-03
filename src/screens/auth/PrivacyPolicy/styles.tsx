import { StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal:width(3)
  },

});

export default styles;
