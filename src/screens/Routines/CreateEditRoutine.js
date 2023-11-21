import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

import { Header } from '../../components/Header';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { PrimaryButton } from '../../components/PrimaryButton';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { SelectInput } from '../../components/SelectInput';
import { createEditRoutine } from '../../hooks/RoutineHook';
import { TxtInput } from '../../components/TxtInput';


export const CreateEditRoutine = ({navigation,route}) => {
    const formik = useFormik({
        initialValues: {
            id: route.params.id ?? "",
            routine_name: route.params.routine_name ?? "",
            routine_description: route.params.routine_description ?? "",
            routine_duration: route.params.routine_duration ?? "",
            routine_type: route.params.routine_type ?? "",
            recommended_weight: route.params.recommended_weight ?? "",
            recommended_BMI: route.params.recommended_BMI ?? "",
            recommended_blood_pressure: route.params.recommended_blood_pressure ?? "",
            recommended_blood_sugar: route.params.recommended_blood_sugar ?? "",
        },
        validationSchema: Yup.object().shape({
            routine_name: Yup.string().required(),
            routine_description: Yup.string().required(),
            routine_duration: Yup.string().required(),
            routine_type: Yup.string().required(),
            recommended_weight: Yup.string().required(),
            recommended_BMI: Yup.string().required(),
            recommended_blood_pressure: Yup.string().required(),
            recommended_blood_sugar: Yup.string().required(),
        }),
        onSubmit: async (routine) => await createEditAttempt.mutateAsync(routine),
    });
    const createEditAttempt = createEditRoutine(formik.setErrors, formik.values);

   
    return(
        <AuthenticateLayout>
            <Header navigation={navigation} />

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
                        {formik.values.id == "" ? "Add new Routine" : "Update Routine"}
                    </Text>

                    <TxtInput placeholder="Routine Name"
                        value={formik.values.routine_name}
                        onChangeText={formik.handleChange('routine_name')}
                    />

                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.routine_name && formik.errors?.routine_name}
                    </Text>

                    <TxtInput placeholder="Routine Description"
                        value={formik.values.routine_description}
                        onChangeText={formik.handleChange('routine_description')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.routine_description && formik.errors?.routine_description}
                    </Text>

                    <TxtInput placeholder="Routine Duration"
                        value={formik.values.routine_duration}
                        onChangeText={formik.handleChange('routine_duration')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.routine_duration && formik.errors?.routine_duration}
                    </Text>
                    
                    <TxtInput placeholder="Routine Type"
                        value={formik.values.routine_type}
                        onChangeText={formik.handleChange('routine_type')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.routine_type && formik.errors?.routine_type}
                    </Text>

                    <TxtInput placeholder="Recommended Weight"
                        value={formik.values.recommended_weight}
                        onChangeText={formik.handleChange('recommended_weight')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.recommended_weight && formik.errors?.recommended_weight}
                    </Text>

                    <TxtInput placeholder="Recommended BMI"
                        value={formik.values.recommended_BMI}
                        onChangeText={formik.handleChange('recommended_BMI')}
                    />

                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.recommended_BMI && formik.errors?.recommended_BMI}
                    </Text>

                    <TxtInput placeholder="Recommended Blood Pressure"
                        value={formik.values.recommended_blood_pressure}
                        onChangeText={formik.handleChange('recommended_blood_pressure')}
                    />

                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.recommended_blood_pressure && formik.errors?.recommended_blood_pressure}
                    </Text>

                    <TxtInput placeholder="Recommended Blood Sugar"
                        value={formik.values.recommended_blood_sugar}
                        onChangeText={formik.handleChange('recommended_blood_sugar')}
                    />

                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.recommended_blood_sugar && formik.errors?.recommended_blood_sugar}
                    </Text>

                    <View className="block w-full mt-2">
                        {formik.isSubmitting ? (<ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>) : (
                            <PrimaryButton onPress={formik.handleSubmit} message={formik.values.id == "" ? "Store" : "Update"} />
                        )}
                    </View>
                </View>
            </View>
        </AuthenticateLayout>
    )
}