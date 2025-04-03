import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    width: width(100),
    paddingVertical: height(1),
    marginBottom: height(0.2),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,

  },
  OwnerContainer:{
    marginBottom:height(5)
  },
  coverImageStyle: {
    width: width(98),
    height: height(27),
    borderRadius: width(2),
  },
  ownerProfileImageStyle: {
    width: width(30),
    height: width(30),
    borderRadius: width(20),
    borderWidth: width(0.4),
    borderColor: AppColors.white,

  },
  profileImageStyle: {
    width: width(30),
    height: width(30),
    borderRadius: width(20),
    borderWidth: width(0.4),
    borderColor: AppColors.white
  },
  infoView: {
    width: width(86),
    height: height(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height(4),
  },
  UserNameView: {
    width: width(56),
  },
  nameStyle: {
    fontSize: width(3.6),
    color: AppColors.black,
    fontWeight: 'bold',
  },
  emailStyle: {
    fontSize: width(3.6),
    color: AppColors.grey,
  },
  editButtonStyle: {
    width: width(20),
    borderRadius: width(2),
    paddingVertical: height(0.4),
    alignSelf: 'center',
    marginTop: height(1),
  },
  coverViewEditButtonStyle: {
    width: width(20),
    borderRadius: width(2),
    paddingVertical: height(0.4),
    alignSelf: 'center',
    marginTop: height(1),
    marginRight: width(5)
  },
  editButtonText: {
    fontSize: width(3),
  },
  tripText: {
    width: width(30),
  },
  Ratingcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: width(3)
  },
  starsContainer: {
    flexDirection: 'row',
  },
  editUserImage: {
    width: width(10),
    height: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(10),
    backgroundColor: AppColors.inputWhite,
    position: 'absolute',
    bottom: 1
  },
  ownerSideEditCamera: {
    width: width(10),
    height: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(10),
    backgroundColor: AppColors.inputWhite,
    position: 'absolute',
    bottom: 1,
    right: 2
  },
  ptofilePictureView: {
    width: width(35),
    position: 'absolute',
    bottom: -50,
    left: width(5),
  },
  ownerSideEditUserImage: {
    width: width(10),
    height: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(10),
    backgroundColor: AppColors.inputWhite,
    position: 'absolute',
    bottom: 5,
    right: 5
  }
});
export default styles;
