import React from "react";
import { Image,KeyboardAvoidingView,ScrollView,TextInput } from "react-native";

const AndroidKeyboardAvoidingView = () => {
    const [inputText,setInputText] = React.useState("");

    return (
        <ScrollView
            style={{
                width: '100%',
                height: '100%',

            }}
        >
            <KeyboardAvoidingView
                behavior={undefined}
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
                <TextInput
                    value={inputText}
                    onChangeText={(text) => {
                        setInputText(text);
                    }}
                    style={{
                        width: '100%',
                        height: 55,
                        borderWidth: 2,
                        borderRadius: 1000,
                        borderColor: '#0F0F0F',
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AndroidKeyboardAvoidingView;