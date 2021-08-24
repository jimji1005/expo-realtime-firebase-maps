import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useAuth } from "./auth-context";

export default function PermissionScreen() {
  const {
    signout,
    setLocation,
    locationTrackingPermission,
    locationTracking,
    setLocationTrackingPermission,
    setLocationTracking,
    writeData,
    monitorData,
  } = useAuth();

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      console.log('status', status);
      if (status !== 'granted') {
        return;
      }

      setLocationTrackingPermission(true);
      getLocation();
    })();

    monitorData();
  }, []);

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    console.log('location', location);

    if(location.coords) {
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }

  const requestPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    setLocationTrackingPermission(true);
    getLocation();
  };

  const handleLocationWatch = (location) => {
    // console.log('handleLocationWatch', location);
    writeData(location);
  }

  const toggleTrackLocation = () => {
    if (locationTracking) {
      // stop watch
      watchLocationSubscriber.remove();
    } else {
      // start watch
      (async () => {
        watchLocationSubscriber = await Location.watchPositionAsync({
          timeInterval: 1000,
        }, handleLocationWatch);
      })();
    }
    setLocationTracking(!locationTracking);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={requestPermission} style={styles.buttonContainer}>
        <Text>
          {locationTrackingPermission ? 'Location permission granted' : 'Request location Permission'}
        </Text>
      </Pressable>
      {locationTrackingPermission ? (
        <Pressable onPress={toggleTrackLocation} style={styles.buttonContainer}>
          <Text>
            {locationTracking ? 'Tracking Location' : 'Not Tracking Location'}
          </Text>
        </Pressable>
      ) : null} 
      <Pressable onPress={signout} style={styles.buttonContainer}>
        <Text>
          Sign Out
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
    marginTop: 10,
  },
});
