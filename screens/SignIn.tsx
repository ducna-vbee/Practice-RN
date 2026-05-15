import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import { selectAuthenticatedStatus,signUserIn } from "@/slices/UserSlice";
import { RootState,useAppDispatch,useAppSelector } from "@/store";
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { ActivityIndicator,Alert,KeyboardAvoidingView,Platform,StyleSheet,Text,TextInput,TextInputChangeEvent,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";


const SignIn = () => {
    const navigator = useNavigation();
    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);
    const [email,setEmail] = React.useState("eve.holt@reqres.in");
    const [password,setPassword] = React.useState("cityslicka");
    const [signInMessage,setSignInMessage] = React.useState("");
    const referenceToInputBox1 = React.useRef<TextInput | null>(null);
    const referenceToInputBox2 = React.useRef<TextInput | null>(null);
    const lastSignInTime = useSelector((state: RootState) => state.user.lastLoginTime);
    const loading = useAppSelector((state) => state.user.loading);
    useAppSelector(selectAuthenticatedStatus);
    const dispatcher = useAppDispatch();

    React.useEffect(() => {
        const unsubscribe = navigator.addListener('beforeRemove',(event) => {
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
    },[navigator]);

    async function performSigningIn()
    {
        if (!email || !password)
        {
            setSignInMessage("Fields cannot be empty!"); 
            return;
        }
        else
        {
            try
            {
                await dispatcher(signUserIn({ email,password })).unwrap();
                setSignInMessage("Signed in successfully!");
            }
            catch
            {
                setSignInMessage("Invalid credential(s)!");
            }
        }
    }

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
                            textTransform: 'uppercase',
                        }}
                    >{"SIGN IN"}</Text>
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
                        onPress={() => {
                            navigator.navigate("SignUp" as never);
                        }}
                    >
                        <Text
                            style={{
                                color: '#0044ff',
                                fontSize: 12,
                            }}
                        >{"Don't have an account? Sign Up"}</Text>
                    </TouchableOpacity>
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
                            // try
                            // {
                            //     setPendingProgress(true);
                            //     const responseData = await authenticationService.login(email,password);
                            //     const userToken: string = responseData['token'];
                            //     await SecureStore.setItemAsync('user_token', userToken);
                            //     setSignInMessage("Signed in successfully!");
                            //     setPendingProgress(false);
                            //     dispatcher(loginUser({
                            //         email: email,
                            //         password: password,
                            //         token: userToken,
                            //     }));
                            // }
                            // catch (error)
                            // {
                            //     console.log(error);
                            //     setSignInMessage("Invalid credential(s)!");
                            // }
                            performSigningIn();
                        }}
                    >
                        {(loading === true) ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <ActivityIndicator
                                    color={'#FFFFFF'}
                                />
                                <Text
                                    style={Styles.buttonLabel}
                                > {"Authenticating..."}</Text>
                            </View>
                        ) : (
                            <Text
                                style={Styles.buttonLabel}
                            >{signInMessage.includes("success") ? "WELCOME!" : "SIGN IN"}</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...Styles.screenViewPart,
                        ...{
                            flex: 1,
                            justifyContent: 'space-evenly',
                        },
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigator.navigate("ResetPassword" as never);
                        }}
                    >
                        <Text
                            style={{
                                color: '#0044ff',
                                fontSize: 12,
                            }}
                        >{"Forgot password?"}</Text>
                    </TouchableOpacity>
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
    },
    buttonLabel: {
        fontSize: 18,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
});

export default SignIn;