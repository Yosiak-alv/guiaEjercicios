import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import { userLoginAttempt } from '../hooks/AuthHook';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {FormikInput} from "../components/FormikInput";
import { TxtInput } from '../components/TxtInput';
import {Messages} from "../components/Messages";

export const Login = ({navigation}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit: async (user) => await loginAttempt.mutateAsync(user)
    });
    const loginAttempt = userLoginAttempt(formik.setErrors);

    return (
        <View className="flex-1 items-center justify-center px-6 py-4 bg-blueC-600">
            <View className="p-8 w-full max-w-sm">

                <Text className="text-5xl font-bold mb-6 text-gray-200 mt-5">Sign In</Text>

                <TxtInput placeholder="Email"
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                />
                <Text className="text-red-500 capitalize-first mt-1 mb-2">
                    {formik.touched?.email && formik.errors?.email}
                </Text>

                <TxtInput placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    passEntry={true}
                />
                <Text className="text-red-500 capitalize-first mt-1 mb-2"> 
                    {formik.touched?.password && formik.errors?.password}
                </Text>

                <View className="flex flex-row justify-between mt-5">
                    <PrimaryButton onPress={() => navigation.navigate('Register')} message='Register'/>
                    <PrimaryButton onPress={formik.handleSubmit} message='Log In'/>
                </View>

                {formik.isSubmitting ? (
                    <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>
                ) : null}
            </View>
        </View>
    );
}