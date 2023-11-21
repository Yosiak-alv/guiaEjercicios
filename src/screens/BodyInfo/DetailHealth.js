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
import { deleteHealth, getHealth } from '../../hooks/HealthHook';

export const DetailHealth = ({navigation, route}) => {

    const { data:health, isLoading, isError, error, isFetching ,isSuccess} = getHealth(route.params.id);

    const deleteMutation = deleteHealth();

    const handleDelete = async() => {
        if (confirm('You want to delete this Resgiter ??? ..')) {
            await deleteMutation.mutateAsync(health?.data);
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
                                        ):(<Messages message={`Here was a problem processing Health Data : ${deleteMutation.error}`} level={'error'}/>)   
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
                                : (<Messages message={`Here was a problem processing Health Data : ${error.message}`} level={'error'}/>)
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <Ionicons name="pulse" size={62} color="#F1F6F5" />
                                                </View>
                                                <View>
                                                    <View>
                                                        <PrimaryButton message='Edit' onPress={() => navigation.navigate('CreateEditHealth',{
                                                            id: health?.data.id,
                                                            weight: health?.data.weight,
                                                            height: health?.data.height,
                                                            bmi: health?.data.bmi,
                                                            blood_pressure: health?.data.blood_pressure,
                                                            blood_sugar: health?.data.blood_sugar,
                                                            date: health?.data.date,
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
                                                <Text className="text-gray-200 text-lg font-bold" >Weight : </Text> {health?.data.weight}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Height : </Text> {health?.data.height}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >BMI : </Text> {health?.data.bmi}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Blood Sugar: </Text> {health?.data.blood_sugar}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Blood_Pressure: </Text> {health?.data.blood_pressure}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >date: </Text> {health?.data.date}
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