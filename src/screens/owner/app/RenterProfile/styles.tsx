import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    marginTop:height(4)
  },
  reviewHeadingView:{
    width:width(90),
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:height(2),
    alignItems:'center',
    marginTop:height(2)
  },
  footerButtonStyle:{
    alignSelf:'center',
    marginBottom:height(3),
    backgroundColor:AppColors.green
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  dotsViewStyle:{
    width:width(90),
    alignItems:'flex-end',
  },
  dotsStyle:{
   padding:width(1)
  },
  modalContent: {
    marginBottom:height(1),
    width: width(60),
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: width(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: height(0.7),
  },
});

export default styles;
