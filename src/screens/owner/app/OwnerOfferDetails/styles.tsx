import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.transparent,
    position: "absolute",
    zIndex: 1000,
    shadowColor: AppColors.transparent,
    width: '100%',
    top: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
    paddingBottom:height(2)
  },
  headerIconView:{
    width: width(8),
    height:width(8),
    backgroundColor:AppColors.blackShadow,
    borderRadius:width(20),
    alignItems:'center',
    justifyContent:'center',
    marginTop:height(3),
    marginLeft:width(3)

  },
  innerContainer: {
    width: width(100),
    paddingHorizontal:width(6),
    justifyContent: 'space-between',
    marginBottom:height(1),
    paddingBottom:height(1.5),
  },
  image: {
    width: '100%',
    height: height(40),
    resizeMode: 'cover',
    backgroundColor: AppColors.transparent,
  },
  sliderContainer:{
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: width(2),
  },
  boatOwnerImage: {
    alignSelf:'flex-start',
    width: width(10),
    height: width(10),
    borderRadius: width(30)
  },
  addressAndTitleView:{
       width:width(80),
  },
  title: {
    width:width(77),
  },
  descriptionView:{
    width:width(90),
    marginVertical:height(2)
  },
  lineView:{
    width:width(90),
    backgroundColor:AppColors.grey,
    height:width(0.1),
    marginVertical:height(3)
  },
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
  modalHeading:{
    marginBottom:height(2)
  },
  buttonsView:{
    width:width(65),
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:height(1)
  },
  modalButtonStyle:{
    width:width(30),
    paddingVertical:height(0.7)
  },
  acceptofferModal:{
    justifyContent:'center',
    width:width(78),
    alignSelf:'center'
  },
  readMoreText:{
    color:AppColors.secondaryRenter,
    width:width(90)
  },
  featuresView:{
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:height(1)
  },
  headingStyle:{
    width:width(90),
    marginBottom:height(1)
  },
  reviewHeadingView:{
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:height(2),
    alignItems:'center'
  },
  animatedImageStyle: {
    height: width(20),
    width:width(20),
  },
  rulesText:{
    width:width(80),
    textAlign: 'justify',
    fontSize: width(3.8)
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:Platform.OS === 'ios' ? height(2) : height(3),
    marginTop:Platform.OS === 'ios' ? height(1) : 0
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: AppColors.secondaryRenter, // your primary color
  },
  inactiveDot: {
    backgroundColor: AppColors.grey, // your inactive color
  },
  ownerMessageView:{
    width:width(90),
    alignSelf:'center',
    marginBottom:height(2),
  },
  footerToShowInRenterSide:{
    width:width(100),
    height:height(6),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:AppColors.red
  },
  topContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  editButton:{
    backgroundColor:AppColors.grey+50,
    padding:width(2),
    borderRadius: 20
  },
  editImagesButton:{
    backgroundColor:AppColors.blackShadow,
    borderRadius: 25,
    width: width(8),
    height:width(8),
    alignItems:'center',
    justifyContent:'center',
  },
  blockTextStyle:{
    width:width(95),
    marginTop:height(1)
},
iconView: {
  width: width(18),
  flexDirection: 'row',
  justifyContent: 'space-between',
},
emptyView: {
  width: width(27),
  alignItems:'center',
  alignSelf:'flex-end',
},

});
