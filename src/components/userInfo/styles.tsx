import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

export default StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: height(1.6),
    borderRadius: width(2),
  },
  infoView:{
    width:width(50),
    alignItems: 'center',
    flexDirection:'row',
  },
  image:{
    width:width(10),
    height:width(10),
    borderRadius:width(20),
    marginRight:width(3),
  },
  Ratingcontainer:{
    justifyContent: 'center',
  },
  ratingText: {
    fontSize:width(3)
  },
  starsContainer: {
    flexDirection: 'row',
  },
  dotsStyle:{
    padding:width(1),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width(60),
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: width(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: height(0.7),
  },
  dropdownText: {
    color: AppColors.black,
    fontSize: width(3.5),
  },
});
