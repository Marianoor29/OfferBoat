import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  btn:{
    alignSelf:'center',
    marginBottom:height(2),
    backgroundColor:AppColors.green
  },
  durationView:{
    width:width(85),
    paddingHorizontal:width(3),
    marginBottom:height(2.4),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
    paddingVertical: Platform.OS === 'ios' ? height(0.6) : 0
  },
});
