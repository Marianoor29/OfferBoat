import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(70),
        marginHorizontal: width(2),
        marginBottom: height(1.4),
        borderRadius: width(2),
       borderWidth:width(0.1),
       borderColor:AppColors.grey,
       paddingHorizontal:width(5),
       paddingVertical:height(3)
    },
    UserImage:{
        width:width(12),
        height:width(12),
        borderRadius:width(30),
    },
    userInfoView:{
        width:width(40),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    infoView:{
        width:width(45),
        marginLeft:width(5)
    },
    Ratingcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-start',
        marginVertical:height(1)
      },
      starsContainer: {
        flexDirection: 'row',
      },
})

export default styles