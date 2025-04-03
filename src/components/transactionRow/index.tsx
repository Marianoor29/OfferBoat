import { Pressable, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from "../../utills/AppColors";
import CommonStyles from "../../utills/CommonStyles";
import { width } from "../../utills/Dimension";
import { LargeText, SmallText } from "../text";
import styles from "./styles";

type TransactionRowProps = {
    date?: string
    time?: string
    price?: string
    transactionStatus?: string
    onPress?: () => void
}

const TransactionRow = ({
    date,
    time,
    price,
    transactionStatus,
    onPress=() => null
}: TransactionRowProps) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {transactionStatus === 'Success' ? 
            <Feather name='check-circle' size={width(5)} color={AppColors.green} />
            : transactionStatus === 'Cancelled' ? 
            <Feather name='alert-circle' size={width(5)} color={AppColors.red} /> :
            transactionStatus === 'Hold' ? 
            <Feather name='pause-circle' size={width(5)} color={AppColors.grey} /> :
            <Feather name='x-circle' size={width(5)} color={AppColors.red} />
            }
            <View style={styles.innerContainer}>
                <LargeText size={4} numberOfLines={1}>Booking Fee</LargeText>
                <View style={CommonStyles.row}>
                <SmallText  size={3}>{date} - </SmallText>
                <SmallText  size={3}>{time}</SmallText>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <LargeText size={3.4} numberOfLines={1}>${price}</LargeText>
                <LargeText size={3} 
                color={transactionStatus === 'Success' ? AppColors.green : 
                transactionStatus === 'Hold' ? AppColors.grey :
                AppColors.red}>{transactionStatus}</LargeText>
            </View>
        </Pressable>
    )
}

export default TransactionRow;