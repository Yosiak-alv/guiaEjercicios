import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosRoute from "../utils/route";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";




/* const getPrescriptions = (page) => {
   const {data, isLoading, isError, isFetching, error} = useQuery({
        queryKey: ['prescriptions'],
        queryFn: () => fetchPrescriptions(),
        onError: (error) => {console.log(error)},
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error }

} */

export const fetchPrescriptions = async () =>  (await axiosRoute.get('prescriptions.index')).data;
export const fetchOnePrescription = async (id) => (await axiosRoute.get('prescriptions.show', id)).data;
const fetchDiseases = async () =>  (await axiosRoute.get('diseases.index')).data;
const storePrescription = (prescription) => (axiosRoute.post('prescriptions.store', null, prescription));
const updatePrescription = (prescription) => (axiosRoute.put('prescriptions.update', prescription.id, prescription));
const destroyPrescription = (prescription) => axiosRoute.delete('prescriptions.destroy', prescription.id);

export const getPrescriptions = () => {
    const {data, isLoading, isError, isFetching, error} = useQuery({
        queryKey: ['prescriptions'],
        queryFn: () => fetchPrescriptions(),
        onError: (error) => {console.log(error)},
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error }
}

export const getPrescription = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['prescription'], 
        queryFn: () => fetchOnePrescription(id),
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });

    return { data, isLoading, isError, error, isFetching , isSuccess}
}
export const getDiseases = () => {
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['diseases'],
        queryFn: () => fetchDiseases(),
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error}

}
export const createEditPrescription = (formikErrors, prescription) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: (prescription.id == '' ? storePrescription  : updatePrescription),

        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['prescriptions']);
            navigation.navigate('Home', {screen: 'PrescriptionsList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message/*  flashMessage: data?.data?.message */
                }
            });
        },
    });
}
export const deletePrescription = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyPrescription,

        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['prescriptions']); //para recargar el query, debe ir con el nombre del queryKey y si tiene parametro ponerlo aca por defecto 1 por la pagina 1 xd
            navigation.navigate('Home', {screen: 'PrescriptionsList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message/*  flashMessage: data?.data?.message */
                }
            });
        },
    });
}

/* export { getBrands , getBrand, createEditBrand, deleteBrand}; */