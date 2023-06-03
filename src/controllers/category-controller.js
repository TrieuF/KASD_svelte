import {db} from "../models/db.js"

export const categoryController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const category = request.params.category;
            const placemarks = await db.placemarkStore.getAllPlacemarksByCategory(category);
            const viewData = {
                title: "Overview",
                user: loggedInUser,
                placemarks: placemarks
            }
            return h.view("overviewpage", viewData);
        },
    },
};