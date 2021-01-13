import Util from "./Util";
import firebase from "firebase";

export default class Shop {
  constructor(name, localisation) {
    this.uuid = Util.getUuId("Shops/");
    this.name = name;
    this.localisation = localisation;
  }

  getUuid() {
    return this.uuid;
  }

  getName() {
    return this.name;
  }

  getLocalisation() {
    return this.localisation;
  }

  setName(name) {
    if (name !== "") {
      this.name = name;
    } else {
      throw "The name of the shop is empty";
    }
  }

  setLocalisation(localisation) {
    this.localisation = localisation;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Shops/" + this.uuid)
      .set({
        id: this.uuid+1,
        name: this.name,
        localisation: this.localisation,
      });
  }
}
