import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    width: width(90),
    backgroundColor: AppColors.white,
    padding: width(3),
    borderRadius: width(2),
    marginBottom:height(1)
  },
  timePickerView: {
    paddingHorizontal:width(3),
    paddingBottom:height(0.9),
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: AppColors.blackShadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width(98),
    backgroundColor: AppColors.white,
    borderRadius: width(3),
    padding: width(3),
  },
  confirmButton: {
    backgroundColor: AppColors.secondaryRenter,
    padding: width(3),
    borderRadius: width(2),
    marginTop: height(2),
  },
  confirmButtonText: {
    color: AppColors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  timeInput:{
    color:AppColors.black,
    padding:0,
    fontSize:width(3.6),
    fontWeight:'500'
  },
});

export default styles;
