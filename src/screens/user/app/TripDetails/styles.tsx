import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.transparent,
    position: "absolute",
    zIndex: 1000,
    shadowColor: AppColors.transparent,
    width: '100%',
    top: 0,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.transparent,
  },
  headerIconView: {
    width: width(8),
    height: width(8),
    backgroundColor: AppColors.blackShadow,
    borderRadius: width(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(3),
    marginLeft: width(3)
  },
  image: {
    width: '100%',
    height: height(30),
    resizeMode: 'cover',
    backgroundColor: AppColors.transparent,
  },
  ownerImage: {
    height: width(11),
    width: width(11),
    borderRadius: width(30)
  },
  myTripHeadingStyle: {
    color: AppColors.white,
    position: 'absolute',
    bottom: height(3),
    fontSize: width(5),
    left: width(5),
  },
  innerContainer: {
    marginTop: height(2),
    width: width(90),
    alignSelf: 'center'
  },
  textRowStyle: {
    width: width(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height(1),
  },
  statusView: {
    width: width(36),
    paddingVertical: height(0.5),
    alignItems: 'center'
  },
  tripInfoView: {
    width: width(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height(5)
  },
  footerBtnStyle: {
    alignSelf: 'center',
    marginVertical: height(2)
  },
  ratingBtnStyle: {
    alignSelf: 'center',
    backgroundColor: AppColors.azure,
    marginBottom:height(2)
  },
  OfferDetailCardStyles: {
    marginTop: height(4),
    marginBottom: height(2)
  },
  userInfoContainer: {
    width: width(94),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width(3),
    alignSelf: 'center'
  },
  Ratingcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width(40),
  },
  starsContainer: {
    flexDirection: 'row',
  },
  userInfo: {
    width: width(35),
  }
});

export default styles;
