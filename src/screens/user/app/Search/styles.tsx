import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingVertical:height(1)
  },
  searchView:{
    width:width(96),
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:AppColors.white,
  },
  iconView: {
    width: width(8),
    height:width(8),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:AppColors.white,
    borderRadius:width(20),
    marginTop:height(1),
  },
  heading: {
    width:width(90),
    marginVertical: height(2),
  },
  item: {
    width:width(90),
    paddingBottom: width(3),
  },
  placesItem: {
    width:width(90),
    paddingBottom: width(3),
    flexDirection:'row'
  },

  
});

export default styles;
