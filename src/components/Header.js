import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";
import Icons from "./Icons";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Header = ({ title, subTitle, onPress, userProfile }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={!onPress}
      style={styles.mainContainer}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageFast
          style={styles.profile}
          source={userProfile ? { uri: userProfile } : images.placeholder}
        />
        <View>
          <CustomText
            label={title}
            fontSize={18}
            fontFamily={Fonts.semiBold}
            color={COLORS.black}
          />
          <CustomText
            label={subTitle}
            fontSize={14}
            fontFamily={Fonts.regular}
            color={COLORS.gray}
          />
        </View>
      </View>
      <Icons
        family="MaterialIcons"
        name="logout"
        size={30}
        onPress={() => {}}
        color={COLORS.primaryColor}
      />
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profile: {
    height: 56,
    width: 56,
    borderRadius: 100,
    marginRight: 15,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
