import admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const db = admin.firestore();
export const messaging = admin.messaging();
export default admin;
