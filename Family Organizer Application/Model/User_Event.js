import Util from "./Util";
import firebase from "firebase";

export default class User_Event {
  constructor(userId, eventId) {
    this.uuid = Util.getUuId("Users_Events/");
    this.userId = userId;
    this.eventId = eventId;
  }

  getUuid() {
    return this.uuid;
  }

  getUserId() {
    return this.userId;
  }

  getEventId() {
    return this.eventId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setEventId(eventId) {
    this.eventId = eventId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Users_Events/" + this.uuid)
      .set({
        id: this.uuid+1,
        userId: this.userId,
        eventId: this.eventId,
      });
  }
}
