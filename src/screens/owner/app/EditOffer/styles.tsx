import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
    paddingVertical:height(3)
  },
  footerBtnStyle:{
    alignSelf:'center',
    marginBottom:height(1),
    backgroundColor:AppColors.green,
    marginTop:height(3)
  },
  errorMessage:{
    width:width(80),
    textAlign:'center'
  },
  deleteBtnStyle:{
    alignSelf:'center',
    marginBottom:height(1),
    backgroundColor:AppColors.red,
  },
  inputContainer:{
    height:height(10),
  },
  membersView:{
    width:width(85),
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:height(1),
    alignItems:'center',
    alignSelf:'center',
    marginBottom:height(2)
  },
  addView:{
    width:width(26),
    height:height(6),
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
  },
  packageStyles:{
    width:width(90),
    marginBottom:height(1.5),
    marginTop:height(1),
  },
  inputcontainerStyle:{
    backgroundColor:AppColors.white,
    borderColor:AppColors.grey,
    borderWidth:1,
    marginVertical:width(0)
  },
  featuresBtn:{
    width:width(88),
    alignSelf:'center',
    borderColor:AppColors.grey,
    borderWidth:1,
    borderRadius:width(2),
    padding:width(2),
    marginBottom:height(2)
  },
  errorView: {
    alignSelf: 'flex-start',
    marginLeft: width(1),
  },
  headerIconView:{
    width: width(15),
    height:height(5),
  },
  headerTitle:{
    marginLeft:width(10),
    width: width(70),
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
});

export default styles;
