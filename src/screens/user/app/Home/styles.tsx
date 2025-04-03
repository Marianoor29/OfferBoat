import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  productContainer: {
    alignItems: 'center',
    paddingBottom: height(1)
  },
  topFlatListStyles: {
    height: height(20),
    alignItems: 'center',
  },
  bottomFlatListStyles: {
    flex:1,
    width: '96%',
    height:  Platform.OS === 'android' ?  height(65) : height(60),
    marginBottom: Platform.OS === 'android' ? height(0) : height(1),
    alignItems: 'center',
  },
  headingStyle: {
    textAlign: 'center',
    marginBottom: height(1)
  },
  emptyView: {
    marginVertical: height(3),
    alignItems: 'center',
  },
  animatedImageStyle: {
    height: width(40),
    width: width(40),
  },
  permissionBtn: {
    width: width(66),
    marginTop: height(2)
  },
  modelStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: width(3),
    width: width(80),
    height: height(20),
    position: 'absolute',
    top: height(35),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: width(1),
    marginVertical: height(1.4),
  },
  modelInnerViewStyle: {
    width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10
  },
  icon:{
    width:width(7),
    height:width(7),
    alignItems:'center',
    justifyContent:'center',
    marginRight:width(2),
  },
  titleView:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width(90),
    alignItems:'center'
  },
  loadMoreContainer:{
  alignItems:'center',
  marginBottom:height(1)
  },
  filterView:{
    position:'absolute',
    zIndex:1000,
    bottom:height(2),
    left:width(5),
   
  },
  filter:{
    backgroundColor:AppColors.secondaryRenter,
    width:width(25),
    height:height(5),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(10),
    flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  reloadButton:{
    width:width(90),
    alignItems:'center',
    marginBottom:height(1)
  }
  
});
