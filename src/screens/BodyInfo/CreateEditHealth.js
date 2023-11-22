import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

import { Header } from '../../components/Header';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { PrimaryButton } from '../../components/PrimaryButton';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { createEditHealth } from '../../hooks/HealthHook';
import { FormikInput } from '../../components/FormikInput';

export const CreateEditHealth = ({navigation, route}) => {
    const formik = useFormik({
        initialValues: {
            id: route.params.id ?? "",
            weight: route.params.weight ?? "",
            height: route.params.height ?? "",
            bmi: route.params.bmi ?? "",
            blood_pressure: route.params.blood_pressure ?? "",
            blood_sugar: route.params.blood_sugar ?? "",
            date: route.params.date ?? "",
        },
        validationSchema: Yup.object().shape({
            weight: Yup.string().required(),
            height: Yup.string().required(),
            bmi: Yup.string().required(),
            blood_pressure: Yup.string().required(),
            blood_sugar: Yup.string().required(),
            date: Yup.string().required().matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/),
        }),
        
        onSubmit: async (health) => await createEditAttempt.mutateAsync(health),
    });

    const createEditAttempt = createEditHealth(formik.setErrors, formik.values);

    useEffect(() => {
        const weightInLB = parseFloat(formik.values.weight);
        const heightInCM = parseFloat(formik.values.height);

        if (!isNaN(weightInLB) && !isNaN(heightInCM) && heightInCM > 0) {
            // Convertir peso de libras a kilogramos
            const weightInKG = weightInLB * 0.453592;
            // Convertir altura de centímetros a metros
            const heightInM = heightInCM / 100;

            // Calcular BMI
            const bmi = (weightInKG / (heightInM * heightInM)).toFixed(2);
            formik.setFieldValue('bmi', bmi);
        }
    }, [formik.values.weight, formik.values.height]);

    return (
        <AuthenticateLayout>
            <Header navigation={navigation} />

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
                        {formik.values.id == "" ? "Add new Body Health Information" : "Update Information"}
                    </Text>
                    
                    <FormikInput placeholder={'Weight in LB'} formik={formik} valueName={'weight'} label={formik.values.id == '' ? '':'Weight'}/>
                    <FormikInput placeholder={'Height in CM'} formik={formik} valueName={'height'} label={formik.values.id == '' ? '':'Height'}/>
                    <FormikInput placeholder={'BMI'} formik={formik} valueName={'bmi'} label={formik.values.id == '' ? '':'BMI'} editable={false} />
                    <FormikInput placeholder={'Blood Pressure'} formik={formik} valueName={'blood_pressure'} label={formik.values.id == '' ? '':'Blood Pressure'}/>
                    <FormikInput placeholder={'Blood Sugar'} formik={formik} valueName={'blood_sugar'} label={formik.values.id == '' ? '':'Blood Sugar'}/>
                    <FormikInput placeholder={'Date: fmt(YYYY-MM-DD HH:MM:SS)'} formik={formik} valueName={'date'} label={formik.values.id == '' ? '':'Date: fmt(YYYY-MM-DD HH:MM:SS)'}/>
    
                    <View className="block w-full mt-2">
                        {formik.isSubmitting ? (<ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>) : (
                            <PrimaryButton onPress={formik.handleSubmit} message={formik.values.id == "" ? "Store" : "Update"} />
                        )}
                    </View>
                </View>
            </View>
        </AuthenticateLayout>
    );
}
