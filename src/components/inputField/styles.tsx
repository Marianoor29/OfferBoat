import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor:AppColors.inputWhite,
    borderRadius:width(2),
    padding:width(2),
    width:width(90),
    flexDirection:'row',
    marginVertical:height(0.5),
  },
  titleStyle:{
    paddingLeft:width(2),
  },
  container: {
    width: width(76),
    marginLeft: width(1),
  },
  input: {
    color:AppColors.black,
    fontSize:width(3.8),
    paddingBottom:width(0.1),
    marginHorizontal:width(1),
    paddingTop:0,
  },
  iconStyle:{
    width:width(7),
    justifyContent:'center',
    alignSelf:'center',
  },
  errorView: {
    alignSelf: 'flex-start',
    marginLeft: width(9),
  },
  errorText: {
    fontSize: width(3),
    color: AppColors.red,
  },
});

export default styles;
