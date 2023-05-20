import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
    userStore: null,
    placemarkStore : null,

    init(){
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
    }
};
