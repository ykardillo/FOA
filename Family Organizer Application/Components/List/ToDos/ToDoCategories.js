import React from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import ToDoItemLater from "./ToDoItemLater";
import ToDoItemToday from "./ToDoItemToday";

class ToDoCategories extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }

  _displayTodayToDo() {
    const { displayToDos, toDosToday } = this.props;
    if (toDosToday != undefined) {
      if (toDosToday.length != 0) {
        return (
          <FlatList
            style={styles.todoList}
            data={toDosToday}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ToDoItemToday toDo={item} displayToDos={displayToDos} />
            )}
            onEndReachedThreshold={0.5}
          />
        );
      } else {
        return (
          <View style={styles.nothing_container}>
            <Text style={styles.text}> Nothing for today... </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.nothing_container}>
          <Text style={styles.text}> Nothing for today... </Text>
        </View>
      );
    }
  }

  _displayLaterToDo() {
    const { displayToDos, toDosLater } = this.props;
    if (toDosLater != undefined) {
      if (toDosLater.length != 0) {
        return (
          <FlatList
            style={styles.todoList}
            data={toDosLater}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ToDoItemLater toDo={item} displayToDos={displayToDos} />
            )}
            onEndReachedThreshold={0.5}
          />
        );
      } else {
        return (
          <View style={styles.nothing_container}>
            <Text style={styles.text}> Nothing for later... </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.nothing_container}>
          <Text style={styles.text}> Nothing for later... </Text>
        </View>
      );
    }
  }

  render() {
    const { toDos } = this.props;
    return (
      <ScrollView style={styles.categories_view}>
        <View>
          <Text style={styles.categories_text}>Today</Text>
          {this._displayTodayToDo()}
        </View>
        <View>
          <Text style={styles.categories_text}>Later</Text>
          {this._displayLaterToDo()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  categories_view: {
    marginLeft: 16,
    marginTop: 20,
  },
  categories_text: {
    color: "#2d2d2d",
    fontFamily: "Muli-Bold",
    fontSize: 18,
    letterSpacing: 0.13,
  },
  todoList: {
    marginTop: 10,
    marginBottom: 17,
  },
  text: {
    color: "#bbbbbc",
    fontFamily: "Muli",
  },
  nothing_container: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 17,
    justifyContent: "center",
  },
  text: {
    color: "#bbbbbc",
    fontFamily: "Muli",
  },
  no_todos_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ToDoCategories;
