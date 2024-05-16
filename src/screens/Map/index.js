import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import React, { useState } from "react";

const Map = ({ route }) => {
  const item = route.params?.item;
  const [state, setState] = useState({
    pickupCords: {
      latitude: 33.738045,
      longitude: 73.084488,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: 31.582045,
      longitude: 74.329376,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const { pickupCords, dropLocationCords } = state;
  return (
    <View style={styles.mainContainer}>
      <MapView style={StyleSheet.absoluteFill} initialRegion={pickupCords}>
        <MapViewDirections
          origin={pickupCords}
          destination={dropLocationCords}
          apikey="AIzaSyCZLtofoePX_DcD3LIoSYvBg4sKVU-JZR4"
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
