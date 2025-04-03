import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.white,
  },
  btn:{
    alignSelf:'center',
    marginBottom:height(2)
  },
  textStyle:{
    width:width(85),
    marginTop:height(5)
  },

});
