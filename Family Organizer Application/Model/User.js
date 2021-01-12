import firebase from "firebase";
import Util from "./Util";

export default class User {
  constructor(uuid, lastname, firstname, emailAddress, profilImagePath) {
    this.uuid = uuid;
    this.lastname = lastname;
    this.firstname = firstname;
    this.emailAddress = emailAddress;
    this.profilImagePath = profilImagePath;
  }

  getUuid() {
    return this.uuid;
  }

  getLastname() {
    return this.lastname;
  }

  getFirstName() {
    return this.firstname;
  }

  getEmailAddress() {
    return this.emailAddress;
  }

  getProfilImagePath() {
    return this.profilImagePath;
  }

  setLastname(lastname) {
    if (lastname !== "") {
      this.lastname = lastname;
    } else {
      throw "The lastname  is empty";
    }
  }

  setFirstname(firstname) {
    if (firstname !== "") {
      this.firstname = firstname;
    } else {
      throw "The firstname  is empty";
    }
  }

  setEmailAddress(emailAddress) {
    this.emailAddress = emailAddress;
  }

  setProfilImagePath(profilImagePath) {
    this.profilImagePath = profilImagePath;
  }

  addToFirebase() {
    Util.firebaseConnexion();
    firebase
      .database()
      .ref("Users/" + this.uuid)
      .set({
        id: this.uuid,
        lastname: this.lastname,
        firstname: this.firstname,
        emailAddress: this.emailAddress,
        profilImagePath: this.profilImagePaths,
      });
  }
  static getNameById = (creatorId) => {
    console.log("creatorId " + creatorId);
    this.teste(creatorId);
  };
  static teste(creatorId) {
    Util.firebaseConnexion();
    const newArr = [];
    if (creatorId != undefined) {
      console.log("creatorIddd " + creatorId);
      firebase
        .database()
        .ref("Users/")
        .orderByChild("id")
        .equalTo(creatorId)
        .on("value", (snapshot) => {
          const val = snapshot.val();
          console.log("val : ");
          console.log(val);
          if (val !== null) {
            console.log("lalulalu");
            Object.keys(val).map((key, index) => {
              newArr.push(val[key]);
            });
            console.log("newArr : " + newArr[0].firstname);
            return newArr[0].firstname;
          }
        });
    } else {
      return "undefined";
    }
  }
   static getImageFromId(userId) {
    Util.firebaseConnexion();
    const newArr = [];
    if (userId != undefined) {
      firebase
        .database()
        .ref("Users/")
        .orderByChild("id")
        .equalTo(userId)
        .on("value", (snapshot) => {
          const val = snapshot.val();
          if (val !== null) {
            Object.keys(val).map((key, index) => {
              newArr.push(val[key].profilImagePath);
            });
          }
        });
      return newArr[0];
    } else {
      return "undefined";
    }
  }
}
