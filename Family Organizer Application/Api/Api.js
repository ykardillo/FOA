import * as firebase from "firebase";
import * as c from "../Config/Constants";
import Util from "../Model/Util";
import User from "../Model/User";

var firebaseConfig = {
  apiKey: c.FIREBASE_API_KEY,
  authDomain: c.FIREBASE_AUTH_DOMAIN,
  databaseURL: c.FIREBASE_DATABASE_URL,
  projectId: c.FIREBASE_PROJECT_ID,
  storageBucket: c.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID,
  appId: c.FIREBASE_APP_ID,
  measurementId: c.FIREBASE_MEASUREMENT_ID,
  iosClientId: c.GOOGLE_iOS_CLIENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export function getItemsFromListId(listId, callback) {
  let array = [];
  if (listId != undefined) {
    const query = database
      .ref("Lists_Items/")
      .orderByChild("listId")
      .equalTo(listId);
    query.on("value", function (snapshot) {
      let lists_items = Util.snapshotToArray(snapshot);
      if (lists_items.lenght !== 0) {
        lists_items.forEach((list_item) => {
          const querys = database
            .ref("Items/")
            .orderByChild("id")
            .equalTo(list_item.itemId);
          querys.on("value", function (snapshot2) {
            let item = [...Util.snapshotToArray(snapshot2)];

            if (item.length != 0) {
              item[0]["didFound"] = list_item.didFound.toString();
              item[0]["listItemId"] = list_item.id.toString();
            }
            array = [...array, ...item];

            callback(true, array, null);
          });
        });
      } else {
        callback(false, null, null);
      }
    });
  } else {
    callback(false, null, null);
  }
}

export function getItemsFromListItem(lists_items, callback) {
  let array = [];
  if (lists_items.lenght !== 0) {
    lists_items.forEach((list_item) => {
      const query = database
        .ref("Items/")
        .orderByChild("id")
        .equalTo(list_item.itemId);
      query.on("value", function (snapshot) {
        array = [...array, ...Util.snapshotToArray(snapshot)];
      });
    });
    var result = array.reduce((r, { category: category, ...object }) => {
      var temp = r.find((o) => o.category === category);
      if (!temp) r.push((temp = { category, items: [] }));
      object["category"] = category;
      temp.items.push(object);
      return r;
    }, []);
    callback(true, result, null);
  } else {
    callback(false, null, null);
  }
}
export function getImageFromId(userId, callback) {
  if (userId != undefined) {
    const query = database.ref("Users/").orderByChild("id").equalTo(userId);
    query.on("value", (snapshot) => {
      callback(true, Util.snapshotToArray(snapshot)[0].profilImagePath, null);
    });
  } else {
    callback(false, null, null);
  }
}
export function getUserFromId(userId, callback) {
  if (userId != undefined) {
    const query = database.ref("Users/").orderByChild("id").equalTo(userId);
    query.on("value", (snapshot) => {
      callback(true, Util.snapshotToArray(snapshot)[0], null);
    });
  } else {
    callback(false, null, null);
  }
}

export function getUserfromId(userId, callback) {
  if (userId != undefined) {
    const query = database.ref("Users/").orderByChild("id").equalTo(userId);
    query.on("value", (snapshot) => {
      callback(true, Util.snapshotToArray(snapshot)[0], null);
    });
  } else {
    callback(false, null, null);
  }
}

export function getUsersIdfromListId(listId, callback) {
  if (listId != undefined) {
    const query = database
      .ref("Users_Lists/")
      .orderByChild("listId")
      .equalTo(listId);
    query.on("value", (snapshot) => {
      callback(true, Util.snapshotToArray(snapshot), null);
    });
  } else {
    callback(false, null, null);
  }
}
export function getUsersIdfromToDoId(toDoId, callback) {
  if (toDoId != undefined) {
    const query = database
      .ref("Users_ToDo/")
      .orderByChild("toDoId")
      .equalTo(toDoId);
    query.on("value", (snapshot) => {
      callback(true, Util.snapshotToArray(snapshot), null);
    });
  } else {
    callback(false, null, null);
  }
}

export function getToDos(userId, callback) {
  if (userId != undefined) {
    let toDos = [];
    const query = database
      .ref("Users_ToDo/")
      .orderByChild("userId")
      .equalTo(userId);
    query.on("value", (snapshot) => {
      let users_ToDo = Util.snapshotToArray(snapshot);
      users_ToDo.forEach((user_ToDo) => {
        const query2 = database
          .ref("ToDo/")
          .orderByChild("id")
          .equalTo(user_ToDo.toDoId);
        query2.on("value", (snapshot2) => {
          toDos = [...toDos, ...Util.snapshotToArray(snapshot2)];
          callback(true, toDos, null);
        });
      });
    });
  } else {
    callback(false, null, null);
  }
}
export function getEvents(userId, callback) {
  if (userId != undefined) {
    let events = [];
    const query = database
      .ref("Users_Events/")
      .orderByChild("userId")
      .equalTo(userId);
    query.on("value", (snapshot) => {
      let users_Event = Util.snapshotToArray(snapshot);
      users_Event.forEach((user_Event) => {
        const query2 = database
          .ref("Events/")
          .orderByChild("id")
          .equalTo(user_Event.eventId);
        query2.on("value", (snapshot2) => {
          events = [...events, ...Util.snapshotToArray(snapshot2)];

          callback(true, events, null);
        });
      });
    });
  } else {
    callback(false, null, null);
  }
}
export function getEventsOfTheWeek(userId, callback) {
  if (userId != undefined) {
    let events = [];
    const query = database
      .ref("Users_Events/")
      .orderByChild("userId")
      .equalTo(userId);
    query.on("value", (snapshot) => {
      let users_Event = Util.snapshotToArray(snapshot);
      users_Event.forEach((user_Event) => {
        const query2 = database
          .ref("Events/")
          .orderByChild("id")
          .equalTo(user_Event.eventId);
        query2.on("value", (snapshot2) => {
          var event = Util.snapshotToArray(snapshot2);
          if (Util.isInTheCurrentWeek(parseInt(event[0]["startDate"]))) {
            events = [...events, ...event];
          }
          callback(true, events, null);
        });
      });
    });
  } else {
    callback(false, null, null);
  }
}

export function getLists(userId, callback) {
  if (userId != undefined) {
    let lists = [];
    const query = database
      .ref("Users_Lists/")
      .orderByChild("userId")
      .equalTo(userId);
    query.on("value", (snapshot) => {
      let users_List = Util.snapshotToArray(snapshot);
      users_List.forEach((user_List) => {
        const query2 = database
          .ref("Lists/")
          .orderByChild("id")
          .equalTo(user_List.listId);
        query2.on("value", (snapshot2) => {
          lists = [...lists, ...Util.snapshotToArray(snapshot2)];

          callback(true, lists, null);
        });
      });
    });
  } else {
    callback(false, null, null);
  }
}

export function getAllItemsOfLists(arrayLists, callback) {
  let itemsToBuy = [];
  if (arrayLists != undefined) {
    arrayLists.forEach((element) => {
      getItemsToBuyFromListId(element.id, (success, items, error) => {
        itemsToBuy = [...itemsToBuy, ...items];
        callback(true, itemsToBuy, null);
      });
    });
  } else {
    callback(false, null, null);
  }
}
export function getItemsToBuyFromListId(listId, callback) {
  let items = [];
  if (listId != undefined) {
    const query = database
      .ref("Lists_Items/")
      .orderByChild("listId")
      .equalTo(listId);
    query.on("value", function (snapshot) {
      let lists_items = Util.snapshotToArray(snapshot);

      if (lists_items.lenght !== 0) {
        lists_items.forEach((list_item) => {
          const querys = database
            .ref("Items/")
            .orderByChild("id")
            .equalTo(list_item.itemId);
          querys.on("value", function (snapshots) {
            if (list_item.didFound == "false") {
              items = [...items, ...Util.snapshotToArray(snapshots)];
            }
            callback(true, items, null);
          });
        });
      } else {
        callback(false, null, null);
      }
    });
  } else {
    callback(false, null, null);
  }
}

export function addUser(user) {
  const query = database.ref("Users/" + user["uid"]);
  query.set({
    id: user["uid"],
    lastname: user["displayName"],
    firstname: "",
    emailAddress: user["email"],
    profilImagePath: user["photoURL"],
  });
}
export function addList(list) {
  var ref = database.ref("Lists/").push();
  const query = database.ref("Lists/" + ref.key);
  query.set({
    id: ref.key,
    name: list.name,
    creatorId: list.creatorId,
    createdDate: list.createdDate,
    updatedDate: list.updatedDate,
    didFinish: list.didFinish,
  });
  return ref.key;
}
export function addUserList(userList) {
  var ref = database.ref("Users_Lists/").push();
  const query = database.ref("Users_Lists/" + ref.key);
  query.set({
    id: ref.key,
    listId: userList.listId,
    userId: userList.userId,
  });
}

export function addToDo(toDo) {
  var ref = database.ref("ToDo/").push();
  const query = database.ref("ToDo/" + ref.key);
  query.set({
    id: ref.key,
    overview: toDo.overview,
    name: toDo.name,
    creatorId: toDo.creatorId,
    createdDate: toDo.createdDate,
    updatedDate: toDo.updatedDate,
    executionDate: toDo.executionDate,
    isDone: toDo.isDone,
  });
  return ref.key;
}
export function addUserToDo(userToDo) {
  var ref = database.ref("Users_ToDo/").push();
  const query = database.ref("Users_ToDo/" + ref.key);
  query.set({
    id: ref.key,
    toDoId: userToDo.toDoId,
    userId: userToDo.userId,
  });
}
export function addItem(item) {
  var ref = database.ref("Items/").push();
  const query = database.ref("Items/" + ref.key);
  query.set({
    id: ref.key,
    name: item.name,
    creatorId: item.creatorId,
    category: item.category,
    quantity: item.quantity,
    price: item.price,
    pathImage: item.pathImage,
    overview: item.overview,
    unit: item.unit,
  });
  return ref.key;
}
export function addListItem(listItem) {
  var ref = database.ref("Lists_Items/").push();
  const query = database.ref("Lists_Items/" + ref.key);
  query.set({
    id: ref.key,
    itemId: listItem.itemId,
    listId: listItem.listId,
    creatorId: listItem.creatorId,
    didFound: listItem.didFound,
  });
}
export function updateItem(item) {
  if (item.lenght !== 0) {
    const query = database.ref("Items/" + item.id);
    query.set({
      id: item.id,
      name: item.name,
      creatorId: item.creatorId,
      category: item.category,
      quantity: item.quantity,
      price: item.price ? item.price : "",
      pathImage: item.pathImage ? item.pathImage : "",
      overview: item.overview ? item.overview : "",
      unit: item.unit ? item.unit : "",
    });
  }
}

export function deleteItemFromList(listId, idItem) {
  deleteListItem(listId, idItem);
  deleteItem(idItem);
}

export function deleteListItem(listId, idItem) {
  if (idItem != undefined) {
    const query = database
      .ref("Lists_Items/")
      .orderByChild("itemId")
      .equalTo(idItem);
    query.on("value", function (snapshot) {
      let lists_items = Util.snapshotToArray(snapshot);

      if (lists_items.lenght !== 0) {
        lists_items.forEach((list_item) => {
          if (list_item.listId == listId) {
            if (list_item.id != undefined) {
              const query = database.ref("Lists_Items/" + list_item.id);
              query
                .remove()
                .then(function () {
                  // console.log("Remove succeeded.");
                })
                .catch(function (error) {
                  console.log("Remove failed: " + error.message);
                });
            }
          }
        });
      }
    });
  }
}
export function deleteItem(idItem) {
  if (idItem != undefined) {
    const query = database.ref("Items/" + idItem);
    query
      .remove()
      .then(function () {
        // console.log("Remove succeeded.");
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
      });
  }
}

export function foundItemFromList(itemId) {
  console.log("Api : false");
  if (itemId != undefined) {
    const query = database
      .ref("Lists_Items/")
      .orderByChild("itemId")
      .equalTo(itemId);
    query.on("value", (snapshot) => {
      let array = Util.snapshotToArray(snapshot);
      if (array.length != 0) {
        if (array[0] != undefined) {
          array[0]["didFound"] = "true";
          updateListItem(array[0]);
        }
      }
    });
  }
}

export function toggleFoundItemFromList(itemId, didFound) {
  if (itemId != undefined) {
    if (itemId.lenght != 0) {
      const query2 = database.ref("Lists_Items/" + itemId.listItemId);
      query2.update({ didFound });
    }
  }
}
export function getUnits(callback) {
  const query = database.ref("Units/");
  query.on("value", function (snapshot) {
    callback(true, Util.snapshotToArray(snapshot), null);
  });
}
export function getCategories(callback) {
  const query = database.ref("Categories/");
  query.on("value", function (snapshot) {
    callback(true, Util.snapshotToArray(snapshot), null);
  });
}
