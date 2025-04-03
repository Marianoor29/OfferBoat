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
    width: width(25),
    paddingLeft: width(6),
    alignItems:'center'
  },
  logo: {
    width: width(30),
    height: width(10),
  },
  iconContainer:{
    width:width(20),
    flexDirection:'row',
    justifyContent:'space-between',
  },
  iconView: {
    width:width(18),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginRight:width(5)
  },
  icon:{
    width:width(7),
    height:width(7),
    alignItems:'center',
    justifyContent:'center',
    marginRight:width(2),
  },
  badgeStyle:{
    width:width(4),
    height:width(4),
    borderRadius:width(50),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:1000,
    top:-3,
    left:-2,
    backgroundColor:AppColors.red
  }
});
export default styles;
