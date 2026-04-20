import ThemeContext from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable,Text,TextInput,TouchableOpacity,View } from "react-native";


const Counter = () => {
	const [counter,setCounter] = React.useState(0);
	const [email,setEmail] = React.useState("");
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
			//console.log("`email` is verified: " + email);
		}

		const emailRegularExpression: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		return emailRegularExpression.test(value);
	},[email]);

	const validateEmail: boolean = React.useMemo(() => {
		const validity = verifyEmail(email,false);

		if (validity === true)
		{
			//console.log("`email` is valid: " + email);
		}
		
		return validity;
	},[verifyEmail, email]);

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
				<Pressable
					style={{
						backgroundColor: '#929292',
						width: 100,
						height: 50,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 1000,
						opacity: 0.1,
					}}
					onPress={() => {
						console.log("Pressed!");
					}}
				>
					<Text
						style={{
							color: '#FFFFFF'
						}}
					>{"Pressable"}</Text>
				</Pressable>
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
						placeholder="Emailr"
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
				</View>
			</View>
		</View>
	);
};

export default Counter;