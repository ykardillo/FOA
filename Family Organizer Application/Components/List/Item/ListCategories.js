import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import ListItem from "./ListItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { Icon } from "react-native-elements";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";

class ListCategories extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      items: [],
      categories: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        items: this.props.items,
      });
    }
    api.getCategories((success, data, error) => {
      if (this._isMounted) {
        this.setState({
          categories: Util.removeDuplicateObject(data),
        });
      }
    });
  }

  _displayImageCategory(category) {
    let found = false;
    let cat = [];
    this.state.categories.some((elementCat) => {
      if (elementCat.label == category) {
        found = true;
        cat = elementCat;
      }
    });
    if (found) {
      return (
        <Image
          style={{
            width: cat.medium.width,
            height: cat.medium.height,
          }}
          source={{ uri: cat.icon.toString() }}
        />
      );
    } else {
      return <Image style={{ width: 20, height: 18 }} />;
    }
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    const { deleteItem } = this.props;
    deleteItem(rowKey);

    this.closeRow(rowMap, rowKey);

    var itemss = this.state.items;

    const myOutputArray = [];
    for (let i = 0; i < itemss.items.length; i++) {
      if (itemss.items[i].id !== rowKey) {
        myOutputArray.push(itemss.items[i]);
      }
    }
    myOutputArray.length != 0
      ? (itemss.items = myOutputArray)
      : (itemss = undefined);

    this.setState({
      items: itemss,
    });
  };

  foundRow = (rowMap, rowKey) => {
    const { foundItem } = this.props;
    this.closeRow(rowMap, rowKey.id);
    var itemss = this.state.items;
    for (let i = 0; i < itemss.items.length; i++) {
      if (itemss.items[i].id == rowKey.id) {
        if (itemss.items[i].didFound == "false") {
          itemss.items[i].didFound = "true";
          foundItem(rowKey, "false");
          break;
        } else {
          itemss.items[i].didFound = "false";
          foundItem(rowKey, "true");
          break;
        }
      }
    }
    this.setState({
      items: itemss,
    });
  };

  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.backLeftBtn}
        onPress={() => {
          this.foundRow(rowMap, data.item);
        }}
      >
        <Text style={styles.backTextWhite}>Found</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => this.deleteRow(rowMap, data.item.id)}
      >
        <Icon name="delete-forever" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { editItem, setScroll } = this.props;
    const { items } = this.state;

    if (items !== undefined) {
      if (items.length != 0) {
        return (
          <View style={styles.categories_view}>
            <View style={styles.categories_container}>
              <View style={styles.view_image}>
                {this._displayImageCategory(items.category)}
              </View>

              <Text style={styles.categories}>{items.category}</Text>
            </View>
            <SwipeListView
              onRowDidOpen={() => setScroll(false)}
              onRowDidClose={() => setScroll(true)}
              data={items.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ListItem editItem={editItem} item={item} />
              )}
              renderHiddenItem={this.renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  categories_view: {
    flex: 1,
    paddingBottom: 3,
  },
  categories_container: {
    flexDirection: "row",
    marginLeft: 27,
    marginTop: 20,
  },
  view_image: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    width: 32,
    height: 32,
    borderRadius: 7,
  },
  categories: {
    color: "#2d2d2d",
    fontFamily: "Muli-Bold",
    fontSize: 18,
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.13,
    marginLeft: 14,
    top: 2,
    marginBottom: 10,
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
export default ListCategories;
