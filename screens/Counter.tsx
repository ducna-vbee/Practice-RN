import ThemeContext from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { DimensionValue,Image,Text,TouchableOpacity,View } from "react-native";

const HeavyImage = ({ size }: { size: DimensionValue }) => {
	return (
		<View
			style={{
				flex: 1,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image
				source={require("../assets/images/splash-icon.png")}
				style={{
					width: size,
					height: size,
				}}
			/>
		</View>
	);
};

const MemorizedHeavyImage = React.memo(HeavyImage);

const Counter = () => {
	const [counter,setCounter] = React.useState(0);
	const [content,setState] = React.useState("abcd");
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
		const unsubscribeFocus = navigator.addListener('focus',() => {
			console.log('Screen is active - Start Timer');
		});

		const unsubscribeBlur = navigator.addListener('blur',() => {
			console.log('Screen is background - Pause Timer');
		});

		return () => {
			unsubscribeFocus();
			unsubscribeBlur();
		};
	},[navigator]);

	React.useEffect(() => {
		console.log("Re-rendered Counter screen!");
	},[]);

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
			<Text
				style={{
					fontSize: 16,
					color: textColor,
				}}
			>{("Text: " + content)}</Text>
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
						setState(content + "abcd");
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
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-evenly',
					}}
				>
					<MemorizedHeavyImage
						size={400}
					/>
					<HeavyImage
						size={400}
					/>
				</View>
			</View>
		</View>
	);
};

export default Counter;