import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { connectFirebase, userFireStore, placemarkFireStore } from "./firebase/connect.js";

export const db = {
    userStore: null,
    placemarkStore : null,
    firestore: null,

    init(dbinit){
        switch(dbinit){
            case "firebase":
                connectFirebase();
                this.userStore = userFireStore;
                this.placemarkStore = placemarkFireStore;
                break;
            default:
                this.userStore = userMongoStore;
                this.placemarkStore = placemarkMongoStore;
                connectMongo();
        }

    }
};
