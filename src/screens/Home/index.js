import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  PermissionsAndroid,
  StyleSheet,
  Platform,
  FlatList,
  View,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import SearchInput from "../../components/SearchInput";
import Header from "../../components/Header";
import Card from "../../components/Card";

import { placesList } from "../../utils/constants";
import { COLORS } from "../../utils/COLORS";
import { setLocation } from "../../store/reducer/AuthConfig";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

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
        console.log("=================position", position);

        dispatch(setLocation(position.coords));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <Header
            userProfile={userData?.userImage}
            title={userData?.userName}
            subTitle="Enjoy your favorite places"
          />
          <SearchInput placeholder="Search" />
        </View>
      )}
    >
      <FlatList
        data={placesList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card
            image={{ uri: item.image }}
            title={item.name}
            des={item.desc}
            onPress={() => navigation.navigate("DetailScreen", { item })}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "90%",
  },

  topChart: {
    backgroundColor: COLORS.orange,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
  },

  topImage: {
    height: 125,
    width: 150,
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    right: -30,
  },
});
