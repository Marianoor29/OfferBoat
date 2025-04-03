import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import styles from './styles';

type SimpleHeaderProps = {
  container?: any,
  firstIcon?: any,
  emptyView?: any,
  RightIcon?: any,
  iconView?: object,
  arrowColor?: string,
  onPressFirstIcon?: () => void,
  onPressRightIcon?: () => void,
  rightIconView?: object
  emptyViewStyle?: object
};
const SimpleHeader = ({
  container,
  emptyView,
  RightIcon = true,
  iconView,
  arrowColor = AppColors.secondaryRenter,
  rightIconView,
  emptyViewStyle,
  onPressFirstIcon,
  onPressRightIcon = () => null,
}: SimpleHeaderProps) => {
  return (
    <View style={[styles.container, container]}>
      {onPressFirstIcon ? (
        <TouchableOpacity onPress={onPressFirstIcon} style={[styles.iconView, iconView]}>
          <AntDesign name="arrowleft" size={width(5)} color={arrowColor} />
        </TouchableOpacity>
      ) : <View></View>}
      <View style={[styles.emptyView, emptyViewStyle]}>
        {emptyView}
      </View>
      {RightIcon && (
        <TouchableOpacity onPress={onPressRightIcon} style={[styles.iconView, rightIconView]}>
          {RightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SimpleHeader;
