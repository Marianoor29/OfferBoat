import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
    paddingVertical:height(3),
    paddingHorizontal:width(2)
  },
  image: {
    width: width(24),
    height: height(12),
    margin: 2,
  },
  addButtonStyle:{
    alignSelf:'center',
    marginVertical:height(2),
    backgroundColor:AppColors.green
  },
  cancleButtonStyle:{
    alignSelf:'center',
    marginBottom:height(2),
    backgroundColor:AppColors.secondaryRenter
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width:width(6),
    height:width(6),
    borderRadius:width(20),
    alignItems:'center',
    justifyContent:'center'
  },
  errorMessage:{
    width:width(80),
    textAlign:'center'
  },
});

export default styles;
