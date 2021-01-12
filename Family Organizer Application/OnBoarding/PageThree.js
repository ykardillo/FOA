import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const PageThree = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../assets/onBoardThree.png")}
        style={styles.image}
      />
      <View style={styles.bubble_view}>
        <Image
          source={require("../assets/onBoardThree_page.png")}
          style={styles.bubble_image}
        />
      </View>
      <View style={styles.view_text}>
        <Text style={styles.text}>
          Organize your family day to day life in a efficient way with events.
          You will be able to track and assign tasks to make sure things are
          done for the D-DAY
        </Text>
      </View>
    </View>
  );
};

export default PageThree;

const styles = StyleSheet.create({
  image: {
    width: 312,
    height: 249,
  },
  bubble_view: {
    marginTop: 105,
  },
  bubble_image: {
    width: 44,
    height: 10,
  },
  view_text: {
    marginTop: 32,
    paddingHorizontal: 30,
  },
  text: {
    color: "#000000",
    fontFamily: "Muli",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
  },
});
