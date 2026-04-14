import SampleData from "@/assets/sample_data";
import AuthContext from "@/contexts/AuthContext";
import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import ThemeContext from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { KeyboardAvoidingView,StyleSheet,Text,TextInput,TextInputChangeEvent,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
    const navigator = useNavigation();
    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);
    const {
        email,
        password,
        setEmail,
        setPassword,
        signIn,
    } = React.useContext(AuthContext);
    const {
        color,
        setColor,
    } = React.useContext(ThemeContext);
    const [signInMessage,setSignInMessage] = React.useState("");

    function validateCredentials(email: string,password: string) : boolean
    {
        return ((email === SampleData.email) && (password === SampleData.password))
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: screenWidth,
                height: screenHeight,
                backgroundColor: color,
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
                    {(signInMessage.length > 0) ? (
                        <Text
                            style={{
                                
                            }}
                        >{signInMessage}</Text>
                    ) : (
                        <View></View>
                    )}
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
                            if (validateCredentials(email, password) === true)
                            {
                                setSignInMessage("Signed in successfully!");
                                setEmail(email);
                                setPassword(password);
                                navigator.navigate("ApplicationBottomNavigationTab" as never);
                                signIn("abcd");
                            }
                            else
                            {
                                setSignInMessage("Invalid credential(s)!");
                            }
                        }}
                    >
                        <Text
                            style={{
                                
                            }}
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