import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  container: {
    width: width(88),
    alignSelf: 'center',
    borderColor: AppColors.grey,
    borderWidth: 1,
    borderRadius: width(2),
    padding: width(2),
    marginBottom: height(2),
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  selectedText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerWrapper: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: AppColors.secondaryRenter,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
