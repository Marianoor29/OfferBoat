import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems:'center',
    paddingVertical:height(1),
    justifyContent:'center',
  },
  topButtonView:{
    alignItems:'center'
  },
  createOfferView:{
    backgroundColor: AppColors.white,
    width: width(94),
    height:height(15),
    justifyContent:'center',
    borderRadius: width(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  createOfferButton:{
    backgroundColor:AppColors.green,
    marginTop:height(2)
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
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  buttonStyle:{
    backgroundColor:AppColors.green
  }
});
