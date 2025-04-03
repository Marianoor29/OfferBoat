import { ActivityIndicator, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import styles from './styles';

type LoaderProps ={
  isLoader?: boolean
  container?:object
}
const AppLoader = ({
    isLoader,
    container,
  }:LoaderProps
) => {
  return (
    <ReactNativeModal
      animationInTiming={300}
      animationOutTiming={200}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      isVisible={isLoader}
      backdropOpacity={0}>
      <View style={[styles.container, container]}>
        <ActivityIndicator size={width(10)} color={AppColors.black} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </ReactNativeModal>
  );
};

export default AppLoader;
