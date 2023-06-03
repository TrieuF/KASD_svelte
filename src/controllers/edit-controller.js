import {db} from "../models/db.js"

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

    edit:{
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