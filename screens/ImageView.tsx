import RootStackParamList from "@/navigations/RootStackParamList";
import { CommonActions,DrawerActions,StackActions,useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { DimensionValue,Image,StyleProp,Text,TouchableOpacity,View,ViewStyle } from "react-native";

const HeavyImage = ({ size }: { size: DimensionValue }) => {
	React.useEffect(() => {
		//console.log("`HeavyImage` is re-rendered!");
	});

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
			<View
				style={{
					flex: 4,
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
		</View>
	);
};

const MemorizedHeavyImage = React.memo(HeavyImage);

function createTopLevelStyle() {
	//console.log("Top-level style re-created!");

	return {
		width: '100%',
		height: '100%',
		borderWidth: 2,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};
}

const ImageView = () => {
	const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const topLevelStyle = createTopLevelStyle();
	const [count,setCount] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCount(count + 1);
		},1000);

		return () => {
			clearInterval(interval);
		};
	},[count]);

	return (
		<View
			style={topLevelStyle as StyleProp<ViewStyle>}
		>
			<View
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 10,
				}}
			>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						navigator.navigate("NumberView",{
							content: 100,
						});
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"NumberView"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						// if (navigator.canGoBack() === true)
						// {
						// 	navigator.goBack();
						// }

						const navigationState = navigator.getState();

						if ((navigationState !== undefined) && (navigationState.index > 0))
						{
							// console.log(navigationState.routes);
							// const previousRoute = (navigationState.routes)[navigationState.index - 1];
							// const previousRouteName = previousRoute.name;
							// navigator.dispatch(CommonActions.navigate(previousRouteName));

							//console.log(navigator.getParent()?.getParent()?.getParent()?.getState().routes);
							// navigator.getParent()?.getParent()?.getParent()?.dispatch(StackActions.push("AdditionalNavigationBottomTab"));

							// navigator.navigate("AdditionalNavigationBottomTab", {
							// 	screen: "Dangle2", 
							// });
							navigator.goBack();
						}
						else
						{
							console.log("Can't go back anymore!");
						}
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"Go Back"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						navigator.dispatch(StackActions.pop(3));
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"Jump 3"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						navigator.navigate("SectionView");
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"SectionView"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						const state = navigator.getState();
						if (state != null)
						{
							const currentRoute = state.routes[state.index];
							const otherRoutes = state.routes.filter(result => (result.key !== currentRoute.key));

							navigator.dispatch(
								CommonActions.reset({
									index: otherRoutes.length,
									routes: [
										{ 
											name: currentRoute.name,
											params: currentRoute.params,
										},
										...otherRoutes
									] as any,
								}),
							);
						}
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"Sneak"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
					}}
					onPress={() => {
						navigator.reset({
							index: 1,
							routes: [
								{
									name: "ImageView",
								},
								{
									name: "ListView",
								},
							] as never[],
						});

						// navigator.dispatch(CommonActions.reset({
						// 	index: 0,
						// 	routes: [
						// 		{ name: 'Counter' },
						// 	],
						// }));
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"Reset"}</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flex: 3,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<MemorizedHeavyImage
					size={100}
				/>
				<HeavyImage
					size={100}
				/>
				<TouchableOpacity
					style={{
						borderRadius: 1000,
						borderWidth: 2,
						borderColor: '#0F0F0F',
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 4,
						paddingBottom: 4,
						bottom: 10,
					}}
					onPress={() => {
						navigator.dispatch(DrawerActions.toggleDrawer());
					}}
				>
					<Text
						style={{
							fontWeight: 700,
							fontSize: 16,
						}}
					>{"Toggle Drawer"}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ImageView;