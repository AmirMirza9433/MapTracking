import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import React from "react";

//screens
import OptionScreen from "../screens/OptionScreen";
import Home from "../screens/Home";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const token = useSelector((state) => state.authConfig.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {token ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </>
      ) : (
        <Stack.Screen name="OptionScreen" component={OptionScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
