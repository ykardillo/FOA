import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Divider } from "react-native-elements";
import Util from "../../../Model/Util";
import { CalendarList } from "react-native-calendars";
import moment from "moment";

export default class ModalCreateToDo extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this._toDo = [];

    this.state = {
      fadeAnimationCalendar: 0,
      toggleCalendar: false,
      heightCalendar: 0,
      toggleDate: true,
      fadeAnimationDate: 1,
      heightDate: 70,
      selectedDay: {
        [`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format(
          "DD"
        )}`]: {
          selected: true,
          selectedColor: "#1f78fe",
        },
      },
      currentDay: moment().format(),
      alarmTime: moment().format(),
    };
  }

  componentDidMount() {
    const { toDo } = this.props;
    this._isMounted = true;
    if (this._isMounted) {
      this._toDo = toDo;
    }
  }

  _fadeInOutCalendar = () => {
    Keyboard.dismiss();
    if (this.state.toggleCalendar) {
      this.setState({
        toggleCalendar: false,
        fadeAnimationCalendar: 0,
        heightCalendar: 0,
        toggleDate: true,
        fadeAnimationDate: 1,
        heightDate: 70,
      });
    } else {
      this.setState({
        toggleCalendar: true,
        fadeAnimationCalendar: 1,
        heightCalendar: 420,
        toggleDate: false,
        fadeAnimationDate: 0,
        heightDate: 0,
      });
    }
  };

  _fadeInOutDate = () => {
    Keyboard.dismiss();
    if (!this.state.toggleDate) {
      this.setState({
        toggleDate: true,
        fadeAnimationDate: 1,
        heightDate: 70,
        toggleCalendar: false,
        fadeAnimationCalendar: 0,
        heightCalendar: 0,
      });
    } else {
      this.setState({
        toggleDate: false,
        fadeAnimationDate: 0,
        heightDate: 0,
        toggleCalendar: true,
        fadeAnimationCalendar: 1,
        heightCalendar: 420,
      });
    }
  };

  _onChangeTextName(text) {
    let tmpToDo = this._toDo;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tmpToDo.name = text;
    this._toDo = tmpToDo;
  }

  _onChangeTextOverview(text) {
    let tmpToDo = this._toDo;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tmpToDo.overview = text;
    this._toDo = tmpToDo;
  }
  _onChangeExecutedDate(day) {
    let tmpToDo = this._toDo;
    tmpToDo.executionDate = day.timestamp;
    this._toDo = tmpToDo;
  }

  render() {
    const { closeModal, modalStatus, setModalStatus, toDo } = this.props;
    this._toDo = toDo;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => closeModal(this._toDo)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => closeModal(this._toDo)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TouchableOpacity
              style={styles.modalView}
              onPress={() => {
                setModalStatus(true);
                Keyboard.dismiss();
              }}
            >
              <View style={styles.modalValue}>
                <TextInput
                  defaultValue={toDo.name}
                  placeholder="Name..."
                  style={[
                    styles.modalTextValue,
                    styles.modalTextValueName,
                    toDo.name == ""
                      ? { paddingHorizontal: 40 }
                      : { paddingHorizontal: 20 },
                  ]}
                  onChangeText={(text) => this._onChangeTextName(text)}
                />
                <View style={styles.date}>
                  <Image
                    source={require("../../../assets/icon/ic_calendar.png")}
                    style={styles.date_image}
                  />
                  <Text style={styles.modalTexDate}>
                    {this._toDo.executionDate == undefined
                      ? "not defined"
                      : Util.getDate(Number(toDo.executionDate))}
                  </Text>
                </View>
              </View>
              <Divider style={styles.modalDivider} />
              <View style={styles.modalValue}>
                <TextInput
                  defaultValue={toDo.overview}
                  placeholder="Overview..."
                  multiline={true}
                  numberOfLines={4}
                  style={[
                    styles.modalTextValue,
                    styles.modalTextValueOverview,
                    toDo.overview == ""
                      ? { paddingHorizontal: 40 }
                      : { paddingHorizontal: 20 },
                  ]}
                  onChangeText={(text) => this._onChangeTextOverview(text)}
                />
              </View>
              <Divider style={styles.modalDivider} />
              <View
                style={[
                  {
                    opacity: this.state.fadeAnimationDate,
                    height: this.state.heightDate,
                  },
                  styles.modalValueRow,
                ]}
              >
                <View style={styles.modalViewValue}>
                  <TouchableOpacity
                    onPress={() => this._fadeInOutDate()}
                    style={styles.date_white_image_bg}
                  >
                    <Image
                      source={require("../../../assets/icon/ic_calendar_white.png")}
                      style={styles.date_white_image}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={[
                  {
                    opacity: this.state.fadeAnimationCalendar,
                    height: this.state.heightCalendar,
                  },
                ]}
              >
                <View style={styles.modalValueRow}>
                  <Text style={styles.modalTextNameCalendar}>
                    Select a date
                  </Text>
                  <View style={styles.modalViewValue}>
                    <Icon
                      name="clear"
                      color="#1f78fe"
                      size={20}
                      onPress={() => this._fadeInOutCalendar()}
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
                {this._displayCalendar()}
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    );
  }

  _displayCalendar() {
    return (
      <View style={styles.calenderContainer}>
        <CalendarList
          style={{
            width: 340,
            height: 350,
            borderRadius: 10,
          }}
          hideArrows={false}
          current={this.state.currentDay}
          minDate={moment().format()}
          horizontal
          pastScrollRange={0}
          pagingEnabled
          calendarWidth={340}
          onDayPress={(day) => {
            this._onChangeExecutedDate(day);
            this.setState({
              selectedDay: {
                [day.dateString]: {
                  selected: true,
                  selectedColor: "#1f78fe",
                },
              },
              currentDay: day.dateString,
              alarmTime: day.dateString,
            });
          }}
          monthFormat="MMMM yyyy"
          markingType="simple"
          theme={{
            arrowColor: "#d3d3d3",
            textDayFontFamily: "Muli",
            textDayHeaderFontFamily: "Muli",
            textMonthFontFamily: "Muli",
            selectedDayBackgroundColor: "#1f78fe",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#1f78fe",
            calendarBackground: "white",
            textDisabledColor: "#d9dbe0",
          }}
          markedDates={this.state.selectedDay}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calenderContainer: { marginTop: -10 },
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
  date: {
    flexDirection: "row",
  },
  date_image: {
    width: 11,
    height: 11,
    top: 6,
  },
  date_white_image: {
    width: 15,
    height: 15,
  },
  date_white_image_bg: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    top: 6,
    borderRadius: 30,
    backgroundColor: "#1f78fe",
  },
  modalValue: {
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
  modalTextValueOverview: {
    borderRadius: 15,
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
    opacity: 0.98,
    color: "#fc9d5e",
  },
  modalValueRow: {
    paddingHorizontal: 24,
    flexDirection: "row",
    paddingBottom: 17,
  },
  modalTextName: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "left",
  },
  modalTexDate: {
    marginLeft: 6,
    color: "#909090",
    fontFamily: "Muli",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.1,
  },
  modalTextOverview: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
  },
  modalTextNameCalendar: {
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
  modalViewValue: {
    flex: 1,
    alignItems: "flex-end",
    top: 12,
  },
  modalDivider: {
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 160,
    height: 1,
  },
});
