import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import React from "react";
import { StyleSheet,View } from "react-native";

const FlexibleView = () => {
    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);

    return (
        <View
            style={{
                flex: 1,
                width: screenWidth,
                height: screenHeight,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                alignContent: 'center',
            }}
        >
            <View
                style={{
                    ...Styles.viewBox,
                    ...{
                        width: 300,
                        height:200,
                        flexBasis: 400,
                    },
                }}
            ></View>
            <View
                style={{
                    ...Styles.viewBox,
                    ...{
                        width: 80,
                        height: 40,
                    },
                }}
            ></View>
            <View
                style={{
                    ...Styles.viewBox,
                    ...{
                        width: 80,
                        height: 20,
                        flexGrow: 0.5,
                    },
                }}
            ></View>
        </View>
    );
};

const Styles = StyleSheet.create({
    viewBox: {
        borderWidth: 2,
    },
});

export default FlexibleView;