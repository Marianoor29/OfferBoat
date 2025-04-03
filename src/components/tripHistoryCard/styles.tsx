import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: height(1.8),
    paddingHorizontal: width(3.5),
    marginHorizontal: width(0.6),
    width: width(90),
    borderRadius: width(3),
    marginVertical: height(1),
    backgroundColor:AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.30,
    elevation: 3,

  },
  innerView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width(56),
  },
  image: {
    width: width(10.6),
    height: width(10.6),
    marginRight: width(2),
    borderRadius: width(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width(84),
  },
  textStyles: {
    marginLeft: width(1.5),
    width: width(78),
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height(1.5),
  },
  btn: {
    elevation: 0,
    width: width(82),
    backgroundColor: AppColors.blue,
  },
  btnCancel: {
    backgroundColor: AppColors.lightGreen,
    elevation: 0,
    width: width(82),
    // backgroundColor: AppColors.secondary,
  },
  btn1: {
    width: width(40),
    elevation: 0,
  },
  statusView: {
    paddingHorizontal: width(3),
    paddingVertical: height(0.8),
    borderRadius:Platform.OS === 'android' ? width(1) : height(5),
    alignSelf: "flex-start",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height(2),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  service: {
    width: width(40),
  },
  serviceDescription: {
    width: width(40),
  },
  btnTextProgress: {
    color: AppColors.white,
  },
  btnTextCancel: {
    color: AppColors.white,
    fontSize:width(3.6)
  },
  CancelContainer: {
    width: width(40),
    backgroundColor: AppColors.red,
    paddingVertical: height(0.7),
  },
  DetailsBtn: {
    width: width(40),
    paddingVertical: height(0.7),
  },
  DetailsBtnContainer: {
    width: width(80),
    paddingVertical: height(0.7),
    alignSelf:'center',
    borderRadius:width(1)
  },
  priceContainer: {
    width: width(25),
    textAlign:'right',
  },
});
export default styles;
