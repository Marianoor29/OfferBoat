
import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingVertical:height(1)
  },
  locationView:{
    width:width(90),
    backgroundColor:AppColors.white,
    borderRadius:width(3),
    padding:width(3),
    marginBottom:height(1),
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop:Platform.OS === 'ios' ? height(1) : height(2)
  },
  createOfferButton:{
    backgroundColor:AppColors.green,
    marginTop:height(2)
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  footerContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageStyle:{
    width:width(10),
    height:width(10),
    borderRadius:width(20),
    marginRight:width(3),
    borderColor:AppColors.secondaryRenter,
    borderWidth:2
  },
});

export default styles;


