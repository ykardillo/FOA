import Util from "./Util";
import firebase from "firebase";

export default class List_Item {
  constructor(listId, itemId, creatorId) {
    this.uuid = "";
    this.itemId = itemId;
    this.listId = listId;
    this.creatorId = creatorId;
    this.didFound = "false";
  }

  getUuid() {
    return this.uuid;
  }

  getItemId() {
    return this.itemId;
  }

  getListId() {
    return this.listId;
  }

  getDidFound() {
    return this.didFound;
  }

  getCreatorId() {
    return this.creatorId;
  }

  setUuId(uuId) {
    this.uuid = uuId;
  }

  setItemId(itemId) {
    this.itemId = itemId;
  }

  setListId(listId) {
    this.listId = listId;
  }

  setCreatorId(creatorId) {
    this.creatorId = creatorId;
  }

  setDidFound(didFound) {
    didFound ? (this.didFound = "true") : (this.didFound = "false");
  }

  addToFirebase() {
    Util.firebaseConnexion();
    var ref = firebase.database().ref("Lists_Items/").push();
    firebase
      .database()
      .ref("Lists_Items/" + ref.key)
      .set({
        id: ref.key,
        itemId: this.itemId,
        listId: this.listId,
        creatorId: this.creatorId,
        didFound: this.didFound,
      });
    this.setUuId(ref.key);
  }
}
