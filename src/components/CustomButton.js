import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";
import CustomText from "./CustomText";
import Icons from "./Icons";
import { backgroundUpload } from "react-native-compressor";

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  marginBottom,
  marginTop,
  backgroundColor,
  width = "100%",
  height = 53,
  alignSelf = "center",
  borderColor = COLORS.primaryColor,

  btnFont,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: disabled
            ? COLORS.gray
            : backgroundColor
            ? backgroundColor
            : COLORS.primaryColor,
          marginTop,
          marginBottom,
          width,
          height,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          alignSelf,
          borderWidth: 2,
          borderColor,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size={25}
          color={backgroundColor ? COLORS.primaryColor : COLORS.white}
        />
      ) : (
        <CustomText
          label={title}
          color={backgroundColor ? COLORS.primaryColor : COLORS.white}
          fontFamily={Fonts.semiBold}
          fontSize={16}
          lineHeight={22}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
