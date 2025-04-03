import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { LargeText, MediumText } from "../text";
import AppColors from "../../utills/AppColors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { width } from "../../utills/Dimension";
import CommonStyles from "../../utills/CommonStyles";

type BoatDetailsProps = {
    Length?: string;
    Model?: string;
    Category?: string
}

const BoatDetails = ({
    Length = 'Not Mention',
    Model = 'Not Mention',
    Category = 'Not Mention',
}: BoatDetailsProps) => {
    return (
        <View style={styles.container}>
           <LargeText size={3.4}>Specifications</LargeText>
            {/* first row */}
         <View style={styles.row}>
           <View style={styles.item}>
             <View style={styles.responseRateContainer}>
             <FontAwesome size={width(4)} name='sort-amount-asc' color={AppColors.white}/>
             <LargeText size={3.2} color={AppColors.white} textStyles={CommonStyles.marginLeft_1}>LENGTH</LargeText>
             </View>
             <Text style={styles.label}>{Length}</Text>
           </View>
           <View style={styles.item}>
             <View style={styles.cancellationContainer}>
             <Feather size={width(4)} name='globe' color={AppColors.black}/>
               <LargeText size={3.2} textStyles={CommonStyles.marginLeft_1}>MODEL</LargeText>
             </View>
             <Text style={styles.label}>{Model}</Text>
           </View>
         </View>
         {/* 2nd row */}
         <View style={styles.row}>
           <View style={styles.item}>
           <View style={styles.categoryContainer}>
           <MaterialIcons size={width(4)} name='category' color={AppColors.white}/>
           <LargeText size={3.2} color={AppColors.white} textStyles={CommonStyles.marginLeft_1}>CATEGORY</LargeText>
             </View>
             <Text style={styles.label} >{Category}</Text>
           </View>
         </View>
         </View>

    )
}


export default BoatDetails;