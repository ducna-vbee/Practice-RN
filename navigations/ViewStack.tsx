import ImageView from "@/screens/ImageView";
import ListView from "@/screens/ListView";
import NumberView from "@/screens/NumberView";
import RootStackParamList from "@/screens/RootStackParamList";
import Settings from "@/screens/Settings";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text,TouchableOpacity } from "react-native";

const ScreenStackNavigator = createNativeStackNavigator<RootStackParamList>();

const ViewStack = () => {
    const navigator = useNavigation();

    return (
        <ScreenStackNavigator.Navigator
            initialRouteName="ListView"
        >
            <ScreenStackNavigator.Screen
                name="ImageView"
                component={ImageView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="ListView"
                component={ListView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="NumberView"
                component={NumberView}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigator.navigate("Settings" as never);
                        }}>
                            <Text>Settings</Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => alert('This is a right button!')}>
                            <Text>Info</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </ScreenStackNavigator.Navigator>
    );
};

export default ViewStack;