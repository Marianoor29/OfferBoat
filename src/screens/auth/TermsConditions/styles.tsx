import { StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal:width(4)
  },

});

export default styles;
