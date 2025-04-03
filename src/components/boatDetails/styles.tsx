import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: width(80),
    alignItems: 'center',
    paddingVertical: height(1.6),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    marginBottom:height(2)
  },
smallText: {
  fontWeight:'bold',
  color:AppColors.black,
  fontSize:width(3.4),
  alignSelf:'center',
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
  marginTop:height(2)
},
item: {
  flex: 1,
  alignItems: 'center',
},
responseRateContainer: {
  backgroundColor: '#28a745',
  borderRadius: 5,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginBottom: 5,
  flexDirection:'row',
  alignItems:'center'
},
responseRate: {
  color: '#ffffff',
  fontWeight: 'bold',
},
cancellationContainer: {
  backgroundColor: '#ffcc00',
  borderRadius: 5,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginBottom: 5,
  flexDirection:'row',
  alignItems:'center'
},
categoryContainer: {
  backgroundColor: AppColors.chocolate,
  borderRadius: 5,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginBottom: 5,
  flexDirection:'row',
  alignItems:'center'
},
captainContainer:{
  backgroundColor: AppColors.cornflowerblue+50,
  borderRadius: 5,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginBottom: 5,
  flexDirection:'row',
  alignItems:'center'
},
cancellation: {
  color: '#ffffff',
  fontWeight: 'bold',
},
label: {
  fontSize: 14,
  color: '#333',
  textAlign: 'center',
},
icon: {
  fontSize: 24,
  marginBottom: 5,
},
  
});



