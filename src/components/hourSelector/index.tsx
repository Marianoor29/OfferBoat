import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SmallText } from '../text';
import styles from './styles';

type HourSelectorProps = {
  hours: string[];
  onSelect: (selectedHour: string) => void;
  selectedHours?: string
}
const HourSelector = ({
  hours, 
  onSelect,
  selectedHours
}: HourSelectorProps) => {
  const [selectedHour, setSelectedHour] = useState<string | null>(selectedHours ? selectedHours : null);

    const handlePress = (hour: string) => {
        setSelectedHour(hour);
        onSelect(hour);
    };
  return (
    <View style={styles.container}>
            {hours.map((hour) => (
                <TouchableOpacity
                    key={hour}
                    style={[styles.hourButton, selectedHour === hour && styles.selectedHourButton]}
                    onPress={() => handlePress(hour)}
                >
                    <SmallText size={3}>
                        {hour} Hours
                    </SmallText>
                </TouchableOpacity>
            ))}
        </View>
  );
};

export default HourSelector;
