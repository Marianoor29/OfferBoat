import { GestureResponderEvent, Image, Pressable, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { LargeText, SmallText } from "../text";
import styles from "./styles";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  senderImage: string;
};

export interface ModalHandles {
  show: () => void;
  hide: () => void;
}

type Props = {
  onPress?: (item: NotificationItem) => void;
  senderImage?: string;
  title?: string;
  body?: string;
  item: NotificationItem; // Pass the full item here
  time?: string;
  date?: string;
  status?: boolean;
};

const NotificationBar = ({
  onPress,
  senderImage,
  title,
  body,
  item,
  time,
  date,
  status = false,
}: Props) => {

  // Handle press event
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(item); // Pass the item object to onPress
    }
  };

  return (
    <Pressable style={[styles.container, {backgroundColor : status === true ?  AppColors.azure : AppColors.grey+60}]} onPress={handlePress}>
      <Image source={{ uri: senderImage}} style={styles.ImageStyle} />
      <View style={styles.titleView}>
        <LargeText size={3.3} numberOfLines={1}>{title}</LargeText>
        <SmallText size={2.8} numberOfLines={2}>{body}</SmallText>
        <View style={styles.dateTimeView}>
        <LargeText size={2.8} numberOfLines={2}>{time}</LargeText>
        <LargeText size={2.8} numberOfLines={2}>{date}</LargeText>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationBar;
