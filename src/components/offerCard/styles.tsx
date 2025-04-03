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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    bottomView:{
        width:width(30),
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    price: {
        width:width(40),
        fontSize: width(3),
        color: AppColors.grey,
        marginTop: height(0.3),
        marginBottom: height(1),
        marginLeft: width(2),
    },
    duration: {
        width:width(15),
        fontSize: width(3),
        color: AppColors.grey,
        marginTop: height(0.3),
        marginBottom: height(1),
        marginLeft: width(2)
    },
    slide: {
        height: width(50),
        width: width(94),
        borderTopLeftRadius:width(2),
        borderTopRightRadius:width(2)
    },
    boatOwnerImage: {
        height: width(8),
        width: width(8),
       borderRadius:width(30)
    },
    titleStyle: {
        width:width(50),
        color: AppColors.black,
        fontSize: width(4),
        paddingHorizontal: width(2),
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: height(1)
    },
    descriptionStyle: {
        width:width(50),
        color: AppColors.black,
        fontSize: width(3),
        paddingHorizontal: width(2),
        alignSelf: 'flex-start',
    },
    membersbtnStyle: {
        backgroundColor: AppColors.blackShadow,
        paddingVertical: height(0.8),
        paddingHorizontal:width(2),
        borderRadius: width(8),
        position:'absolute',
        bottom:height(10),
        right:width(5)
    },
    membersbtnTextStyle: {
        fontSize: width(3),
        color: AppColors.white
    },
    innerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:width(86),
    },
    checkDetailsBtn:{
        paddingVertical: height(0.8),
        paddingHorizontal:width(3),
        borderRadius: width(2),
    },
    checkDetailsBtnText:{
        fontSize: width(3),
        color: AppColors.white
    },
    blockTextStyle:{
        position: 'absolute',
        zIndex: 1000,
        top:height(1),
        right:width(3),
        backgroundColor:AppColors.white,
        height:height(3),
        width:width(14),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
})

export default styles