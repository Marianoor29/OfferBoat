import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import apiUrl from '../../config';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import { LargeText, SmallText } from '../text';
import styles from './styles';

type headerProps = {
  source?: any,
  container?: any,
  icon1?: any,
  icon2?: any,
  emptyView?: any,
  onPressFirstIcon1?: () => void,
  onPressFirstIcon2?: () => void,
  numberOfNotifications?: number,
  SecondIconTitle?: string,
  iconName?: string,
};

const OwnerHeader = ({
  source,
  container,
  onPressFirstIcon1 = () => null,
  onPressFirstIcon2 = () => null,
  SecondIconTitle = 'Add Listing',
  iconName = 'post-add'
}: headerProps) => {
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [userId, setUserId] = useState('');

  // Fetch userId
  useEffect(() => {
    const fetchRentersData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setUserId('');
          return;
        }
        const userResponse = await axios.get(`${apiUrl}/userData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { _id } = userResponse.data;
        setUserId(_id);
      } catch (error) {
        console.log('Failed to load user data');
      }
    };

    fetchRentersData();
  }, []);

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
      <View style={styles.iconView}>
        {onPressFirstIcon1 && (
          <View>
            <View style={styles.badgeStyle}>
              <SmallText size={2.4} color={AppColors.white}>
                {numberOfNotifications}
              </SmallText>
            </View>
            <Pressable onPress={onPressFirstIcon1}>
              <Icon name="bell" color={AppColors.green} size={width(5)} />
            </Pressable>
          </View>
        )}
      </View>
      <View>
        {source && (
          <Image source={source} style={styles.logo} resizeMode='contain' />
        )}
      </View>
      {onPressFirstIcon2 && (
        <Pressable onPress={onPressFirstIcon2} style={styles.icon2View}>
          <MaterialIcons name={iconName} size={width(6)} color={AppColors.green} />
          <LargeText size={3} color={AppColors.green} textAlign={'center'}>
            {SecondIconTitle}
          </LargeText>
        </Pressable>
      )}
    </View>
  );
};

export default OwnerHeader;
