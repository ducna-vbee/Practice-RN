import { Colors } from "@/constants/theme";
import AuthContext from "@/contexts/AuthContext";
import SettingsContext from "@/contexts/SettingsContext";
import * as SecureStore from 'expo-secure-store';
import React from "react";
import { ScrollView,StyleSheet,Switch,Text,TouchableOpacity,View } from "react-native";


const Settings = () => {
    const {
        darkModeUsage,
        setDarkModeUsage,
    } = React.useContext(SettingsContext);

    const {
        setUserToken,
        setEmail,
        setPassword,
    } = React.useContext(AuthContext);

    async function handleSignOut()
    {
        try 
        {
            await SecureStore.deleteItemAsync('user_token');
            setUserToken(null);
            setEmail("");
            setPassword("");

            console.log("User successfully signed out and persistence cleared.");
        }
        catch (error)
        {
            console.error("Error during sign out:", error);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 5,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                >
                    <View
                        style={Styles.settingSection}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingLeft: '10%',
                                paddingRight: '10%',
                            }}
                        >
                            <Text
                                style={Styles.settingLabel}
                            >{"Dark Mode"}</Text>
                            <Switch
                                value={darkModeUsage}
                                thumbColor={'#0F0F0F'}
                                
                                onValueChange={(newValue: boolean) => {
                                    setDarkModeUsage(newValue);
                                }}
                            />
                        </View>
                        <View
                            style={Styles.sectionSeparateLine}
                        ></View>
                    </View>
                </ScrollView>
            </View>
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
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderColor: '#0F0F0F',
                        borderRadius: 1000,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        handleSignOut();
                    }}
                >
                    <Text
                        style={{
                            color: '#0F0F0F',
                            fontSize: 16,
                        }}
                    >{"Sign Out"}</Text>
                </TouchableOpacity>
            </View>
        </View>  
    );
};

const Styles = StyleSheet.create({
    settingLabel: {
        fontSize: 20,
        fontWeight: 700,
        color: Colors.light.text,
    },
    settingSection: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    sectionSeparateLine: {
        width: '80%',
        height: 1,
        backgroundColor: '#c2c2c2',
    },
});

export default Settings;