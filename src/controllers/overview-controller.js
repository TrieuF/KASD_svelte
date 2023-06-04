import {db} from "../models/db.js"
import {PlacemarkSpec} from "../models/joi-schemas.js";

export const overviewController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemarks = await db.placemarkStore.getAllPlacemarks();
            const viewData = {
                title: "Overview",
                user: loggedInUser,
                placemarks: placemarks
            }
            return h.view("overviewpage", viewData);
        },
    },

    addPlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("overviewpage", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const userid = loggedInUser._id;
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    lat: request.payload.lat,
                    lng: request.payload.lng
                },
                category: request.payload.category,
            };
            await db.placemarkStore.addPlacemark( userid, newPlacemark);
            return h.redirect("/overview");
        },
    },

    deletePlacemark: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials;
            if( loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id) ){
            await db.placemarkStore.deletePlacemark(placemark._id);
            }
            return h.redirect("/overview");
        }
    }
};