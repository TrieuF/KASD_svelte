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
            const deleteuser = await db.userStore.getUserById(request.params.id);
            const users = await db.userStore.getAllUsers();
            if(!deleteuser){
                const viewData = {
                    title:"Admin dashboard",
                    users: users,
                    errors: "Deleted User not findable",
                }
                return h.view("adminpage", viewData);
            }
            else if(deleteuser.isAdmin){
                const viewData = {
                    title:"Admin dashboard",
                    users: users,
                    errors: "Deleted User is a Admin",
                }
                return h.view("adminpage", viewData);
            }else {
                await db.placemarkStore.deletePlacemarkByUser(request.params.id)
                await db.userStore.deleteUserById(request.params.id);
                return h.redirect("/admin");
            }
        }
    }
}