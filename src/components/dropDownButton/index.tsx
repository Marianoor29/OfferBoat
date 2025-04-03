import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/store/hook";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import { LargeText } from "../text";
import styles from "./styles";

type DropDownButtonProps = {
    onPress?: () => void;
    title?: string | number;
    disabled?: boolean;
    images?: [];
    isLoading?: boolean;
    buttonStyle?: object;
    textStyle?: object;
    editimages?: any;
    source?: string;
    onPressEdit?: () => void;
    hasImages?: boolean;  
}

const DropDownButton = ({
    onPress = () => null,
    title,
    buttonStyle = {},
    textStyle = {},
    onPressEdit = () => null,
    editimages,
}: DropDownButtonProps) => {
    const [enableDropDown, setEnableDropDown] = useState(false);
    const selectedImages = useAppSelector((state: RootState) => state.images.selectedImages)
  
    return (
        <View
            style={[styles.buttonStyle, buttonStyle]}>
            <View style={enableDropDown ? styles.topView : styles.topViewBorder}>
                <Pressable  onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
                </Pressable>
                <Pressable onPress={onPressEdit} style={styles.iconView}>
                    <MaterialCommunityIcons name="image-edit" color={AppColors.black} size={width(6)} />
                </Pressable>
                <Pressable onPress={() => setEnableDropDown(!enableDropDown)} style={styles.iconView}>
                    <MaterialCommunityIcons name={enableDropDown ? "chevron-up" : "chevron-down"} color={AppColors.black} size={width(6)} />
                </Pressable>
            </View>
            {enableDropDown && (
                <View style={styles.bottomView}>
                    {selectedImages[0] ? 
                    <LargeText size={4}>Images</LargeText> :
                    <LargeText size={4}>No selected images</LargeText> }
                    <FlatList
                        scrollEnabled={false}
                        data={selectedImages}
                        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={5}
                        style={styles.imagesContainer}
                    />
                </View>)}
        </View>
    )
}

export default DropDownButton;
