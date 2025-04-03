import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import apiUrl from '../config';
import { PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Define a navigation container ref
let navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

// Set navigation ref function
export function setNavigationRef(ref: NavigationContainerRef<RootStackParamList> | null) {
    navigationRef = ref;
}

const baseURL = apiUrl;

// Request user permission for notifications
export async function requestUserPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await getFcmToken();
            } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                console.log('Notification permission denied by user');
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log('Notification permission denied permanently');
            } else {
                console.log('Notification permission result:', granted);
            }
        } catch (error) {
            console.log('Failed to request notification permission:', error);
        }
    } else {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                await getFcmToken();
            } else {
                console.log('Notification permissions not granted');
            }
        } catch (error) {
            console.log('Failed to request notification permission:', error);
        }
    }
}

// Get FCM Token
export async function getFcmToken() {
    try {
        const fcmToken = await messaging().getToken();
        return fcmToken;
    } catch (error) {
        console.log('Failed to get FCM token:', error);
    }
}

// Handle background messages
export function handleBackgroundMessages() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {        
        if (remoteMessage.notification) {
            // Display the notification
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.HIGH,
                    pressAction: {
                        id: 'default', // An ID that you can use to identify this notification
                    },
                },
                data: remoteMessage.data,
            });
        }
    });
}

// Handle foreground messages
export function handleForegroundMessages() {
    messaging().onMessage(async remoteMessage => {
        if (remoteMessage.notification) {
            // Display the notification
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.HIGH,
                    pressAction: {
                        id: 'default', // An ID that you can use to identify this notification
                    },
                },
                data: remoteMessage.data,
            });
        }
    });
}

// Setup foreground notification listener
function setupForegroundNotificationListener() {
    notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS && detail.pressAction?.id === 'default') {
            if (detail.notification?.data?.navigationId && navigationRef?.isReady()) {
                const navigationId = detail.notification.data.navigationId as string;
                const trip = detail.notification.data.trip as string;
                const userImage = detail.notification.data.userImage as string;
                const userType = detail.notification.data.userType as string;
                const rating = detail.notification.data.rating as string;
                const _id = detail.notification.data._id as string;
                const ownerImage = detail.notification.data.ownerImage as string;
                const images = detail.notification.data.images as string; // For boat owner details
                const offer = detail.notification.data.offer as string; // For boat owner details
                const type = detail.notification.data.type as string; // For boat owner details
                const userId = detail.notification.data.userId as string; // For boat owner details
                const ratingId = detail.notification.data.ratingId as string; // For boat owner details
                const bookingId = detail.notification.data.bookingId as string; // For boat owner details
                const ownerId = detail.notification.data.ownerId as string; // For boat owner details
                const userdata = detail.notification.data.userdata as string; // For boat owner details

                if (navigationId === 'OwnerTripDetails') {
                    navigationRef?.navigate('OwnerTripDetails', {
                        trip: JSON.parse(trip),
                        ownerImage : userImage,
                        userType,
                        rating: parseFloat(rating),
                        _id,
                    });
                } else if (navigationId === 'TripDetails') {
                    navigationRef?.navigate('TripDetails', {
                        trip: JSON.parse(trip),
                        ownerImage,
                        userType,
                    });
                } else if (navigationId === 'OfferDetails') {
                    navigationRef?.navigate('OfferDetails', {
                        offer: JSON.parse(offer),
                        images: JSON.parse(images),
                        ownerImage,
                        type,
                    });
                } else if (navigationId === 'Reviews') {
                    navigationRef?.navigate('Reviews', {
                        userId: ratingId,
                        userType,
                        type: "Notification"
                    });
                } else if (navigationId === 'LeaveRating') {
                    navigationRef?.navigate('LeaveRating', {
                        ownerId,
                        userType,
                        userId,
                        bookingId,
                    });
                } else if (navigationId === 'HelpMessage') {
                    navigationRef?.navigate('GetHelp', {
                        userdata : JSON.parse(userdata),
                    }) }
                    else {
                    console.log('Navigation ID does not match any known screen.');
                }
            } else {
                console.log('Navigation ID or Navigation Ref not ready.');
            }
        }
    });
}

// Create a notification channel for Android
export async function createNotificationChannel() {
    if (Platform.OS === 'ios') {
        await notifee.requestPermission();
    }
    try {
        await notifee.createChannel({
            id: 'default', // Ensure this ID matches the one used in displayNotification
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });
    } catch (error) {
        console.log('Failed to create notification channel:', error);
    }
}

export async function updateFcmToken(userId: string) {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
        try {
            const response = await fetch(`${baseURL}/notification/updateFcmToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, fcmToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to update FCM token');
            }
        } catch (error) {
            console.log('Error updating FCM token:', error);
        }
    } else {
        console.log('No FCM token available');
    }
}

// Initialize notification services
export async function initializeNotificationServices() {
    await requestUserPermission();
    handleBackgroundMessages();
    handleForegroundMessages();
    await createNotificationChannel();
    setupForegroundNotificationListener(); 
}

// Handle notification navigation
export function handleNotificationNavigation() {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS && detail.pressAction?.id === 'default') {
                if (detail.notification?.data?.navigationId && navigationRef?.isReady()) {
                    const navigationId = detail.notification.data.navigationId as string;
                    const trip = detail.notification.data.trip as string;
                    const userImage = detail.notification.data.userImage as string;
                    const userType = detail.notification.data.userType as string;
                    const rating = detail.notification.data.rating as string;
                    const _id = detail.notification.data._id as string;
                    const ownerImage = detail.notification.data.ownerImage as string;
                    const images = detail.notification.data.images as string; // For boat owner details
                    const offer = detail.notification.data.offer as string; // For boat owner details
                    const type = detail.notification.data.type as string; // For boat owner details
                    const userId = detail.notification.data.userId as string; // For boat owner details
                    const ratingId = detail.notification.data.ratingId as string; // For boat owner details
                    const bookingId = detail.notification.data.bookingId as string; // For boat owner details
                    const ownerId = detail.notification.data.ownerId as string; // For boat owner details
                    const userdata = detail.notification.data.userdata as string; // For boat owner details

                    if (navigationId === 'OwnerTripDetails') {
                        navigationRef?.navigate('OwnerTripDetails', {
                            trip: JSON.parse(trip),
                            ownerImage : userImage,
                            userType,
                            rating: parseFloat(rating),
                            _id,
                        });
                    } else if (navigationId === 'TripDetails') {
                        navigationRef?.navigate('TripDetails', {
                            trip: JSON.parse(trip),
                            ownerImage,
                            userType,
                        });
                    } else if (navigationId === 'OfferDetails') {
                        navigationRef?.navigate('OfferDetails', {
                            offer: JSON.parse(offer),
                            images: JSON.parse(images),
                            ownerImage,
                            type,
                        });
                    } else if (navigationId === 'Reviews') {
                        navigationRef?.navigate('Reviews', {
                            userId: ratingId,
                            userType,
                            type: "Notification"
                        });
                    } else if (navigationId === 'LeaveRating') {
                        navigationRef?.navigate('LeaveRating', {
                            ownerId,
                            userType,
                            userId,
                            bookingId,
                        });
                    } else if (navigationId === 'HelpMessage') {
                        navigationRef?.navigate('GetHelp', {
                            userdata : JSON.parse(userdata),
                        }) }
                        else {
                        console.log('Navigation ID does not match any known screen.');
                    }
                } else {
                    console.log('Navigation ID or Navigation Ref not ready.');
                }
            }
        });
    }