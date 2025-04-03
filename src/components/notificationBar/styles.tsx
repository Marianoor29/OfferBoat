import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
      width:width(94),
      paddingHorizontal:width(5),
      paddingVertical:height(1),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:height(1),
      borderRadius:width(2)
    },
    ImageStyle:{
      width:width(8),
      height:width(8),
      borderRadius:width(20),
      marginRight:width(3)
    },
    titleView:{
      width:width(74),
    },
    dateTimeView:{
      width:width(40),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:height(0.5)
    }
});
export default styles;
