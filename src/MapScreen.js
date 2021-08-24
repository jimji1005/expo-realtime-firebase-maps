import React, { useEffect, useState } from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useAuth } from "./auth-context";
import MapMarker from "./MapMarker";

// delta calculations
const LATITUD_DELTA = 0.0922;
const window = Dimensions.get('window');
const { width, height }  = window
const LONGITUDE_DELTA = LATITUD_DELTA + (width / height)

const DEFAULT_LAT = 37.7833;
const DEFAULT_LNG = -122.4167;

export default function MapScreen() {
  const { usersData, currentLocation } = useAuth();

  // console.log('usersData', usersData);

  const renderMarkers = () => {
    if (!usersData || !usersData.length) {
      return null;
    }

    return usersData.map(user => <MapMarker
      key={user.id}
      data={user}
      />
    );
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LNG,
          latitudeDelta: LATITUD_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          ...currentLocation,
        }}
      >
        {renderMarkers()}
      </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 78,
  },
});