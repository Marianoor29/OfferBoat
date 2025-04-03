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
  userImage:{
    width:width(100),
    height:height(50),
    alignSelf:'center',
    // resizeMode:'contain'
  },
  cameraIconView:{
    width:width(10),
    height:width(10),
    position:'absolute',
    top:10,
    right:10,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(3),
    backgroundColor:AppColors.white
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width(90),
    marginTop:height(5),
  },
  btnStyle: {
    width: width(44),
    backgroundColor:AppColors.green
  },
  animatedImageStyle: {
    height: width(20),
    width:width(20),
  },
});
