import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';
import { logoHat } from '../../assets/images';
import apiUrl from '../../config';
import { OwnerHome, OwnerListingScreen, OwnerOfferScreen, OwnerProfileScreen, OwnerTripsScreen } from '../../screens/owner/app';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import OwnerScreenNames from '../ownerRoutes';
import styles from './styles';

const Tab = createBottomTabNavigator();

export default function OwnerTab({ navigation }: any) {
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
      const picture = profilePicResponse.data.profilePicture.startsWith('http' || 'https') ? profilePicResponse.data.profilePicture :
      `${apiUrl}/${profilePicResponse.data.profilePicture}`
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
          if (route.name === OwnerScreenNames.OWNERHOME) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.darkGreen
                        : AppColors.transparent,
                    },
                  ]}
                />
                <Image
                  source={logoHat}
                  style={[
                    styles.userImageStyle,
                    { opacity: focused ? 1 : 0.5 },
                  ]}
                />
                <Text style={[styles.textStyle,{color: (focused ? AppColors.darkGreen : AppColors.white)}]}>
                  Dashboard
                </Text>
              </View>
            );
          }
          if (route.name === OwnerScreenNames.OWNERTRIPSCREEN) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.darkGreen
                        : AppColors.transparent,
                    },
                  ]}
                />
                <Ionicons
                  name={'boat'}
                  size={width(4)}
                  color={focused ? AppColors.darkGreen : AppColors.white}
                  style={styles.userImageStyle}
                />
                <Text style={[styles.textStyle,{color: (focused ? AppColors.darkGreen : AppColors.white)}]}>
                  Trips
                </Text>
              </View>
            );
          }
          if (route.name === OwnerScreenNames.OWNERPROFILESCREEN) {
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
                <Text style={[styles.textStyle,{color: (focused ? AppColors.darkGreen : AppColors.white)}]}>
                  Profile
                </Text>
              </View>
            );
          }
          if (route.name === OwnerScreenNames.OWNEROFFERSCREEN) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.darkGreen
                        : AppColors.transparent,
                    },
                  ]}
                />
                <FontAwesome6
                  name={'circle-dollar-to-slot'}
                  size={width(4)}
                  color={focused ? AppColors.darkGreen : AppColors.white}
                  style={styles.userImageStyle}
                />
                <Text style={[styles.textStyle,{color: (focused ? AppColors.darkGreen : AppColors.white)}]}>
                  Offers
                </Text>
              </View>
            );
          }
          if (route.name === OwnerScreenNames.OWNERLISTINGSCREEN) {
            return (
              <View style={styles.tabItemsStyle}>
                <View
                  style={[
                    styles.bottomTabIndicator,
                    {
                      backgroundColor: focused
                        ? AppColors.darkGreen
                        : AppColors.transparent,
                    },
                  ]}
                />
                <FontAwesome6
                  name={'list'}
                  size={width(4)}
                  color={focused ? AppColors.darkGreen : AppColors.white}
                  style={styles.userImageStyle}
                />
                <Text style={[styles.textStyle,{color: (focused ? AppColors.darkGreen : AppColors.white)}]}>
                  Listing
                </Text>
              </View>
            );
          }
        },
      })}
      initialRouteName={OwnerScreenNames.OWNEROFFERSCREEN}>
      <Tab.Screen name={OwnerScreenNames.OWNERHOME} component={OwnerHome} />
      <Tab.Screen name={OwnerScreenNames.OWNEROFFERSCREEN} component={OwnerOfferScreen} />
      <Tab.Screen name={OwnerScreenNames.OWNERLISTINGSCREEN} component={OwnerListingScreen} />
      <Tab.Screen name={OwnerScreenNames.OWNERTRIPSCREEN} component={OwnerTripsScreen}  />
      <Tab.Screen name={OwnerScreenNames.OWNERPROFILESCREEN} component={OwnerProfileScreen} />
    </Tab.Navigator>
  );
}
