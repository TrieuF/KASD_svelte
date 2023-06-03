import {db} from "../models/db.js"
import {PlacemarkSpec} from "../models/joi-schemas.js";

export const editController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
                title:"Placemark Edit",
                placemark: placemark,
            }
            if( loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id) ){
                return h.view("editplacemarkpage", viewData);
            }
            else{
                return h.redirect(`/placemark/${request.params.id}`);
            }
        }
    },

    update:{
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("editplacemarkpage", { title: "Edit error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request,h){
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
    }
}