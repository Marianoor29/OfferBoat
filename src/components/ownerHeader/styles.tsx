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
  },
  logo: {
    width: width(30),
    height: width(10),
  },
  iconView: {
    width: width(25),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center'
  },
  icon2View:{
    alignItems:'center',
    width: width(25),
  },
  badgeStyle:{
    width:width(4),
    height:width(4),
    borderRadius:width(50),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:1000,
    top:-6,
    left:-4,
    backgroundColor:AppColors.red
  }
});
export default styles;
