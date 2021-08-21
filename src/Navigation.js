import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from './MapScreen';
import PermissionScreen from './PermissionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
      <Tab.Navigator
        screenOptions={{headerShown: false}}
      >
        <Tab.Screen name="Permission" component={PermissionScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
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