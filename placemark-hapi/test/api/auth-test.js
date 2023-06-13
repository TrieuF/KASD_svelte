import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testuser, testcredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        await placemarkService.clearAuth();
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testcredentials);
        await placemarkService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await placemarkService.createUser(testuser);
        const response = await placemarkService.authenticate(testcredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await placemarkService.createUser(testuser);
        const response = await placemarkService.authenticate(testcredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("check Unauthorized", async () => {
        await placemarkService.clearAuth();
        try {
            await placemarkService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });
});
