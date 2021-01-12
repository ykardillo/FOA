import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";

class ToDoItemToday extends React.Component {
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

  render() {
    const { toDo, displayToDos } = this.props;
    const { usersId } = this.state;

    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.list_container}
          onPress={() => displayToDos(toDo, toDo.name, usersId)}
        >
          <FontAwesome
            name="circle-o"
            color={Util.randomHSL()}
            size={15}
            style={styles.image}
          />
          <View style={styles.content_container}>
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
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginLeft: 10,
    marginVertical: 5,
  },
  image: {
    top: 12,
    width: 32,
    height: 32,
  },
  list_container: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  content_container: {
    flex: 1,
    marginLeft: 14,
    margin: 5,
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
    marginTop: 15,
    paddingRight: 15,
    bottom: 11,
  },
});

export default ToDoItemToday;
