import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import Joi from "joi";
import {IdSpec, PlacemarkArraySpec, PlacemarkSpecReal, PlacemarkSpecPlus, JwtAuth} from "../models/joi-schemas.js";
import {decodeToken} from "./jwt-utils.js";

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
        response: { schema: PlacemarkArraySpec, failAction: validationError },
        description: "Get all placemarks",
        notes: "Returns all placemarks",
    },

    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No [id] with this id");
                }
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("No [id] with this id");
            }
        },
        tags: ["api"],
        description: "Find a [id]",
        notes: "Returns a [id]",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                const userid = request.auth.credentials._id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userid, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(200);
                }
                return Boom.badImplementation("error creating [id]");
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
        tags: ["api"],
        description: "Create a [id]",
        notes: "Returns the newly created [id]",
        validate: { payload: PlacemarkSpecReal, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const userid = request.auth.credentials._id;
                const user = await db.userStore.getUserById(userid);
                if (!user.isAdmin){
                    return Boom.unauthorized("Not an Admin");
                }
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No [id] with this id");
                }
                await db.placemarkStore.deletePlacemark(placemark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No [id] with this id");
            }
        },
        tags: ["api"],
        description: "Delete a [id]",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const userid = request.auth.credentials._id;
                const user = await db.userStore.getUserById(userid);
                if (!user.isAdmin){
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

    createnoid: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemark = {
                    name: request.payload.name,
                    description: request.payload.description,
                    location: {
                        lat: request.payload.location.lat,
                        lng: request.payload.location.lng,
                    },
                    category: request.payload.category,
                    img: ""
                }
                const usertoken = request.payload.usertoken;
                const user = decodeToken(usertoken);
                const newPlacemark = await db.placemarkStore.addPlacemark(user.userId, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(200);
                }
                return Boom.badImplementation("error creating [id]");
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
    },
};