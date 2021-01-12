import firebase from "firebase";
import { LogBox } from "react-native";
import _ from "lodash";

export default class Util {
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static removLogBoxTimer() {
    LogBox.ignoreLogs(["Setting a timer"]);
    LogBox.ignoreLogs(["VirtualizedLists"]);
    LogBox.ignoreLogs(["@firebase/database"]);
    const _console = _.clone(console);
    console.warn = (message) => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
  }

  static getUuId(name) {
    let nb;
    firebase
      .database()
      .ref(name)
      .on("value", (snapshot) => {
        const liist = snapshot.val();
        nb = liist.length;
      });
    return nb;
  }

  static randomHSL() {
    return "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)";
  }

  static snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      returnArr.push(item);
    });
    return returnArr;
  }

  static dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  static getObjectWithProperties(array, property, value) {
    let newArray = [];
    if (array.length !== 0) {
      array.forEach((element) => {
        if (element[property] == value) {
          newArray.push(element);
        }
      });
    }
    return newArray;
  }

  static isInTheCurrentWeek(date) {
    var currentDate = new Date(date); // get current date
    var currentDay = new Date(date); // get current date
    currentDay.setHours(24, 0, 0, 0); // next midnight
    var weekstart = currentDay.getDate() - currentDay.getDay() + 1;
    var weekend = weekstart + 6; // end day is the first day + 6
    var monday = new Date(currentDay.setDate(weekstart));
    var sunday = new Date(currentDay.setDate(weekend));
    sunday.setDate(sunday.getDate() + 1);

    if (
      currentDate.getTime() >= monday.getTime() &&
      currentDate.getTime() <= sunday.getTime()
    ) {
      return true;
    } else {
      return false;
    }
  }
  static isInToday(date) {
    var currentDate = new Date(date); // get current date
    var currentDay1 = new Date(); // get current date
    var currentDay2 = new Date(); // get current date
    var todaysMidnight = new Date(currentDay1.setHours(0, 0, 0, 0)); // last midnight
    var tomorrowsMidnight = new Date(currentDay2.setHours(24, 0, 0, 0)); // next midnight

    if (
      currentDate.getTime() >= todaysMidnight.getTime() &&
      currentDate.getTime() <= tomorrowsMidnight.getTime()
    ) {
      return true;
    } else {
      return false;
    }
  }

  static getTodayEvent(array) {
    var newArray = [];
    array.forEach((element) => {
      if (this.isInToday(parseInt(element["startDate"]))) {
        newArray.push(element);
      }
    });
    return newArray;
  }
  static getTodayToDos(array) {
    var newArray = [];
    array.forEach((element) => {
      if (this.isInToday(parseInt(element["executionDate"]))) {
        newArray.push(element);
      }
    });
    return newArray;
  }
  static getLaterToDos(array) {
    var newArray = [];
    array.forEach((element) => {
      if (!this.isInToday(parseInt(element["executionDate"]))) {
        newArray.push(element);
      }
    });
    return newArray;
  }

  static removeDuplicateObject(array) {
    var obj = {};

    for (var i = 0, len = array.length; i < len; i++) {
      obj[array[i]["id"]] = array[i];
    }
    let newArray = new Array();
    for (var id in obj) newArray.push(obj[id]);
    return newArray;
  }

  static sortByCategories(array) {
    var result = array.reduce((r, { category: category, ...object }) => {
      var temp = r.find((o) => o.category === category);
      if (!temp) r.push((temp = { category, items: [] }));
      object["category"] = category;
      temp.items.push(object);
      return r;
    }, []);
    return result.sort(this.dynamicSort("category"));
  }

  static getDate(dateString) {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "June",
      "July",
      "Aug.",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    var dayOfMonth = d.getDate();
    var month = monthNames[d.getMonth()];
    var year = d.getFullYear();
    return dayName + ", " + dayOfMonth + " " + month + " " + year;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
