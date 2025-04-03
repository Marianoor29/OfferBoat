import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { height, width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  deleteContainer:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal:width(2)
  },
  nameViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width(90),
    marginTop:height(1)
  },
  nameInputContainerStyle: {
    width: width(44),
  },
  nameInputTextStyle: {
    width: width(34),
  },
  emailField:{
    width:width(90),
    height:height(7.6),
    backgroundColor:AppColors.inputWhite,
    borderRadius:10,
    marginBottom:height(2),
    paddingHorizontal:width(4),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  phoneInput:{ 
    width:width(90),
    padding:height(2.5),
    backgroundColor:AppColors.inputWhite,
    borderRadius:10,
    marginBottom:height(2)
  },
  rowStyle: {
    flexDirection: 'row',
    width: width(85),
    maxHeight:height(10),
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width(90),
    marginTop:height(5),
  },
  btnStyle: {
    width: width(44),
    backgroundColor:AppColors.secondaryRenter
  },
  deleteBtnStyle:{
    marginTop:height(2),
    width: width(80),
    alignSelf:'center',
    marginBottom:Platform.OS === 'ios' ? height(2) : height(0.5),
  },
  closeBtn:{
    backgroundColor:AppColors.secondaryRenter
  },
  animatedImageStyle: {
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
  headerTab:{
    width: width(29),
  },
  headerMainContainer:{
    paddingHorizontal: width(2),
  }
});

export default styles;
