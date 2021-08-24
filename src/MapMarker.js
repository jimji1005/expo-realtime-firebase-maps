import React, { useEffect, useState } from "react";
import {Marker} from 'react-native-maps';
import { calcLastSeen } from "./utils";

const CAR_ICON = require('./car.png');

export default function MapMarker({data}) {

  const markerOpacity = calcLastSeen(data.timestamp) > 500 ? 0.6 : 1;
  return (
    <Marker
      image={CAR_ICON}
      rotation={data.heading}
      coordinate={{
        latitude: data.latitude,
        longitude: data.longitude
      }}
      opacity={markerOpacity}
    />
  );
}