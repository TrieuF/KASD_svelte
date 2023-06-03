import {db} from "../models/db.js"

export const overviewController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemarks = await db.placemarkStore.getAllPlacemarks(); //later per user maybe
            const viewData = {
                title: "Overview",
                user: loggedInUser,
                placemarks: placemarks
            }
            return h.view("overviewpage", viewData);
        },
    },

    addPlacemark: {
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