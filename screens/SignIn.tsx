import AuthContext from "@/contexts/AuthContext";
import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import React from 'react';
import { KeyboardAvoidingView,StyleSheet,Text,TextInput,TextInputChangeEvent,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);
    const {
        email,
        password,
        setEmail,
        setPassword,
    } = React.useContext(AuthContext);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: screenWidth,
                height: screenHeight,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <KeyboardAvoidingView
                behavior='height'
                enabled={true}
                style={{
                    flex: 1,
                    width: screenWidth,
                    height: screenHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        ...Styles.screenViewPart,
                        ...{
                            flex: 1,
                            justifyContent: 'center',
                        },
                    }}
                >

                </View>
                <View
                    style={{
                        ...Styles.screenViewPart,
                        ...{
                            flex: 8,
                            justifyContent: 'space-evenly',
                            paddingLeft: 40,
                            paddingRight: 40,
                        },
                    }}
                >
                    <TextInput
                        value={email}
                        placeholder="Email"
                        onChange={(event: TextInputChangeEvent) => {
                            setEmail(event.nativeEvent.text);
                        }}
                        style={{
                            ...Styles.inputBox,
                        }}
                    />
                    <TextInput
                        value={password}
                        placeholder="Password"
                        onChange={(event: TextInputChangeEvent) => {
                            setPassword(event.nativeEvent.text);
                        }}
                        style={{
                            ...Styles.inputBox,
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderColor: '#0F0F0F',
                            borderRadius: 1000,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 4,
                            paddingBottom: 4,
                        }}
                        onPress={() => {
                            
                        }}
                    >
                        <Text
                            style={{}}
                        >{"SIGN IN"}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...Styles.screenViewPart,
                        ...{
                            flex: 1,
                            justifyContent: 'center',
                        },
                    }}
                >

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    screenViewPart: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputBox: {
        flex: 1,
        width: '100%',
        maxHeight: 50,
        color: '#0F0F0F',
        fontSize: 13,
        borderWidth: 2,
        borderRadius: 1000,
        paddingLeft: 16,
    }
});

export default SignIn;