import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

import { Header } from '../../components/Header';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { PrimaryButton } from '../../components/PrimaryButton';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { SelectInput } from '../../components/SelectInput';
import { createEditHealth } from '../../hooks/HealthHook';
import { TxtInput } from '../../components/TxtInput';


export const CreateEditHealth = ({navigation,route}) => {
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

   
    return(
        <AuthenticateLayout>
            <Header navigation={navigation} />

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
                        {formik.values.id == "" ? "Add new Body Health Information" : "Update Information"}
                    </Text>

                    <TxtInput placeholder="Weight"
                        value={formik.values.weight}
                        onChangeText={formik.handleChange('weight')}
                    />

                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.weight && formik.errors?.weight}
                    </Text>

                    <TxtInput placeholder="Height in cm"
                        value={formik.values.height}
                        onChangeText={formik.handleChange('height')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.height && formik.errors?.height}
                    </Text>

                    <TxtInput placeholder="bmi"
                        value={formik.values.bmi}
                        onChangeText={formik.handleChange('bmi')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.bmi && formik.errors?.bmi}
                    </Text>
                    
                    <TxtInput placeholder="Blood Pressure in mmHg"
                        value={formik.values.blood_pressure}
                        onChangeText={formik.handleChange('blood_pressure')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.blood_pressure && formik.errors?.blood_pressure}
                    </Text>

                    <TxtInput placeholder="Blood Sugar in mmHg"
                        value={formik.values.blood_sugar}
                        onChangeText={formik.handleChange('blood_sugar')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.blood_sugar && formik.errors?.blood_sugar}
                    </Text>

                    <TxtInput placeholder="Date : fmt(YYYY-MM-DD HH:MM:SS)"
                        value={formik.values.date}
                        onChangeText={formik.handleChange('date')}
                    />
                    <Text className="text-red-500 capitalize-first">
                        {formik.touched?.date && formik.errors?.date}
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