import React, { useEffect, useState } from "react";
import MapboxGL from '@react-native-mapbox-gl/maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useAuth } from "./auth-context";

MapboxGL.setAccessToken('pk.eyJ1IjoiamltamkxMDA1IiwiYSI6ImNrc3IxaGJzdTBpNmUydXA3eWpmNGtjeGsifQ.1oi-lI9FJCZlSCP4hs_iXg');

// delta calculations
const LATITUD_DELTA = 0.0922;
const window = Dimensions.get('window');
const { width, height }  = window
const LONGITUDE_DELTA = LATITUD_DELTA + (width / height)

const DEFAULT_LAT = 37.7833;
const DEFAULT_LNG = -122.4167;

export default function MapScreen() {
  const { usersData, currentLocation } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 78,
  },
  map: {
    flex: 1,
  },
});