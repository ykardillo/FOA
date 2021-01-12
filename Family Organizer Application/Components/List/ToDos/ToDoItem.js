import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Util from "../../../Model/Util";

class ListToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { toDo, displayToDos } = this.props;

    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.list_container}
          onPress={() => displayToDos(toDo.id)}
        >
          <FontAwesome
            name="circle-o"
            color={Util.randomHSL()}
            size={15}
            style={styles.image}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text} numberOfLines={1}>
                {toDo.name}
              </Text>
            </View>
          </View>
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
    paddingTop: 15,
    marginLeft: 10,
  },
  image: {
    top: 7,
    width: 32,
    height: 32,
  },
  list_container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
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
  title_text: {
    color: "#2d2d2d",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    fontFamily: "Muli"
  },
  info_container: {
    marginTop: 15,
    paddingRight: 15,
    bottom: 11,
  },
});

export default ListToDo;
