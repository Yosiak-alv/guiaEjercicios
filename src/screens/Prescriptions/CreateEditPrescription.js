import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

import { Header } from '../../components/Header';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { PrimaryButton } from '../../components/PrimaryButton';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { SelectInput } from '../../components/SelectInput';
import { createEditPrescription, getDiseases } from '../../hooks/PrescriptionHook';
import { TxtInput } from '../../components/TxtInput';
import { FormikInput } from '../../components/FormikInput';

export const CreateEditPrescription = ({navigation,route}) => {
    const formik = useFormik({
        initialValues: {
            id: route.params.id ?? "",
            disease_id: route.params.disease_id ?? "",
            medication_name: route.params.medication_name ?? "",
            dose_amount: route.params.dose_amount ?? "",
            dose_unit: route.params.dose_unit ?? "",
            date: route.params.date ?? "",
            each: route.params.each ?? "",
        },
        validationSchema: Yup.object().shape({
            medication_name: Yup.string().required(),
            dose_amount: Yup.number().positive().required(),
            dose_unit: Yup.string().required(),
            date: Yup.string().required().matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/),
            each: Yup.number().integer().positive().required(),
            disease_id: Yup.number().positive().required(),
           
        }),
        onSubmit: async (replacement) => await createEditAttempt.mutateAsync(replacement),
    });
    const createEditAttempt = createEditPrescription(formik.setErrors, formik.values);

    const { data:diseases } = getDiseases();
   
    return(
        <AuthenticateLayout>
            <Header navigation={navigation} />

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
                        {formik.values.id == "" ? "Add new Prescription" : "Update Prescription"}
                    </Text>
                    <FormikInput placeholder="Medication Name" formik={formik} valueName="medication_name" label={formik.values.id == '' ? '': 'Medication Name'}/>
                    <FormikInput placeholder="Dose" formik={formik} valueName="dose_amount" label={formik.values.id == '' ? '': 'Dose'}/>

                    

                    <View className="mt-2 mb-2">
                        <SelectInput selectedValue={formik.values.dose_unit} onValueChange={formik.handleChange('dose_unit')}
                            DefaultPlaceholder="Select a Dose Unit" data={[{id:'mg',name:'mg'},{id:'ml',name:'ml'},{id:'g',name:'g'},{id:'l',name:'l'}]} />

                        <Text className="text-red-500 capitalize-first">
                            {formik.touched?.dose_unit && formik.errors?.dose_unit}
                        </Text>
                    </View>
                   
                    
                    <FormikInput placeholder="Initial Date : fmt(YYYY-MM-DD HH:MM:SS)" formik={formik} valueName="date" label={formik.values.id == '' ? '': 'Initial Date'}/>
                    <FormikInput placeholder="Each (Hours)" formik={formik} valueName="each" label={formik.values.id == '' ? '': 'Each (Hours)'}/>

                    {diseases == null ? null : (
                        <>
                            <SelectInput selectedValue={formik.values.disease_id} onValueChange={formik.handleChange('disease_id')}
                                DefaultPlaceholder="Select a Disease" data={diseases?.data} />

                            <Text className="text-red-500 capitalize-first">
                                {formik.touched?.disease_id && formik.errors?.disease_id}
                            </Text>
                        </>
                    )}

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