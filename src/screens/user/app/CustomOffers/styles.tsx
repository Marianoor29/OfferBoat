import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
    paddingBottom:height(1)
  },
  userInfoView:{
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  mainContainer:{
    width:width(90),
    alignItems:'center',
    marginTop:height(2)
  },
  deleteView:{
    alignItems:'center'
  },
  listingView:{
    width:width(98),
    alignItems:'center',
    marginTop:height(3)
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
  textView:{
    width:width(80),
    alignSelf:'center',
    marginBottom:height(2)
  }
  
});

export default styles;
