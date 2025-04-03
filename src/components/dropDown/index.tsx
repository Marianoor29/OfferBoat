import { Pressable, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from "../../utills/AppColors";
import CommonStyles from "../../utills/CommonStyles";
import { width } from "../../utills/Dimension";
import { LargeText, MediumText } from "../text";
import styles from "./styles";

type textProps = {
    title?: string,
    onPress?: () => void,
    dropdown?: boolean,
    detail?: string
}

const DropDown = ({
    title,
    onPress = () => null,
    dropdown = false,
    detail
}: textProps) => {
    return (
        <View style={[styles.container, ]}>
            <View style={styles.innerContainer}>
                <LargeText size={4.6} textStyles={CommonStyles.marginBottom_2}>{title}</LargeText>
                <Pressable onPress={onPress}>
                <Feather name={dropdown ? 'chevron-up' :'chevron-down'} size={width(6)} color={AppColors.secondaryRenter} />
                </Pressable>
            </View>
            {dropdown && (
    <MediumText size={4}>{detail}</MediumText>
            ) }
        </View>
    )
}

export default DropDown;