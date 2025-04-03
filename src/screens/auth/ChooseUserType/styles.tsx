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
  selectionView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width: width(50),
    alignItems:'center',
    marginBottom:height(2)
  },
  UploadIdView:{
    alignSelf:'center',
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  imageView:{
    width:width(40),
    borderRadius:width(3)
  },
  IdImage:{
    width:width(40),
    height:height(13),
    borderRadius:width(3),
    marginTop:height(1)
  },
  camera:{
    width:width(10),
    height:width(10),
    position:'absolute',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(30),
    backgroundColor:AppColors.blackShadow,
    top:Platform.OS === 'android' ? height(7) : height(8)
  },
  signInButtonStyle:{
    marginVertical:height(2),
    alignSelf:'center',
  },
  label: {
    fontSize: width(4.6),
    marginBottom: height(2),
  },
  option: {
    padding: width(4),
    marginVertical: height(1),
    backgroundColor: AppColors.inputWhite,
    width: width(80),
    alignItems: 'center',
    borderRadius: width(1),
  },
  selectedOption: {
    backgroundColor: AppColors.secondaryRenter,
  },
  selectedOwnerOption: {
    backgroundColor: AppColors.green,
  },
  image:{
    height:width(40),
    width:width(40),
    marginBottom:height(10)
   },
   bottomView:{
    alignItems:'center'
   },
   checkBoxView:{
    width:width(70),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
   }
   
});

export default styles;
