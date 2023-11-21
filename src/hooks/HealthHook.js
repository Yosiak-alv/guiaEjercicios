import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosRoute from "../utils/route";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const fetchHealth = async () =>  (await axiosRoute.get('health.index')).data;
export const fetchOneHealth = async (id) => (await axiosRoute.get('health.show', id)).data;
const storeHealth = (health) => (axiosRoute.post('health.store', null, health));
const updateHealth = (health) => (axiosRoute.put('health.update', health.id, health));
const destroyHealth = (health) => axiosRoute.delete('health.destroy', health.id);

export const getHealths = () => {

    const {data, isLoading, isError, isFetching, error} = useQuery({

        queryKey: ['healths'],
        queryFn: () => fetchHealth(),
        onError: (error) => {console.log(error)},
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false

    });
        return {data, isLoading, isError, isFetching, error }
}

export const getHealth = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['health'], 
        queryFn: () => fetchOneHealth(id),
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });

    return { data, isLoading, isError, error, isFetching , isSuccess}
}

export const createEditHealth = (formikErrors, health) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: (health.id == '' ? storeHealth  : updateHealth),

        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['healths']);
            navigation.navigate('Home', {screen: 'HealthsList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message/*  flashMessage: data?.data?.message */
                }
            });
        },
    });
}

export const deleteHealth = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyHealth,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['healths']);
            navigation.navigate('Home', {screen: 'HealthsList',
                params: {
                    level: 'success',
                    flashMessage: data?.data?.message
                }
            });
        },
    });
}