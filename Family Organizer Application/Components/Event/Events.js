import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Events extends React.Component {
  render() {
    return (
      <View style={styles.loading_container}>
        <Text style={styles.texte}>No Events ¯\_(ツ)_/¯</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  texte: {
    position: "absolute",
    color: "#1f78fe",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontFamily: "Muli-Bold"
  },
  loading_container: {
    backgroundColor: "#fcfcfc",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
