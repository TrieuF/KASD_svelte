import Boom from "@hapi/boom";
import {db} from "../models/db.js";
import {validationError} from "./logger.js";
import Joi from "joi";
import {IdSpec, PlacemarkArraySpec, PlacemarkSpecReal, PlacemarkSpecPlus, JwtAuth} from "../models/joi-schemas.js";
import {decodeToken} from "./jwt-utils.js";
import {imageStore} from "../models/image-store.js";

export const placemarkApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemarks = await db.placemarkStore.getAllPlacemarks();
                return placemarks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: {schema: PlacemarkArraySpec, failAction: validationError},
        description: "Get all placemarks",
        notes: "Returns all placemarks",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Find a placemark",
        notes: "Returns a placemark",
        validate: {params: {id: IdSpec}, failAction: validationError},
        response: {schema: PlacemarkSpecPlus, failAction: validationError},
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                let userid = request.auth.credentials._id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userid, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(200);
                }
                return Boom.badImplementation("error creating placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
        tags: ["api"],
        description: "Create a placemark",
        notes: "Returns the newly created placemark",
        validate: {payload: PlacemarkSpecReal, failAction: validationError},
        response: {schema: PlacemarkSpecPlus, failAction: validationError},
    },

    deleteOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                let userid;
                if(request.payload){
                    userid= request.payload.id
                }
                else {
                    userid = request.auth.credentials._id;
                }
                const user = await db.userStore.getUserById(userid);
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                else if (!user.isAdmin && user._id !== placemark.createdBy) {
                    return Boom.unauthorized("Not an Admin or Creator");
                }
                await db.placemarkStore.deletePlacemark(placemark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Delete a placemark",
        validate: {params: {id: IdSpec}, failAction: validationError},
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
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all PlacemarkApi",
    },

    uploadimages: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = Object.values(request.payload)[0];
                if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                    if (Object.keys(file).length > 0 && Object.keys(file).length <= 11) {
                        for (const element of file) {
                            const url = await imageStore.uploadImage(element);
                            await db.placemarkStore.updatePlacemarkimg(placemark, url);
                        }
                        return true;
                    } else if (Object.keys(file).length > 0) {
                        const url = await imageStore.uploadImage(file);
                        await db.placemarkStore.updatePlacemarkimg(placemark, url);
                        return true;
                    }
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },

    deleteimages: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                    for (let element of placemark.img) {
                        await imageStore.deleteImage(element);
                    }
                    await db.placemarkStore.deletePlacemarkimgs(placemark);
                    return true;
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },

    edit: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const changedplacemark = request.payload;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (loggedInUser.isAdmin || placemark.createdBy.equals(loggedInUser._id)) {
                    await db.placemarkStore.updatePlacemark(placemark, changedplacemark);
                    return true;
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },
};