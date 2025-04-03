import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";

type ButtonProps = {
    onPress?: () => void;
    text?: string | number;
    disabled?: boolean;
    isLoading?: boolean;
    buttonStyle?: object;
    textStyle?: object;
    loadingColor?: string; 
};

const LoadingButton = ({
    onPress = () => null,
    text,
    disabled,
    isLoading,
    buttonStyle = {},
    textStyle = {},
    loadingColor = "#ffffff", 
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, buttonStyle]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={loadingColor} />
            ) : (
                <Text style={[styles.text, textStyle]}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

export default LoadingButton;
