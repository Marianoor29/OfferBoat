import { FlatList, Linking, Pressable, View } from 'react-native';
import AppColors from "../../utills/AppColors";
import { LargeText, MediumText, UnderLineText } from "../text";
import styles from "./styles";

type OfferDetailCardProps = {
    members?: number,
    rating?: number,
    price?: number,
    hours?: number,
    phoneNumber?: number,
    container?: object,
    startTime?: string,
    captain?: boolean,
    instruction?: string,
    userEmail?: string,
    emailTtile?: string,
    checkDetailsTitle?: string,
    packageTitle?: string,
    ratingTitle?: string,
    ifOffer?: string,
    packages?: [{ price: string, hours: string }]
    onPressUserDetail?: () => void
}

const OfferDetailCard = ({
    packages,
    members,
    rating,
    price,
    hours,
    container,
    startTime,
    captain,
    instruction,
    userEmail,
    onPressUserDetail,
    checkDetailsTitle,
    emailTtile,
    ratingTitle,
    ifOffer,
    phoneNumber,
    packageTitle,
}: OfferDetailCardProps) => {
    const renderItem = ({ item }: { item: { hours: string, price: string } }) => {
        return (
            <View style={styles.packagesView}>
                <View>
                    <MediumText size={3.4}>Price</MediumText>
                    <MediumText textStyles={styles.smallText}>{item.price}</MediumText>
                </View>
                <View>
                    <MediumText size={3.4}>Hours</MediumText>
                    <MediumText textStyles={styles.smallText}>{item.hours}</MediumText>
                </View>
            </View>
        );
    };

    const handleEmailPress = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handlePhonePress = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <View style={[styles.container, container]}>
            {packages ? (
                <>
                    <LargeText size={3.4}>{packageTitle}</LargeText>
                    <FlatList
                        data={packages}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        showsVerticalScrollIndicator={true}
                        scrollEnabled={false}
                        style={styles.packagesContainer}
                    />
                </>
            ) : (
                <>
                    <View style={styles.rowStyles}>
                        <MediumText size={3.4}>Price</MediumText>
                        <MediumText textStyles={styles.smallText}>{price}</MediumText>
                    </View>
                    <View style={styles.rowStyles}>
                        <MediumText size={3.4}>Hours</MediumText>
                        <MediumText textStyles={styles.smallText}>{hours} Hours</MediumText>
                    </View>
                </>
            )}
            
            <View style={styles.rowStyles}>
                <MediumText size={3.4}>Passengers</MediumText>
                <MediumText textStyles={styles.smallText}>{members}</MediumText>
            </View>
            {startTime && (
                <View style={styles.rowStyles}>
                    <MediumText size={3.4}>Time</MediumText>
                    <MediumText textStyles={styles.smallText}>{startTime}</MediumText>
                </View>
            )}
            {rating !== undefined && (
                <View style={styles.rowStyles}>
                    <MediumText size={3.4}>{ratingTitle}</MediumText>
                    <MediumText textStyles={styles.smallText}>{rating}</MediumText>
                </View>
            )}
            {captain !== undefined && (
                <View style={styles.rowStyles}>
                    <MediumText size={3.4}>Captain</MediumText>
                    <MediumText textStyles={styles.smallText}>{captain ? 'Yes' : 'No'}</MediumText>
                </View>
            )}
            {instruction !== undefined && (
                <View style={styles.tripStyles}>
                    <MediumText size={3.4}>Trip Instruction</MediumText>
                    <MediumText textStyles={styles.smallText}>{instruction}</MediumText>
                </View>
            )}
            {(ifOffer === "Accepted" || ifOffer === "Completed") && (
                <>
                    {userEmail !== undefined && (
                        <View style={styles.rowStyles}>
                            <MediumText size={3.4}>{emailTtile}</MediumText>
                            <Pressable onPress={() => handleEmailPress(userEmail)}>
                                <UnderLineText textStyles={styles.emailtext} numberOfLines={1}>{userEmail}</UnderLineText>
                            </Pressable>
                        </View>
                    )}
                    {phoneNumber !== undefined && (
                        <View style={styles.rowStyles}>
                            <MediumText size={3.4}>Phone Number</MediumText>
                            <Pressable onPress={() => handlePhonePress(String(phoneNumber))}>
                                <UnderLineText textStyles={styles.emailtext} numberOfLines={1}>+{phoneNumber}</UnderLineText>
                            </Pressable>
                        </View>
                    )}
                    {checkDetailsTitle !== undefined && (
                        <View style={styles.rowStyles}>
                            <MediumText size={3.4}>{checkDetailsTitle}</MediumText>
                            <Pressable onPress={onPressUserDetail}>
                                <LargeText size={3.4} color={AppColors.secondaryRenter}>Click Here</LargeText>
                            </Pressable>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

export default OfferDetailCard;
