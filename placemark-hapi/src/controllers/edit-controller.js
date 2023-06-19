import {db} from "../models/db.js"
import {PlacemarkSpec} from "../models/joi-schemas.js";
import {imageStore} from "../models/image-store.js";

export const editController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
                title: "Placemark Edit",
                placemark: placemark,
            }
            if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                return h.view("editplacemarkpage", viewData);
            } else {
                return h.redirect(`/placemark/${request.params.id}`);
            }
        }
    },

    update: {
        validate: {
            payload: PlacemarkSpec,
            options: {abortEarly: false},
            failAction: function (request, h, error) {
                return h.view("editplacemarkpage", {title: "Edit error", errors: error.details}).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const updatedPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    lat: request.payload.lat,
                    lng: request.payload.lng
                },
                category: request.payload.category,
            };
            await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
            return h.redirect("/overview");
        }
    },

    updateImage: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = request.payload.imagefile;
                if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                    if (Object.keys(file).length > 0 && Object.keys(file).length <=11) {
                        for (const element of file) {
                            const url = await imageStore.uploadImage(element);
                            await db.placemarkStore.updatePlacemarkimg(placemark, url);
                        }
                    }
                    else if(Object.keys(file).length > 0){
                        const url = await imageStore.uploadImage(file);
                        await db.placemarkStore.updatePlacemarkimg(placemark, url);
                    }
                }
                return h.redirect(`/placemark/${request.params.id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${request.params.id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },

    deleteImage: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                    for (let element of placemark.img) {
                        await imageStore.deleteImage(element);
                    }
                    await db.placemarkStore.deletePlacemarkimgs(placemark);
                }
                return h.redirect(`/placemark/${request.params.id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${request.params.id}`);
            }
        },
    }
}