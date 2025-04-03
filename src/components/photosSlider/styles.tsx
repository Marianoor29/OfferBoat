import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(94),
        borderRadius: width(2),
    },
    slide: {
        height: width(50),
        width: width(94),
        borderTopLeftRadius:width(2),
        borderTopRightRadius:width(2)
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftArrow: {
        padding:width(0.5),
        backgroundColor:AppColors.blackShadow,
        borderRadius:20,
        position: 'absolute',
        left: 10,
        zIndex: 1,
    },
    rightArrow: {
        padding:width(0.5),
        backgroundColor:AppColors.blackShadow,
        borderRadius:20,
        position: 'absolute',
        right: 10,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 10,
    },
    loader:{
        height: width(50),
        width: width(94),
        position: 'absolute',
        right: 10,
        zIndex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default styles