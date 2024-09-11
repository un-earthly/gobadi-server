import { initializeApp, credential as _credential } from "firebase-admin";

import serviceAccount from "./gobadi-3d7fb-firebase-adminsdk-bm88q-38ea9b9570.json";

initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: "https://gobadi-3d7fb-default-rtdb.firebaseio.com"
});
