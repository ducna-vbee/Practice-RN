import AuthContext from "@/contexts/AuthContext";
import ThemeContext from "@/contexts/ThemeContext";
import Counter from "@/screens/Counter";
import ImageView from "@/screens/ImageView";
import ListView from "@/screens/ListView";
import ReferenceView from "@/screens/ReferenceView";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";

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
                name="ImageView"
                component={ImageView}
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
        </ApplicationBottomTabNavigator.Navigator>
    );
};

export default ApplicationBottomNavigationTab;