import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import React from "react";

import ScreenWrapper from "../../components/ScreenWrapper";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import ImageFast from "../../components/ImageFast";
import Icons from "../../components/Icons";

import { COLORS } from "../../utils/COLORS";
import { Fonts } from "../../utils/fonts";

const DetailScreen = ({ route, navigation }) => {
  const item = route.params?.item;
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
