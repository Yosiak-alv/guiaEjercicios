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
import { FormikInput } from '../../components/FormikInput';

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

                    <FormikInput placeholder={'Routine Name'} formik={formik} valueName={'routine_name'} label={formik.values.id == '' ? '':'Routine Name'}/>
                    <FormikInput placeholder={'Routine Description'} formik={formik} valueName={'routine_description'} label={formik.values.id == '' ? '':'Routine Description'}/>
                    <FormikInput placeholder={'Routine Duration'} formik={formik} valueName={'routine_duration'} label={formik.values.id == '' ? '':'Routine Duration'}/>
                    <FormikInput placeholder={'Routine Type'} formik={formik} valueName={'routine_type'} label={formik.values.id == '' ? '':'Routine Type'}/>
                    <FormikInput placeholder={'Recommended Weight'} formik={formik} valueName={'recommended_weight'} label={formik.values.id == '' ? '':'Recommended Weight'}/>
                    <FormikInput placeholder={'Recommended BMI'} formik={formik} valueName={'recommended_BMI'} label={formik.values.id == '' ? '':'Recommended BMI'}/>
                    <FormikInput placeholder={'Recommended Blood Pressure'} formik={formik} valueName={'recommended_blood_pressure'} label={formik.values.id == '' ? '':'Recommended Blood Pressure'}/>
                    <FormikInput placeholder={'Recommended Blood Sugar'} formik={formik} valueName={'recommended_blood_sugar'} label={formik.values.id == '' ? '':'Recommended Blood Sugar'}/>

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