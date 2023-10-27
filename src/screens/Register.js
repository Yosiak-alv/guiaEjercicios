import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import {userRegisterAttempt } from '../hooks/AuthHook';
import {useFormik} from "formik";
import * as Yup from 'yup';
import { TxtInput } from '../components/TxtInput';


export const Register = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password_confirmation: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required().min(3),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
            password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(8, 'Password is too short - should be 8 chars minimum.'),
        }),
        onSubmit: async (user) => await registerAttempt.mutateAsync(user)
    });
    const registerAttempt = userRegisterAttempt(formik.setErrors);

    return (
        <View className="flex-1 items-center justify-center px-6 py-4 bg-blueC-600">
        <View className="p-8 w-full max-w-sm">
            <Text className="text-5xl font-bold mb-6 text-gray-200 mt-5">Register</Text>

            <TxtInput placeholder="Name"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
            />
            <Text className="text-red-500 capitalize-first mt-1 mb-2"> 
                {formik.touched?.name && formik.errors?.name}
            </Text>

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

            <TxtInput placeholder="Confirm Password"
                value={formik.values.password_confirmation}
                onChangeText={formik.handleChange('password_confirmation')}
                passEntry={true}
            />
            <Text className="text-red-500 capitalize-first mt-1 mb-2"> 
                {formik.touched?.password_confirmation && formik.errors?.password_confirmation}
            </Text>

            <View className="flex flex-row justify-between mt-5">
                <PrimaryButton onPress={formik.handleSubmit} message='Register'/>
            </View>

            {formik.isSubmitting ? (
                <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>
            ) : null}
        </View>
    </View>
    )
}