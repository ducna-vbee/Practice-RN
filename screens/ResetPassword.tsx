import ScreenDimensionContext from '@/contexts/ScreenDimensionContext';
import { authenticationService } from '@/services/authenticationService';
import { useAppSelector } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator,Image,Text,TextInput,TouchableOpacity,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required("Email is required!"),
    newPassword: Yup.string().required("New password is required!"),
});

const ResetPassword = () => {
    const navigator = useNavigation();

    const {
        screenWidth,
        screenHeight,
    } = React.useContext(ScreenDimensionContext);
    const email = useAppSelector((state) => state.user.email);

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
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: 24,
                    }}
                >{"Password Reset"}</Text>
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
                    flex: 9,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Formik
                    initialValues={{ email: email,newPassword: "" }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={async (values,{ setSubmitting,resetForm }) => {
                        try
                        {
                            const response = await authenticationService.resetPassword(
                                values.email,
                                values.newPassword
                            );

                            console.log("Success:",response);
                            alert("Password reset email sent!");
                            resetForm();
                        }
                        catch (error)
                        {
                            console.error("Reset failed:",error);
                            alert("Failed to reset password. Please try again.");
                        }
                        finally
                        {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleChange,handleBlur,handleSubmit,values,errors,touched,isSubmitting }) => {
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
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={handleBlur('newPassword')}
                                        value={values.newPassword}
                                        placeholder={"New password"}
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
                                        {(isSubmitting === true) ? (
                                            <ActivityIndicator
                                                color="#FFFFFF"
                                            />
                                        ) : (
                                            <Text
                                                style={{
                                                    color: '#FFFFFF',
                                                    fontSize: 16,
                                                }}
                                            >{"Submit"}</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </SafeAreaView>
    )
};

export default ResetPassword;