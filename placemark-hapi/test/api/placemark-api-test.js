import { EventEmitter } from "events";
import {assert} from "chai";
import {assertSubset} from "../test-utils.js";
import {placemarkService} from "./placemark-service.js";
import {testmark, testPlacemarks, testuser, testcredentials} from "../fixtures.js";

EventEmitter.setMaxListeners(30);

suite("Placemark API tests", () => {
    let user = null;

    setup(async () => {
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testcredentials);
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testcredentials);
        testmark.createdBy = user._id;
    });
    teardown(async () => {
    });

    test("create a placemark", async () => {
        const newPlacemark = await placemarkService.createPlacemark(user._id, testmark);
        assertSubset(testmark, newPlacemark);
        assert.isDefined(newPlacemark._id);
    });

    test("create Multiple placemarks", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPlacemark(user._id, testPlacemarks[i]);
        }
        const returnedPlacemarks = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length);
        for (let i = 0; i < returnedPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const placemark = await placemarkService.getPlacemark(returnedPlacemarks[i]._id);
            assertSubset(placemark, returnedPlacemarks[i]);
        }
    });

    test("delete a placemark", async () => {
        const placemark = await placemarkService.createPlacemark(user._id, testmark);
        const response = await placemarkService.deletePlacemark(placemark._id);
        assert.equal(response.status, 204);
        try {
            const returnedPlaylist = await placemarkService.getPlacemark(placemark.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id", "Incorrect Response Message");
        }
    });

    test("delete all placemarks", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPlacemark(user._id, testPlacemarks[i]);
        }
        let returnedPlacemarks = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length);
        await placemarkService.deleteAllPlacemarks();
        returnedPlacemarks = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("get a placemark", async () => {
        const placemarktest = await placemarkService.createPlacemark(user._id, testmark);
        const returnedplacemark = await placemarkService.getPlacemark(placemarktest._id);
        assert.deepEqual(placemarktest, returnedplacemark);
    });

    test("get a placemark - bad id", async () => {
        try {
            const returnedplacemark = await placemarkService.getPlacemark("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a placemark - deleted placemark", async () => {
        const placemarktest = await placemarkService.createPlacemark(user._id, testmark);
        await placemarkService.deleteAllPlacemarks();
        try {
            const returnedplacemark = await placemarkService.getPlacemark(placemarktest._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });

    test("remove non-existant placemark", async () => {
        try {
            const res = await placemarkService.deletePlacemark("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id", "Incorrect Response Message");
        }
    });
});