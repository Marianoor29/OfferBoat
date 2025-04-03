import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    borderRadius: width(2),
    backgroundColor: AppColors.white,
    width: width(80),
    height:height(6),
    paddingVertical: height(1),
    marginBottom: height(2),
    marginHorizontal: width(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  text: {
    color: AppColors.white,
    fontSize: width(3.8),
  },
  iconStyle: {
    height: width(8),
    width: width(8),
  },
});
export default styles;
