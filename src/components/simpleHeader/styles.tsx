import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    width: width(100),
    paddingVertical:height(1),
    marginBottom:height(0.2),
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:AppColors.white,
  },
  emptyView: {
    width: width(60),
    alignItems:'center'
  },
  iconView: {
    width: width(10),
    height:height(4),
    alignItems:'center',
    justifyContent:'center',
  },
});
export default styles;
