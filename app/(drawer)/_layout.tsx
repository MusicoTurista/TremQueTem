import { Drawer } from 'expo-router/drawer';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: '#fffff1',
        },

        headerTintColor: '#000',

        drawerType: 'front',         // Pode ser 'front', 'back', 'slide', 'permanent'
        drawerHideStatusBarOnOpen: false,

        //Aparência do menu
        drawerStyle: { width: 280, backgroundColor: '#fffff1' },
        drawerActiveTintColor: '#f78f25',
        drawerInactiveTintColor: '#1f1f1fff',
        drawerActiveBackgroundColor: '#ffeabeff',
        drawerLabelStyle: { fontSize: 16, fontWeight: '600' },
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 8, marginVertical: 4 },

      }}
    >
      {<Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Receitas',
          drawerIcon: ({ color, size }) => (<MaterialCommunityIcons name="silverware" size={size + 4} color={color} />)
        }}
      />}

      {<Drawer.Screen
        name="tutorial"
        options={{
          title: 'Tutorial',
          drawerIcon: ({ color, size }) => (<Entypo name="open-book" size={size + 4} color={color} />)
        }}
      />}

      {<Drawer.Screen
        name="about"
        options={{
          title: 'Sobre',
          drawerIcon: ({ color, size }) => (<FontAwesome name="info-circle" size={size + 4} color={color} />)
        }}
      />}

    </Drawer>
  );
}