import Util from "./Util";
import firebase from "firebase";

export default class Recipe {
  constructor(
    name,
    creatorId,
    category,
    overview,
    pathImage,
    link,
    createdDate,
    updatedDate
  ) {
    this.uuid = Util.getUuId("Recipes/");
    this.name = name;
    this.creatorId = creatorId;
    this.category = category;
    this.overview = overview;
    this.pathImage = pathImage;
    this.link = link;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
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

  getLink() {
    return this.link;
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
      throw "The name of the recipe is empty";
    }
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
  setCategory(category) {
    this.category = category;
  }

  setOverview(overview) {
    this.overview = overview;
  }

  setPathImage(pathImage) {
    this.pathImage = pathImage;
  }

  setLink(link) {
    this.link = link;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Recipes/" + this.uuid)
      .set({
        id: this.uuid+1,
        name: this.name,
        creatorId: this.creatorId,
        createdDate: this.createdDate,
        updatedDate: this.updatedDate,
        category: this.category,
        overview: this.overview,
        pathImage: this.pathImage,
        link: this.link,
      });
  }
}
