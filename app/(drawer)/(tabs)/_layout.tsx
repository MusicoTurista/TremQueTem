import { Tabs } from 'expo-router';

import {View} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,

      tabBarStyle: {backgroundColor:'#fffff1'},

      tabBarActiveTintColor: "#f78f25",
        
    }}>
      <Tabs.Screen name="index" options={{
            title: 'Nova Receita',
            tabBarIcon: ({ color, size }) => (<FontAwesome name="plus" size={size} color={color} />)
        }} />
        <Tabs.Screen name="favoritas" options={{
            title: 'Favoritas',
            tabBarIcon: ({ color, size }) => (<MaterialIcons name="favorite" size={size} color={color} />)
        }} />
    </Tabs>
  );
}