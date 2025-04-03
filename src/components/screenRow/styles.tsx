import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.white,
        width:width(90),
        marginHorizontal:width(7),
        marginVertical:height(0.6),
        alignItems:'center',
        borderRadius:width(2),
        flexDirection:'row',
    },
    userImage:{
        height:width(8),
        width:width(8), 
    },
    screenName:{
        color:AppColors.black,
        fontSize:width(3.6),
        paddingHorizontal:width(2),
        alignSelf:'center',
        fontWeight:'bold'
    },
    imageContainer:{
        width: width(9),
        height: width(9),
        alignItems:'center',
        justifyContent:'center',
    },
})

export default styles