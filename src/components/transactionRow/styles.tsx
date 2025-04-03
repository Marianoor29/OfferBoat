import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.inputWhite,
        width: width(96),
        marginHorizontal: width(1),
        marginBottom: height(0.9),
        borderRadius: width(2),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:width(3),
        paddingVertical:height(1)
    },
    innerContainer:{
        width:width(60),
    },
    rightContainer:{
        width:width(20),
        alignItems:'center'
    },

})

export default styles