import MapViewDirections from "react-native-maps-directions";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import React, { useState } from "react";

import ScreenWrapper from "../../components/ScreenWrapper";

const Map = ({ route }) => {
  const item = route.params?.item;
  const location = route.params?.location;
  const [state, setState] = useState({
    pickupCords: {
      latitude: location?.latitude,
      longitude: location?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: item?.region,
  });
  const { pickupCords, dropLocationCords } = state;
  return (
    <ScreenWrapper transcalent statusBarColor="transparent">
      <MapView style={StyleSheet.absoluteFill} initialRegion={pickupCords}>
        <MapViewDirections
          origin={pickupCords}
          destination={dropLocationCords}
          apikey="AIzaSyDJs2w7V3KzUjb5ekDkd9AWBqwbUgWq2yk"
          strokeWidth={5}
          strokeColor="red"
        />
      </MapView>
    </ScreenWrapper>
  );
};

export default Map;
