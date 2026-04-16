import { Colors } from "@/constants/theme";
import SettingsContext from "@/contexts/SettingsContext";
import React from "react";
import { ScrollView,StyleSheet,Switch,Text,View } from "react-native";

const Settings = () => {
    const {
        darkModeUsage,
        setDarkModeUsage,
    } = React.useContext(SettingsContext);

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