import React, { useState } from "react";
import Navigations from "./Navigation/Navigations";

import { StatusBar } from "expo-status-bar";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import Util from "./Model/Util";

const fetchFonts = () => {
  return Font.loadAsync({
    Muli: require("./assets/fonts/Muli.ttf"),
    "Muli-Bold": require("./assets/fonts/Muli-Bold.ttf"),
    "Muli-SemiBold": require("./assets/fonts/Muli-SemiBold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  Util.removLogBoxTimer();
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return (
    <>
      <StatusBar style="dark" />
      <Navigations />
    </>
  );
}
