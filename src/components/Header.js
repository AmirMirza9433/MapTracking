import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";
import Icons from "./Icons";

import { setUser } from "../store/reducer/usersSlice";
import { logout } from "../store/reducer/AuthConfig";
import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Header = ({ title, subTitle, onPress, userProfile }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <ImageFast
          style={styles.profile}
          isView
          source={userProfile ? { uri: userProfile } : images.placeholder}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          disabled={!onPress}
        >
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
        </TouchableOpacity>
      </View>
      <Icons
        family="MaterialIcons"
        name="logout"
        size={30}
        onPress={() => {
          dispatch(logout());
          dispatch(setUser({}));
        }}
        color={COLORS.primaryColor}
      />
    </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
