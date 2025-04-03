import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems:'center',
  },
  flatList:{
    alignItems:"center",
  },
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
  },
  loadMoreButtonContainer: {
    marginVertical: 10,
    alignItems: 'center',
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
    backgroundColor: AppColors.green,
  },
  footerContainer:{

  },
  loadMoreButton:{
    
  }
});