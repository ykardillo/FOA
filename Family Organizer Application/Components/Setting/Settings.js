import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import ButtonDisconnection from "./ButtonDisconnection";
import { ListItem, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../../Api/Api";

const UserIdKey = "@Expo:UserId";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      userId: "",
      user: [],
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
    this._isMounted = true;
    await this.getSorageData();
    const { userId } = this.state;
    api.getUserFromId(userId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          user: data,
        });
      }
    });
  }
  render() {
    const { user } = this.state;
    if (this._isMounted) {
      return (
        <View style={styles.main_container}>
          <View style={styles.view}>
            <ScrollView style={styles.description}>
              <View style={{ marginBottom: 25 }}>
                <ListItem key={1} onPress={() => alert(user.lastname)}>
                  <Image
                    source={{
                      uri: user.profilImagePath,
                    }}
                    style={styles.image_users_size}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.titleSettings}>
                      {user.lastname}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitleSettings}>
                      {user.emailAddress}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
              <View>
                <Text style={styles.titleSection}>PREFERENCE</Text>
                <ListItem key={1} onPress={() => alert("Notifications")}>
                  <Icon
                    reverse
                    name="ios-notifications"
                    type="ionicon"
                    color="purple"
                    size={15}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.textSettings}>
                      Notifications
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </View>
              <View>
                <Text style={styles.titleSection}>ASSISTANCE</Text>
                <ListItem key={1} bottomDivider onPress={() => alert("Report a problem")}>
                  <Icon
                    reverse
                    name="ios-warning"
                    type="ionicon"
                    color="red"
                    size={15}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.textSettings}>
                      Report a problem
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem key={2} bottomDivider onPress={() => alert("Help")}>
                  <Icon
                    reverse
                    name="ios-help-circle"
                    type="ionicon"
                    color="#1f78fe"
                    size={15}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.textSettings}>
                      Help
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem key={3} bottomDivider onPress={() => alert("Rules and legal notices")}>
                  <Icon
                    reverse
                    name="ios-book"
                    type="ionicon"
                    color="grey"
                    size={15}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.textSettings}>
                      Rules and legal notices
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </View>
              <ButtonDisconnection />
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return <></>;
    }
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
  description: {
    marginTop: 30,
  },
  image_users_size: {
    borderColor: "lightgray",
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  titleSection: {
    color: "#7d7d7d",
    fontFamily: "Muli-Bold",
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
  },
  titleSettings: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
  },
  textSettings: {
    color: "#2d2d2d",
    fontFamily: "Muli",
    fontWeight: "400",
    fontStyle: "normal",
  },
  subTitleSettings: {
    fontFamily: "Muli",
    color: "grey",
    fontSize: 14,
  },
});
