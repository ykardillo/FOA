import Util from "./Util";
import firebase from "firebase";

export default class User_List {
  constructor(userId, listId) {
    this.uuid = "";
    this.userId = userId;
    this.listId = listId;
  }

  getUuid() {
    return this.uuid;
  }

  getUserId() {
    return this.userId;
  }

  getListId() {
    return this.listId;
  }

  setUuId(uuId) {
    this.uuid = uuId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setListId(listId) {
    this.listId = listId;
  }

  addToFirebase() {
    Util.firebaseConnexion();
    var ref = firebase.database().ref("Users_Lists/").push();
    firebase
      .database()
      .ref("Users_Lists/" + ref.key)
      .set({
        id: ref.key,
        userId: this.userId,
        listId: this.listId,
      });
    this.setUuId(ref.key);
  }
  static getUsersIdfromListId(listId) {
    const newArr = [];
    if (listId != undefined) {
      firebase
        .database()
        .ref("Users_Lists/")
        .orderByChild("listId")
        .equalTo(listId)
        .on("value", (snapshot) => {
          const val = snapshot.val();
          if (val !== null) {
            Object.keys(val).map((key, index) => {
              newArr.push(val[key].userId);
            });
          }
        });
      return newArr;
    } else {
      return "undefined";
    }
  }
}
