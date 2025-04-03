import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LargeText, SmallText } from '../text';
import styles from './styles';

type TimePickerModalProps = {
  initialTime?: string | null;
  onTimeSelected: (time: string) => void;
}

const TimeSelector = ({
  initialTime = null,
  onTimeSelected,
}: TimePickerModalProps) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    initialTime ? new Date(initialTime) : null
  );

  const handleConfirm = (time: Date) => {
    setSelectedTime(time);
    onTimeSelected(formatTime(time)); // Format the time before passing it to the callback
    setTimePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  // Function to format the time with AM/PM indicator manually
  const formatTime = (time: Date | null): string => {
    if (time !== null && !isNaN(time.getTime())) {
      let hours = time.getHours();
      const minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${hours}:${minutesStr} ${ampm}`;
    } else {
      return 'Select start time of trip';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.timePickerView} onPress={showTimePicker}>
        <SmallText size={3}>Time</SmallText>
        <LargeText textStyles={styles.timeInput}>
          {selectedTime ? formatTime(selectedTime) : 'Select start time of trip'}
        </LargeText>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        is24Hour={false} // Set to true if you want 24-hour format
      />
    </View>
  );
};

export default TimeSelector;
