import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiUrl from '../../config';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/store/hook';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import { SmallText } from '../text';
import styles from './styles';

type headerProps = {
  source?: any,
  container?: any,
  iconView?: boolean,
  mode?: boolean,
  icon1?: any,
  firstIcon?: any,
  emptyView?: any,
  searchIconColor?: string,
  bellIconColor?: string,
  onPressFirstIcon?: () => void,
  onPressFirstIcon1?: () => void,
  onPressFirstIcon2?: () => void,
};

const Header = ({
  source,
  container,
  firstIcon = true,
  icon1,
  bellIconColor = AppColors.secondaryRenter,
  onPressFirstIcon = () => null,
  onPressFirstIcon1,
  onPressFirstIcon2,
  emptyView,
}: headerProps) => {
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const userData = useAppSelector((state: RootState) => state.user);
  const userId = userData._id

  // Fetch number of notifications when userId is set
  useFocusEffect(
    useCallback(() => {
    if (!userId) return;

    const fetchNumberOfNotifications = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notification/countUnreadNotifications/${userId}`);
        if (response.status === 200) {
          setNumberOfNotifications(response.data.count);
        } else {
          console.log('Failed to fetch notification count:', response.status);
        }
      } catch (error) {
        console.log('Error fetching notification count:', error);
      }
    };

    fetchNumberOfNotifications();
  }, [userId])
)

  return (
    <View style={[styles.container, container]}>
      {firstIcon ? (
        <Pressable onPress={onPressFirstIcon} style={[styles.emptyView, emptyView]}>
          {icon1}
        </Pressable>
      ) : (
        <View style={styles.emptyView}>{emptyView}</View>
      )}
      {source && <Image source={source} style={styles.logo} resizeMode="contain" />}
      <View style={styles.iconView}>
        {onPressFirstIcon1 && (
          <Pressable onPress={onPressFirstIcon1} style={styles.icon}>
            <Icon name="search" size={width(5)} color={AppColors.secondaryRenter} />
          </Pressable>
        )}
          {onPressFirstIcon2 && (
        <View>
          <View style={styles.badgeStyle}>
            <SmallText size={2.4} color={AppColors.white}>
              {numberOfNotifications}
            </SmallText>
          </View>
          <Pressable onPress={onPressFirstIcon2} style={styles.icon}>
            <Icon name="bell" color={bellIconColor} size={width(5)} />
          </Pressable>
        </View>
          )}
      </View>
    </View>
  );
};

export default Header;
