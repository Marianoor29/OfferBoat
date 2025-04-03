import { Pressable, Text, View } from 'react-native';
import styles from "./styles";

type textProps = {
    screenName?: string,
    source?: any,
    onPress?: ()=>void,
}

const ScreenRow = ({
    source,
    screenName,
    onPress =()=>null,
}: textProps) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.imageContainer}>
                {source}
            </View>
            <Text style={styles.screenName} numberOfLines={1}>{screenName}</Text>
        </Pressable>
    )
}

export default ScreenRow;