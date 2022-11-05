import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../home/HomeScreen";
import MapScreen from "../map/MapScreen";
import CommunityScreen from "../community/CommunityScreen";
import MypageScreen from "../mypage/MypageScreen";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarIcon: ({ focused }) => <Feather name="home" size={24} color={focused ? '#1E1E1E' : '#D9D9D9'} /> }}
            />
            <Tab.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ tabBarIcon: ({ focused }) => <Feather name="map" size={24} color={focused ? '#1E1E1E' : '#D9D9D9'} /> }}
            />
            <Tab.Screen
                name="CommunityScreen"
                component={CommunityScreen}
                options={{ tabBarIcon: ({ focused }) => <Ionicons name="chatbubbles-outline" size={24} color={focused ? '#1E1E1E' : '#D9D9D9'} /> }}
            />
            <Tab.Screen
                name="MypageScreen"
                component={MypageScreen}
                options={{ tabBarIcon: ({ focused }) => <Feather name="user" size={24} color={focused ? '#1E1E1E' : '#D9D9D9'} /> }}
            />
        </Tab.Navigator>
    )
}