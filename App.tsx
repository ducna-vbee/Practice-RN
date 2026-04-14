/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform,useWindowDimensions } from 'react-native';
import {
	SafeAreaProvider
} from 'react-native-safe-area-context';
import AuthContext from './contexts/AuthContext';
import ScreenDimensionContext from './contexts/ScreenDimensionContext';
import ThemeContext from './contexts/ThemeContext';
import ApplicationBottomNavigationTab from './navigations/BottomTab';
import Counter from './screens/Counter';
import ListView from './screens/ListView';
import SignIn from "./screens/SignIn";

const ApplicationScreenNavigationStack = createNativeStackNavigator();
const ApplicationShellNavigationDrawer = createDrawerNavigator();


const App = () => {
	const [screenWidth,setScreenWidth] = React.useState(0);
	const [screenHeight,setScreenHeight] = React.useState(0);
	const [email,setEmail] = React.useState("");
	const [password,setPassword] = React.useState("");
	const [color,setColor] = React.useState('#FFFFFF');
	const [userToken,setUserToken] = React.useState<string | null>(null);
	const [tabBarHiddenState,setTabBarHiddenState] = React.useState(false);
	const screenDimensions = useWindowDimensions();
	const currentOS = Platform.OS;

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
	},[screenDimensions.width,screenDimensions.height,currentOS]);

	return (
		<SafeAreaProvider>
			<ScreenDimensionContext.Provider
				value={{
					screenWidth: screenWidth,
					screenHeight: screenHeight,
				}}
			>
				<ThemeContext.Provider
					value={{
						color: color,
						setColor: setColor,
						tabBarHiddenState: tabBarHiddenState,
						setTabBarHiddenState: setTabBarHiddenState,
					}}
				>
					<AuthContext.Provider
						value={userCredentialAuthenticationContext}
					>
						((userToken !== null) ? (
							<NavigationContainer>
								{/* <ApplicationShellNavigationDrawer.Navigator>
									<ApplicationShellNavigationDrawer.Screen name="ApplicationBottomNavigationTab" component={ApplicationBottomNavigationTab} />
								</ApplicationShellNavigationDrawer.Navigator> */}
								<ApplicationScreenNavigationStack.Navigator
									initialRouteName="ApplicationBottomNavigationTab"
								>
									<ApplicationScreenNavigationStack.Screen
										name="ListView"
										component={ListView}
										options={{
											headerShown: false,
										}}
									/>
									<ApplicationScreenNavigationStack.Screen
										name="Counter"
										component={Counter}
										options={{
											headerShown: false,
										}}
									/>
									<ApplicationScreenNavigationStack.Screen
										name="ApplicationBottomNavigationTab"
										component={ApplicationBottomNavigationTab}
										options={{
											headerShown: false,
										}}
									/>
								</ApplicationScreenNavigationStack.Navigator>
							</NavigationContainer>
						) : (
							<ApplicationScreenNavigationStack.Screen
								name="SignIn"
								component={SignIn}
								options={{
									headerShown: false,
								}}
							/>
						))
					</AuthContext.Provider>
				</ThemeContext.Provider>
			</ScreenDimensionContext.Provider>
		</SafeAreaProvider>
	);
};

export default App;