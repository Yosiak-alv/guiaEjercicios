import {logout, saveLoginData} from "../context/AuthContext";
import axiosRoute from "../utils/route";
import {useNavigation} from "@react-navigation/native";
import {useMutation, useQueryClient ,useQuery} from "react-query";

const loginAttempt = (user) =>  axiosRoute.post('login', null, user);
const registerAttempt = (user) => axiosRoute.post('register', null, user);
const fetchProfile = () => axiosRoute.get('profile');
const logoutAttempt = () => axiosRoute.post('logout');

export const userLoginAttempt = (formikErrors) => {
    const navigation = useNavigation();
    return useMutation({
        mutationFn: loginAttempt,
        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: async (data) => {
            await saveLoginData(data.data?.token);
            await axiosRoute.refreshToken();
            navigation.navigate('Home', {screen: 'HomePage'});
        },
    });
}
export const getProfile = () => {
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchProfile(),
        onSuccess:(data) => console.log(data?.data),
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error}
}
export const userRegisterAttempt = (formikErrors) => {
    const navigation = useNavigation();
    return useMutation({
        mutationFn: registerAttempt,
        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: async (data) => {
            await saveLoginData(data.data?.token);
            await axiosRoute.refreshToken();
            navigation.navigate('Home', {screen: 'HomePage'});
        },
    });
}

export const userLogoutAttempt = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: logoutAttempt,
        onSuccess: async (data) => {
            console.log(data.data?.message);
            await logout();
            await axiosRoute.refreshToken();
            queryClient.clear(); // resetea todos los queries
            navigation.navigate('Login');
        },
    });
}

