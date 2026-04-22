import AuthContext from "@/contexts/AuthContext";
import ThemeContext from "@/contexts/ThemeContext";
import AndroidKeyboardAvoidingView from "@/screens/AndroidKeyboardAvoidingView";
import Counter from "@/screens/Counter";
import Flexible from "@/screens/Flexible";
import ImmutableCounterView from "@/screens/ImmutableCounterView";
import ListView from "@/screens/ListView";
import MutableContextView from "@/screens/MutableContext";
import ReferenceView from "@/screens/ReferenceView";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import ViewStack from "./ViewStack";

const ApplicationBottomTabNavigator = createBottomTabNavigator();

const ApplicationBottomNavigationTab = () => {
    const {
        userToken,
    } = React.useContext(AuthContext);

    const {
        tabBarHiddenState
    } = React.useContext(ThemeContext);

    return (
        <ApplicationBottomTabNavigator.Navigator
            backBehavior={(userToken !== null) ? "none" : "history"}    
        >
            <ApplicationBottomTabNavigator.Screen
                name="Counter"
                component={Counter}
                options={{
                    //tabBarIcon: require("../assets/images/icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="ViewStack"
                component={ViewStack}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="ListView"
                component={ListView}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="ReferenceView"
                component={ReferenceView}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="ImmutableCounterView"
                component={ImmutableCounterView}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="MutableContextView"
                component={MutableContextView}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="Flexible"
                component={Flexible}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="AndroidKeyboardAvoidingView"
                component={AndroidKeyboardAvoidingView}
                options={{
                    //tabBarIcon: require("../assets/images/splash-icon.png"),
                    headerShown: false,
                    tabBarBadge: 1,
                }}
            />
        </ApplicationBottomTabNavigator.Navigator>
    );
};

export default ApplicationBottomNavigationTab;