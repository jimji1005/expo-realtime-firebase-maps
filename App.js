import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Nav from './src/Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Nav/>
    </SafeAreaProvider>
  );
}
