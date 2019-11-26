import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDvIg4q0mLNPmQ71cq9At8kOjFF1dkQiZk",
  authDomain: "recettes-app-b1a22.firebaseapp.com",
  databaseURL: "https://recettes-app-b1a22.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
