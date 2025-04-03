import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../utills/AppColors';
import { height, width } from '../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  btnStyle:{
    alignSelf:'center',
    marginBottom:Platform.OS === 'ios' ? height(3) : height(1)
  },
  innerContainer:{
    width:width(80),
    alignItems: 'center',
  },
 image:{
  height:width(40),
  width:width(40),
  marginBottom:height(2)
 },
 selectionView:{
  flexDirection:'row',
  justifyContent:'space-evenly',
  width: width(50),
  alignItems:'center',
  marginBottom:height(1),
},
});

export default styles;
