import RootStackParamList from "@/navigations/RootStackParamList";
import FlexibleView from "@/screens/FlexibleView";
import ImageView from "@/screens/ImageView";
import ImmutableCounterView from "@/screens/ImmutableCounterView";
import ListView from "@/screens/ListView";
import MutableContextView from "@/screens/MutableContext";
import NumberView from "@/screens/NumberView";
import ReferenceView from "@/screens/ReferenceView";
import SectionView from "@/screens/SectionView";
import Settings from "@/screens/Settings";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text,TouchableOpacity } from "react-native";

const ScreenStackNavigator = createNativeStackNavigator<RootStackParamList>();


const ViewStack = () => {
    const navigator = useNavigation();

    React.useEffect(() => {
        navigator?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });

        return () => navigator?.setOptions({
            tabBarStyle: undefined
        });
    },[navigator]);

    return (
        <ScreenStackNavigator.Navigator
            initialRouteName="CustomNavigationTab"
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
                name="ReferenceView"
                component={ReferenceView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="FlexibleView"
                component={FlexibleView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="SectionView"
                component={SectionView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="ImmutableCounterView"
                component={ImmutableCounterView}
                options={{
                    headerShown: false,
                }}
            />
            <ScreenStackNavigator.Screen
                name="MutableContextView"
                component={MutableContextView}
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
                        <TouchableOpacity onPress={() => {
                            navigator.navigate("ImageView" as never);
                        }}>
                            <Text>Info</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ScreenStackNavigator.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                }}
            />
        </ScreenStackNavigator.Navigator>
    );
};

export default ViewStack;