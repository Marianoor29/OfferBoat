import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from "../../utills/AppColors";
import CommonStyles from "../../utills/CommonStyles";
import { width } from "../../utills/Dimension";
import { ORDER_STATUSES } from '../../utills/enum';
import Button from "../button";
import { LargeText, MediumText } from "../text";
import UserInfo from "../userInfo";
import styles from "./styles";

type TripOrdersProps = {
  image: string;
  ownerName?: string;
  serviceDesc?: string;
  address?: string;
  date?: string;
  onPressDecline?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  statusView?: string;
  buttonColor?: string;
  time?: string;
  price?: string | number;
  onPressDetails?: () => void;
  onPress?: () => void;
  rating: number
};

type AddressRowProps = {
  icon: React.ReactNode;
  text: any;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export const AddressRow = ({ icon, text, containerStyle , numberOfLines= 1}: AddressRowProps) => {
  return (
    <View style={[styles.row, containerStyle]}>
      {icon}
      <MediumText
        color={AppColors.black}
        size={3}
        textStyles={styles.textStyles}
        numberOfLines={numberOfLines}
      >
        {text}
      </MediumText>
    </View>
  );
};

const TripOrders = React.memo(({
  image,
  ownerName,
  address,
  date,
  onPressDecline,
  onPressDetails,
  containerStyles,
  statusView = "",
  price,
  time,
  onPress,
  rating,
  buttonColor = AppColors.secondaryRenter
}: TripOrdersProps) => {
  const handleBadgeBg =
    statusView === ORDER_STATUSES.PENDING
      ? AppColors.red + 70
      : statusView === ORDER_STATUSES.CONFIRMED
        ? AppColors.darkGreen
        : statusView === ORDER_STATUSES.COMPLETED
          ? AppColors.lightGreen
          : statusView === ORDER_STATUSES.CANCELLED
            ? AppColors.red
            : AppColors.red;

  const handlebadgeText =
    statusView === ORDER_STATUSES.PENDING
      ? AppColors.white
      : statusView === ORDER_STATUSES.CONFIRMED
        ? AppColors.white
        : statusView === ORDER_STATUSES.COMPLETED
          ? AppColors.white
          : statusView === ORDER_STATUSES.CANCELLED
            ? AppColors.white
            : AppColors.white;

  return (
    <TouchableOpacity
      style={[styles.mainView, containerStyles]}
      activeOpacity={1}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <UserInfo
        image={image}
        name={ownerName}
        rating={rating}
        />
        {statusView !== "" && (
          <LargeText
            size={3}
            color={handlebadgeText}
            textStyles={[
              styles.statusView,
              { backgroundColor: handleBadgeBg },
            ]}
          >
            {statusView === ORDER_STATUSES.CONFIRMED
              ? "Accepted"
              : statusView === ORDER_STATUSES.COMPLETED
                ? "Completed"
                : statusView === ORDER_STATUSES.CANCELLED
                  ? "Rejected"
                  : "Pending"}
          </LargeText>
        )}
      </View>
      {address && (
        <AddressRow
          containerStyle={CommonStyles.marginTop_1}
          icon={<Ionicons name="location-sharp" size={width(5)} color={AppColors.black} />}
          text={address}
        />
      )}
       {time && (
        <AddressRow
          containerStyle={CommonStyles.marginTop_1}
          icon={<Ionicons name="time" size={width(4.6)} color={AppColors.black} />}
          text={time}
        />
      )}
      <View style={styles.priceRow}>
        {date && (
          <AddressRow
            icon={<FontAwesome name="calendar" size={width(5)} color={AppColors.black} />}
            text={date}
            containerStyle={{width:width(40)}}
          />
        )}
        {price && (
          <MediumText
            numberOfLines={1}
            size={4.5}
            color={AppColors.darkblue}
            textStyles={styles.priceContainer}
          >
            {price}
          </MediumText>
        )}
      </View>
      <View style={styles.btnView}>
        {statusView !== ORDER_STATUSES.COMPLETED && statusView !== ORDER_STATUSES.CANCELLED && (
          <>
            {onPressDecline && (
              <Button
                text={"Cancel"}
                buttonStyle={styles.CancelContainer}
                textStyle={styles.btnTextCancel}
                onPress={onPressDecline}
              />
            )}

          </>
        )}
        <Button
          text={"Check Details"}
          buttonStyle={[{ backgroundColor: buttonColor }, onPressDecline ? styles.DetailsBtn : styles.DetailsBtnContainer]}
          textStyle={styles.btnTextCancel}
          onPress={onPressDetails}
        />
      </View>
    </TouchableOpacity>
  );
});

export default React.memo(TripOrders);
