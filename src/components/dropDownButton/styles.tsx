import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  buttonStyle: {
  marginVertical:height(2)
  },
  topView:{
    width: width(88),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderColor:AppColors.grey,
    borderWidth:1,
    paddingVertical: height(1.6),
    paddingHorizontal:width(2),
    borderTopRightRadius:width(2),
    borderTopLeftRadius:width(2),
  },
  topViewBorder:{
    width: width(88),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingVertical: height(1.6),
    paddingHorizontal:width(2),
    borderRadius:width(2),
    borderColor:AppColors.grey,
    borderWidth:1,
  },
  text: {
    width:width(55),
    fontSize: width(4),
    color: AppColors.black,
    fontWeight: 'bold',
  },
  iconView:{
    width:width(8),
    alignItems:'center',
    justifyContent:'center'
  },
  bottomView:{
    borderColor:AppColors.grey,
    borderWidth:1,
    paddingHorizontal:width(3),
    paddingVertical:height(2),
    borderBottomLeftRadius:width(2),
    borderBottomRightRadius:width(2),
    width: width(88),
  },
  image:{
    width:width(15.8),
    height:height(7.3),
    margin:width(0.5),
    borderRadius:width(2)
  },
  imagesContainer:{
    width:width(84),
    alignSelf:'center',
    flexDirection:'row',
    marginTop:height(1)
  }
});
