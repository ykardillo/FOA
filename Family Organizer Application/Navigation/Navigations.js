import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import Lists from "../Components/List/Lists";
import ListItems from "../Components/List/Item/ListItems";
import ToDo from "../Components/List/ToDos/DetailToDo";
import Recipes from "../Components/Recipe/Recipes";
import Events from "../Components/Event/Events";
import Dashboard from "../Components/Dashboard/Dashboards";
import Setting from "../Components/Setting/Settings";
import UsersImageHeader from "../Components/Util/UsersImageHeader";
import OnBoarding from "../OnBoarding/Onboarding";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

function DashboardScreen({ navigation, route }) {
  return <Dashboard navigation={navigation} route={route}/>;
}
function ListScreen({ navigation, route }) {
  return <Lists navigation={navigation} route={route}/>;
}
function ItemScreen({ navigation, route }) {
  return <ListItems navigation={navigation} route={route} />;
}
function ToDoScreen({ navigation, route }) {
  return <ToDo navigation={navigation} route={route} />;
}
function RecipeScreen({ navigation }) {
  return <Recipes navigation={navigation} />;
}
function EventScreen({ navigation }) {
  return <Events navigation={navigation} />;
}
function SettingScreen({ navigation }) {
  return <Setting navigation={navigation} />;
}
function SignInScreen({ navigation }) {
  return <SignIn navigation={navigation} />;
}
function SignUpScreen({ navigation }) {
  return <SignUp navigation={navigation} />;
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}

const DashboardStack = createStackNavigator();
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.header_text,
      }}
    >
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title=""
              buttonStyle={styles.list_search_button}
              icon={
                <Image
                  style={styles.list_search_image}
                  source={require("../assets/bottom_bar_icon/ic_search.png")}
                />
              }
            />
          ),
        }}
      />
    </DashboardStack.Navigator>
  );
}

const ListStack = createStackNavigator();
function ListStackScreen() {
  return (
    <ListStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.header_text,
      }}
    >
      <ListStack.Screen
        name="List"
        component={ListScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title=""
              buttonStyle={styles.list_search_button}
              icon={
                <Image
                  style={styles.list_search_image}
                  source={require("../assets/bottom_bar_icon/ic_search.png")}
                />
              }
            />
          ),
        }}
      />
      <ListStack.Screen
        name="Items"
        component={ItemScreen}
        options={({ route }) => ({
          headerTitle: (props) => <LogoTitle {...props} route={route} />,
          headerRight: () => (
            <View style={{ flex: 1, flexDirection: "row", top: 4 }}>
              <UsersImageHeader usersId={route.params.usersId} />
              <Button
                onPress={() => alert("This is a button!")}
                title=""
                buttonStyle={styles.list_3dots_button}
                icon={
                  <Image
                    style={styles.list_3dots_image}
                    source={require("../assets/bottom_bar_icon/ic_3dots.png")}
                  />
                }
              />
            </View>
          ),
        })}
      />
      <ListStack.Screen
        name="ToDo"
        component={ToDoScreen}
        options={({ route }) => ({
          headerTitle: (props) => <LogoTitle {...props} route={route} />,
          headerRight: () => (
            <View style={{ flex: 1, flexDirection: "row", top: 4 }}>
              <UsersImageHeader usersId={route.params.usersId} />
              <Button
                onPress={() => alert("This is a button!")}
                title=""
                buttonStyle={styles.list_3dots_button}
                icon={
                  <Image
                    style={styles.list_3dots_image}
                    source={require("../assets/bottom_bar_icon/ic_3dots.png")}
                  />
                }
              />
            </View>
          ),
        })}
      />
    </ListStack.Navigator>
  );
}
function LogoTitle({ route }) {
  return (
    <Text
      style={[styles.header_text, { marginLeft: -34, bottom: 2, width: 200 }]}
      numberOfLines={1}
    >
      {route.params.name}
    </Text>
  );
}
const RecipeStack = createStackNavigator();
function RecipeStackScreen() {
  return (
    <RecipeStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.header_text,
      }}
    >
      <RecipeStack.Screen name="Recipes" component={RecipeScreen} />
    </RecipeStack.Navigator>
  );
}
const EventStack = createStackNavigator();
function EventStackScreen() {
  return (
    <EventStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.header_text,
      }}
    >
      <EventStack.Screen name="Events" component={EventScreen} />
    </EventStack.Navigator>
  );
}

