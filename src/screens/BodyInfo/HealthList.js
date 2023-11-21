import { View, Text, FlatList, ActivityIndicator , TextInput, Pressable} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/Card";
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Messages } from "../../components/Messages";

import { MaterialIcons } from '@expo/vector-icons';

import { getHealths} from "../../hooks/HealthHook";

export const HealthList = ({navigation,route}) => {
    
    //flash message
    const {level, flashMessage} = route.params;
    const {data:healths, isLoading, isError, isFetching, error} = getHealths();

    const [filterHealths,setFilterHealths] = useState(healths?.data);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if(text.trim().length !== 0 ){
            let filteredData = healths?.data.filter((health) => {
                const lowerBMI = health.bmi.toString();
                const lowerDate = health.date.toString();
                return (
                    lowerBMI.includes(textSearch.trim()) ||
                    lowerDate.includes(textSearch.trim()) 
                );
            });
            setFilterHealths(filteredData);
        }else{
            setFilterHealths(healths);
        }
    }

    const renderItem = useCallback(({ item:health }) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="mt-2">
                        <MaterialIcons name="access-time" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{health.bmi}</Text>
                        </View>
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{health.date}</Text>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Pressable onPress={() => (navigation.navigate('DetailHealth', { id:health.id }),setSearch(''))}>
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
                        <Text className="font-bold mb-6 text-gray-200 mt-5 text-3xl">Body Health Information</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton onPress={() => (
                                navigation.navigate('CreateEditHealth',{
                                    id: '',
                                    weight: '',
                                    height: '',
                                    bmi: '',
                                    blood_pressure: '',
                                    blood_sugar: '',
                                    date: ''
                                }), setSearch(''))} message="ADD"/>
                        </View>
                    </View>
                    {
                        isLoading || isFetching? (
                            null
                        ) : isError ? (
                            <MaterialIcons name="error-outline" size={24} color="white" />
                        ):(
                            healths?.data.length != 0 ?(
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
                            <Messages message={`Here was a problem processing Healths : ${error.message}`} level={'error'}/>
                            
                        ) : healths?.data.length != 0 ? (
                            <FlatList
                                data={search.length ==0 ? healths?.data : filterHealths}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                style={{flex: 1}}
                            /> 
                        ): (
                            <Messages message={'No data of Body Health Information in our records ...'} level={'info'}/>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
    ); 
}