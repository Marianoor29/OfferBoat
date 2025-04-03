import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(94),
        marginHorizontal: width(1),
        marginBottom: height(1.4),
        borderRadius: width(2),
        alignItems: 'center',
    },
    innerContainer:{
        width:width(90),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'     
    }
})

export default styles