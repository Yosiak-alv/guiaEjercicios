import { View, Text, Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Header } from '../../components/Header';
import { FontAwesome } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { DangerButton } from '../../components/DangerButton';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Messages } from '../../components/Messages';
import { Card } from '../../components/Card';
import { deletePrescription, getPrescription } from '../../hooks/PrescriptionHook';

export const DetailPrescription = ({navigation, route}) => {

    const { data:prescription, isLoading, isError, error, isFetching ,isSuccess} = getPrescription(route.params.id);

    const deleteMutation = deletePrescription();

    const handleDelete = async() => {
        if (confirm('You want to delete this Prescription ??? ..')) {
            await deleteMutation.mutateAsync(prescription?.data);
        }
    }

    return (
        <AuthenticateLayout>
            <Header navigation={navigation}/>
            <View className="flex flex-row justify-between items-center">
                <View className="flex-none w-full max-w-sm">
                    {
                        deleteMutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ):(
                            <View>
                                {deleteMutation.isError ? (
                                    deleteMutation.error.response.data.message ?  (
                                        <Messages message={`${deleteMutation.error.response.data?.message}`} level={'error'}/>
                                        ):(<Messages message={`Here was a problem processing Prescription : ${deleteMutation.error}`} level={'error'}/>)   
                                    ) 
                                : null}
                            </View>
                        )
                    }
                </View>
            </View>
           
            <View className="flex flex-1 flex-col justify-center items-center" >
                {
                    isLoading || isFetching ? (
                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                    ): (
                        <>
                            {isError ? (
                                 error.response.data?.message ? (
                                    <View>
                                        <MaterialIcons name="error-outline" size={60} color="white" />
                                        <Messages message={`${error.response.data?.message}`} level={'error'}/>
                                    </View>
                                ) 
                                : (<Messages message={`Here was a problem processing Car : ${error.message}`} level={'error'}/>)
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <Ionicons name="receipt" size={62} color="#F1F6F5" />
                                                </View>
                                                <View>
                                                    <View>
                                                        <PrimaryButton message='Edit' onPress={() => navigation.navigate('CreateEditPrescription',{
                                                            id: prescription?.data.id,
                                                            disease_id: prescription?.data.disease.id,
                                                            medication_name: prescription?.data.medication_name,
                                                            dose_amount: prescription?.data.dose_amount,
                                                            dose_unit: prescription?.data.dose_unit,
                                                            date: prescription?.data.date,
                                                            each: prescription?.data.each,
                                                        })}/>
                                                    </View>
                                                    <View className="mt-2">
                                                        <DangerButton message="Delete" onPress={() => handleDelete()} />
                                                    </View>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>

                                    <View className="w-full max-w-sm">
                                        <Card>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Medication : </Text> {prescription?.data.medication_name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Dose : </Text> {prescription?.data.dose_amount} {prescription?.data.dose_unit}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Initial Date : </Text> {prescription?.data.date}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Each (Hours): </Text> {prescription?.data.each}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Next Dose: </Text> {prescription?.data.next_dose}
                                            </Text><Text>{`\n`}</Text>
                                        </Card>
                                        <Card>
                                            <Text className="font-extrabold mb-3 text-center text-gray-200 mt-1 text-2xl">Disease Details</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Name : </Text> {prescription?.data.disease.name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Description : </Text> {prescription?.data.disease.description}
                                            </Text><Text>{`\n`}</Text>
                                        </Card>
                                    </View>
                                </>   
                            ) : null}
                        </>
                    )
                }
            </View>
       </AuthenticateLayout>
    );
}