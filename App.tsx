/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import NetInfo from "@react-native-community/netinfo";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Platform,StatusBar,Text,useWindowDimensions,View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Colors } from './constants/theme';
import ScreenDimensionContext from './contexts/ScreenDimensionContext';
import SettingsContext from './contexts/SettingsContext';
import ThemeContext from './contexts/ThemeContext';
import ApplicationBottomNavigationTab from './navigations/BottomTab';
import ErrorBoundary from "./screens/ErrorBoundary";
import { registerForPushNotificationsAsync } from "./screens/PushNotifications";
import ResetPassword from "./screens/ResetPassword";
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SignUp from "./screens/SignUp";
import { persistor,store,useAppSelector } from './store';


const ApplicationScreenNavigationStack = createNativeStackNavigator();
const ApplicationNavigationDrawerShell = createDrawerNavigator();


const linking = {
	prefixes: [Linking.createURL('/')],
	config: {
		screens: {
			ListView: 'list_view',
			Settings: 'settings',
		},
	},
};

const MainLayout = () => {
	const [screenWidth,setScreenWidth] = React.useState(0);
	const [screenHeight,setScreenHeight] = React.useState(0);
	const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');
	const [textColor,setTextColor] = React.useState('#0F0F0F');
	const [tabBarHiddenState,setTabBarHiddenState] = React.useState(false);
	const screenDimensions = useWindowDimensions();
	const currentOS = Platform.OS;
	const statusBarHeight: number = ((StatusBar.currentHeight != null) && (StatusBar.currentHeight !== undefined)) ? StatusBar.currentHeight : 0;
	const [darkModeUsage,setDarkModeUsage] = React.useState(false);
	const token = useAppSelector((state) => state.user.token);
	const [expoPushToken,setExpoPushToken] = React.useState('');
	const [channels,setChannels] = React.useState<Notifications.NotificationChannel[]>([]);
	const [notification,setNotification] = React.useState<Notifications.Notification | undefined>(undefined);
	
	function useNotifications()
	{
		const navigation = useNavigation();
		const notificationListener = React.useRef<any>(null);
		const responseListener = React.useRef<any>(null);

		React.useEffect(() => {
			notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
				console.log("Notification Received in Foreground:", notification);
			});

			responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
				const { screen, params } = response.notification.request.content.data;
				
				console.log("User tapped notification with data:", response.notification.request.content.data);

				if (screen)
				{
					navigation.navigate({
						screen: screen,
						params: params,
					} as never);
				}
			});

			return () => {
				notificationListener.current.remove();
			responseListener.current.remove();
			};
		}, [navigation]);
	};

	// const userCredentialAuthenticationContext = React.useMemo(() => ({
	// 	email: email,
	// 	password: password,
	// 	setEmail: setEmail,
	// 	setPassword: setPassword,
	// 	userToken: userToken,
	// 	setUserToken: setUserToken,
	// }),[email,password,userToken]);

	React.useEffect(() => {
		setScreenWidth(screenDimensions.width);
		setScreenHeight(screenDimensions.height);
		console.log("Current OS: `" + currentOS + "`.");
		console.log("Test this URL in Chrome:",Linking.createURL('settings'));
	},[screenDimensions.width,screenDimensions.height,currentOS]);

	React.useEffect(() => {
		if (darkModeUsage === true)
		{
			setBackgroundColor(Colors.dark.background);
			setTextColor(Colors.dark.text);
		}
		else
		{
			setBackgroundColor(Colors.light.background);
			setTextColor(Colors.light.text);
		}
	},[darkModeUsage]);

	React.useEffect(() => {
		registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
		const lastResponse = Notifications.getLastNotificationResponse();

		if (lastResponse != null)
		{
			console.log(JSON.stringify(lastResponse));
		}
	},[]);

	return (
		<SettingsContext.Provider
			value={{
				darkModeUsage: darkModeUsage,
				setDarkModeUsage: setDarkModeUsage,
			}}
		>
			<ScreenDimensionContext.Provider
				value={{
					screenWidth: screenWidth,
					screenHeight: screenHeight,
				}}
			>
				<ThemeContext.Provider
					value={{
						backgroundColor: backgroundColor,
						setBackgroundColor: setBackgroundColor,
						textColor: textColor,
						setTextColor: setTextColor,
						tabBarHiddenState: tabBarHiddenState,
						setTabBarHiddenState: setTabBarHiddenState,
					}}
				>
					<StatusBar
						animated={true}
						//hidden={true}
						translucent={true}
						backgroundColor={'transparent'}
						barStyle={'dark-content'}
					/>
					<View
						style={{
							position: 'absolute',
							top: -1.0 * statusBarHeight,
							left: 0,
							right: 0,
							bottom: 0,
						}}
					>
						<NavigationContainer
							linking={linking}
						>
							{(token !== null) ? (
								<ApplicationNavigationDrawerShell.Navigator
									initialRouteName="ApplicationBottomNavigationTab"
								>
									<ApplicationNavigationDrawerShell.Screen
										name="ApplicationBottomNavigationTab"
										component={ApplicationBottomNavigationTab}
										options={{
											headerShown: true,
										}}
									/>
									<ApplicationNavigationDrawerShell.Screen
										name="Settings"
										component={Settings}
										options={{
											headerShown: true,
										}}
									/>
								</ApplicationNavigationDrawerShell.Navigator>
							) : (
								<ApplicationScreenNavigationStack.Navigator
									initialRouteName="SignIn"
								>
									<ApplicationScreenNavigationStack.Screen
										name="SignUp"
										component={SignUp}
										options={{
											headerShown: false,
										}}
									/>
									<ApplicationScreenNavigationStack.Screen
										name="SignIn"
										component={SignIn}
										options={{
											headerShown: false,
										}}
									/>
									<ApplicationScreenNavigationStack.Screen
										name="ResetPassword"
										component={ResetPassword}
										options={{
											headerShown: false,
										}}
									/>
								</ApplicationScreenNavigationStack.Navigator>
							)}
						</NavigationContainer>
					</View>
				</ThemeContext.Provider>
			</ScreenDimensionContext.Provider>
		</SettingsContext.Provider>
	);
};

const App = () => {
	const [offlineState,setOfflineState] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			setOfflineState(!state.isConnected);
		});

		return () => unsubscribe();
	},[]);

	return (
		<SafeAreaProvider>
			<ErrorBoundary>
				<PersistGate loading={null} persistor={persistor}>
					{(offlineState === false) ? (
						<Provider store={store}>
							<MainLayout />
						</Provider>
					) : (
						<View
							style={{
								flex: 1,
								width: '100%',
								height: '100%',
								backgroundColor: 'red',
								padding: 10,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text
								style={{
									fontSize: 20,
									color: '#c2c2c2',
									textAlign: 'center'
								}}
							>{"No Internet Connection"}</Text>
						</View>
					)}
				</PersistGate>
			</ErrorBoundary>
		</SafeAreaProvider>
	);
};

export default App;