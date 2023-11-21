import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosRoute from "../utils/route";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const fetchRoutines = async () =>  (await axiosRoute.get('routines.index')).data;
export const fetchOneRoutine = async (id) => (await axiosRoute.get('routines.show', id)).data;
const storeRoutine = (routine) => (axiosRoute.post('routines.store', null, routine));
const updateRoutine = (routine) => (axiosRoute.put('routines.update', routine.id, routine));
const destroyRoutine = (routine) => axiosRoute.delete('routines.destroy', routine.id);

export const getRoutines = () => {
    const {data, isLoading, isError, isFetching, error} = useQuery({
        queryKey: ['routines'],
        queryFn: () => fetchRoutines(),
        onError: (error) => {console.log(error)},
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error }
}

export const getRoutine = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['routine'], 
        queryFn: () => fetchOneRoutine(id),
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });

    return { data, isLoading, isError, error, isFetching , isSuccess}
}

export const createEditRoutine = (formikErrors, routine) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: (routine.id == '' ? storeRoutine  : updateRoutine),

        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['routines']);
            navigation.navigate('Home', {screen: 'RoutinesList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message/*  flashMessage: data?.data?.message */
                }
            });
        },
    });
}
export const deleteRoutine = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyRoutine,

        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['routines']); //para recargar el query, debe ir con el nombre del queryKey y si tiene parametro ponerlo aca por defecto 1 por la pagina 1 xd
            navigation.navigate('Home', {screen: 'RoutinesList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message/*  flashMessage: data?.data?.message */
                }
            });
        },
    });
}