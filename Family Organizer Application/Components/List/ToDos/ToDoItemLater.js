import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as api from "../../../Api/Api";
import UsersImage from "../../Util/UsersImage";

class ToDoItemLater extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      usersId: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    const { toDo } = this.props;
    api.getUsersIdfromToDoId(toDo.id, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          usersId: data,
        });
      }
    });
  }

  _displayUsersImage() {
    if (this._isMounted && this.state.usersId.length != 0) {
      return <UsersImage usersId={this.state.usersId} />;
    } else {
      return null;
    }
  }

  render() {
    const { toDo, displayToDos } = this.props;
    const { usersId } = this.state;
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.list_container}
          onPress={() => displayToDos(toDo, toDo.name, usersId)}
        >
          <View style={styles.header_container}>
            <Text
              style={
                toDo.isDone == "true"
                  ? styles.title_text_found
                  : styles.title_text_not_found
              }
              numberOfLines={1}
            >
              {toDo.name}
            </Text>
          </View>
          {this._displayUsersImage()}
          <View style={styles.info_container}>
            <FontAwesome name="angle-right" color="#d3d3d3" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginVertical: 5,
  },
  list_container: {
    flexDirection: "row",
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text_found: {
    textDecorationLine: "line-through",
    color: "#bbbbbc",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.11,
  },
  title_text_not_found: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.11,
  },
  info_container: {
    paddingRight: 15,
    bottom: 5,
  },
});

export default ToDoItemLater;
