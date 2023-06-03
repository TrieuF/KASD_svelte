import {db} from "../models/db.js"

export const adminController = {
    index:{
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const users = await db.userStore.getAllUsers();
            const viewData = {
                title:"Admin dashboard",
                users: users,
            }
            if( loggedInUser.isAdmin ){
                return h.view("adminpage", viewData);
            }
            else{
                return h.redirect("/overview");
            }
        }
    },

    deleteuser: {
        handler: async function (request, h) {
            await db.placemarkStore.deletePlacemarkByUser(request.params.id)
            await db.userStore.deleteUserById(request.params.id);
            return h.redirect("/admin");
        }
    }
}