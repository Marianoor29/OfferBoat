import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  LargeText,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import { addRules, removeRules } from '../../../../redux/slice/rulesSlice/rulesSlice';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook';
import AppColors from '../../../../utills/AppColors';
import { width } from '../../../../utills/Dimension';
import { ruleSchema } from '../../../../utills/validationSchemas';
import styles from './styles';

type FormValues = {
  rule: string,
};

const AddRules = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const rulesList = useAppSelector((state: RootState) => state.rules.rules);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { rule: '' },
    resolver: yupResolver(ruleSchema),
  });

  const handleaddAllowedItem = (data: FormValues) => {
    if (data.rule.trim() !== '') {
      dispatch(addRules(data.rule));
      reset();
    }
  };

  const handleremoveAllowedItem = (rules: string) => {
    dispatch(removeRules(rules));
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          arrowColor={AppColors.green}
        />
      }}
      footerUnScrollable={() => (
        <Button
          text='Save Rules'
          buttonStyle={styles.footerBtnStyle}
          onPress={() => navigation.goBack()}
        />
      )}>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Controller
            control={control}
            name="rule"
            render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Add rules"
            placeholderTextColor={AppColors.black}
            value={value}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(handleaddAllowedItem)}
          />
        )}
        />
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit(handleaddAllowedItem)}>
            <Entypo name="add-to-list" size={width(6)} color={AppColors.black} />
          </TouchableOpacity>
        </View>
        {/* Error message */}
        {errors.rule && <LargeText color='red' size={3}>{errors.rule.message}</LargeText>}
      <FlatList
      scrollEnabled={false}
      data={rulesList}
        renderItem={({ item }) => (
          <View style={styles.featureItem}>
            <LargeText size={4} textStyles={styles.rulesText}>{item}</LargeText>
            <TouchableOpacity onPress={() => handleremoveAllowedItem(item)}>
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

export default AddRules;
