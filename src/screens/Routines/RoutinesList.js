import { View, Text, FlatList, ActivityIndicator , TextInput, Pressable} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/Card";
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Messages } from "../../components/Messages";

import { MaterialIcons } from '@expo/vector-icons';

import { getRoutines } from "../../hooks/RoutineHook";

export const RoutinesList = ({navigation,route}) => {
    
    //flash message
    const {level, flashMessage} = route.params;
    const {data:routines, isLoading, isError, isFetching, error} = getRoutines();

    const [filterRoutines,setFilterRoutines] = useState(routines?.data);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if(text.trim().length !== 0 ){
            let filteredData = routines?.data.filter((routine) => {
                const lowerName = routine.routine_name.toLowerCase();
                const lowerDescription = routine.routine_description.toLowerCase();
                const lowerType = routine.routine_type.toLowerCase();
                return (
                    lowerName.includes(textSearch.trim()) ||
                    lowerDescription.includes(textSearch.trim()) ||
                    lowerType.includes(textSearch.trim())
                );
            });
            setFilterRoutines(filteredData);
        }else{
            setFilterRoutines(routines);
        }
    }

    const renderItem = useCallback(({ item:routine }) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="mt-2">
                        <MaterialIcons name="receipt" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{routine.routine_name}</Text>
                        </View>
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{routine.routine_type}</Text>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Pressable onPress={() => (navigation.navigate('DetailRoutine', { id:routine.id }),setSearch(''))}>
                            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
                        </Pressable>
                    </View>
                </View>
                
            </Card>
        )
    },[]);

    return (
        <AuthenticateLayout level={level} flashMessage={flashMessage}>
            <View className="flex-1 items-center justify-center">
                <View className="w-full max-w-sm">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold mb-6 text-gray-200 mt-5 text-3xl">Routines</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton onPress={() => (
                                navigation.navigate('CreateEditRoutine',{
                                    id: '',
                                    routine_name: '',
                                    routine_description: '',
                                    routine_duration: '',
                                    routine_type: '',
                                    recommended_weight: '',
                                    recommended_BMI: '',
                                    recommended_blood_pressure: '',
                                    recommended_blood_sugar: '',
                                }), setSearch(''))} message="ADD"/>
                        </View>
                    </View>
                    {
                        isLoading || isFetching? (
                            null
                        ) : isError ? (
                            <MaterialIcons name="error-outline" size={24} color="white" />
                        ):(
                            routines?.data.length != 0 ?(
                                <TxtInput placeholder={'Search'} value={search} onChangeText={(text) => handleSearch(text)}/>
                            ): (null)
                        )
                    }
                </View>
                <View className="flex-1 w-full max-w-sm">
                    {
                        isLoading || isFetching ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ): isError ? (
                            <Messages message={`Here was a problem processing Routines : ${error.message}`} level={'error'}/>
                            
                        ) : routines?.data.length != 0 ? (
                            <FlatList
                                data={search.length ==0 ? routines?.data : filterRoutines}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                style={{flex: 1}}
                            /> 
                        ): (
                            <Messages message={'No data of Prescriptions in our records ...'} level={'info'}/>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
    ); 
}