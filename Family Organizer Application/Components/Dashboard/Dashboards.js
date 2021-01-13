import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider } from "react-native-elements";
import Loading from "../Util/Loading";
import * as api from "../../Api/Api";
import Util from "../../Model/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdKey = "@Expo:UserId";

export default class Dashbaords extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      toDos: [],
      toDosDone: [],
      toDosNew: [],
      events: [],
      eventsToday: [],
      eventsThisWeek: [],
      groceries: [],
      groceriesList: [],
      groceriesItemToBuy: [],
      isLoading: false,
      userId: "",
    };
  }

  gotToList = () => {
    this.props.navigation.navigate("List", {
      toDo: 2,
    });
  };

  gotToTodo = () => {
    this.props.navigation.navigate("List", {
      toDo: 2,
    });
  };

  gotToEvents = () => {
    this.props.navigation.navigate("Events");
  };

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
    await this.getSorageData();
    const { userId } = this.state;
    this._isMounted = true;
    this.setState({ isLoading: true });
    api.getToDos(userId, (success, data, error) => {
      if (this._isMounted) {
        const datas = Util.removeDuplicateObject(data);
        this.setState({
          toDos: datas,
        });
        this.setState({
          toDosDone: Util.getObjectWithProperties(datas, "isDone", "true"),
          toDosNew: Util.getObjectWithProperties(datas, "isDone", "false"),
        });
      }
    });
    api.getEvents(userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          events: Util.removeDuplicateObject(data),
        });
      }
    });
    api.getEventsOfTheWeek(userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          eventsThisWeek: Util.removeDuplicateObject(data),
          eventsToday:
            Util.getTodayEvent(this.state.eventsThisWeek) ||
            this.state.eventsToday,
        });
      }
    });

    api.getLists(userId, (success, data, error) => {
      if (this._isMounted) {
        const datas = Util.removeDuplicateObject(data);
        this.setState({
          groceries: datas,
        });
        this.setState({
          groceriesList: Util.getObjectWithProperties(
            datas,
            "didFinish",
            "false"
          ),
        });
        api.getAllItemsOfLists(datas, (success, items, error) => {
          if (this._isMounted) {
            this.setState({
              groceriesItemToBuy: Util.removeDuplicateObject(items),
            });
          }
        });
      }
    });
  }
  refresh() {
    const { userId } = this.state;
    this.setState({ isLoading: true });
    api.getToDos(userId, (success, data, error) => {
      if (this._isMounted) {
        const datas = Util.removeDuplicateObject(data);
        this.setState({
          toDos: datas,
        });
        this.setState({
          toDosDone: Util.getObjectWithProperties(datas, "isDone", "true"),
          toDosNew: Util.getObjectWithProperties(datas, "isDone", "false"),
        });
      }
    });
    api.getEvents(userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          events: Util.removeDuplicateObject(data),
        });
      }
    });
    api.getEventsOfTheWeek(userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          eventsThisWeek: Util.removeDuplicateObject(data),
          eventsToday:
            Util.getTodayEvent(this.state.eventsThisWeek) ||
            this.state.eventsToday,
        });
      }
    });

    api.getLists(userId, (success, data, error) => {
      if (this._isMounted) {
        const datas = Util.removeDuplicateObject(data);
        this.setState({
          groceries: datas,
        });
        this.setState({
          groceriesList: Util.getObjectWithProperties(
            datas,
            "didFinish",
            "false"
          ),
        });
        api.getAllItemsOfLists(datas, (success, items, error) => {
          if (this._isMounted) {
            this.setState({
              groceriesItemToBuy: Util.removeDuplicateObject(items),
            });
          }
        });
      }
    });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <Loading
          style={styles.loading_container}
          size={"large"}
          color={"#1f78fe"}
        />
      );
    } else {
      return <></>;
    }
  }

  render() {
    if (this._isMounted) {
      const { toDos, toDosDone, toDosNew } = this.state;
      const { events, eventsToday, eventsThisWeek } = this.state;
      const { groceries, groceriesList, groceriesItemToBuy } = this.state;
      return (
        <View style={styles.main_container}>
          <View style={styles.view}>
            <ScrollView>
              {/* <Button
                onPress={() => this.refresh()}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              /> */}
              <ImageBackground
                source={require("../../assets/bc_rectangle_blue.png")}
                style={[styles.image, { marginTop: 20 }]}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.gotToTodo()}
                  accessible={false}
                >
                  <View style={styles.container}>
                    <View style={styles.title_view}>
                      <Image
                        source={require("../../assets/ic_todo.png")}
                        style={styles.title_image}
                      />
                      <Text style={styles.title_card}>ToDo's</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.content}>
                      <View style={styles.content_left}>
                        <View style={styles.content_left_data}>
                          <View style={styles.content_left_left}>
                            <Text style={styles.content_text_number}>
                              {toDos.length}
                            </Text>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_todo_done.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={styles.content_text}
                              >
                                Done
                              </Text>
                            </View>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_todo_new.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={styles.content_text}
                              >
                                New
                              </Text>
                            </View>
                          </View>
                          <View style={styles.content_left_right}>
                            <Text style={styles.content_text}> </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {toDosDone.length}
                            </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {toDosNew.length}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.content_right}>
                        <Image
                          source={require("../../assets/ic_todo_detail.png")}
                          style={styles.detail_image}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>

              <ImageBackground
                source={require("../../assets/bc_rectangle_purple.png")}
                style={styles.image}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.gotToEvents()}
                  accessible={false}
                >
                  <View style={styles.container}>
                    <View style={styles.title_view}>
                      <Image
                        source={require("../../assets/ic_event.png")}
                        style={styles.title_image}
                      />
                      <Text style={styles.title_card}>Events</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.content}>
                      <View style={styles.content_left}>
                        <View style={styles.content_left_data}>
                          <View style={styles.content_left_left}>
                            <Text style={styles.content_text_number}>
                              {events.length}
                            </Text>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_event_today.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={styles.content_text}
                              >
                                Today
                              </Text>
                            </View>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_event_thisWeek.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={[styles.content_text, { width: 100 }]}
                              >
                                This Week
                              </Text>
                            </View>
                          </View>
                          <View style={styles.content_left_right}>
                            <Text style={styles.content_text}> </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {eventsToday.length}
                            </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {eventsThisWeek.length}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.content_right}>
                        <Image
                          source={require("../../assets/ic_event_detail.png")}
                          style={styles.detail_image}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
              <ImageBackground
                source={require("../../assets/bc_rectangle_orange.png")}
                style={styles.image}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.gotToList()}
                  accessible={false}
                >
                  <View style={styles.container}>
                    <View style={styles.title_view}>
                      <Image
                        source={require("../../assets/ic_grocery.png")}
                        style={styles.title_image}
                      />
                      <Text style={styles.title_card}>Groceries</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.content}>
                      <View style={styles.content_left}>
                        <View style={styles.content_left_data}>
                          <View style={styles.content_left_left}>
                            <Text style={styles.content_text_number}>
                              {groceries.length}
                            </Text>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_grocery_list.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={styles.content_text}
                              >
                                List
                              </Text>
                            </View>
                            <View style={styles.content_text_container}>
                              <Image
                                source={require("../../assets/ic_grocery_items.png")}
                                style={styles.content_text_image}
                              />
                              <Text
                                numberOfLines={1}
                                style={[styles.content_text, { width: 100 }]}
                              >
                                Items to Buy
                              </Text>
                            </View>
                          </View>
                          <View style={styles.content_left_right}>
                            <Text style={styles.content_text}> </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {groceriesList.length}
                            </Text>
                            <Text
                              style={[styles.content_text, { marginTop: 21 }]}
                            >
                              {groceriesItemToBuy.length}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.content_right}>
                        <Image
                          source={require("../../assets/ic_grocery_detail.png")}
                          style={styles.detail_image}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.main_container}>
          <View style={styles.view}>{this._displayLoading()}</View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  main_container: { flex: 1, backgroundColor: "#fcfcfc" },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  image: {
    width: 343,
    height: 159,
    borderRadius: 14,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    marginLeft: 12,
  },
  title_view: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  title_image: {
    width: 12,
    height: 12,
    top: 16,
  },
  title_card: {
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.1,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  divider: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 160,
    height: 1,
    opacity: 0.2,
  },
  content: {
    flexDirection: "row",
  },
  content_left: {
    paddingLeft: 8,
  },
  content_left_data: {
    flexDirection: "row",
  },
  content_left_left: {
    width: 50,
  },
  content_left_right: {
    paddingLeft: 90,
    paddingRight: 50,
  },
  content_text_number: {
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 20,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.14,
  },
  content_text: {
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
  },
  content_text_container: {
    flexDirection: "row",
    marginTop: 16,
  },
  content_text_image: {
    width: 18,
    height: 18,
    top: 1,
    marginRight: 6,
  },
  content_right: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  detail_image: {
    width: 85,
    height: 93,
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
});
