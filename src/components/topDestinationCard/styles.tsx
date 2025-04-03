import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(24),
        height: width(34),
        marginHorizontal: width(1),
        marginBottom: height(1.4),
        borderRadius: width(2),
        alignItems: 'center',
    },
    posterImage: {
        height: width(24),
        width: width(24),
        borderRadius:width(2),
        marginTop:height(1)
    },

})

export default styles