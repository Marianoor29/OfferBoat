import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems:'center',
    paddingVertical:height(1)
  },
  btn:{
    backgroundColor:AppColors.green
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  animatedModalImageStyle: {
    height: width(20),
    width:width(20),
  },
  confirmModalButton:{
    width:width(80),
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:height(3),
    marginBottom:height(2)
  },
  yesBtn:{
    width:width(38),
    backgroundColor:AppColors.green
  },
  noBtn:{
    width:width(38),
    backgroundColor:AppColors.secondaryRenter
  },
  btnStyle:{
    backgroundColor:AppColors.green,
    marginTop:height(2)
  }
});
