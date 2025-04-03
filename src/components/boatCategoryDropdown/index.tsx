import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Platform, Modal, Pressable, View, Text } from 'react-native';
import styles from './styles';
import { LargeText } from '../text';

interface BoatCategoryDropdownProps {
  categories: { label: string; value: string }[];
  onSelect: (value: string) => void;
  title: string;
  selectedValue?: string;
}

const BoatCategoryDropdown: React.FC<BoatCategoryDropdownProps> = ({ categories, onSelect, title, selectedValue }) => {
  const [selectedValueState, setSelectedValueState] = useState<string>(selectedValue || categories[0]?.value || '');
  const [isModalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    if (selectedValue) {
      setSelectedValueState(selectedValue);
    }
  }, [selectedValue]);

  const handleValueChange = (value: string) => {
    setSelectedValueState(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <LargeText size={4}>{title}</LargeText>
      {Platform.OS === 'android' ? (
        // Android Picker
        <Picker
          selectedValue={selectedValueState}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category.value} label={category.label} value={category.value} />
          ))}
        </Picker>
      ) : (
        // iOS Picker
        <>
          <Pressable
            style={styles.pickerContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.selectedText}>
              {categories.find((c) => c.value === selectedValueState)?.label || 'Select'}
            </Text>
          </Pressable>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              // Do nothing to prevent accidental modal closure
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedValueState}
                  onValueChange={handleValueChange}
                >
                  {categories.map((category) => (
                    <Picker.Item key={category.value} label={category.label} value={category.value} />
                  ))}
                </Picker>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default BoatCategoryDropdown;
