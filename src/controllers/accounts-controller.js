import { db } from "../models/db.js"
export const accountController = {
    index: {
        auth: false,
        handler: async function (request, h) {
            return h.view("main", { title: "Welcome to the Placemarkmap"});
        },
    },
    showSignup: {
        auth: false,
        handler: async function (request, h){
            return h.view("signuppage", { title: "Sign up for Placemarkmap"});
        }
    },
    signup: {
        auth: false,
        handler: async function(request, h){
            const user = request.payload;
            await db.userStore.addUser(user);
            return h.redirect("/");
        }
    },
    showLogin:{
        auth: false,
        handler: async function(request,h){
            return h.view("loginpage", { title: "Login to Placemarkmap"});
        }
    },
    login:{
        auth: false,
        handler: async function(request, h){
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password){
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        }
    },
    logout:{
        handler: async function(request, h){
            request.cookieAuth.clear();
            return h.redirect("/");
        }
    },

    async validate(request, session){
        const user= await db.userStore.getUserById(session.id);
        if(!user){
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    }

}