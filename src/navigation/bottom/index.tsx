import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SmallText } from '../../components';
import apiUrl from '../../config';
import { MakeOffer, Offers, Profile, RentersHome, Trip } from '../../screens/user/app';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import ScreenNames from '../routes';
import styles from './styles';

const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation }: any) {
  const [userId, setUserId] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

 // Fetch the owner ID and profile picture
 const fetchOwnerData = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    setUserId(''); // Clear userData state
    return;
  }
  try {
    // Fetch user ID
    const userResponse = await axios.get(`${apiUrl}/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedUserId = userResponse.data._id;
    setUserId(fetchedUserId);

    // Fetch profile picture
    const profilePicResponse = await axios.get(`${apiUrl}/profilePicture/${fetchedUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const picture = profilePicResponse.data.profilePicture
    setProfilePicture(picture);
  } catch (error) {
    console.log('Failed to fetch owner data:', error);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchOwnerData();
  }, [userId])
);

  return (
    <Tab.Navigator
      screenOptions={({ route }:any) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }: any) => {
          if (route.name === ScreenNames.HOME) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.blue
                        : AppColors.transparent,
                    },
                  ]}
                />
                <Entypo
                  name={'home'}
                  size={width(4)}
                  color={focused ? AppColors.blue : AppColors.white}
                />
                 <Text style={[styles.textStyle,{color: (focused? AppColors.black: AppColors.white)}]}>
                 Home
                </Text>
              </View>
            );
          }
          if (route.name === ScreenNames.TRIP) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.blue
                        : AppColors.transparent,
                    },
                  ]}
                />
                <Ionicons
                  name={'boat'}
                  size={width(4)}
                  color={focused ? AppColors.blue : AppColors.white}
                />
                 <Text style={[styles.textStyle,{color: (focused? AppColors.black: AppColors.white)}]}>
                 Trips
                </Text>
              </View>
            );
          }
          if (route.name === ScreenNames.PROFILE) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.blue
                        : AppColors.transparent,
                    },
                  ]}
                />
                  <Image
                  source={{ uri: profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                  style={[
                    styles.userImageStyle,
                    { opacity: focused ? 1 : 0.5 },
                  ]}
                />
                 <Text style={[styles.textStyle,{color: (focused? AppColors.black: AppColors.white)}]}>
                Profile
                </Text>
              </View>
            );
          }
          if (route.name === ScreenNames.OFFERS) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.blue
                        : AppColors.transparent,
                    },
                  ]}
                />
                <FontAwesome6
                  name={'circle-dollar-to-slot'}
                  size={width(4)}
                  color={focused ? AppColors.blue : AppColors.white}
                />
                 <Text style={[styles.textStyle,{color: (focused? AppColors.black: AppColors.white)}]}>
                 My Offers
                </Text>
              </View>
            );
          }
          if (route.name === ScreenNames.MAKEOFFER) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.blue
                        : AppColors.transparent,
                    },
                  ]}
                />
                <Ionicons
                  name={'create'}
                  size={width(4)}
                  color={focused ? AppColors.blue : AppColors.white}
                />
                 <SmallText textStyles={[styles.textStyle,{color: (focused? AppColors.black: AppColors.white)}]}>
                 Make Offer
                </SmallText>
              </View>
            );
          }
        },
      })}>
      <Tab.Screen name={ScreenNames.HOME} component={RentersHome} />
      <Tab.Screen name={ScreenNames.OFFERS} component={Offers} />
      <Tab.Screen name={ScreenNames.MAKEOFFER} component={MakeOffer} />
      <Tab.Screen name={ScreenNames.TRIP} component={Trip} />
      <Tab.Screen name={ScreenNames.PROFILE} component={Profile}/>
    </Tab.Navigator>
  );
}
