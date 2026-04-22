import ImageView from "@/screens/ImageView";
import ListView from "@/screens/ListView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const ScreenStackNavigator = createNativeStackNavigator();

const ViewStack = () => {
    return (
        <ScreenStackNavigator.Navigator
            initialRouteName="ListView"
        >
            <ScreenStackNavigator.Screen
                name="ImageView"
                component={ImageView}
            />
            <ScreenStackNavigator.Screen
                name="ListView"
                component={ListView}
            />
        </ScreenStackNavigator.Navigator>
    );
};

export default ViewStack;