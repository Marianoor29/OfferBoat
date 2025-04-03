import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
    width:width(80),
    backgroundColor:AppColors.white,
    alignItems:'center',
    borderRadius:width(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical:height(1.5),
    alignSelf:'center'
    },
    rowStyles:{
        width:width(70),
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:AppColors.grey,
        borderBottomWidth:width(0.1),
        paddingVertical:height(1.6),
    },
    tripStyles:{
        width:width(70),
        borderBottomColor:AppColors.grey,
        borderBottomWidth:width(0.1),
        paddingVertical:height(1.6)
    },
    smallText: {
        fontWeight:'bold',
        color:AppColors.black,
        fontSize:width(3.4),
        alignSelf:'center',
      },
      packagesView:{
        width:width(70),
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:height(1)
      },
      packagesContainer:{
        borderBottomColor:AppColors.grey,
        borderBottomWidth:width(0.1),
        paddingVertical:height(1.6),
      },
      emailtext:{
        fontWeight:'bold',
        color:AppColors.secondaryRenter,
        fontSize:width(3.4),
        width:width(45),
        textAlign:'right'
      }
})

export default styles