import {Pressable, Text, View ,ActivityIndicator} from 'react-native';
import {AuthenticateLayout} from '../layouts/AuthenticateLayout';
import {Card} from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../context/AuthContext';
import {Feather} from '@expo/vector-icons';
import {PrimaryButton} from '../components/PrimaryButton';
import {DangerButton} from '../components/DangerButton';
import { userLogoutAttempt } from '../hooks/AuthHook';
import {Messages} from "../components/Messages";
import { getProfile } from '../hooks/AuthHook';
export const Home = ({navigation}) => {

    const tok = async() => {
        
        return await getAuthToken();
    }

    console.log(tok()); 
    const logOut = userLogoutAttempt();
    const handleLogOut = () => {
       if(confirm('You want to logout ??? ..')){
           logOut.mutateAsync();
       }
    }
    const {data:profile, isLoading, isError, isFetching, error} = getProfile();
    return (
        <AuthenticateLayout>
            <View className="flex flex-1 flex-col justify-center items-center">
                <View className="w-full max-w-sm">
                    {logOut.isLoading ? (
                        <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>) : (
                        <View>
                            {logOut.isError ? (
                                <Messages message={`Here was a problem processing Logout : ${logOut.error}`} level={'error'}/>
                            ) : null}
                        </View>
                    )}
                </View> 

                <View className="flex-none w-full max-w-sm">
                    <Card>
                        <View className="flex flex-row justify-between">
                            <View className="py-2">
                                <Feather name="user" size={62} color="#F1F6F5"/>
                            </View>
                            <View>
                                <View className="mt-6">
                                    <DangerButton onPress={handleLogOut} message="Log Out"/>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>
                <View className="w-full max-w-sm">
                    <Card>
                        {
                            isLoading || isFetching ? (
                                <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>
                            ) : isError ? (
                                <Messages message={`Here was a problem processing Profile : ${error.message}`} level={'error'}/>
                            ):(
                                <>  
                                    <Text className="text-gray-200 text-lg font-bold text-center">{profile?.data.user.name}</Text><Text>{`\n`}</Text>
                                    <Text className="text-gray-200 text-lg text-center">{profile?.data.user.email}</Text><Text>{`\n`}</Text>
                                </>
                            )
                        }
                    </Card>
                </View>
            </View>
        </AuthenticateLayout>
    ) 
}