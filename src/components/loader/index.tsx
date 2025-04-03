import { ActivityIndicator, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useAppSelector } from '../../redux/store/hook';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import styles from './styles';

const Loader = () => {
  const isLoader = useAppSelector((state: { loader: { setLoader: any; }; }) => state.loader.setLoader);
  return (
    <ReactNativeModal
      animationInTiming={300}
      animationOutTiming={200}
      animationIn={'lightSpeedIn'}
      animationOut={'lightSpeedOut'}
      isVisible={isLoader}
      backdropOpacity={0}>
      <View style={styles.container}>
        <ActivityIndicator size={width(10)} color={AppColors.black} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </ReactNativeModal>
  );
};

export default Loader;
