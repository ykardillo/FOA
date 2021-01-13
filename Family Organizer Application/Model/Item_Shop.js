import Util from "./Util";
import firebase from "firebase";

export default class Item_Shop {
  constructor(itemId, shopId) {
    this.uuid = Util.getUuId("Items_Shops/");
    this.itemId = itemId;
    this.shopId = shopId;
  }

  getUuid() {
    return this.uuid;
  }

  getItemId() {
    return this.itemId;
  }

  getShopId() {
    return this.shopId;
  }

  setItemId(itemId) {
    this.itemId = itemId;
  }

  setShopId(shopId) {
    this.shopId = shopId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Items_Shops/" + this.uuid)
      .set({
        id: this.uuid+1,
        itemId: this.itemId,
        shopId: this.shopId,
      });
  }
}
