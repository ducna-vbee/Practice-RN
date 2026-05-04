import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: false,
    }),
});

async function registerForPushNotificationsAsync(): Promise<string>
{
    let token: string = "";

    if (Platform.OS === 'android')
    {
        await Notifications.setNotificationChannelAsync('myNotificationChannel',{
            name: 'A channel is needed for the permissions prompt to appear',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0,250,250,250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice === true)
    {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted')
        {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted')
        {
            alert('Failed to get push token for push notification!');

            return "";
        }

        try
        {
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

            if (projectId == null)
            {
                throw new Error('Project ID not found');
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
            console.log("Got the push token for the application: `" + token + "`.");
        }
        catch (exception)
        {
            token = `${exception}`;
        }
    }
    else
    {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

async function schedulePushNotification(): Promise<void> 
{
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got new notification!",
            body: 'Here is the notification body',
            data: { data: 'goes here',test: { test1: 'more data' } },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2,
        },
    });
}

export {
    registerForPushNotificationsAsync,
    schedulePushNotification
};

