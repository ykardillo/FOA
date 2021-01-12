import React from "react";
import { StyleSheet, FlatList, View, Text, Alert } from "react-native";
import ListItem from "./ListItem";
import Loading from "../../Util/Loading";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";
import List from "../../../Model/List";
import User_List from "../../../Model/User_List";
import ButtonAdd from "../../Util/ButtonAdd";
import ModalCreateList from "./ModalCreateList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdKey = "@Expo:UserId";

class ListLists extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      modalCreate: false,
      lists: [],
      isLoading: false,
      newList: [],
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
    this.setState({ isLoading: true });
    api.getLists(_userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          lists: Util.removeDuplicateObject(data) || this.state.lists,
          isLoading: false,
        });
      }
    });
  }

  _displayItems = (idList, nameList, usersId) => {
    this.props.navigation.navigate("Items", {
      idList: idList,
      name: nameList,
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
  _closeModalCreate = (list) => {
    if (list.name != "") {
      this.setState({ modalCreate: false });
      const listId = api.addList(list);
      let userList = new User_List(this.state.userId, listId);
      api.addUserList(userList);
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

  _openCreateModal() {
    let newList = new List(
      "",
      this.state.userId,
      new Date().getTime(),
      new Date().getTime()
    );
    this.setState({
      modalCreate: true,
      newList: newList,
    });
  }

  _setModalCreateStatus = (value) => {
    this.setState({ modalCreate: value });
  };

  _displayModal() {
    return (
      <>
        <ButtonAdd action={() => this._openCreateModal()} />
        <ModalCreateList
          modalStatus={this.state.modalCreate}
          closeModal={this._closeModalCreate}
          setModalStatus={this._setModalCreateStatus}
          list={this.state.newList}
        />
      </>
    );
  }

  render() {
    if (this.state.lists.length != 0) {
      return (
        <View style={styles.view}>
          <FlatList
            style={styles.list}
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem list={item} displayItems={this._displayItems} />
            )}
            onEndReachedThreshold={0.5}
          />
          {this._displayLoading()}
          {this._displayModal()}
        </View>
      );
    } else {
      return (
        <View style={styles.loading_container}>
          <Text style={styles.text}> No lists ¯ \ _(ツ) _ / ¯ </Text>
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

export default ListLists;
