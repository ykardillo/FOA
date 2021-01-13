import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";
import ToDoCategories from "./ToDoCategories";
import ButtonAdd from "../../Util/ButtonAdd";
import ToDo from ".././../../Model/ToDo";
import User_ToDo from ".././../../Model/User_ToDo";
import ModalCreateToDo from "./ModalCreateToDo";
import Loading from "../../Util/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdKey = "@Expo:UserId";

class ListToDos extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isLoading: false,
      toDos: [],
      toDosDone: [],
      toDosNew: [],
      modalCreate: false,
      newToDo: [],
      userId: "",
    };
  }

  getSorageData = async () => {
    try {
      const value = await AsyncStorage.getItem(UserIdKey);

      this.setState({
        userId: value,
      });
      return value;
    } catch (e) {
      alert(e);
    }
  };
  async componentDidMount() {
    const _userId = await this.getSorageData();
    this._isMounted = true;
    this.setState({
      isLoading: true,
    });
    api.getToDos(_userId, (success, data, error) => {
      if (this._isMounted) {
        const datas = Util.removeDuplicateObject(data);
        this.setState({
          toDos: datas,
        });
        this.setState({
          toDosToday: Util.getTodayToDos(datas),
          toDosLater: Util.getLaterToDos(datas),
          isLoading: false,
        });
      }
    });
    this.setState({
      isLoading: false,
    });
  }

  _openCreateModal() {
    const newTodo = new ToDo(
      "",
      "",
      this.state.userId,
      new Date().getTime(),
      new Date().getTime(),
      new Date().getTime()
    );
    this.setState({
      modalCreate: true,
      newToDo: newTodo,
    });
  }
  _closeModalCreate = (toDo) => {
    if (toDo.name != "") {
      this.setState({ modalCreate: false });
      const toDoId = api.addToDo(toDo);
      let userToDo = new User_ToDo(this.state.userId, toDoId);
      api.addUserToDo(userToDo);
    } else {
      Alert.alert(
        "",
        "The name is empty",
        [
          {
            text: "Cancel",
            onPress: () => this.setState({ modalCreate: false }),
          },
          { text: "OK" },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  _setModalCreateStatus = (value) => {
    this.setState({ modalCreate: value });
  };

  _displayToDos = (toDo, nameToDo, usersId) => {
    this.props.navigation.navigate("ToDo", {
      toDo: toDo,
      name: nameToDo,
      usersId: usersId,
    });
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <Loading
          style={styles.loading_container}
          size={"large"}
          color={"#1f78fe"}
        />
      );
    }
  }
  _displayModal() {
    return (
      <>
        <ButtonAdd action={() => this._openCreateModal()} />
        <ModalCreateToDo
          modalStatus={this.state.modalCreate}
          closeModal={this._closeModalCreate}
          setModalStatus={this._setModalCreateStatus}
          toDo={this.state.newToDo}
        />
      </>
    );
  }

  render() {
    if (this.state.toDos.length != 0) {
      return (
        <View style={styles.view}>
          <ToDoCategories
            style={styles.list}
            displayToDos={this._displayToDos}
            toDos={this.state.toDos}
            toDosToday={this.state.toDosToday}
            toDosLater={this.state.toDosLater}
          />
          {this._displayLoading()}
          {this._displayModal()}
        </View>
      );
    } else {
      return (
        <View style={styles.loading_container}>
          <Text style={styles.text}> No To Do ¯ \ _(ツ) _ / ¯ </Text>
          {this._displayModal()}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  list: {
    paddingTop: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#bbbbbc", fontFamily: "Muli" },
});

export default ListToDos;
