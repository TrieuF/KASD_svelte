import { db } from "../models/db.js"
export const dashboardController = {
    index: {
        handler: async function (request, h) {
            //const loggedInUser = request.auth.credentials;
            const placemarks = await db.placemarkStore.getAllPlacemarks(); //later per user maybe
            const viewData = {
                title: "Placemark Dashboard",
                //user: loggedInUser,
                placemarks: placemarks
            }
            return h.view("dashboardpage", viewData);
        },
    },

    addPlacemark: {
        handler: async function (request, h) {
            //const loggedInUser = request.auth.credentials;
            //const userid = loggedInUser._id;
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    lat: request.payload.lat,
                    lng: request.payload.lng
                }
            };
            console.log(newPlacemark)
            await db.placemarkStore.addPlacemarknoUser(newPlacemark);
            return h.redirect("/dashboard");
        },
    },

    deletePlacemark: {
        handler: async function (request, h){
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            await db.placemarkStore.deletePlacemark(placemark._id);
            return h.redirect("/dashboard");
        }
    }
}