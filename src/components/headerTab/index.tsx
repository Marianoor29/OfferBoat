import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import AppColors from "../../utills/AppColors";
import { LargeText } from "../text";
import styles from "./styles";

type Tab = {
  name: string;
};

type HeaderTabProps = {
  tabs?: Tab[];
  onPress?: (name: string) => void;
  mainContainer?: StyleProp<ViewStyle>;
  BtnContainer?: StyleProp<ViewStyle>;
  selectedTopTab?: string;
  selectedTabColor?: string;
};
const HeaderTab = ({ 
  tabs = [], 
  onPress, 
  mainContainer, 
  selectedTopTab,
  BtnContainer,
  selectedTabColor = AppColors.secondaryRenter
}:HeaderTabProps) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      {tabs.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => onPress?.(item.name)}
          style={[
            styles.BtnContainer,
            {
              backgroundColor:
                selectedTopTab === item.name
                  ? selectedTabColor
                  : AppColors.transparent,
            },
            BtnContainer
          ]}
        >
          <LargeText
          size={3.4}
          color={AppColors.white}
            textStyles={styles.BtnText}
          >
            {item.name}
          </LargeText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HeaderTab;