import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
    paddingVertical:height(3)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height(2),
    justifyContent:'space-between',
    borderColor: AppColors.grey,
    borderWidth: 1,
    borderRadius:width(2),
    paddingRight:width(5)
  },
  addButton: {
    backgroundColor: AppColors.white,
  },
  footerBtnStyle:{
    alignSelf:'center',
    marginBottom:height(2),
    backgroundColor:AppColors.green
  },
  input: {
    width:width(80),
    height: height(6),
    color:AppColors.black,
    paddingHorizontal: width(5),
  },
  featureItem: {
    width:width(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rulesText:{
    width:width(80)
  }
});

export default styles;
