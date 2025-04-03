import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width(1),
},
hourButton: {
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    borderRadius: width(1),
    borderWidth: 1,
    borderColor: AppColors.grey,
    backgroundColor: AppColors.white,
    margin: 2, 
},
selectedHourButton: {
    borderColor: AppColors.secondaryRenter+30,
    backgroundColor: AppColors.secondaryRenter+30,
},


});
