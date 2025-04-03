import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  locationView:{
    width:width(90),
    backgroundColor:AppColors.white,
    borderRadius:width(3),
    padding:width(3),
    marginBottom:height(1),
    alignItems:'center',
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  createOfferButton:{
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
  bookingListView:{
    alignItems:'center',
  },
  topView:{
    // height:height(35),
    paddingHorizontal:width(2),
    alignItems:'center'
  },
  offerButton:{
    marginTop:height(2)
  },
  offersButton:{
    backgroundColor: AppColors.secondaryRenter,
    marginTop: height(2)
  },
  dividerLine:{
    backgroundColor:AppColors.secondaryRenter,
    marginBottom:height(2),
    width:width(99),
    height:0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  heading:{
    width:width(99),
    height:height(4),
    textAlign:'center',
    paddingVertical:height(1),
    backgroundColor:AppColors.green+50,
    marginBottom:height(0.5)
  },
  bookingsHeading:{
    width:width(99),
    height:height(4),
    textAlign:'center',
    paddingVertical:height(1),
    backgroundColor:AppColors.secondaryRenter+50,
    marginVertical:height(1)
  },
});

export default styles;