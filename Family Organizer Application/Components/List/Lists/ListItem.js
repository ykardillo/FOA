import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import Util from "../../../Model/Util";
import UsersImage from "../../Util/UsersImage";
import * as api from "../../../Api/Api";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      usersId: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    api.getUsersIdfromListId(this.props.list.id, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          usersId: data || this.state.usersId,
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
  _displayImageGrocery() {
    let random = Util.getRandomInt(3);
    switch (random) {
      case 0:
        return (
          <Image
            style={styles.image}
            source={require("../../../assets/icon/groceries/ic_grocery_0.png")}
          />
        );
      case 1:
        return (
          <Image
            style={styles.image}
            source={require("../../../assets/icon/groceries/ic_grocery_1.png")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.image}
            source={require("../../../assets/icon/groceries/ic_grocery_2.png")}
          />
        );

      default:
        return (
          <Image
            style={[
              {
                backgroundColor: Util.randomHSL(),
              },
              styles.image,
            ]}
          />
        );
    }
  }

  render() {
    const { list, displayItems } = this.props;
    const { usersId } = this.state;

    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.list_container}
          onPress={() => displayItems(list.id, list.name, usersId)}
        >
          {this._displayImageGrocery()}
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text} numberOfLines={1}>
                {list.name}
              </Text>
            </View>
          </View>

          {this._displayUsersImage()}
          <View style={styles.info_container}>
            <Icon
              name="angle-right"
              type="font-awesome"
              color="#d3d3d3"
              size={35}
            />
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
    top: 3,
    width: 32,
    height: 32,
    borderRadius: 6,
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
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
  },
  info_container: {
    paddingRight: 15,
  },
});

export default ListItem;
