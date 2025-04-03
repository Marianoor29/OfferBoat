import React, { useState } from "react";
import { Pressable, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import Button from "../button";
import { LargeText, SmallText } from "../text";
import { AddressRow } from "../tripHistoryCard";
import UserInfo from "../userInfo";
import styles from "./styles";

type textProps = {
    userImage?: string
    renterName: string
    date: string
    time: string
    tripInstructions?: string
    hours: string
    captain: boolean
    buttonDisable?: boolean
    deleteRequest?: boolean
    passengers: number
    location: string
    onPress: () => void
    onPressImage?: () => void
    onDeletePress?: () => void
    rating: number
    price?: string
    buttonTitle?: string
    seeMoreTextColor?: string
    status?: string
    ButtonStyles?: object
    userImageStyle?: object
}

const ListCard = React.memo(({
    userImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    renterName,
    date,
    time,
    tripInstructions = '',
    hours,
    captain,
    passengers,
    location,
    rating = 0,
    price,
    buttonTitle,
    buttonDisable,
    ButtonStyles,
    seeMoreTextColor=AppColors.green,
    onPress = () => null,
    onPressImage = () => null,
    onDeletePress = () => null,
    userImageStyle,
    status,
    deleteRequest = false
}: textProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncateLength = 100;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const renderTripInstructions = () => {
        if (tripInstructions.length > truncateLength) {
            const displayText = isExpanded ? tripInstructions : `${tripInstructions.substring(0, truncateLength)}...`;
            return (
                <View>
                    <SmallText textStyles={styles.tripInstructionsStyle}>{displayText}</SmallText>
                    <Pressable onPress={toggleExpand}>
                        <LargeText size={3.4} color={seeMoreTextColor}>
                            {isExpanded ? 'See Less' : 'See More'}
                        </LargeText>
                    </Pressable>
                </View>
            );
        } else {
            return <SmallText textStyles={styles.tripInstructionsStyle}>{tripInstructions}</SmallText>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfoView}>
                <UserInfo
                    rating={rating}
                    image={userImage}
                    name={renterName}
                    onPress={onPressImage}
                    userImageStyle={userImageStyle}
                />
                <View>
                    {status && (
                    <LargeText size={4} color={AppColors.red}>{status}</LargeText>
                    )}
                    <LargeText size={4}>{price}</LargeText>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <AddressRow
                    icon={<FontAwesome name="calendar" size={width(5)} color={AppColors.black} />}
                    text={date}
                    containerStyle={styles.AddressRowStyle}
                />
                <AddressRow
                    icon={<FontAwesome name="clock-o" size={width(5)} color={AppColors.black} />}
                    text={time}
                    containerStyle={styles.AddressRowStyle}
                />
            </View>
            <View style={styles.rowContainer}>
                <AddressRow
                    icon={<Ionicons name="timer" size={width(5)} color={AppColors.black} />}
                    text={`${hours} hours`}
                    containerStyle={styles.AddressRowStyle}
                />
                <AddressRow
                    icon={<FontAwesome name="users" size={width(4)} color={AppColors.black} />}
                    text={`${passengers} passengers`}
                    containerStyle={styles.AddressRowStyle}
                />
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.AddressRowStyle}>
                <Ionicons name="location" size={width(5)} color={AppColors.black} />
                <SmallText size={3}>{location}</SmallText>
                </View>
                <AddressRow
                    icon={<Fontisto name="person" size={width(4)} color={AppColors.black} />}
                    text={captain ? 'Captained' : 'No Captain'}
                    containerStyle={styles.AddressRowStyle}
                />
            </View>
            {renderTripInstructions()}
            <Button
                text={buttonTitle}
                onPress={onPress}
                buttonStyle={[styles.createOfferButton, ButtonStyles]}
                disabled={buttonDisable}
            />
            {deleteRequest && (
                 <Button
                 text={"Delete Request"}
                 onPress={onDeletePress}
                 buttonStyle={styles.deleteOfferButton}
             />
            )}
        </View>
    );
});

export default React.memo(ListCard);
