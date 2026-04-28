import { Formik } from 'formik';
import React from 'react';
import { Button,Text,TextInput,View } from 'react-native';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => (
    <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange,handleBlur,handleSubmit,values,errors,touched }) => (
            <View>
                <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                {errors.email && touched.email && <Text>{errors.email}</Text>}
                <Button
                    onPress={() => {
                        handleSubmit();
                    }} 
                    title="Submit"
                />
            </View>
        )}
    </Formik>
);

export default ResetPassword;