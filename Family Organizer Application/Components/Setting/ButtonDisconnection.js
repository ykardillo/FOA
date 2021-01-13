import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native-elements";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const GoogleStorageKey = "@Expo:GoogleToken";
const ScreenKey = "@Expo:Screen";
const UserIdKey = "@Expo:UserId";

export default function ButtonDisconnection() {
  const navigation = useNavigation();

  async function signOutAsync() {
    try {
      await AsyncStorage.removeItem(GoogleStorageKey);
      await AsyncStorage.removeItem(UserIdKey);
      await AsyncStorage.setItem(ScreenKey, "OnBoarding");
      await firebase.auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "OnBoarding" }],
      });
    } catch ({ message }) {
      alert("Error: " + message);
    }
  }
  return (
    <>
      <Button
        type="clear"
        title="Disconnect"
        titleStyle={styles.text}
        onPress={() => {
          Alert.alert(
            "Disconnect",
            "Are you sure you want to sign out of your account",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => signOutAsync(),
              },
            ],
            {
              cancelable: false,
            }
          );
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "red",
    fontFamily: "Muli",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
  },
});
