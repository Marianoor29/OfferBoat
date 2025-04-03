import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingVertical:height(4)
  },
  durationView:{
    width:width(85),
    paddingHorizontal:width(3),
    marginBottom:height(2.4),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
    paddingVertical: Platform.OS === 'ios' ? height(0.6) : 0
  },
  calenderView:{
    width:width(85),
    paddingHorizontal:width(3),
    marginBottom:height(1),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
    paddingBottom: Platform.OS === 'ios' ? height(0.6) : height(0.8)
  },
  durationInput:{
    color:AppColors.black,
    padding:0,
    fontSize:width(3.6),
    fontWeight:'500'
  },
  footerBtnStyle:{
    alignSelf:'center',
    marginVertical:height(2),
  },
  animatedImageStyle: {
    height: width(20),
    width:width(20),
  },
  monthContainer: {
    width: width(90),
    height:height(50),
    backgroundColor: AppColors.inputWhite,
    borderRadius: width(2),
    marginTop:height(1)
  },
  checkView:{
    width:width(90),
    marginTop:height(5),
    flexDirection:'row',
    alignSelf:'center'
  },
  bottomTextStyle:{
    width:width(80)
  },
  checkBox:{
    width:width(8),
    marginTop:height(1)
  },
  packageList:{
    width:width(33),
    alignItems:'center',
  },
  smallText: {
    fontWeight:'bold',
    color:AppColors.black,
    fontSize:width(3.4),
    alignSelf:'center',
  },
  packagesView:{
    width:width(70),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:height(0.5),
    borderColor:AppColors.grey,
    borderWidth:1,
    borderRadius:width(2),
  },
  selectPackageView:{
  borderColor: AppColors.secondaryRenter, 
  backgroundColor: AppColors.secondaryRenter+10 },
  bottomText:{
    width:width(80),
    alignSelf:'center'
  }
});
