import Boom from "@hapi/boom";
import {db} from "../models/db.js";
import {validationError} from "./logger.js";
import {IdSpec, JwtAuth, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus} from "../models/joi-schemas.js";
import {createToken} from "./jwt-utils.js";
import {imageStore} from "../models/image-store.js";

export const userApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const users = await db.userStore.getAllUsers();
                return users;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all userApi",
        notes: "Returns details of all userApi",
        response: {schema: UserArray, failAction: validationError},
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserById(request.params.id);
                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.serverUnavailable("No User with this id");
            }
        },
        tags: ["api"],
        description: "Get a specific user",
        notes: "Returns user details",
        validate: {params: {id: IdSpec}, failAction: validationError},
        response: {schema: UserSpecPlus, failAction: validationError},
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.addUser(request.payload);
                if (user) {
                    return h.response(user).code(201);
                }
                return Boom.badImplementation("error creating user");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a User",
        notes: "Returns the newly created user",
        validate: {payload: UserSpec, failAction: validationError},
        response: {schema: UserSpecPlus, failAction: validationError},
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const userid = request.auth.credentials._id;
                const user = await db.userStore.getUserById(userid);
                if (!user.isAdmin) {
                    return Boom.unauthorized("Not an Admin");
                }
                await db.userStore.deleteAllUsers();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all userApi",
        notes: "All userApi removed from Playtime",
    },

    authenticate: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserByEmail(request.payload.email);
                if (!user) {
                    return Boom.unauthorized("User not found");
                }
                if (user.password !== request.payload.password) {
                    return Boom.unauthorized("Invalid password");
                }
                const token = createToken(user);
                return h.response({success: true, token: token, id: user._id}).code(201);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Authenticate  a User",
        notes: "If user has valid email/password, create and return a JWT token",
        validate: {payload: UserCredentialsSpec, failAction: validationError},
        response: {schema: JwtAuth, failAction: validationError},
    },

    analytics: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userlength = await db.userStore.getCountUsers();
                const placemarklength = await db.placemarkStore.getCountPlacemarks();
                const landscapelength = await db.placemarkStore.getCountPlacemarksByCategory("Landscape-Feature");
                const nationallength = await db.placemarkStore.getCountPlacemarksByCategory("National-monument");
                const islandlength = await db.placemarkStore.getCountPlacemarksByCategory("Island");
                const townlength = await db.placemarkStore.getCountPlacemarksByCategory("Town");
                const citylength = await db.placemarkStore.getCountPlacemarksByCategory("City");
                const forestlength = await db.placemarkStore.getCountPlacemarksByCategory("Forest");
                const riverlength = await db.placemarkStore.getCountPlacemarksByCategory("River");
                const bridgelength = await db.placemarkStore.getCountPlacemarksByCategory("Bridge");
                const entertainmentlength = await db.placemarkStore.getCountPlacemarksByCategory("Entertainment-Venue");
                const archaeologicallength = await db.placemarkStore.getCountPlacemarksByCategory("Archaeological-Feature");
                const worldwonderlength = await db.placemarkStore.getCountPlacemarksByCategory("Wonder-of-the-World");
                const otherslength = await db.placemarkStore.getCountPlacemarksByCategory("Others");
                const viewData = {
                    title: "Analytics",
                    userlength: userlength,
                    placemarklength: placemarklength,
                    landscapelength: landscapelength,
                    nationallength: nationallength,
                    islandlength: islandlength,
                    townlength: townlength,
                    citylength: citylength,
                    forestlength: forestlength,
                    riverlength: riverlength,
                    bridgelength: bridgelength,
                    entertainmentlength: entertainmentlength,
                    archaeologicallength: archaeologicallength,
                    worldwonderlength: worldwonderlength,
                    otherslength: otherslength,
                }
                return viewData;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        }
    },


};