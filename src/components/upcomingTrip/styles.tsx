import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    paddingVertical: height(1.8),
    paddingHorizontal: width(1),
    width: width(86),
    marginVertical: height(1),
    marginHorizontal:width(3),
    borderRadius:width(2),
    alignSelf:'center',
    alignItems:'center',
    backgroundColor:AppColors.white,
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,

  },
  infoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:height(2)
  },
  dateRow:{
    width:width(30),
    height:height(12),
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:1,
    backgroundColor:AppColors.white,
    borderTopColor:AppColors.darkGreen,
    borderRadius: width(1),
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    elevation: 3,
  },
  detailsView:{
    width:width(50),
  },
  imagesView:{
    flexDirection:'row',
    marginTop:height(1)
  },
  ownerImageStyles:{
    width:width(6),
    height:width(6),
    borderRadius:width(20),
    position:'absolute',
    left:width(6)
  },
  renterImageStyles:{
    width:width(6),
    height:width(6),
    borderRadius:width(20),
  },
});
export default styles;
