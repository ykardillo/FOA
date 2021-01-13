import Util from "./Util";
import firebase from "firebase";

export default class List {
  constructor(name, creatorId, createdDate, updatedDate) {
    this.uuid = "";
    this.didFinish = "false";
    this.name = name;
    this.creatorId = creatorId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

  getUuid() {
    return this.uuid;
  }

  getName() {
    return this.name;
  }

  didFinishList() {
    return this.didFinish;
  }

  getCreatorId() {
    return this.creatorId;
  }

  getCreatedDate() {
    return this.createdDate;
  }

  getUpdatedDate() {
    return this.updatedDate;
  }

  setName(name) {
    if (name !== "") {
      this.name = name;
    } else {
      throw "The name of the list is empty";
    }
  }

  setUuId(uuId) {
    this.uuid = uuId;
  }

  setDidFinish(didFinish) {
    this.didFinish = didFinish;
  }

  setCreatorId(creatorId) {
    this.creatorId = creatorId;
  }

  setCreatedDate(createdDate) {
    this.createdDate = createdDate;
  }

  setUpdatedDate(updatedDate) {
    this.updatedDate = updatedDate;
  }

  addToFirebase() {
    var ref = firebase.database().ref("Lists/").push();
    firebase
      .database()
      .ref("Lists/" + ref.key)
      .set({
        id: ref.key,
        didFinish: this.didFinish,
        name: this.name,
        creatorId: this.creatorId,
        createdDate: this.createdDate,
        updatedDate: this.updatedDate,
      });
    this.setUuId(ref.key);
  }
}