const SettingStack = createStackNavigator();
function SettingStackScreen() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.header_text,
      }}
    >
      <SettingStack.Screen name="Settings" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

function FOA() {
  return (
    <FOATabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let nb;
          let image;
          let style = styles.image;

          if (route.name === "Dashboard") {
            focused
              ? (image = require("../assets/bottom_bar_icon/ic_dashboard_actived.png"))
              : (image = require("../assets/bottom_bar_icon/ic_dashboard.png"));
            nb = 3;
          } else if (route.name === "List") {
            focused
              ? (image = require("../assets/bottom_bar_icon/ic_lists_actived.png"))
              : (image = require("../assets/bottom_bar_icon/ic_lists.png"));
            nb = 1;
          } else if (route.name === "Recipes") {
            focused
              ? (image = require("../assets/bottom_bar_icon/ic_recipes_actived.png"))
              : (image = require("../assets/bottom_bar_icon/ic_recipes.png"));
            nb = 2;
          } else if (route.name === "Events") {
            focused
              ? (image = require("../assets/bottom_bar_icon/ic_events_actived.png"))
              : (image = require("../assets/bottom_bar_icon/ic_events.png"));
            nb = 3;
          } else if (route.name === "Settings") {
            focused
              ? (image = require("../assets/bottom_bar_icon/ic_settings_actived.png"))
              : (image = require("../assets/bottom_bar_icon/ic_settings.png"));
            // image = require("../assets/bottom_bar_icon/ic_settings.png");
            style = styles.image_setting;
            nb = 3;
          }
          return (
            <View>
              <Image style={style} source={image} />
              {/*
                <IconBadge
                  BadgeElement={
                    // here your text in badge icon
                    <Text style={{ color: "#FFFFFF" }}>{nb}</Text>
                  }
                  IconBadgeStyle={{
                    marginTop: -35,
                    marginRight: -10,
                  }}
                  Hidden={focused}
                />*/}
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#1f78fe",
        inactiveTintColor: "#2d2d2d",
        showLabel: true,

        style: {
          height: 85,
          paddingBottom: 30,
        },
      }}
    >
      <FOATabNavigator.Screen
        name="Dashboard"
        component={DashboardStackScreen}
      />
      <FOATabNavigator.Screen name="List" component={ListStackScreen} />
      <FOATabNavigator.Screen name="Recipes" component={RecipeStackScreen} />
      <FOATabNavigator.Screen name="Events" component={EventStackScreen} />
      <FOATabNavigator.Screen name="Settings" component={SettingStackScreen} />
    </FOATabNavigator.Navigator>
  );
}

const FOATabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScreenKey = "@Expo:Screen";

export default class Navigations extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      screen: "",
    };
  }
  getSorageData = async () => {
    try {
      const value = await AsyncStorage.getItem(ScreenKey);
      this.setState({
        screen: value == null ? "OnBoarding" : value,
      });
      //console.log(value);
      // value previously stored
    } catch (e) {
      alert(e);
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.getSorageData();
  }
  render() {
    const { screen } = this.state;
    // console.log(screen);
    if (this._isMounted) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={screen}>
            <Stack.Screen
              options={{ headerShown: false }}
              name="FOA"
              component={FOA}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="OnBoarding"
              component={OnBoarding}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={AuthStackScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <></>;
    }
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fcfcfc",
    elevation: 0,
    borderBottomColor: "rgba(0,0,0,0)",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  header_text: {
    fontSize: 25,
    fontFamily: "Muli-Bold",
  },
  list_search_button: {
    marginRight: 16,
    paddingHorizontal: 9,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.025)",
  },
  list_search_image: {
    width: 15,
    height: 15,
  },
  list_3dots_button: {
    marginRight: 16,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.025)",
  },
  list_3dots_image: {
    width: 3,
    height: 15,
  },
  image: {
    width: 20,
    height: 20,
  },
  image_setting: {
    width: 18,
    height: 20,
  },
});
