import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(94),
        marginHorizontal: width(1),
        marginVertical:height(0.5),
        marginBottom: height(1.4),
        borderRadius: width(2),
        padding: width(5),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: width(8),
        height: width(8),
        borderRadius: width(10)
    },
    userInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: width(88),
        marginBottom:height(1)
    },
    iconView: {
        width: width(86),
        height: height(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.green + 50,
        borderRadius: width(2),
        alignSelf: 'center',
        marginVertical: height(1)
    },
    AddressRowStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: width(40),
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width(86),
        marginTop: height(1),
        alignItems: 'center'
    },
    tripInstructionsStyle: {
        marginTop: height(1),
        textAlign:'justify',
        fontSize:width(3.8)
    },
    createOfferButton: {
        backgroundColor: AppColors.green,
        marginTop: height(2)
    },
    deleteOfferButton: {
        backgroundColor: AppColors.red,
        marginTop: height(2)
    },
    Ratingcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      ratingText: {
        fontSize:width(3)
      },
      starsContainer: {
        flexDirection: 'row',
      },
})

export default styles