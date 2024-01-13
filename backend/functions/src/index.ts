import * as functions from "firebase-functions";
import app from "./app";
import * as admin from "firebase-admin";
import {createUserInDb} from "./services/UserService";

admin.initializeApp(functions.config().firebase);

export const api = functions.https.onRequest(app);
export const createUser = functions.auth.user().onCreate(createUserInDb);
