import ThemeContext from "@/contexts/ThemeContext";
import React from "react";
import { GestureResponderEvent,Image,Text,TouchableOpacity,View } from "react-native";


const ExpensiveBigList = ({ onPress }: { onPress: ((event: GestureResponderEvent) => void) | undefined }) => {
	console.log("Big List Rendered!");

	return (
		<TouchableOpacity onPress={onPress}>
			<Text>I am a big list</Text>
			<Image
				source={require("../assets/images/android-icon-foreground.png")}
				style={{
					width: 800,
					height: 800,
				}}
			/>
		</TouchableOpacity>
	);
};

const Counter = () => {
	const ACTIONS = {
		INCREMENT: "increment",
	};

	const handlePress = () => console.log("Pressed");

	const handlePressStably = React.useCallback(() => {
		console.log("Pressed");
	},[]);

	const {
		tabBarHiddenState,
		setTabBarHiddenState
	} = React.useContext(ThemeContext);

	const [state,dispatch] = React.useReducer((state: { count: number; tick: number },action: any): { count: number; tick: number } => {
		switch (action.type)
		{
		case ACTIONS.INCREMENT:
			{
				return {
					count: state.count + 1,
					tick: Date.now(),
				};
			}
		default:
			{
				return state;
			}
		}
	},{
		count: 0,
		tick: 0,
	});

	function checkPrimality(input: number): boolean {
		if (input < 1)
		{
			return false;
		}
		else
		{
			let i = 0;

			for (i = 2; i < input / 2; i++)
			{
				if (input % i === 0)
				{
					return false;
				}
			}

			return true;
		}
	}

	const primenessOfCount = React.useMemo(() => {
		console.log("Checking primality...");

		return checkPrimality(state.count);
	},[state.count]);


	const buttonViewReference: React.RefObject<View | null> = React.useRef<View>(null);

	React.useEffect(() => {
		console.log("Counter initialized to `" + state.count.toString() + "`.");
	},[]);

	React.useEffect(() => {
		console.log("Counter increased to `" + state.count.toString() + "`.");

		return () => {
			console.log("Counter stopped at `" + state.count.toString() + "`.");
		};
	},[state.count]);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flex: 1,
				flexDirection: "column",
				justifyContent: "center",
				alignContent: "space-evenly",
			}}
		>
			<View
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Text>
					{"Counter:"}
					{state.count}
				</Text>
			</View>
			<View
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Text>
					{"System ticks:"}
					{state.tick}
				</Text>
			</View>
			<View
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Text>Count being prime: {primenessOfCount ? "Yes" : "No"}</Text>

				<ExpensiveBigList onPress={handlePress} />

				<ExpensiveBigList onPress={handlePressStably} />
			</View>

			<View
				ref={buttonViewReference}
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flex: 4,
					flexDirection: "column",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<TouchableOpacity
					style={{
						borderWidth: 2,
						borderRadius: 100,
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						setTabBarHiddenState(true);
					}}
				>
					<Text>{"Hide Tab"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						borderWidth: 2,
						borderRadius: 100,
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						dispatch({ type: ACTIONS.INCREMENT });

						if (buttonViewReference.current !== null)
						{
							buttonViewReference.current.measure(
								(x,y,width,height,pageX,pageY) => {
									console.log(
										`Button pressed at screen position: ${pageX}, ${pageY}`,
									);
								},
							);
						}
					}}
				>
					<Text
						style={{
							fontSize: 16,
						}}
					>
						{"Count"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Counter;