import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  I18nManager,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Util from "../../../Model/Util";
import ModalItem from "./ModalItem";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editItem: false,
      item: [],
    };
  }
  componentDidMount() {
    this.setState({
      item: this.props.item,
    });
  }

  _closeModal = (item) => {
    if (item.name != "") {
      this.setState({ editItem: false });
      this.props.editItem(item);
    } else {
      Alert.alert("", "The name is empty", [{ text: "OK" }], {
        cancelable: false,
      });
    }
  };

  _setModalStatus = (value) => {
    this.setState({ editItem: value });
  };
  render() {
    const { item } = this.state;
    return (
      <View style={styles.main_container}>
        <ModalItem
          modalStatus={this.state.editItem}
          closeModal={this._closeModal}
          setModalStatus={this._setModalStatus}
          item={item}
        />
        <TouchableOpacity
          style={styles.list_container}
          onPress={() => this.setState({ editItem: true })}
        >
          <FontAwesome
            name="circle-o"
            color={Util.randomHSL()}
            size={14}
            style={styles.circle}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text
                style={
                  item.didFound == "true"
                    ? styles.title_text_found
                    : styles.title_text_not_found
                }
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>
          </View>
          <View style={styles.info_container}>
            <Text
              style={
                item.didFound == "true"
                  ? styles.text_quantity_found
                  : styles.text_quantity_not_found
              }
            >
              {item.quantity}
              {item.unit}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "white",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 27,
    marginVertical: -5,
  },
  circle: {
    top: 11,
    width: 32,
    height: 32,
  },
  list_container: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  content_container: {
    flex: 1,
    marginLeft: 5,
    top: 5,
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
  text_quantity_found: {
    textDecorationLine: "line-through",
    color: "rgba(45,45,45,0.5)",
    marginLeft: 3,
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "right",
    letterSpacing: 0.11,
  },
  text_quantity_not_found: {
    marginLeft: 3,
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "right",
    letterSpacing: 0.11,
  },
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default ListItem;
