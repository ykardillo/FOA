import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const PageOne = () => {
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
        source={require("../assets/onBoardOne.png")}
        style={styles.image}
      />
      <View style={styles.bubble_view}>
        <Image
          source={require("../assets/onBoardOne_page.png")}
          style={styles.bubble_image}
        />
      </View>
      <View style={styles.view_text}>
        <Text style={styles.text}>
          With Family Organizer, you will be able to share, track and organize
          your grocery and to do list easily.
        </Text>
      </View>
    </View>
  );
};

export default PageOne;

const styles = StyleSheet.create({
  image: {
    width: 297,
    height: 239,
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
