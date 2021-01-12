import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const PageTwo = () => {
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
        source={require("../assets/onBoardTwo.png")}
        style={styles.image}
      />
      <View style={styles.bubble_view}>
        <Image
          source={require("../assets/onBoardTwo_page.png")}
          style={styles.bubble_image}
        />
      </View>
      <View style={styles.view_text}>
        <Text style={styles.text}>
          Family Organizer will help you to find tasty and healthy recipes. You
          will be able to add the groceries needed for a recipe to your grocery
          lists in one tap.
        </Text>
      </View>
    </View>
  );
};

export default PageTwo;

const styles = StyleSheet.create({
  image: {
    width: 287,
    height: 259,
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
