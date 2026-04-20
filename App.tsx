/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import React from 'react';
import { Platform,StatusBar,useWindowDimensions,View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from './constants/theme';
import AuthContext from './contexts/AuthContext';
import ScreenDimensionContext from './contexts/ScreenDimensionContext';
import SettingsContext from './contexts/SettingsContext';
import ThemeContext from './contexts/ThemeContext';
import ApplicationBottomNavigationTab from './navigations/BottomTab';
import RootStackParamList from './screens/RootStackParamList';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';

const ApplicationScreenNavigationStack = createNativeStackNavigator<RootStackParamList>();
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

const App = () => {
	const [screenWidth,setScreenWidth] = React.useState(0);
	const [screenHeight,setScreenHeight] = React.useState(0);
	const [email,setEmail] = React.useState("");
	const [password,setPassword] = React.useState("");
	const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');
	const [textColor,setTextColor] = React.useState('#0F0F0F');
	const [userToken,setUserToken] = React.useState<string | null>(null);
	const [tabBarHiddenState,setTabBarHiddenState] = React.useState(false);
	const screenDimensions = useWindowDimensions();
	const currentOS = Platform.OS;
	const [darkModeUsage,setDarkModeUsage] = React.useState(false);

	const userCredentialAuthenticationContext = React.useMemo(() => ({
		email: email,
		password: password,
		setEmail: setEmail,
		setPassword: setPassword,
		userToken,
		signIn: (token: string) => setUserToken(token),
		signOut: () => setUserToken(null),
	}),[email,password,userToken]);

	React.useEffect(() => {
		setScreenWidth(screenDimensions.width);
		setScreenHeight(screenDimensions.height);
		console.log("Current OS: `" + currentOS + "`.");
		console.log("Test this URL in Chrome:", Linking.createURL('settings'));
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

	return (
		<SafeAreaProvider>
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
						<AuthContext.Provider
							value={userCredentialAuthenticationContext}
						>
								<StatusBar
									animated={true}
									//hidden={true}
									translucent={true}
									backgroundColor={'transparent'} // Use transparent so the content shows through
									barStyle={'dark-content'}
								/>
								<View
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
									}}
								>
								<NavigationContainer
									linking={linking}
								>
									{(userToken !== null) ? (
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
												name="SignIn"
												component={SignIn}
												options={{
													headerShown: false,
												}}
											/>
										</ApplicationScreenNavigationStack.Navigator>
									)}
								</NavigationContainer>
							</View>
						</AuthContext.Provider>
					</ThemeContext.Provider>
				</ScreenDimensionContext.Provider>
			</SettingsContext.Provider>
		</SafeAreaProvider>
	);
};

export default App;