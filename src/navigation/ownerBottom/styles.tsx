import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? height(10) : height(8),
    backgroundColor: AppColors.green,
    paddingHorizontal:width(2),
  },
  tabItemsStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width(22),
    height: '100%',
  },
  bottomTabIndicator: {
    position: 'absolute',
    top: 0,
    height: height(0.6),
    width: width(16),
    borderBottomEndRadius: width(5),
    borderBottomStartRadius: width(5),
  },
  userImageStyle: {
    width: width(4),
    height: width(4),
    borderRadius: width(9),
    marginTop:Platform.OS === 'ios' ? height(1) : 0,
  },
  textStyle: {
    fontWeight:'bold',
    fontSize:width(2.8)
  },
});

export default styles;
