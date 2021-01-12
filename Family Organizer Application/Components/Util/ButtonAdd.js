import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default class ButtonAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { action } = this.props;
    return (
      <TouchableOpacity
        style={styles.share_touchable_floatingactionbutton}
        onPress={() => action()}
      >
        <Icon name="add" color="white" size={26} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  share_touchable_floatingactionbutton: {
    position: "absolute",
    width: 45,
    height: 45,
    right: 16,
    bottom: 10,
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
});
