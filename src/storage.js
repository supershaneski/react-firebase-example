import firebase from "firebase/app";
import { config } from "./config";

firebase.initializeApp(config);
var storage = firebase.storage();
export default storage;