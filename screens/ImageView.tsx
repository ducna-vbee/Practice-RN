import React from "react";
import { DimensionValue,Image,StyleProp,View,ViewStyle } from "react-native";

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

function createTopLevelStyle()
{
	console.log("Top-level style re-created!");

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
            <MemorizedHeavyImage
                size={100}
            />
            <HeavyImage
                size={100}
            />
        </View>
    );
};

export default ImageView;