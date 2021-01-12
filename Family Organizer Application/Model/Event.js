import Util from "./Util";
import firebase from "firebase";

export default class Event {
  constructor(name, creatorId, overview, startDate, endDate) {
    this.uuid = Util.getUuId("Events/");
    this.name = name;
    this.creatorId = creatorId;
    this.overview = overview;
    this.startDate = startDate;
    this.endDate = endDate;
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

  getOverview() {
    return this.overview;
  }

  getStartDate() {
    return this.startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  setName(name) {
    if (name !== "") {
      this.name = name;
    } else {
      throw "The name of the event is empty";
    }
  }

  setCreatorId(creatorId) {
    this.creatorId = creatorId;
  }

  setOverview(overview) {
    this.overview = overview;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
  }

  setEndDate(endDate) {
    this.endDate = endDate;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Events/" + this.uuid)
      .set({
        id: this.uuid+1,
        name: this.name,
        creatorId: this.creatorId,
        overview: this.overview,
        startDate: this.startDate,
        endDate: this.endDate,
      });
  }
}
