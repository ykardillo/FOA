import Util from "./Util";
import firebase from "firebase";

export default class Recipe_Step {
  constructor(step, recipeId) {
    this.uuid = Util.getUuId("Recipes_Steps/");
    this.step = step;
    this.recipeId = recipeId;
  }

  getUuid() {
    return this.uuid;
  }

  getStep() {
    return this.step;
  }

  getRecipeId() {
    return this.recipeId;
  }

  setStep(step) {
    this.step = step;
  }

  setRecipeId(recipeId) {
    this.recipeId = recipeId;
  }

  addToFirebase() {
    firebase
      .database()
      .ref("Recipes_Steps/" + this.uuid)
      .set({
        id: this.uuid+1,
        step: this.step,
        recipeId: this.recipeId,
      });
  }
}
