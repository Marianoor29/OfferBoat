import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

interface CurrencyInputProps extends TextInputProps {
  value: string;
  onValueChange: (value: string) => void;
  inputStyle?: object
}
const CurrencyInput = ({
   value, 
   onValueChange, 
   inputStyle={},
   ...props 
}: CurrencyInputProps) => {
  const formatCurrency = (input: string): string => {
    if (!input) return '$0.00';
    const numericValue = input.replace(/[^0-9]/g, '');
    const formattedValue = (Number(numericValue) / 100).toFixed(2);
    return `$${formattedValue}`;
  };
  const [internalValue, setInternalValue] = useState(formatCurrency(value));
  const handleChange = (text: string) => {
      const formattedText = formatCurrency(text);
      setInternalValue(formattedText);
      onValueChange(formattedText);
  };

  return (
    <TextInput
    {...props}
    value={internalValue}
    onChangeText={handleChange}
    keyboardType="numeric"
    style={[styles.input, inputStyle]}
/>
  );
};

export default CurrencyInput;
