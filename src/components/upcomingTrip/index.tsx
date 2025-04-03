import { Image, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import CommonStyles from "../../utills/CommonStyles";
import Button from "../button";
import { LargeText } from "../text";
import styles from "./styles";

type UpcomingTripProps = {
  date?: any,
  title?: string,
  time?: string,
  ownerImage?: string,
  renterImage?: string,
  onPress?: () => void
};

const UpcomingTrip = ({
  date,
  title,
  time,
  ownerImage,
  renterImage,
  onPress,
}: UpcomingTripProps) => {

  return (
  <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
    <View style={styles.infoContainer}>
    <View style={styles.dateRow}>
      <LargeText size={4}>{date}</LargeText>
    </View>
    <View style={styles.detailsView}>
    <LargeText size={3.6} textStyles={CommonStyles.marginBottom_1}>{title}</LargeText>
    <LargeText size={3.4} color={AppColors.grey}>{time}</LargeText>
    <View style={styles.imagesView}>
    <Image source={{uri : ownerImage}} style={styles.ownerImageStyles}/>
    <Image source={{uri : renterImage}} style={styles.renterImageStyles}/>
    </View>
    </View>
    </View>
    <Button 
    text={'Check Trip Details'}
    />
  </TouchableOpacity>
  );
};

export default UpcomingTrip;
