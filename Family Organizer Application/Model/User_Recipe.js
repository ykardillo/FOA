import Util from "./Util";
import firebase from "firebase";

export default class User_Recipe {
  constructor(userId, recipId) {
    this.uuid = Util.getUuId("Users_Recipes/");
    this.userId = userId;
    this.recipId = recipId;
  }

  getUuid() {
    return this.uuid;
  }

  getUserId() {
    return this.userId;
  }

  getRecipId() {
    return this.recipId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setRecipId(recipId) {
    this.recipId = recipId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Users_Recipes/" + this.uuid)
      .set({
        id: this.uuid+1,
        userId: this.userId,
        recipId: this.recipId,
      });
  }
}
