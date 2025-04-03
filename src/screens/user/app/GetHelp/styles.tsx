import { Platform, StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height(2),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.inputWhite,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: width(2),
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: width(4),
    paddingVertical: height(2),
    justifyContent: 'flex-end', 
  },
  messageContainer: {
    marginVertical: height(1),
    padding: height(1.5),
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: AppColors.secondaryRenter + 50,
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: AppColors.inputWhite,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: AppColors.black,
    fontSize: 14,
  },
  timestampText: {
    color: AppColors.black,
    fontSize: 10,
    marginTop: height(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:Platform.OS === "android" ? width(4) : width(5),
    paddingVertical:Platform.OS === "android" ? height(1) : height(2),
    borderTopWidth: 1,
    borderTopColor: AppColors.inputWhite,
    backgroundColor: AppColors.white,
  },
  textInput: {
    flex: 1,
    borderColor: AppColors.inputWhite,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: height(1),
    paddingHorizontal: width(4),
    marginRight: width(2),
  },
  sendButton: {
    backgroundColor: AppColors.secondaryRenter,
    borderRadius: 5,
    paddingVertical: height(1),
    paddingHorizontal: width(4),
  },
  inputOuterContainer:{
    alignItems:'center'
  }
});
