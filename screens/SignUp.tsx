import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import { selectAuthenticatedStatus,signUserUp } from "@/slices/UserSlice";
import { useAppDispatch,useAppSelector } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from 'react';
import { ActivityIndicator,Alert,Image,KeyboardAvoidingView,Platform,StyleSheet,Text,TextInput,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required!"),
    password: Yup.string().min(10, "Password too short!").max(20,"Password too long!").required("Password is required!"),
    confirmedPassword: Yup.string().oneOf([Yup.ref('password')], "Confirmed password doesn't match!").required("Confirmed password is required!"),
    age: Yup.string().required("Age is required!").test((test) => {
        let numericAge = Number.parseInt(test);

        return ((numericAge >= 12) && (numericAge <= 100));
    }),
    type: Yup.string().oneOf(["individual","organization"]),
});

enum EnumerationOfSignUpSections {
    FIRST,
    SECOND,
};

const SignUp = () => {
    const navigator = useNavigation();
    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);
    useAppSelector(selectAuthenticatedStatus);
    const dispatcher = useAppDispatch();
    const [section,setSection] = React.useState<EnumerationOfSignUpSections>(EnumerationOfSignUpSections.FIRST);
    const loading = useAppSelector((state) => state.user.loading);

    async function moveToNextSection(validateForm: any,setTouched: any) {
        const errors = await validateForm();

        if (Object.keys(errors).length === 0 || (!errors.email && !errors.password && !errors.confirmedPassword))
        {
            setSection(EnumerationOfSignUpSections.SECOND);
        }
        else
        {
            setTouched({ email: true,password: true,confirmedPassword: true });
        }
    }

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
                    >{"SIGN UP"}</Text>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            width: 40,
                            height: 40,
                            borderRadius: 1000,
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                            left: 40,
                            padding: 5,
                        }}
                        onPress={() => {
                            navigator.goBack();
                        }}
                    >
                        <Image
                            source={require("../assets/images/back.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                tintColor: '#FFFFFF',
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...Styles.screenViewPart,
                        ...{
                            flex: 9,
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Formik
                        initialValues={{ email: "",password: "",confirmedPassword: "",age: "18",type: "individual" }}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values,{ setSubmitting,resetForm }) => {
                            try
                            {
                                const response = await dispatcher(signUserUp({
                                    email: values.email,
                                    password: values.password,
                                    age: Number.parseInt(values.age),
                                    type: values.type,
                                }));
                                console.log("Success:",response);
                                alert("New account registered!");
                                resetForm();
                            }
                            catch (error)
                            {
                                console.error("Reset failed:",error);
                                alert("Failed to sign up! Please try again later.");
                            }
                            finally
                            {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ handleChange,handleBlur,handleSubmit,values,errors,touched,isSubmitting,validateForm,setTouched }) => {
                            if (section === EnumerationOfSignUpSections.FIRST)
                            {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10%',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 4,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 60,
                                            }}
                                        >
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                placeholder={"Email"}
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderRadius: 1000,
                                                    borderColor: '#FFFFFF',
                                                    color: '#FFFFFF',
                                                    paddingLeft: 16,
                                                }}
                                                placeholderTextColor={'#FFFFFF'}
                                            />
                                            <TextInput
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                placeholder={"Password"}
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderRadius: 1000,
                                                    borderColor: '#FFFFFF',
                                                    color: '#FFFFFF',
                                                    paddingLeft: 16,
                                                }}
                                                placeholderTextColor={'#FFFFFF'}
                                            />
                                            <TextInput
                                                onChangeText={handleChange('confirmedPassword')}
                                                onBlur={handleBlur('confirmedPassword')}
                                                value={values.confirmedPassword}
                                                placeholder={"Confirmed password"}
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderRadius: 1000,
                                                    borderColor: '#FFFFFF',
                                                    color: '#FFFFFF',
                                                    paddingLeft: 16,
                                                }}
                                                placeholderTextColor={'#FFFFFF'}
                                            />
                                            {errors.email && touched.email && (
                                                <Text
                                                    style={{
                                                        color: 'red',
                                                        fontSize: 12,
                                                    }}
                                                >{errors.email}</Text>
                                            )}
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
                                                gap: 20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                disabled={isSubmitting}
                                                onPress={async () => {
                                                    const errors = await validateForm();

                                                    if ((Object.keys(errors).length === 0) || (!errors.email && !errors.password && !errors.confirmedPassword))
                                                    {
                                                        setSection(EnumerationOfSignUpSections.SECOND);
                                                    } 
                                                    else
                                                    {
                                                        setTouched({ email: true,password: true,confirmedPassword: true });
                                                    }
                                                }}
                                                style={{
                                                    borderWidth: 2,
                                                    borderColor: '#FFFFFF',
                                                    borderRadius: 1000,
                                                    paddingTop: 8,
                                                    paddingBottom: 8,
                                                    paddingLeft: 16,
                                                    paddingRight: 16,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: '#FFFFFF',
                                                        fontSize: 16,
                                                    }}
                                                >{"Next"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            else
                            {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10%',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 4,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 60,
                                            }}
                                        >
                                            <TextInput
                                                onChangeText={handleChange('age')}
                                                onBlur={handleBlur('age')}
                                                keyboardType={"numeric"}
                                                value={values.age}
                                                placeholder={"Age"}
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderRadius: 1000,
                                                    borderColor: '#FFFFFF',
                                                    color: '#FFFFFF',
                                                    paddingLeft: 16,
                                                }}
                                                placeholderTextColor={'#FFFFFF'}
                                            />
                                            <TextInput
                                                onChangeText={handleChange('type')}
                                                onBlur={handleBlur('type')}
                                                value={values.type}
                                                placeholder={"Type"}
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderRadius: 1000,
                                                    borderColor: '#FFFFFF',
                                                    color: '#FFFFFF',
                                                    paddingLeft: 16,
                                                }}
                                                placeholderTextColor={'#FFFFFF'}
                                            />
                                            {errors.email && touched.email && (
                                                <Text
                                                    style={{
                                                        color: 'red',
                                                        fontSize: 12,
                                                    }}
                                                >{errors.email}</Text>
                                            )}
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
                                                gap: 20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                disabled={isSubmitting}
                                                onPress={() => {
                                                    handleSubmit();
                                                }}
                                                style={{
                                                    borderWidth: 2,
                                                    borderColor: '#FFFFFF',
                                                    borderRadius: 1000,
                                                    paddingTop: 8,
                                                    paddingBottom: 8,
                                                    paddingLeft: 16,
                                                    paddingRight: 16,
                                                }}
                                            >
                                                {(loading === true) ? (
                                                    <ActivityIndicator
                                                        color={'#FFFFFF'}
                                                        style={{
                                                            position: 'absolute',
                                                            marginLeft: 10,
                                                        }}
                                                    />
                                                ) : (
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            color: '#FFFFFF',
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >{"SIGN IN"}</Text>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        }}
                    </Formik>
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
                            navigator.navigate("SignIn" as never);
                        }}
                    >
                        <Text
                            style={{
                                color: '#0044ff',
                                fontSize: 12,
                            }}
                        >{"Already have an account?"}</Text>
                    </TouchableOpacity>
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

export default SignUp;