import React from "react";
import { StyleSheet, View } from "react-native";
import ListLists from "./Lists/ListLists";
import ListToDos from "./ToDos/ListToDos";
import { ButtonGroup } from "react-native-elements";

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
    
    // this.toDoss= this.props.route.params.toDoss;
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  _displayListOrToDo() {
    if (this.state.selectedIndex === 0) {
      return (
        <View style={styles.main_container}>
          <ListLists navigation={this.props.navigation} />
        </View>
      );
    } else if (this.state.selectedIndex === 1) {
      return (
        <View style={styles.main_container}>
          <ListToDos navigation={this.props.navigation} />
        </View>
      );
    }
  }

  render() {
    const buttons = ["Groceries", "To Do's"];
    const { selectedIndex } = this.state;
    
    console.log(this.props.route);
    return (
      <View style={styles.main_container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.container_style_buttons_groupe}
          selectedButtonStyle={styles.selected_button}
          selectedTextStyle={styles.selected_button_text}
          textStyle={styles.button_text}
          innerBorderStyle={{ color: "white" }}
        />
        {this._displayListOrToDo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: { flex: 1, backgroundColor: "#fcfcfc" },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon_cross: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  selected_button: {
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#1f78fe",
    backgroundColor: "#ffffff",
  },
  selected_button_text: {
    fontStyle: "normal",
    color: "#1f78fe",
  },
  button_text: {
    color: "#2d2d2d",
    fontSize: 18,
    fontFamily: "Muli",
  },
  container_style_buttons_groupe: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    marginHorizontal: 16,
    height: 50,
    borderRadius: 8,
  },
});
