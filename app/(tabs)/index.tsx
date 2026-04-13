import AuthContext from "@/contexts/AuthContext";
import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import ThemeContext from "@/contexts/ThemeContext";
import SignIn from "@/screens/SignIn";
import React from 'react';
import { Platform,useWindowDimensions } from "react-native";

const HomeScreen = () => {
	const [screenWidth,setScreenWidth] = React.useState(0);
	const [screenHeight,setScreenHeight] = React.useState(0);
	const [email,setEmail] = React.useState("");
	const [password,setPassword] = React.useState("");
	const [color,setColor] = React.useState('#FFFFFF');
	const screenDimensions = useWindowDimensions();
	const currentOS = Platform.OS;

	React.useEffect(() => {
		setScreenWidth(screenDimensions.width);
		setScreenHeight(screenDimensions.height);
		console.log("Current OS: `" + currentOS + "`.");
	},[screenDimensions.width,screenDimensions.height,currentOS]);

	return (
		<ScreenDimensionContext.Provider
			value={{
				screenWidth: screenWidth,
				screenHeight: screenHeight,
			}}
		>
			<ThemeContext
				value={{
					color: color,
					setColor: setColor,
				}}
			>
				<AuthContext.Provider
					value={{
						email: email,
						password: password,

						setEmail: setEmail,
						setPassword: setPassword,
					}}
				>
					<SignIn></SignIn>
				</AuthContext.Provider>
			</ThemeContext>
		</ScreenDimensionContext.Provider>
	);
};

export default HomeScreen;