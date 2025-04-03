import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, LargeText, ScreenWrapper, SimpleHeader } from '../../../../components';
import { addFeature, removeFeature } from '../../../../redux/slice/featuresSlice/featuresSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import { featureSchema } from '../../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  feature: string,
};

const AddFeatures = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const features = useAppSelector((state: RootState) => state.features.features);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { feature: '' },
    resolver: yupResolver(featureSchema),
  });


  const handleAddFeature = (data: FormValues) => {
    if (data.feature.trim() !== '') {
      dispatch(addFeature(data.feature));
      reset();
    }
  };

  const handleRemoveFeature = (feature: string) => {
    dispatch(removeFeature(feature));
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader onPressFirstIcon={() => navigation.goBack()} arrowColor={AppColors.green}/>
      )}
      footerUnScrollable={() => (
        <Button
          text='Save Features'
          buttonStyle={styles.footerBtnStyle}
          onPress={() => navigation.goBack()}
        />
      )}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
       <Controller
            control={control}
            name="feature"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Add Feature"
                placeholderTextColor={AppColors.black}
                value={value} // Bind form value to input
                onChangeText={onChange} // Delegate change to react-hook-form
                onSubmitEditing={handleSubmit(handleAddFeature)}
              />
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit(handleAddFeature)}>
            <Entypo name="add-to-list" size={width(6)} color={AppColors.black} />
          </TouchableOpacity>
        </View>
         {/* Error message */}
         {errors.feature && <LargeText color='red' size={3}>{errors.feature.message}</LargeText>}
        <FlatList
          scrollEnabled={false}
          data={features}
          renderItem={({ item }) => (
            <View style={styles.featureItem}>
              <LargeText size={4} textStyles={styles.rulesText}>{item}</LargeText>
              <TouchableOpacity onPress={() => handleRemoveFeature(item)}>
                <Icon name="trash" size={width(5)} color={AppColors.black} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddFeatures;
