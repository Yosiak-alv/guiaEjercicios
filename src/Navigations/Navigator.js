import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { PrescriptionsList } from "../screens/Prescriptions/PrescriptionsList";
import { Home } from "../screens/Home";
import { DetailPrescription } from "../screens/Prescriptions/DetailPrescription";
import { CreateEditPrescription } from "../screens/Prescriptions/CreateEditPrescription";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";


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
                name="PrescriptionsList"
                component={PrescriptionsList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        BottomTabItemIcon(Ionicons,24,'md-receipt-outline',focused) 
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
            <Stack.Screen name="DetailPrescription" component={DetailPrescription} />
            <Stack.Screen name="CreateEditPrescription" component={CreateEditPrescription} />

        </Stack.Navigator>
    )
};

export const GuestStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="DetailPrescription" component={DetailPrescription} />
            <Stack.Screen name="CreateEditPrescription" component={CreateEditPrescription} />

        </Stack.Navigator>
    )
};



