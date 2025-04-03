import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  reviewHeadingView:{
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:height(2),
    alignItems:'center',
    marginTop:height(2)
  },
  footerButtonStyle:{
    alignSelf:'center',
    marginBottom:height(3)
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },

});
