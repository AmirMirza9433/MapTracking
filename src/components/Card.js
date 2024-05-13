import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Card = ({ title, image, heading, des }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <ImageFast style={styles.image} source={{ uri: image }} />
      <View style={{ padding: 10 }}>
        <CustomText
          label={title}
          fontFamily={Fonts.semiBold}
          numberOfLines={1}
          color={COLORS.primaryColor}
        />
        <CustomText
          label={des}
          fontFamily={Fonts.semiBold}
          fontSize={12}
          numberOfLines={1}
          color={COLORS.gray}
        />
      </View>
    </TouchableOpacity>
  );
};
export default Card;
const styles = StyleSheet.create({
  container: {
    height: 210,
    width: "100%",
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 0.6,
    borderColor: COLORS.gray,
  },
  image: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    width: "100%",
    height: "70%",
  },
});
