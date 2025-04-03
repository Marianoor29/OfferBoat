import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
  reviewContainer: {
    width: width(94),
    flexDirection: 'row',
    marginBottom: height(1),
    backgroundColor: AppColors.white,
    borderRadius: width(3),
    padding: width(4),
  },
  reviewerImage: {
    width: width(10),
    height: width(10),
    borderRadius: width(20),
    marginRight: width(3),
  },
  reviewContent: {
    flex: 1,
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  readMore: {
    marginTop: 8,
    fontSize: 14,
    color: '#0066cc',
    fontWeight: 'bold',
  },
  Ratingcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: height(1)
  },
  starsContainer: {
    flexDirection: 'row',
  },
  showReplies: {
    color: AppColors.secondaryRenter,
    marginTop: 4,
  },
  repliesContainer: {
    marginTop: 8,
  },
  reply: {
    marginTop: 4,
    padding: 8,
    backgroundColor: AppColors.inputWhite,
    borderRadius: 4,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    borderColor: AppColors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: AppColors.black
  },
  sendReplyButton: {
    marginLeft: 10,
    backgroundColor: AppColors.secondaryRenter,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  sendReplyButtonText: {
    width:width(10),
    textAlign:'center',
    color: AppColors.white,
    fontSize:width(3)
  }
})

export default styles;
