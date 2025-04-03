import { Image, Pressable } from 'react-native';
import { LargeText } from "../text";
import styles from "./styles";

type textProps = {
    title?: string,
    source?: string,
    onPress?: () => void,

}

const TopDestinationCard = ({
    source,
    title,
    onPress = () => null
}: textProps) => {
    const imageSource = typeof source === 'string' ? { uri: source } : source;
    return (
        <Pressable style={styles.container} onPress={onPress}>
             <Image source={imageSource}  style={styles.posterImage}/>
           <LargeText size={3} numberOfLines={2}>{title}</LargeText>
        </Pressable>
    )
}

export default TopDestinationCard;