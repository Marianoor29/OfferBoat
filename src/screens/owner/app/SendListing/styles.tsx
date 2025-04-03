import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingVertical:height(1),
    paddingHorizontal:width(5)
  },
  btn:{
    backgroundColor:AppColors.green,
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
  errorView: {
    marginRight: width(2),
    marginVertical:height(0.5)
  },
  inputcontainerStyle:{
    backgroundColor:AppColors.white,
    borderColor:AppColors.grey,
    borderWidth:1,
    marginVertical:width(0),
    marginTop:height(1)
  },
  inputContainer:{
    height: Platform.OS === 'ios' ? height(10) : height(9),
    marginTop:height(1)
  },
  buttonStyle:{
    backgroundColor:AppColors.green,
    alignSelf:'center'
  },
  durationView:{
    width:width(90),
    paddingHorizontal:width(3),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
    marginTop:height(1),
    marginBottom:height(1),
    paddingVertical: Platform.OS === 'ios' ? height(0.6) : 0
  },
});
