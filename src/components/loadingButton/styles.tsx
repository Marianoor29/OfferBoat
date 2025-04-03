import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.secondaryRenter,
    width: width(80),
    alignItems: 'center',
    paddingVertical: height(1.6),
    borderRadius: width(2),
  },
  text: {
    fontSize: width(4),
    color: AppColors.white,
    fontWeight: 'bold',
  },
});
