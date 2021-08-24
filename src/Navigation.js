import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import MapScreen from './MapScreen';
import PermissionScreen from './PermissionScreen';
import MarkerListScreen from './MarkerListScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Permission') {
              iconName = focused
                ? 'info'
                : 'info';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map-o' : 'map-o';
            } else if (route.name === 'MarkerList') {
              iconName = focused ? 'list' : 'list';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Permission" component={PermissionScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="MarkerList" component={MarkerListScreen} />
      </Tab.Navigator>
  );
}

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Main" component={TabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;