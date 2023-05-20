import { db } from "../models/db.js"
export const accountController = {
    index: {
        handler: async function (request, h) {
            return h.view("main", { title: "Welcome to the Placemarkmap"});
        },
    },
    showSignup: {
        handler: async function (reqeust, h){
            return h.view("signuppage", { title: "Sign up for Placemarkmap"});
        }
    },
    signup: {
        handler: async function(request, h){
            const user = request.payload;
            await db.userStore.addUser(user);
            return h.redirect("/");
        }
    },
    showLogin:{
        handler: async function(request,h){
            return h.view("loginpage", { title: "Login to Placemarkmap"});
        }
    },
    login:{
        handler: async function(request, h){
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password){
                return h.redirect("/");
            }
            return h.redirect("/dashboard");
        }
    },
    logout:{
        handler: async function(request, h){
            return h.redirect("/");
        }
    },


}