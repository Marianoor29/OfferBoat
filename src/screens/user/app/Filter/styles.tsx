import { StyleSheet } from 'react-native';
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: AppColors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  btn:{
    alignSelf:'center',
    marginBottom:height(2)
  },
  heading:{
    textAlign:'left',
    width:width(80),
    marginBottom:height(2)
   },
   line:{
    width:width(90),
    height:0.5,
    marginVertical:height(3),
    backgroundColor:AppColors.blackShadow
   },
   membersView:{
    width:width(85),
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:height(1),
    alignItems:'center',
    alignSelf:'center'
  },
  addView:{
    width:width(26),
    height:height(6),
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: width(2),
    borderColor: AppColors.grey,
  },
});
