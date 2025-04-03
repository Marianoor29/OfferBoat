import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import AppColors from '../../utills/AppColors';

interface RangeSliderProps {
  minPrice?: number;
  maxPrice?: number;
  initialRange?: [number, number];
  step?: number;
  onRangeChange?: (min: number, max: number) => void;
}

const RangeSelector: React.FC<RangeSliderProps> = ({
  minPrice = 1,
  maxPrice = 2000,
  initialRange = [300, 500],
  step = 1,
  onRangeChange,
}) => {
  const [range, setRange] = useState<number[]>(initialRange);

  const handleValuesChange = (values: number[]) => {
    setRange(values); 
    if (onRangeChange && values.length === 2) {
      onRangeChange(values[0], values[1]); 
    }
  };

  return (
    <View style={styles.container}>
      <MultiSlider
        values={range}
        min={minPrice}
        max={maxPrice}
        step={step}
        onValuesChange={handleValuesChange}
        selectedStyle={{ backgroundColor: '#0047FF' }} // In-range bar color
        unselectedStyle={{ backgroundColor: '#D3D3D3' }} // Out-of-range bar color
        markerStyle={{ backgroundColor: AppColors.secondaryRenter }} 
      />
      <View style={styles.valuesContainer}>
        <Text style={styles.value}>${range[0]}</Text>
        <Text style={styles.value}>${range[1]}</Text>
      </View>
    </View>
  );
};
export default RangeSelector;
