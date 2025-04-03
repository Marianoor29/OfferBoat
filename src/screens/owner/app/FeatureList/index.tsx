import { FlatList, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  LargeText,
  MediumText,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

const FeatureList = ({ navigation, route }: any) => {
  const { features } = route.params;
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader 
        onPressFirstIcon={() => navigation.goBack()}
        emptyView={<LargeText size={4} >Features</LargeText>}
        arrowColor={AppColors.green}
        />
      )}>
      <View style={styles.container}>
      <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.featuresView}>
              <MediumText>{item}</MediumText>
              <Feather name='check-circle' size={width(5)} color={AppColors.green} />
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default FeatureList;
