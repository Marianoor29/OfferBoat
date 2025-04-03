import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingVertical: height(1),
    paddingHorizontal: width(4),
  },
  faqItem: {
    marginVertical: height(1),
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.inputWhite,
  },
  questionWrapper: {
    paddingVertical: height(1),
  },
  answerWrapper: {
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    backgroundColor: AppColors.inputWhite,
    borderRadius: 8,
  },
});
