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
  emptyView:{
    marginVertical:height(3),
    alignItems:'center',
  },
  animatedImageStyle: {
    height: width(40),
    width:width(40),
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
  }
  
});

export default styles;
