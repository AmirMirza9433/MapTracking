import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import React from "react";

import ScreenWrapper from "../../components/ScreenWrapper";
import SearchInput from "../../components/SearchInput";
import Header from "../../components/Header";
import Card from "../../components/Card";

import { COLORS } from "../../utils/COLORS";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <Header
            onPress={() => navigation.navigate("Profile")}
            userProfile={userData?.userImage}
            title={userData?.userName}
            subTitle="Enjoy your favorite places"
          />
          <SearchInput placeholder="Search" />
        </View>
      )}
    >
      <FlatList
        data={[0, 1]}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            image="image"
            heading="heading"
            title="title"
            des="description"
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
