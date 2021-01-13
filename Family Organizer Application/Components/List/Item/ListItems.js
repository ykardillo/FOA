import React from "react";
import { StyleSheet, FlatList, View, Text, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import * as api from "../../../Api/Api";
import Item from "../../../Model/Item";
import List_Item from "../../../Model/List_Item";
import Loading from "../../Util/Loading";
import ListCategories from "./ListCategories";
import ButtonAdd from "../../Util/ButtonAdd";
import ModalItem from "./ModalItem";
import Util from "../../../Model/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdKey = "@Expo:UserId";

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      items: [],
      isLoading: false,
      search: "",
      createItem: false,
      newItem: [],
      scrollEnabled: true,
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
    const { idList } = this.props.route.params;
    this.setState({ isLoading: true });
    api.getItemsFromListId(idList, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          items: Util.sortByCategories(Util.removeDuplicateObject(data)),
          isLoading: false,
        });
      }
    });
    this.setState({ isLoading: false });
  }

  _updateSearch = (search) => {
    this.setState({ search });
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

  _editItem = (item) => {
    api.updateItem(item);
  };

  _foundItem = (item, didFound) => {
    if (didFound == "true") {
      api.toggleFoundItemFromList(item, "false");
    } else if (didFound == "false") {
      api.toggleFoundItemFromList(item, "true");
    }
  };

  _deleteItem = (idItem) => {
    const { idList } = this.props.route.params;
    api.deleteItemFromList(idList, idItem);
  };

  _closeModal = (item) => {
    if (item.name != "") {
      if (item.category != "") {
        const { idList } = this.props.route.params;
        this.setState({ createItem: false });
        const itemId = api.addItem(item);
        let listItem = new List_Item(idList, itemId, this.state.userId);
        api.addListItem(listItem);
      } else {
        Alert.alert(
          "",
          "Chose a category",
          [
            {
              text: "Cancel",
              onPress: () => this.setState({ createItem: false }),
            },
            { text: "OK" },
          ],
          {
            cancelable: false,
          }
        );
      }
    } else {
      Alert.alert(
        "",
        "The name is empty",
        [
          {
            text: "Cancel",
            onPress: () => this.setState({ createItem: false }),
          },
          { text: "OK" },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  _setModalStatus = (value) => {
    this.setState({ createItem: value });
  };

  _setScroll = (value) => {
    this.setState({ scrollEnabled: value });
  };

  _displayListOfItems() {
    if (this.state.items != undefined) {
      if (this.state.items.length != 0) {
        return (
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            style={styles.list}
            data={this.state.items}
            keyExtractor={(item) => item.category.toString()}
            renderItem={({ item }) => (
              <ListCategories
                editItem={this._editItem}
                items={item}
                foundItem={this._foundItem}
                deleteItem={this._deleteItem}
                setScroll={this._setScroll}
              />
            )}
            onEndReachedThreshold={0.5}
          />
        );
      } else {
        return (
          <View style={styles.loading_container}>
            <Text style={styles.text}> No items ¯ \ _(ツ) _ / ¯ </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.loading_container}>
          <Text style={styles.text}> No items ¯ \ _(ツ) _ / ¯ </Text>
        </View>
      );
    }
  }

  _openModal() {
    const newItem = new Item("", this.state.userId, "", "", "", "", "", "");
    this.setState({
      createItem: true,
      newItem: newItem,
    });
  }

  render() {
    const { search, newItem } = this.state;
    return (
      <View style={styles.main_container}>
        <SearchBar
          lightTheme={true}
          placeholder="Search items"
          onChangeText={this._updateSearch}
          value={search}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBar_input}
          inputStyle={styles.searchBar_text}
          placeholderTextColor="#bbbbbc"
        />
        <ModalItem
          modalStatus={this.state.createItem}
          closeModal={this._closeModal}
          setModalStatus={this._setModalStatus}
          item={newItem}
        />
        <View style={styles.view}>
          {this._displayListOfItems()}
          {this._displayLoading()}
          <ButtonAdd action={() => this._openModal()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  view: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 25,
  },
  list: {
    paddingTop: 5,
  },
  searchBar: {
    marginHorizontal: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 10,
  },
  searchBar_input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 7,
    color: "red",
    fontFamily: "Muli",
  },
  searchBar_text: {
    fontFamily: "Muli",
  },
  text: { color: "#bbbbbc", fontFamily: "Muli" },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },

  backTextWhite: {
    fontFamily: "Muli",
    color: "#FFF",
  },
});

export default ListItems;
