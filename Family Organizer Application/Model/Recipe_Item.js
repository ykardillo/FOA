import Util from "./Util";
import firebase from "firebase";

export default class Recipe_Item {
  constructor(itemId, recipeId) {
    this.uuid = Util.getUuId("Recipes_Items/");
    this.itemId = itemId;
    this.recipeId = recipeId;
  }

  getUuid() {
    return this.uuid;
  }

  getItemId() {
    return this.itemId;
  }

  getRecipeId() {
    return this.recipeId;
  }

  setItemId(itemId) {
    this.itemId = itemId;
  }

  setRecipeId(recipeId) {
    this.recipeId = recipeId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Recipes_Items/" + this.uuid)
      .set({
        id: this.uuid+1,
        itemId: this.itemId,
        recipeId: this.recipeId,
      });
  }
}
