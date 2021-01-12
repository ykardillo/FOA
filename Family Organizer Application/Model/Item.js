import Util from "./Util";
import firebase from "firebase";

export default class Item {
  constructor(
    name,
    creatorId,
    category,
    overview,
    pathImage,
    price,
    quantity,
    unit
  ) {
    this.uuid = "";
    this.name = name;
    this.creatorId = creatorId;
    this.category = category;
    this.overview = overview;
    this.pathImage = pathImage;
    this.price = price;
    this.quantity = quantity;
    this.unit = unit;
  }

  getUuid() {
    return this.uuid;
  }

  getName() {
    return this.name;
  }

  getCreatorId() {
    return this.creatorId;
  }

  getCategory() {
    return this.category;
  }

  getOverview() {
    return this.overview;
  }

  getPathIamge() {
    return this.pathImage;
  }

  getQuantity() {
    return this.quantity;
  }

  getPrice() {
    return this.price;
  }

  getUnit() {
    return this.unit;
  }

  setName(name) {
    if (name !== "") {
      this.name = name;
    } else {
      throw "The name of the item is empty";
    }
  }

  setCreatorId(creatorId) {
    this.creatorId = creatorId;
  }

  setCategory(category) {
    this.category = category;
  }
  setPrice(price) {
    this.price = price;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  setPathImage(pathImage) {
    this.pathImage = pathImage;
  }

  setOverview(overview) {
    this.overview = overview;
  }

  setUnit(unit) {
    this.unit = unit;
  }

  addToFirebase() {
    var ref = firebase.database().ref("Items/").push();
    firebase
      .database()
      .ref("Items/" + ref.key)
      .set({
        id: ref.key,
        name: this.name,
        creatorId: this.creatorId,
        category: this.category,
        quantity: this.quantity,
        price: this.price,
        pathImage: this.pathImage,
        overview: this.overview,
        unit: this.unit,
      });
    this.setUuId(ref.key);
  }
}
