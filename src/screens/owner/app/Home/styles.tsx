import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.transparent,
    alignItems:'center',
  },
  image: {
    width: '100%',
    height: height(35),
    resizeMode: 'cover',
    backgroundColor: AppColors.transparent,
  },
  topView:{
    width:width(100),
    height:height(10),
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    backgroundColor:AppColors.blackShadow,
    top:height(25),
    paddingHorizontal:width(5)
  },
  topIconsView:{
    width:width(90),
    height:height(10),
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    position:'absolute',
    top:height(2)
  },
  bellIcon:{
    width:width(8),
    marginLeft:width(5)
  },
  innerContainer:{
    width:width(100),
    backgroundColor:AppColors.white,
    borderTopLeftRadius:width(8),
    borderTopRightRadius:width(8),
    paddingVertical:height(2),
    paddingHorizontal:width(5),
  },
  userPhoto:{
    width:width(14),
    height:width(14),
    borderRadius:width(20),
    marginRight:width(5),
  },
  listView:{
    alignItems:'center',
    marginBottom:height(3)
  },
  innerContainerStyles:{
    height:height(65),
    paddingVertical:height(2),
    alignItems:'center'
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  badgeStyle:{
    width:width(4),
    height:width(4),
    borderRadius:width(50),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:1000,
    top:-6,
    left:10,
    backgroundColor:AppColors.red
  },
  permissionBtn:{
    width:width(66),
    marginTop:height(2),
    backgroundColor:AppColors.green
  },
  modelStyle:{
    justifyContent: 'center', 
    alignItems: 'center' ,
    alignSelf:'center',
    backgroundColor: 'white',
    borderRadius: width(3),
    width: width(80),
    height:height(20),
    position:'absolute',
    top:height(35),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: width(1),
    marginVertical: height(1.4),
  },
  modelInnerViewStyle:{
    width: 300, 
    padding: 20, 
    backgroundColor: 'white', 
  }
});