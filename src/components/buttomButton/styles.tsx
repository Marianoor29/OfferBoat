import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  bottomView:{
    width:width(94),
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:height(2),
    alignSelf:'center'
  },
  acceptBtnStyle:{
    width:width(45),
    paddingVertical:height(1),
    borderRadius:width(2)
  },
  makeOfferBtnStyle:{
    width:width(45),
    paddingVertical:height(1),
    borderRadius:width(2),
    backgroundColor:AppColors.green
  },
  btnTextStyle:{
    fontSize:width(4)
  },
});
export default styles;
