import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
    find: {
        handler: async function (request, h) {
            try {
                const users = await db.placemarkStore.getAllPlacemarks();
                return users;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
        handler: async function (request, h) {
            try {
                const user = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.serverUnavailable("No User with this id");
            }
        },
    },

    create: {
        handler: async function (request, h) {
            try {
                const user = await db.placemarkStore.addPlacemark(request.payload);
                if (user) {
                    return h.response(user).code(201);
                }
                return Boom.badImplementation("error creating user");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteAll: {
        handler: async function (request, h) {
            try {
                await db.userStore.deleteAll();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

};