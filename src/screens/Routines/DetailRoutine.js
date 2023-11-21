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
import { deleteRoutine, getRoutine } from '../../hooks/RoutineHook';

export const DetailRoutine = ({navigation, route}) => {

    const { data:routine, isLoading, isError, error, isFetching ,isSuccess} = getRoutine(route.params.id);

    const deleteMutation = deleteRoutine();

    const handleDelete = async() => {
        if (confirm('You want to delete this Routine ??? ..')) {
            await deleteMutation.mutateAsync(routine?.data);
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
                                        ):(<Messages message={`Here was a problem processing Routine : ${deleteMutation.error}`} level={'error'}/>)   
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
                                : (<Messages message={`Here was a problem processing Routine : ${error.message}`} level={'error'}/>)
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <Ionicons name="football" size={62} color="#F1F6F5" />
                                                </View>
                                                <View>
                                                    <View>
                                                        <PrimaryButton message='Edit' onPress={() => navigation.navigate('CreateEditRoutine',{
                                                            id: routine?.data.id,
                                                            routine_name: routine?.data.routine_name,
                                                            routine_description: routine?.data.routine_description,
                                                            routine_duration: routine?.data.routine_duration,
                                                            routine_type: routine?.data.routine_type,
                                                            recommended_weight: routine?.data.recommended_weight,
                                                            recommended_BMI: routine?.data.recommended_BMI,
                                                            recommended_blood_pressure: routine?.data.recommended_blood_pressure,
                                                            recommended_blood_sugar: routine?.data.recommended_blood_sugar,
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
                                                <Text className="text-gray-200 text-lg font-bold" >Routine Name : </Text> {routine?.data.routine_name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Routine Description : </Text> {routine?.data.routine_description}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Routine Duration : </Text> {routine?.data.routine_duration}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Routine Type: </Text> {routine?.data.routine_type}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Recommended Weight: </Text> {routine?.data.recommended_weight}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Recommended BMI: </Text> {routine?.data.recommended_BMI}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Recommended Blood Pressure: </Text> {routine?.data.recommended_blood_pressure}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Recommended Blood Sugar: </Text> {routine?.data.recommended_blood_sugar}
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