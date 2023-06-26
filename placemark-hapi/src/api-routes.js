import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import {editController} from "./controllers/edit-controller.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "POST", path: "/api/users/{id}/placemarks", config: placemarkApi.create },
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "GET", path: "/api/analytics", config: userApi.analytics},
    { method: "GET", path: "/api/allimages", config: placemarkApi.allImages },
    { method: "POST", path: "/api/placemarks/{id}/uploadimages", config: placemarkApi.uploadimages},
    { method: "DELETE", path: "/api/placemarks/{id}/deleteimages", config: placemarkApi.deleteimages},
    { method: "POST", path: "/api/placemarks/{id}", config: placemarkApi.edit },
    { method: "GET", path: "/api/placemarks/name/{name}", config: placemarkApi.findByName },
    { method: "GET", path: "/api/placemarks/category/{category}", config: placemarkApi.findByCategory},
];