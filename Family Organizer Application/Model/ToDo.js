import Util from "./Util";
import firebase from "firebase";

export default class ToDo {
  constructor(
    name,
    overview,
    creatorId,
    createdDate,
    updatedDate,
    executionDate,
  ) {
    this.uuid = "";
    this.overview = overview;
    this.name = name;
    this.creatorId = creatorId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.executionDate = executionDate;
    this.isDone = "false";
  }

  getUuid() {
    return this.uuid;
  }

  getName() {
    return this.name;
  }

  getOverview() {
    return this.overview;
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

  getExecutionDate() {
    return this.executionDate;
  }

  getIsDone() {
    return this.isDone;
  }

  setName(name) {
    if (name !== "") {
      this.name = name;
    } else {
      throw "The name of the toDo is empty";
    }
  }

  setOverview(overview) {
    this.overview = overview;
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
  setExecutionDate(executionDate) {
    this.executionDate = executionDate;
  }

  setIsDone(isDone) {
    this.isDone = isDone;
  }

  addToFirebase() {
    Util.firebaseConnexion();
    firebase
      .database()
      .ref("ToDo/" + this.uuid)
      .set({
        id: this.uuid + 1,
        overview: this.overview,
        name: this.name,
        creatorId: this.creatorId,
        createdDate: this.createdDate,
        updatedDate: this.updatedDate,
        executionDate: this.executionDate,
        isDone: this.isDone,
      });
  }
}
