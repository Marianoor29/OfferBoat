import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppColors from '../../utills/AppColors';
import { LargeText } from '../text';
import styles from './styles';

type inputProps = {
  secureTextEntry?: any,
  placeholder?: string,
  title?: string,
  icon?: any,
  rightSideIcon?: any,
  placeholderTextColor?: any,
  control?: any,
  keyboardType?: any,
  name: string,
  error?: any,
  returnKeyLabel?: any,
  onPressIn?: any,
  multiline?: boolean,
  numberOfLines?: number,
  maxLength?: number,
  titleStyle?: object,
  iconStyle?: object,
  containerStyle?: object,
  textinputStyle?: object,
  inputContainer?: object,
  errorView?: object,
  onPressRightIcon?: () => void,
  onSubmitEditing?: () => void,
  onChangeText?: (text: string) => void, 
};

const InputField = React.forwardRef<TextInput, inputProps>(
  (
    {
      placeholder,
      titleStyle = {},
      containerStyle = {},
      textinputStyle = {},
      errorView = {},
      inputContainer = {},
      placeholderTextColor = AppColors.grey,
      rightSideIcon,
      control,
      multiline = false,
      maxLength,
      name,
      title,
      returnKeyLabel,
      secureTextEntry,
      keyboardType,
      error,
      onPressIn,
      iconStyle = {},
      numberOfLines = 1,
      onPressRightIcon = () => null,
      onSubmitEditing = () => null,
      onChangeText,
    }: inputProps,
    ref,
  ) => {
    return (
      <>
        <View style={[styles.mainContainer, containerStyle]}>
          <View>
            <LargeText size={3}textStyles={[styles.titleStyle, titleStyle]}>{title}</LargeText>
            <View style={[styles.container, textinputStyle]}>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={(text) => {
                      onChangeText ? onChangeText(text) : onChange(text);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    style={[styles.input, inputContainer]}
                    secureTextEntry={secureTextEntry}
                    numberOfLines={numberOfLines}
                    ref={ref} 
                    multiline={multiline}
                    keyboardType={keyboardType}
                    onPressIn={onPressIn}
                    onSubmitEditing={onSubmitEditing}
                    maxLength={maxLength}
                    returnKeyType={returnKeyLabel}
                  />
                )}
                name={name}
              />
            </View>
          </View>
          {rightSideIcon && (
            <TouchableOpacity onPress={onPressRightIcon} style={[styles.iconStyle, iconStyle]}>
              {rightSideIcon}
            </TouchableOpacity>
          )}
        </View>

 <View style={[styles.errorView, errorView]}>
 <Text style={styles.errorText}>{error ? error : null}</Text>
</View>
       
      </>
    );
  },
);

export default InputField;
