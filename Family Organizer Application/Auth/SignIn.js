import React, { useState, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as c from "../Config/Constants";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SocialIcon, Input, Icon, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as api from "../Api/Api";

WebBrowser.maybeCompleteAuthSession();

const GoogleStorageKey = "@Expo:GoogleToken";
const UserIdKey = "@Expo:UserId";
const ScreenKey = "@Expo:Screen";

export default function SignIn() {
  let secondTextInput = useRef();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: c.GOOGLE_WEB_CLIENT_ID,
  });

  const getGoogleCredentialStorage = async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem(GoogleStorageKey));
    } catch (e) {
      alert(e);
    }
  };

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
      AsyncStorage.setItem(GoogleStorageKey, JSON.stringify(id_token));
      signInAccepted();
    }
  }, [response]);

  function signInAccepted() {
    AsyncStorage.setItem(ScreenKey, "FOA");
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
          Alert.alert(
            "Sign In",
            "You must verify your account.\n Check your mail.",
            [
              {
                text: "OK",
              },
              {
                text: "Send back",
                onPress: () => user.sendEmailVerification(),
              },
            ],
            {
              cancelable: false,
            }
          );
        }
      }
    });
  }
  const signInFacebook = async () => {
    Alert.alert("Facebook", "Available Soon\n( ͡ᵔ ͜ʖ ͡ᵔ)", [
      {
        text: "OK",
      },
    ]);
  };
  const signInApple = async () => {
    Alert.alert("Apple", "Available Soon\n( ͡ᵔ ͜ʖ ͡ᵔ)", [
      {
        text: "OK",
      },
    ]);
  };
  const signInGoogle = async () => {
    let credentialStorage = await getGoogleCredentialStorage();
    if (credentialStorage == null) {
      promptAsync();
    } else {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        credentialStorage
      );
      firebase.auth().signInWithCredential(credential);
      signInAccepted();
    }
  };
  const signInEmail = async () => {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => signInAccepted())
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            setPasswordErrorMessage(error.message);
            break;
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailErrorMessage(error.message);
            break;

          default:
            setPasswordErrorMessage(error.message);
            setEmailErrorMessage(error.message);
            break;
        }
      });
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
            keyboardType="email-address"
            style={styles.inputBox}
            placeholder="Email Address"
            onChangeText={(email) => setEmail(email)}
            errorMessage={emailErrorMessage}
            returnKeyType="next"
            onSubmitEditing={() => {
              secondTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            ref={(input) => {
              secondTextInput = input;
            }}
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            errorMessage={passwordErrorMessage}
            onSubmitEditing={() => {
              signInEmail();
            }}
            returnKeyType="go"
            textContentType="password"
          />
          <Button
            title="Sign In"
            buttonStyle={{
              backgroundColor: "#1f78fe",
              width: 250,
              borderRadius: 30,
              marginTop: 10,
            }}
            onPress={() => {
              signInEmail();
            }}
          />
          <Button
            type="clear"
            title="Create an account"
            titleStyle={styles.text}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <SocialIcon
              button
              type="google"
              style={{ width: 60 }}
              onPress={() => {
                signInGoogle();
              }}
            />
            <SocialIcon
              button
              type="facebook"
              style={{ width: 60 }}
              onPress={() => {
                signInFacebook();
              }}
            />
            <SocialIcon
              button
              type="apple"
              style={{
                backgroundColor: "black",
                width: 60,
              }}
              onPress={() => {
                signInApple();
              }}
            />
          </View>
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
