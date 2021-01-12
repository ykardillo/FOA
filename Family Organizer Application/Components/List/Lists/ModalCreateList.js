import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
} from "react-native";
import { Divider } from "react-native-elements";

export default class ModalCreateList extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this._list = [];
  }

  componentDidMount() {
    const { list } = this.props;
    this._isMounted = true;
    if (this._isMounted) {
      this._list = list;
    }
  }

  _onChangeTextName(text) {
    let tmpList = this._list;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tmpList.name = text;
    this._list = tmpList;
  }

  render() {
    const { closeModal, modalStatus, setModalStatus, list } = this.props;
    this._list = list;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => closeModal(this._list)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => closeModal(this._list)}
        >
          <TouchableOpacity
            style={styles.modalView}
            onPress={() => {
              setModalStatus(true);
              Keyboard.dismiss();
            }}
          >
            <View style={styles.modalValue}>
              <Text style={styles.modalTextName}>Name</Text>
              <View style={styles.modalViewValue}>
                <TextInput
                  defaultValue={list.name}
                  style={[
                    styles.modalTextValue,
                    styles.modalTextValueName,
                    list.name == ""
                      ? { paddingHorizontal: 40 }
                      : { paddingHorizontal: 20 },
                  ]}
                  onChangeText={(text) => this._onChangeTextName(text)}
                />
              </View>
            </View>
            <Divider style={styles.modalDivider} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
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
    marginHorizontal: 15,
    marginVertical: 30,
    backgroundColor: "white",
    borderRadius: 20,
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
    flexDirection: "row",
    padding: 24,
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
  modalTextName: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "left",
  },
  modalViewValue: {
    flex: 1,
    alignItems: "flex-end",
    top: 5,
  },
  modalDivider: {
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 160,
    height: 0,
  },
});
