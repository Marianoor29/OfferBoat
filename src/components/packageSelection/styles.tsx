import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  packageContainer: {
    width:Platform.OS === 'android' ?  width(88) : width(90),
    marginBottom:height(1),
    padding: 10,
    borderWidth: 1,
    borderColor: AppColors.grey,
    borderRadius: 5,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hoursView: {
    width:Platform.OS === 'android' ?  width(88) : width(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
  },
  addButton: {
    width:width(88),
    paddingVertical: height(0.7),
    backgroundColor:AppColors.green
  },
  disableAddButton:{
    width:width(88),
    paddingVertical: height(0.7),
    backgroundColor:AppColors.grey+50
  },
  removeButton: {
    backgroundColor: AppColors.red,
    paddingVertical: height(0.7),
  },
  disableRemoveButton: {
    backgroundColor: AppColors.grey+50,
    paddingVertical: height(0.7),
  },
});

export default styles;
