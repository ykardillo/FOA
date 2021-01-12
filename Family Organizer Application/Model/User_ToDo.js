import Util from "./Util";
import firebase from "firebase";

export default class User_ToDo {
  constructor(userId, toDoId) {
    this.uuid = "";
    this.userId = userId;
    this.toDoId = toDoId;
  }

  getUuid() {
    return this.uuid;
  }

  getUserId() {
    return this.userId;
  }

  getToDoId() {
    return this.toDoId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setToDoId(toDoId) {
    this.toDoId = toDoId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Users_ToDo/" + this.uuid)
      .set({
        id: this.uuid+1,
        userId: this.userId,
        toDoId: this.toDoId,
      });
  }
}
