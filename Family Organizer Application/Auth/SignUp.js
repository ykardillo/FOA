import React, { useRef, useState } from "react";
import firebase from "firebase";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as api from "../Api/Api";

const UserIdKey = "@Expo:UserId";
const ScreenKey = "@Expo:Screen";

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [password1, setPassword1] = useState("");
  const [password1ErrorMessage, setPassword1ErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  let textInput2 = useRef();
  let textInput3 = useRef();
  let textInput4 = useRef();

  function signInAccepted() {
    AsyncStorage.setItem(ScreenKey, "FOA");
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: username,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/testefirebase-5a25d.appspot.com/o/User%2Fdefault_user.png?alt=media&token=7fab2e22-941b-457f-a7e4-af55d27477e5",
      })
      .then(function () {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            if (user.emailVerified) {
              api.addUser(user);
              AsyncStorage.setItem(UserIdKey, user["uid"]);
              AsyncStorage.setItem(ScreenKey, "FOA");
              navigation.reset({
                index: 0,
                routes: [{ name: "FOA" }],
              });
            } else {
              user.sendEmailVerification();
              Alert.alert(
                "Sign Up",
                "An email has been sent for verification",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Auth" }],
                      }),
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }
          }
        });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const signUpEmail = async () => {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setPassword1ErrorMessage("");
    setUsernameErrorMessage("");
    if (username == "") {
      setUsernameErrorMessage("Username can't be empty");
    } else if (password == "") {
      setPasswordErrorMessage("Password can't be empty");
    } else if (password1 == "") {
      setPassword1ErrorMessage("Password can't be empty");
    } else {
      if (password === password1) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => signInAccepted())
          .catch((error) => {
            switch (error.code) {
              case "auth/wrong-password":
              case "auth/weak-password":
                setPasswordErrorMessage(error.message);
                setPassword1ErrorMessage(error.message);
                break;
              case "auth/invalid-email":
              case "auth/email-already-in-use":
                setEmailErrorMessage(error.message);
                break;
              default:
                setPasswordErrorMessage(error.message);
                setPassword1ErrorMessage(error.message);
                setEmailErrorMessage(error.message);
                setUsernameErrorMessage(error.message);
                break;
            }
          });
      } else {
        setPasswordErrorMessage("Passwords do not match");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            backgroundColor: "white",
          }}
        >
          <Image
            style={{ height: 200, width: 200, bottom: 30 }}
            source={require("../assets/Family-Organizer-App-Icon.png")}
          />
          <Input
            style={styles.inputBox}
            textContentType="name"
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
            errorMessage={usernameErrorMessage}
            returnKeyType="next"
            onSubmitEditing={() => {
              textInput2.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            style={styles.inputBox}
            placeholder="Email Address"
            onChangeText={(email) => setEmail(email)}
            errorMessage={emailErrorMessage}
            ref={(input) => {
              textInput2 = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              textInput3.focus();
            }}
            blurOnSubmit={false}
            keyboardType="email-address"
          />
          <Input
            style={styles.inputBox}
            textContentType="password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword1(password)}
            errorMessage={password1ErrorMessage}
            ref={(input) => {
              textInput3 = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              textInput4.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            style={styles.inputBox}
            textContentType="password"
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            errorMessage={passwordErrorMessage}
            ref={(input) => {
              textInput4 = input;
            }}
            returnKeyType="go"
            onSubmitEditing={() => {
              signUpEmail();
            }}
          />
          <Button
            title="Sign Up"
            buttonStyle={{
              backgroundColor: "#1f78fe",
              width: 250,
              borderRadius: 30,
              marginTop: 10,
            }}
            onPress={() => {
              signUpEmail();
            }}
          />
          <Button
            type="clear"
            title="Already have an account"
            titleStyle={styles.text}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "#1f78fe",
    fontFamily: "Muli",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    textAlign: "center",
  },
});
