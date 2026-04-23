import AuthContext from "@/contexts/AuthContext";
import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import { authenticationService } from "@/services/authenticationService";
import { login } from "@/slices/UserSlice";
import { RootState } from "@/store.redux";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { ActivityIndicator,Alert,KeyboardAvoidingView,Platform,StyleSheet,Text,TextInput,TextInputChangeEvent,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch,useSelector } from "react-redux";


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
        setUserToken,
    } = React.useContext(AuthContext);
    const [signInMessage,setSignInMessage] = React.useState("");
    const [pendingProgress,setPendingProgress] = React.useState(false);
    const referenceToInputBox1 = React.useRef<TextInput|null>(null);
    const referenceToInputBox2 = React.useRef<TextInput|null>(null);
    const lastSignInTime = useSelector((state: RootState) => state.user.lastLoginTime);
    const dispatcher = useDispatch();

    React.useEffect(() => {
        const unsubscribe = navigator.addListener('beforeRemove', (event) => {
            event.preventDefault();

            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure you want to leave?',
                [
                    { text: "Don't leave",style: 'cancel',onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => navigator.dispatch(event.data.action),
                    },
                ]
            );
        });

        return unsubscribe;
    }, [navigator]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: screenWidth,
                height: screenHeight,
                backgroundColor: '#ff9900',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? 'padding' : undefined}
                enabled={true}
                style={{
                    flex: 1,
                    width: screenWidth,
                    height: screenHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
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
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 32,
                            fontWeight: 800,
                        }}
                    >{"Sign In"}</Text>
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
                        ref={referenceToInputBox1}
                        value={email}
                        placeholder="Email"
                        onChange={(event: TextInputChangeEvent) => {
                            setEmail(event.nativeEvent.text);
                        }}
                        style={{
                            ...Styles.inputBox,
                        }}
                        placeholderTextColor={'#e0e0e0'}
                        onEndEditing={() => {
                            referenceToInputBox1.current?.blur();
                            referenceToInputBox2.current?.focus();
                        }}
                    />
                    <TextInput
                        ref={referenceToInputBox2}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChange={(event: TextInputChangeEvent) => {
                            setPassword(event.nativeEvent.text);
                        }}
                        style={{
                            ...Styles.inputBox,
                        }}
                        placeholderTextColor={'#e0e0e0'}
                        onEndEditing={() => {
                            referenceToInputBox2.current?.blur();
                        }}
                    />
                    {(signInMessage.length > 0) ? (
                        <Text
                            style={{
                                color: '#ff0000'
                            }}
                        >{signInMessage}</Text>
                    ) : (
                        <View></View>
                    )}
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderColor: '#FFFFFF',
                            borderRadius: 1000,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 8,
                            paddingBottom: 8,
                        }}  
                        onPress={async () => {
                            try
                            {
                                setPendingProgress(true);
                                const responseData = await authenticationService.login(email,password);
                                const userToken: string = responseData['token'];
                                await SecureStore.setItemAsync('user_token', userToken);
                                setSignInMessage("Signed in successfully!");
                                setUserToken(userToken);
                                setPendingProgress(false);
                                dispatcher(login());
                            }
                            catch (error)
                            {
                                console.log(error);
                                setSignInMessage("Invalid credential(s)!");
                            }
                        }}
                    >
                        {(pendingProgress === true) ? (
                            <ActivityIndicator
                                color={'#FFFFFF'}
                                style={{
                                    position: 'absolute',
                                    marginLeft: 10,
                                }}
                            />
                        ) : (
                            <View></View>
                        )}
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#FFFFFF',
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
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >{"Last login time: "}{lastSignInTime}</Text>
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
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        shadowColor: '#0F0F0F',
        shadowOpacity: 0.8,
        fontSize: 13,
        borderWidth: 2,
        borderRadius: 1000,
        paddingLeft: 16,
    }
});

export default SignIn;