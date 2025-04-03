import { StyleSheet } from 'react-native';
import { height, width } from '../../utills/Dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    container: {
        width:width(80),
        backgroundColor:AppColors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
    rowStyle: {
        flexDirection: 'row',
        width: width(95),
        maxHeight:height(10),
        backgroundColor:AppColors.white
      },
      rowText: {
        fontWeight: '600',
        fontSize: width(3.5),
        paddingLeft: width(2),
        color: AppColors.black
      },
});

export default styles;
