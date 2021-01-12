import React, { useRef } from "react";
import { View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";

const ScreenKey = "@Expo:Screen";

const Onboarding = () => {
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <PageOne />
          <Footer
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <PageTwo />
          <Footer
            // leftButtonLabel="Back"
            // leftButtonPress={() => {
            //   handlePageChange(0);
            // }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2);
            }}
          />
        </View>
        <View key="3">
          <PageThree />
          <Footer
            // leftButtonLabel="Back"
            // leftButtonPress={() => {
            //   handlePageChange(1);
            // }}
            rightButtonLabel="Finish"
            rightButtonPress={() => {
              AsyncStorage.setItem(ScreenKey, "Auth");
              navigation.reset({
                index: 0,
                routes: [{ name: "Auth" }],
              });
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;
