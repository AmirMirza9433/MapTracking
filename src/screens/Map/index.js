import MapViewDirections from "react-native-maps-directions";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef, useState } from "react";

import ScreenWrapper from "../../components/ScreenWrapper";
import { useSelector } from "react-redux";

const Map = ({ route }) => {
  const item = route.params?.item;
  const ref = useRef();
  const location = useSelector((state) => state.authConfig.location);
  console.log("===============location============", location);
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
      <MapView
        ref={ref}
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
      >
        {/* <Marker coordinate={pickupCords} /> */}
        <Marker coordinate={dropLocationCords} />
        <MapViewDirections
          origin={pickupCords}
          destination={dropLocationCords}
          apikey="AIzaSyDJs2w7V3KzUjb5ekDkd9AWBqwbUgWq2yk"
          strokeWidth={5}
          strokeColor="red"
          optimizeWaypoints
          onReady={(result) => {
            ref.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                top: 100,
                right: 30,
                bottom: 300,
                left: 30,
              },
              animated: true,
            });
          }}
        />
      </MapView>
    </ScreenWrapper>
  );
};

export default Map;
