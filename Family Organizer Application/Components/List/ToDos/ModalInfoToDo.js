import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Keyboard,
  Image,
} from "react-native";
import { Icon, Divider } from "react-native-elements";
import Util from "../../../Model/Util";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

export default class ModalInfoToDo extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      fadeAnimationCalendar: 0,
      toggleCalendar: false,
      heightCalendar: 0,
      toggleDate: true,
      fadeAnimationDate: 1,
      heightDate: 70,
      selectedDay: {
        [`${moment(new Date(Number(this.props.toDo.executionDate))).format(
          "YYYY"
        )}-${moment(new Date(Number(this.props.toDo.executionDate))).format(
          "MM"
        )}-${moment(new Date(Number(this.props.toDo.executionDate))).format(
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
    this._isMounted = true;
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

  render() {
    const { closeModal, modalStatus, setModalStatus, toDo } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => closeModal()}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => closeModal()}
        >
          <TouchableOpacity
            style={styles.modalView}
            onPress={() => setModalStatus(true)}
          >
            <View style={styles.modalValue}>
              <Text style={styles.modalTextName}>{toDo.name}</Text>
              <View style={styles.date}>
                <Image
                  source={require("../../../assets/icon/ic_calendar.png")}
                  style={styles.date_image}
                />
                <Text style={styles.modalTexDate}>
                  {Util.getDate(Number(toDo.executionDate))}
                </Text>
              </View>
            </View>
            <Divider style={styles.modalDivider} />
            <Text style={styles.modalTextOverview}>{toDo.overview}</Text>

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
                <Text style={styles.modalTextNameCalendar}>Select a date</Text>
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
