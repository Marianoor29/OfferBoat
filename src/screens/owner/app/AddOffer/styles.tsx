import { Platform, StyleSheet } from 'react-native';
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
    marginTop:height(1),
    backgroundColor:AppColors.green
  },
  inputContainer:{
    height: Platform.OS === 'ios' ? height(10) : height(9),
    marginTop:height(1)
  },
  membersView:{
    width:width(85),
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:height(1),
    alignItems:'center',
    alignSelf:'center'
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
  errorMessage:{
    width:width(80),
    textAlign:'center',
    marginVertical:height(0.5)
  },
});

export default styles;
