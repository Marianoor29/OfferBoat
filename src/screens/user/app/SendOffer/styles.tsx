import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
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
  membersView:{
    width:width(85),
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:height(1),
    alignItems:'center'
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
  footerBtnStyle:{
    alignSelf:'center',
    marginVertical:height(4),
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
  reviewContainer:{
    color:AppColors.black,
    height:height(10),
    fontSize:width(3.6),
    fontWeight:'500'
  },
  detailsView:{
    width:width(85),
    paddingHorizontal:width(3),
    marginBottom:height(2.4),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
    paddingVertical: Platform.OS === 'ios' ? height(0.6) : 0
  },
  checkView:{
    width:width(90),
    marginTop:height(5),
    flexDirection:'row',
  },
  bottomTextStyle:{
    width:width(80)
  },
  checkBox:{
    width:width(8),
    marginTop:height(1)
  },
  hoursView:{
    width:width(86)
  },
  captionView:{
    width:width(86),
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:height(2)
  },
  captionTextView:{
    width:width(40),
    paddingVertical:height(1.4),
    borderWidth:1,
    borderColor:AppColors.grey,
    borderRadius:width(2),
    alignItems:'center',
    justifyContent:'center'
  },
  selectedCaptainText:{
    width:width(40),
    paddingVertical:height(1.4),
    borderWidth:1,
    borderColor:AppColors.secondaryRenter+30,
    backgroundColor:AppColors.secondaryRenter+30,
    borderRadius:width(2),
    alignItems:'center',
    justifyContent:'center'
  },
  bottomText:{
    width:width(80),
    alignSelf:'center'
  },
  errorView: {
    alignSelf: 'center',
    marginRight: width(10),
    marginVertical:height(1)
  },
  inputcontainerStyle:{
    width:width(85),
    backgroundColor:AppColors.white,
    borderColor:AppColors.grey,
    borderWidth:1,
  },
});
