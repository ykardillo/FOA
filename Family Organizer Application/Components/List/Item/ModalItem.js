import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, ButtonGroup, Divider } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class ModalItem extends React.Component {
  constructor(props) {
    super(props);
    this._isMount = false;
    this._item = [];

    this.state = {
      fadeAnimationCategory: 0,
      toggleCategory: false,
      heightCategory: 0,
      category: "",
      fadeAnimationUnit: 0,
      toggleUnit: false,
      heightUnit: 0,
      unit: "",
      selectedIndex: 0,
      units: [],
      categories: [],
    };
    this._updateIndex = this._updateIndex.bind(this);
  }

  _updateIndex(selectedIndex) {
    this.setState({
      selectedIndex: selectedIndex,
    });
    switch (this.state.unit) {
      case "kg":
      case "g":
        this._onChangeTextUnit(selectedIndex == 1 ? "g" : "kg");
        break;
      case "L":
      case "ml":
        this._onChangeTextUnit(selectedIndex == 1 ? "ml" : "L");
        break;

      case "p":
      case "":
        this._onChangeTextUnit(selectedIndex == 1 ? "" : "p");
        break;

      default:
        break;
    }
  }
  _fadeInOutUnit = () => {
    Keyboard.dismiss();
    if (this.state.toggleUnit) {
      this.setState({
        toggleUnit: false,
        fadeAnimationUnit: 0,
        heightUnit: 0,
      });
    } else {
      this.setState({
        toggleCategory: false,
        fadeAnimationCategory: 0,
        heightCategory: 0,
        toggleUnit: true,
        fadeAnimationUnit: 1,
        heightUnit: 300,
      });
    }
  };
  _closeUnit() {
    this.setState({
      toggleUnit: false,
      fadeAnimationUnit: 0,
      heightUnit: 0,
    });
    console.log("ici");
  }

  _fadeInOutCategory = () => {
    Keyboard.dismiss();
    if (this.state.toggleCategory) {
      this.setState({
        toggleCategory: false,
        fadeAnimationCategory: 0,
        heightCategory: 0,
      });
    } else {
      this.setState({
        toggleUnit: false,
        fadeAnimationUnit: 0,
        heightUnit: 0,
        toggleCategory: true,
        fadeAnimationCategory: 1,
        heightCategory: 300,
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      category: this.props.item.category,
      unit: this.props.item.unit,
    });
    api.getUnits((success, data, error) => {
      if (this._isMounted) {
        this.setState({
          units: Util.removeDuplicateObject(data),
        });
      }
    });
    api.getCategories((success, data, error) => {
      if (this._isMounted) {
        this.setState({
          categories: Util.removeDuplicateObject(data),
        });
      }
    });
  }

  _onChangeTextName(text) {
    let tmpItem = this._item;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tmpItem.name = text;
    this._item = tmpItem;
  }
  _onChangeTextQuantity(text) {
    let tmpItem = this._item;
    tmpItem.quantity = text;
    this._item = tmpItem;
  }
  _onChangeTextUnit(text) {
    this.setState({
      unit: text,
      toggleUnit: false,
    });
    let tmpItem = this._item;
    tmpItem.unit = text;
    this._item = tmpItem;
    this._fadeInOutUnit();
  }
  _onChangeTextCategory(text) {
    this.setState({
      category: text,
    });
    let tmpItem = this._item;
    tmpItem.category = text;
    this._item = tmpItem;
    this._fadeInOutCategory();
  }
  _displayImageCategory() {
    let category =
      this.props.item.category == ""
        ? this._item.category
        : this.props.item.category;
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
        <View style={styles.modalViewValueCategory}>
          <Image
            style={{
              width: cat.small.width,
              height: cat.small.height,
              marginRight: 6,
              top: 1,
            }}
            source={{ uri: cat.icon.toString() }}
          />
          <Text style={styles.body}>{category}</Text>
          <FontAwesome
            style={{ marginLeft: 8, bottom: 1 }}
            name="sort-down"
            color="black"
            size={18}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Image style={{ width: 20, height: 18 }} />
          <Text style={styles.body}>{category}</Text>
        </View>
      );
    }
  }

  render() {
    const { closeModal, modalStatus, setModalStatus, item } = this.props;
    const { categories } = this.state;
    this._item = item;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => closeModal(this._item)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => closeModal(this._item)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TouchableOpacity
              style={styles.modalView}
              onPress={() => setModalStatus(true)}
            >
              <View style={styles.modalValue}>
                <Text style={styles.modalTextName}>Name</Text>
                <View style={styles.modalViewValue}>
                  <TextInput
                    defaultValue={item.name}
                    style={[
                      styles.modalTextValue,
                      styles.modalTextValueName,
                      item.name == ""
                        ? { paddingHorizontal: 40 }
                        : { paddingHorizontal: 20 },
                    ]}
                    onChangeText={(text) => this._onChangeTextName(text)}
                  />
                </View>
              </View>
              <Divider style={styles.modalDivider} />
              <TouchableOpacity
                style={styles.modalValue}
                onPress={() => this._fadeInOutCategory()}
              >
                <Text style={styles.modalTextName}>Category</Text>
                <View style={styles.modalViewValue}>
                  {this._displayImageCategory()}
                </View>
              </TouchableOpacity>
              <Divider style={styles.modalDivider} />
              <View style={styles.modalValue}>
                <Text style={styles.modalTextName}>Quantity</Text>
                <View style={styles.modalViewValue}>
                  <View style={styles.modalViewValueSpinner}>
                    <InputSpinner
                      height={22}
                      width={100}
                      min={0}
                      max={100000}
                      type={"real"}
                      step={0.5}
                      precision={1}
                      value={item.quantity}
                      onChange={(num) => this._onChangeTextQuantity(num)}
                      inputStyle={{ fontSize: 16, fontFamily: "Muli" }}
                      buttonStyle={{
                        backgroundColor: "#aeceff",
                      }}
                      buttonFontSize={22}
                    />
                  </View>
                </View>
              </View>
              <Divider style={styles.modalDivider} />
              <TouchableOpacity
                style={styles.modalValue}
                onPress={() => this._fadeInOutUnit()}
              >
                <Text style={styles.modalTextName}>Unit</Text>
                <View style={styles.modalViewValue}>{this._displayUnit()}</View>
              </TouchableOpacity>

              <View
                style={[
                  {
                    opacity: this.state.fadeAnimationCategory,
                    height: this.state.heightCategory,
                  },
                ]}
              >
                <Divider style={styles.modalDivider} />
                <View style={styles.modalValue}>
                  <Text style={styles.modalTextNameCategory}>
                    Select a category
                  </Text>
                  <View style={styles.modalViewValue}>
                    <Icon
                      name="clear"
                      color="#1f78fe"
                      size={20}
                      onPress={() => this._fadeInOutCategory()}
                      containerStyle={{
                        borderRadius: 30,
                        padding: 6,
                        borderWidth: 1,
                        borderColor: "#1f78fe",
                      }}
                    />
                  </View>
                </View>
                <Divider style={[styles.modalDivider, { marginBottom: 10 }]} />
                <FlatList
                  data={categories}
                  renderItem={({ item }) => this.renderItemCategory(item)}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  onEndReachedThreshold={0.5}
                />
              </View>
              <View
                style={[
                  {
                    opacity: this.state.fadeAnimationUnit,
                    height: this.state.heightUnit,
                  },
                ]}
              >
                <Divider style={styles.modalDivider} />
                <View style={styles.modalValue}>
                  <Text style={styles.modalTextNameCategory}>
                    Select a unit
                  </Text>
                  <View style={styles.modalViewValue}>
                    <Icon
                      name="clear"
                      color="#1f78fe"
                      size={20}
                      onPress={() => this._fadeInOutUnit()}
                      containerStyle={{
                        borderRadius: 30,
                        padding: 6,
                        borderWidth: 1,
                        borderColor: "#1f78fe",
                      }}
                    />
                  </View>
                </View>
                <Divider style={[styles.modalDivider, { marginBottom: 10 }]} />
                <FlatList
                  data={this.state.units}
                  renderItem={({ item }) => this.renderItemUnit(item)}
                  keyExtractor={(item) => item.key}
                  numColumns={3}
                  onEndReachedThreshold={0.5}
                />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    );
  }
  renderItemCategory = (category) => {
    return (
      <TouchableOpacity
        onPress={() => this._onChangeTextCategory(category.label)}
        style={styles.itemTouchableCat}
      >
        <View style={styles.item}>
          <View style={styles.backgroundImage}>
            <Image
              style={{
                width: category.large.width,
                height: category.large.height,
              }}
              source={{ uri: category.icon.toString() }}
            />
          </View>
          <Text style={styles.body}>{category.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderItemUnit = (unit) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onChangeTextUnit(unit.units[0]);
        }}
        style={styles.itemTouchable}
      >
        <View style={styles.item}>
          <Text style={styles.body}>{unit.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _displayUnit() {
    const { selectedIndex } = this.state;
    const { item } = this.props;

    const unit = this.props.item.unit == "" ? item.unit : this.props.item.unit;
    let buttons = [];
    if (this._isMounted && this.state.units.length != 0) {
      switch (unit) {
        case "kg":
        case "g":
          buttons = this.state.units[0].units;
          return (
            <ButtonGroup
              selectedIndex={selectedIndex}
              onPress={(selectedIndex) => {
                this._updateIndex(selectedIndex);
                this._closeUnit();
              }}
              buttons={buttons}
              containerStyle={styles.container_style_buttons_groupe}
              selectedButtonStyle={styles.selected_button}
              selectedTextStyle={styles.selected_button_text}
              textStyle={styles.button_text}
              innerBorderStyle={{ color: "white" }}
            />
          );

        case "L":
        case "ml":
          buttons = this.state.units[1].units;
          return (
            <ButtonGroup
              onPress={this._updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={styles.container_style_buttons_groupe}
              selectedButtonStyle={styles.selected_button}
              selectedTextStyle={styles.selected_button_text}
              textStyle={styles.button_text}
              innerBorderStyle={{ color: "white" }}
            />
          );
        case "p":
        case "":
        case "P":
          buttons = this.state.units[2].units;
          return (
            <ButtonGroup
              onPress={this._updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={styles.container_style_buttons_groupe}
              selectedButtonStyle={styles.selected_button}
              selectedTextStyle={styles.selected_button_text}
              textStyle={styles.button_text}
              innerBorderStyle={{ color: "white" }}
            />
          );

        default:
          return <></>;
      }
    }
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    letterSpacing: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalValue: {
    paddingBottom: 15,
    flexDirection: "row",
  },
  modalTextName: {
    marginTop: 15,
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
  },
  modalTextNameCategory: {
    marginTop: 15,
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
  },
  modalTextValue: {
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
  },
  modalTextValueName: {
    borderRadius: 15,
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
    opacity: 0.98,
    color: "#5dc1a7",
  },
  modalTextValueCategory: {
    opacity: 0.98,
    color: "#fc9d5e",
  },
  modalViewValue: {
    flex: 1,
    top: 15,
    alignItems: "flex-end",
  },
  modalViewValueCategory: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewValueSpinner: { top: 5, marginBottom: -30 },
  body: {
    textAlign: "center",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    opacity: 0.98,
    color: "#fc9d5e",
  },
  modalDivider: {
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 160,
    height: 1,
  },
  itemTouchableCat: {
    flex: 1,
    padding: 10,
    margin: 3,
    alignItems: "center",
  },
  itemTouchable: {
    flex: 1,
    padding: 10,
    margin: 3,
    alignItems: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    width: 48,
    height: 48,
    borderRadius: 7,
  },
  container_style_buttons_groupe: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    width: 89,
    height: 30,
    borderRadius: 8,
    marginVertical: -10,
    top: 8,
  },
  selected_button: {
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#3eb742",
    backgroundColor: "#ffffff",
  },
  selected_button_text: {
    fontStyle: "normal",
    color: "#3eb742",
  },

  button_text: {
    bottom: 5,
    color: "#2d2d2d",
    fontSize: 16,
    fontFamily: "Muli",
  },
});
