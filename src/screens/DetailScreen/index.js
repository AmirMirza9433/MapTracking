import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../components/ScreenWrapper";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import ImageFast from "../../components/ImageFast";
import Icons from "../../components/Icons";

import { COLORS } from "../../utils/COLORS";
import { Fonts } from "../../utils/fonts";

const DetailScreen = ({ route, navigation }) => {
  const item = route.params?.item;
  const [location, setLocation] = useState(null);
  console.log("=================location", location);

  useEffect(() => {
    if (Platform.OS === "android") {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        getCurrentLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
      console.log("Failed to request location permission");
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      transcalent
      statusBarColor="transparent"
      footerUnScrollable={() => (
        <CustomButton title="Direction" marginBottom={30} width="90%" />
      )}
    >
      <Icons
        family="AntDesign"
        name="leftcircle"
        size={30}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 50, left: 15, zIndex: 999 }}
      />
      <ImageFast
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.mainContainer}>
        <CustomText label={item?.name} fontFamily={Fonts.bold} fontSize={26} />
        <CustomText
          label={item?.desc}
          fontFamily={Fonts.medium}
          fontSize={16}
          color={COLORS.gray}
          marginBottom={20}
        />
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={item?.region}>
            <Marker
              coordinate={{
                latitude: item?.region?.latitude,
                longitude: item?.region?.longitude,
              }}
              title="My Marker"
              description="Some description"
            />
          </MapView>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  mainContainer: {
    padding: 20,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "red",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default DetailScreen;
