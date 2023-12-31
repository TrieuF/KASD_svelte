import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Inert from "@hapi/inert";
import Joi from "joi";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt-utils.js";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import {accountController} from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error){
    console.log(result.error.message);
    process.exit(1);
};

const swaggerOptions = {
    info: {
        title: "PlacemarkMap API",
        version: "1.1",
    },
    securityDefinitions: {
        jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },
    security: [{ jwt: [] }]
}
async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        "routes": {
            "cors": true //allow cors?
        }
    });
    await server.register(Vision);
    await server.register(Cookie);
    await server.register(Inert);
    await server.register(jwt);

    await server.register([Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions,}]);

    server.validator(Joi);

    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: __dirname,
        path: "./pages",
        layoutPath: "./pages",
        partialsPath: "./pages/partials",
        layout: true,
        isCached: false,
    });

    server.auth.strategy("session", "cookie",{
        cookie:{
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountController.validate,
    });
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] },
    });
    server.auth.default("session");
    db.init();
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);


});

init();