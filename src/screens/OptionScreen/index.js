import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../components/ScreenWrapper";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import ImageFast from "../../components/ImageFast";

import SignupModal from "./molecules/SignupModal";
import ForgotModal from "./molecules/ForgotModal";
import LoginModal from "./molecules/LoginModal";

import { getToken } from "../../utils/constants";
import { images } from "../../assets/images";
import { COLORS } from "../../utils/COLORS";
import { Fonts } from "../../utils/fonts";

const OptionScreen = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  useEffect(() => {
    getToken();
  }, []);
  return (
    <ScreenWrapper
      statusBarColor={
        loginModal || signupModal ? COLORS.primaryColor : COLORS.white
      }
    >
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <LoginModal
          isVisible={loginModal}
          onDisable={() => setLoginModal(false)}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          setForgotModal={setForgotModal}
        />
        <SignupModal
          isVisible={signupModal}
          onDisable={() => setSignupModal(false)}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
        />
        <ForgotModal
          isVisible={forgotModal}
          onDisable={() => setForgotModal(false)}
          setLoginModal={setLoginModal}
          setForgotModal={setForgotModal}
        />
        <ImageFast
          source={images.appIcon}
          style={styles.logo}
          resizeMode="contain"
        />
        <CustomButton
          color={COLORS.white}
          title="Sign Up with Email"
          marginTop={20}
          marginBottom={10}
          backgroundColor="transparent"
          onPress={() => setSignupModal(true)}
        />
        <View style={styles.divider}>
          <View style={styles.dividerLines} />
          <CustomText label="Or" fontFamily={Fonts.bold} fontSize={14} />
          <View style={styles.dividerLines} />
        </View>

        <CustomButton
          color={COLORS.white}
          title="Sign In with Email"
          marginTop={20}
          marginBottom={10}
          onPress={() => setLoginModal(true)}
        />

        <View style={{ flex: 1 }} />
        <Text style={styles.footerText}>
          By continuing, I agree to
          <Text style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}>
            {" Terms of Conditions"}
          </Text>
          {" and "}
          <Text style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}>
            Privacy of Policy
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default OptionScreen;

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  dividerLines: {
    backgroundColor: COLORS.primaryColor,
    height: 2,
    width: 120,
  },
  footerText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    color: COLORS.black,
    marginBottom: 30,
  },
});
