import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
    find: {
        handler: async function (request, h) {
            try {
                const placemarks = await db.placemarkStore.getAllPlacemarks();
                return placemarks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
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
    },

    create: {
        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                const userid = request.params.id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userid, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(200);
                }
                return Boom.badImplementation("error creating placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
    },

    deleteOne: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                await db.placemarkStore.deletePlacemarkById(placemark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
    },

    deleteAll: {
        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

};