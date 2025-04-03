import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  priceView:{
    width:width(100),
    backgroundColor:AppColors.inputWhite,
    height:height(24),
    alignItems:'center',
    justifyContent:'center',
  },
  rowStyle:{
    width:width(94),
    borderTopColor:AppColors.grey,
    borderTopWidth:width(0.1),
    paddingVertical:height(1),
    paddingHorizontal:width(2),
    flexDirection:'row',
    justifyContent:'space-between',
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  pageControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap:'wrap'
  },
  pageButton: {
    padding: 5,
    width:width(10),
    alignItems:'center',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activePageButton: {
    backgroundColor: AppColors.secondaryRenter,
  },
});

export default styles;
