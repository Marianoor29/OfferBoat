import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
    modalContainer: {
      justifyContent: "flex-end",
      padding: 0,
      margin: 0,
    },
    modalInnerContainer: {
      backgroundColor: AppColors.white,
      elevation: 5,
      borderRadius: width(2),
      paddingVertical: height(1),
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: width(2),
    },
    topView:{
      width:width(8),
      height:width(8),
      alignSelf:'flex-start',
    },
  modalHeaderView:{
    width:width(90),
    alignItems:'center',
    paddingVertical:height(1),
  },
  modalMainView:{
    width:width(96),
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    marginVertical:height(2),
  }
  
});
export default styles;
