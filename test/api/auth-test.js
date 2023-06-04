import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        await placemarkService.clearAuth();
        await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllUsers();
    });

    test("authenticate", async () => {

    });

    test("verify Token", async () => {

    });

    test("check Unauthorized", async () => {

    });
});
