import { View, Text, FlatList, ActivityIndicator , TextInput, Pressable} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/Card";
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Messages } from "../../components/Messages";

import { MaterialIcons } from '@expo/vector-icons';

import { getPrescriptions } from "../../hooks/PrescriptionHook";

export const PrescriptionsList = ({navigation,route}) => {
    
    //flash message
    const {level, flashMessage} = route.params;
    const {data:prescriptions, isLoading, isError, isFetching, error} = getPrescriptions();

    const [filterPrescriptions,setFilterPrescriptions] = useState(prescriptions?.data);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if(text.trim().length !== 0 ){
            let filteredData = prescriptions?.data.filter((prescription) => {
                const lowerName = prescription.medication_name.toLowerCase();
                const lowerDoseAmount = prescription.dose_amount.toLowerCase();
                const lowerDisease = prescription.disease.name.toLowerCase();
                const lowerNext = prescription.next_dose.toLowerCase();
                return (
                    lowerName.includes(textSearch.trim()) ||
                    lowerDoseAmount.includes(textSearch.trim()) ||
                    lowerDisease.includes(textSearch.trim()) ||
                    lowerNext.includes(textSearch.trim()) 
                );
            });
            setFilterPrescriptions(filteredData);
        }else{
            setFilterPrescriptions(prescriptions);
        }
    }

    const renderItem = useCallback(({ item:prescription }) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="mt-2">
                        <MaterialIcons name="receipt" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{prescription.medication_name}</Text>
                        </View>
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{prescription.disease.name}</Text>
                        </View>
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{prescription.next_dose}</Text>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Pressable onPress={() => (navigation.navigate('DetailPrescription', { id:prescription.id }),setSearch(''))}>
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
                        <Text className="font-bold mb-6 text-gray-200 mt-5 text-3xl">Prescriptions</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton onPress={() => (
                                navigation.navigate('CreateEditPrescription',{
                                    id: '',
                                    disease_id: '',
                                    medication_name: '',
                                    dose_amount: '',
                                    dose_unit: '',
                                    date: '',
                                    each: '',
                                }), setSearch(''))} message="ADD"/>
                        </View>
                    </View>
                    {
                        isLoading || isFetching? (
                            null
                        ) : isError ? (
                            <MaterialIcons name="error-outline" size={24} color="white" />
                        ):(
                            prescriptions?.data.length != 0 ?(
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
                            <Messages message={`Here was a problem processing Prescriptions : ${error.message}`} level={'error'}/>
                            
                        ) : prescriptions?.data.length != 0 ? (
                            <FlatList
                                data={search.length ==0 ? prescriptions?.data : filterPrescriptions}
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

