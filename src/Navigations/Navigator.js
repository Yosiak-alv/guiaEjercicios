import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

import { RoutinesList } from "../screens/Routines/RoutinesList";
import { DetailRoutine } from "../screens/Routines/DetailRoutine";
import { CreateEditRoutine } from "../screens/Routines/CreateEditRoutine";

import { HealthList } from "../screens/BodyInfo/HealthList";
import { DetailHealth } from "../screens/BodyInfo/DetailHealth";
import { CreateEditHealth } from "../screens/BodyInfo/CreateEditHealth";




const Tab = createBottomTabNavigator();
const screenOptionsTabStyle = {
    headerShown:false,
    tabBarStyle:{
        backgroundColor:'#374A7A',
        height:60,
        borderTopWidth: 0,
    }
}
const BottomTabItemIcon = (IconLib,size, name, focused) => {
    return (<IconLib size={24} name={name} color={focused ? '#6987B7': 'white'}/>)
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptionsTabStyle}
        >
            <Tab.Screen
                name="HomePage"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        BottomTabItemIcon(AntDesign, 24,'home',focused)
                    ),
                }}
            />
            <Tab.Screen
                name="RoutinesList"
                component={RoutinesList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        BottomTabItemIcon(Ionicons,24,'bicycle',focused) 
                    ),
                }}
                initialParams={{level: '', flashMessage: ''}}
            />
             <Tab.Screen
                name="HealthList"
                component={HealthList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        BottomTabItemIcon(Ionicons,24,'pulse',focused) 
                    ),
                }}
                initialParams={{level: '', flashMessage: ''}}
            />
           
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();
const screenOptionsStyle = {
    headerShown:false
}
export const AuthStackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
            
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen name="RoutinesList" component={RoutinesList} />
            <Stack.Screen name="DetailRoutine" component={DetailRoutine} />
            <Stack.Screen name="CreateEditRoutine" component={CreateEditRoutine} />

            <Stack.Screen name="HealthList" component={HealthList} />
            <Stack.Screen name="DetailHealth" component={DetailHealth} /> 
            <Stack.Screen name="CreateEditHealth" component={CreateEditHealth} />
        </Stack.Navigator>
    )
};

export const GuestStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />

            <Stack.Screen name="RoutinesList" component={RoutinesList} />
            <Stack.Screen name="DetailRoutine" component={DetailRoutine} />
            <Stack.Screen name="CreateEditRoutine" component={CreateEditRoutine} />

        </Stack.Navigator>
    )
};



