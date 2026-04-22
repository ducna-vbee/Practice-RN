import ThemeContext from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated,Modal,Pressable,Text,TextInput,TouchableOpacity,View } from "react-native";

const CounterModal = ({visibility,setVisibility}: {visibility: boolean,setVisibility:(previouseState: boolean) => void}) => {
	return (
		<Modal
			visible={visibility}
			hardwareAccelerated={true}
			transparent={true}
			statusBarTranslucent={true}
			animationType='slide'
		>
			<View
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<View
					style={{
						width: '80%',
						height: 200,
						backgroundColor: '#0F0F0F',
						opacity: 0.96,
						borderTopWidth: 1,
						borderLeftWidth: 1,
						borderRightWidth: 1,
						borderBottomWidth: 0,
						borderColor: '#FFFFFF',
						borderTopLeftRadius: 25,
						borderTopRightRadius: 25,
						shadowColor: '#0F0F0F',
						shadowOffset: {
							width: 5,
							height: 5,
						},
						shadowRadius: 100,
						bottom: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<TouchableOpacity
						style={{
							borderWidth: 2,
							borderColor: '#FFFFFF',
							borderRadius: 1000,
							paddingLeft: 16,
							paddingRight: 16,
							paddingTop: 8,
							paddingBottom: 8,
						}}
						onPress={() => {
							setVisibility(false);
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: '#FFFFFF',
							}}
						>{"Hide"}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
};

const Counter = () => {
	const [counter,setCounter] = React.useState(0);
	const [email,setEmail] = React.useState("");
	const [modalVisibility,setModalVisibility] = React.useState<boolean>(false);
	const navigator = useNavigation();
	
	const {
		backgroundColor,
		textColor,
	} = React.useContext(ThemeContext);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCounter(counter + 1);
		},1000);

		return () => {
			clearInterval(interval);
		}
	},[counter]);

	const opacityAnimation = React.useRef(new Animated.Value(1)).current;
 
	const fadeIn = () => {
		Animated.timing(opacityAnimation, {
			toValue: 0.1,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};
	
	const fadeOut = () => {
		Animated.timing(opacityAnimation, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	React.useEffect(() => {
		// const unsubscribeFocus = navigator.addListener('focus',() => {
		// 	console.log('Screen is active - Start Timer');
		// });

		// const unsubscribeBlur = navigator.addListener('blur',() => {
		// 	console.log('Screen is background - Pause Timer');
		// });	

		// return () => {
		// 	unsubscribeFocus();
		// 	unsubscribeBlur();
		// };
	},[navigator]);

	const verifyEmail = React.useCallback((value: string,verbose: boolean) => {
		if (verbose === true)
		{
			//console.log("`email` is verified: " + email + " with tick " + Date.now().toString());
		}

		const emailRegularExpression: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		return emailRegularExpression.test(value);
	},[email]);

	// const verifyEmail = (value: string,verbose: boolean) => {
	// 	if (verbose === true)
	// 	{
	// 		//console.log("`email` is verified: " + email + " with tick " + Date.now().toString());
	// 	}

	// 	const emailRegularExpression: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// 	return emailRegularExpression.test(value);
	// };

	const validateEmail: boolean = React.useMemo(() => {
		const validity = verifyEmail(email,false);

		if (validity === true)
		{
			//console.log("`email` is valid: " + email + " with tick " + Date.now().toString());
		}
		else
		{
			//console.log("`email` is invalid: " + email + " with tick " + Date.now().toString());
		}
		
		return validity;
	},[verifyEmail, email]);

	const userSettings = { currentEmail: email };

	const shallowCompare = React.useMemo(() => {
		console.log("Shallowly compared!");
		return userSettings.currentEmail.includes('@');
	}, [userSettings]);

	const deepCompare = React.useMemo(() => {
		console.log("Deeply compared!");
		return userSettings.currentEmail.includes('@');
	}, [userSettings.currentEmail]);

	React.useEffect(() => {
		shallowCompare;
		deepCompare;
	},[deepCompare, shallowCompare]);

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
				height: '100%',
				backgroundColor: backgroundColor,
				display: "flex",
				flexDirection: "column",
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					gap: 40,
				}}
			>
				<Text
					style={{
						fontSize: 16,
						color: textColor,
					}}
				>{("Elapsed time: " + counter.toString() + "s")}</Text>
				<TouchableOpacity
					style={{
						borderWidth: 2,
						borderRadius: 1000,
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 8,
						paddingBottom: 8,
					}}
					onPress={() => {
						setCounter(counter + 1);
					}}
				>
					<Text
						style={{
							fontSize: 16,
							color: textColor,
						}}
					>{"Increment Counter"}</Text>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						width: '100%',
						height: '100%',
						borderWidth: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-evenly',
					}}
				>
					<TextInput
						value={email}
						placeholder="Email"
						style={{
							width: '100%',
							height: 50,
							borderWidth: 2,
							borderColor: '#0F0F0F',
							borderRadius: 1000,
							paddingLeft: 16,
						}}
						onChangeText={(value) => {
							setEmail(value);
						}}
					/>
					<Text
						style={{
							color: '#0F0F0F',
							fontSize: 16,
						}}
					>{"Verification: "} {(verifyEmail(email,true) === true) ? "true" : "false"}</Text>
					<Text
						style={{
							color: '#0F0F0F',
							fontSize: 16,
						}}
					>{"Validation: "} {(validateEmail === true) ? "true" : "false"}</Text>
					<Pressable
						onPress={() => {
							setModalVisibility(!modalVisibility);
						}}
						onPressIn={fadeIn}
						onPressOut={fadeOut}
					>
						<Animated.View
							style={{
								backgroundColor: '#929292',
								width: 100,
								height: 50,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 1000,
								opacity: opacityAnimation,
							}}
						>
							<Text
								style={{
									color: '#FFFFFF'
								}}
							>{"Toggle Modal"}</Text>
						</Animated.View>
					</Pressable>
				</View>
			</View>
			<CounterModal
				visibility={modalVisibility}
				setVisibility={setModalVisibility}
			/>
		</View>
	);
};

export default Counter;