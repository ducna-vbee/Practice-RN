import AuthContext from "@/contexts/AuthContext";
import Counter from "@/screens/Counter";
import Network from "@/screens/Network";
import Profile from "@/screens/Profile";
import { BottomTabBarProps,createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { ColorValue,Image,Text,TouchableOpacity,View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ViewStack from "./ViewStack";

const ApplicationBottomTabNavigator = createBottomTabNavigator();


const IconWithBadge = ({ badgeCount,color,size }: { badgeCount: number,color: ColorValue,size: number }) => (
    <View
        style={{
            width: 24,
            height: 24,
            margin: 5
        }}
    >
        <Image
            source={require("../assets/images/counter.png")}
            style={{
                width: size,
                height: size,
                tintColor: '#FFFFFF',
            }}
        />
        {(badgeCount > 0) && (
            <View
                style={{
                    right: -6,
                    backgroundColor: '#ff0000',
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: 8,
                        fontWeight: 700
                    }}
                >{badgeCount}</Text>
            </View>
        )}
        <View
            style={{
                position: 'absolute',
                right: -6,
                top: 18,
                backgroundColor: '#ff0000',
                borderRadius: 6,
                width: 12,
                height: 12,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Image
                source={require("../assets/images/question-mark.png")}
                style={{
                    width: 15,
                    height: 15,
                }}
            />
        </View>
    </View>
);

const CustomBottomTabBar = ({ state,descriptors,navigation,insets }: BottomTabBarProps) => {
    return (
        <View
            style={{
                height: 60,
                backgroundColor: 'white',
                flexDirection: 'row',
            }}
        >
            {(state.routes).map((route,index) => {
                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => {
                            const emittingEvent = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if ((state.index !== index) && (emittingEvent.defaultPrevented === false))
                            {
                                navigation.navigate(route.name);
                            }
                        }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: (state.index !== index) ? 'blue' : 'black',
                            }}
                        >
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const ApplicationBottomNavigationTab = () => {
    const {
        userToken,
    } = React.useContext(AuthContext);

    return (
        <ApplicationBottomTabNavigator.Navigator
            backBehavior={(userToken !== null) ? "none" : "history"}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ff9900',
                    opacity: 0.96,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    height: 70,
                    position: 'relative',
                    shadowColor: '#0F0F0F',
                    elevation: 25,
                },
                tabBarActiveTintColor: '#0099ff',
                tabBarInactiveTintColor: 'gray',
            }}
            // tabBar={({ state,descriptors,navigation,insets }: BottomTabBarProps) => (
            //     <CustomBottomTabBar
            //         state={state}
            //         descriptors={descriptors}
            //         navigation={navigation}
            //         insets={insets}
            //     />
            // )}
        >
            <ApplicationBottomTabNavigator.Screen
                name="Counter"
                component={Counter}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ color,size }) => (
                        <IconWithBadge
                            badgeCount={10}
                            color={color}
                            size={size}
                        />
                    ),
                    tabBarBadge: undefined,
                    headerTitle: "Counted",
                    header: () => (
                        <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: 60,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#e0e0e0',
                                }}
                            >
                                <Text style={{ fontSize: 18,fontWeight: 'bold' }}>{"Counter"}</Text>
                            </View>
                        </SafeAreaView>
                    ),
                    headerStyle: {
                        borderColor: '#0F0F0F',
                        borderWidth: 1,
                    }
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="ViewStack"
                component={ViewStack}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <Image
                                source={require("../assets/images/stack.png")}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 100,
                                    aspectRatio: 1 / 1,
                                    tintColor: '#FFFFFF',
                                }}
                            />
                        )
                    },
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="Network"
                component={Network}
                options={{
                    headerShown: false,
                    tabBarBadge: 1,
                    tabBarIcon: () => {
                        return (
                            <Image
                                source={require("../assets/images/network.png")}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1 / 1,
                                    tintColor: '#FFFFFF',
                                }}
                            />
                        )
                    },
                }}
            />
            <ApplicationBottomTabNavigator.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarBadge: 1,
                    tabBarIcon: () => {
                        return (
                            <Image
                                source={require("../assets/images/profile.png")}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1 / 1,
                                    tintColor: '#FFFFFF',
                                }}
                            />
                        )
                    },
                }}
            />
            {/* <ApplicationBottomTabNavigator.Screen
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
                component={FlexibleView}
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
            /> */}
        </ApplicationBottomTabNavigator.Navigator>
    );
};

export default ApplicationBottomNavigationTab;