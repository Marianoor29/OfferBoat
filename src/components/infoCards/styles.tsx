import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(2),
    backgroundColor: AppColors.white,
    paddingHorizontal:width(2),
    width: width(24),
    height: width(24),
    marginVertical: height(1),
    marginHorizontal: width(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

});
export default styles;
