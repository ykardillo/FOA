import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

const RoundedButton = ({ label, onPress }) => {
  if (label == "Next") {
    return (
      <TouchableOpacity
        style={styles.share_touchable_floatingactionbutton}
        onPress={onPress}
      >
        <Icon
          name="angle-right"
          type="font-awesome"
          color="white"
          size={35}
          style={styles.arrow}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.share_touchable_floatingactionbutton2}
        onPress={onPress}
      >
        <Text style={styles.text}>Voila, have fun</Text>
      </TouchableOpacity>
    );
  }
};

export default RoundedButton;
const styles = StyleSheet.create({
  share_touchable_floatingactionbutton: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#3ddba0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  share_touchable_floatingactionbutton2: {
    borderRadius: 30,
    backgroundColor: "#3ddba0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  arrow: { bottom: 2, left: 2 },
  text: {
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "center",
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
});
