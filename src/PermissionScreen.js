import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

export default function PermissionScreen() {
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      console.log('status', status);
      if (status !== 'granted') {
        return;
      }

      setLocationPermission(true);
    })();
  }, []);

  const requestPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    setLocationPermission(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={requestPermission} style={styles.buttonContainer}>
        <Text>
          {locationPermission ? 'Location permission granted' : 'Request location Permission'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
