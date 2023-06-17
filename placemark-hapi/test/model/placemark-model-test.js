import {assert} from "chai";
import {assertSubset} from "../test-utils.js";
import {testmark, testPlacemarks, testuser} from "../fixtures.js";
import {db} from "../../src/models/db.js";

suite("Placemark Model tests", () => {
    setup(async () => {
        db.init();
        await db.placemarkStore.deleteAllPlacemarks();
        await db.userStore.deleteAllUsers();
        const user = await db.userStore.addUser(testuser);
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(user._id, testPlacemarks[i]);
        }
    });

    test("create a [id]", async () => {
        const user = await db.userStore.addUser(testuser);
        const newPlacemark = await db.placemarkStore.addPlacemark(user._id, testmark);
        assertSubset(testmark, newPlacemark);
        assert.isDefined(newPlacemark._id);
    });

    test("delete all [id]", async () => {
        await db.placemarkStore.deleteAllPlacemarks();
        const returnedPlacemark = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 0);
    });

    test("get a [id] - success", async () => {
        const returnedplacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
        assert.deepEqual(testPlacemarks[0], returnedplacemark);
    });

    test("delete one [id] - success", async () => {
        await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
        const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
        const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
        assert.isNull(deletedPlacemark);
    });

    test("get a [id] - bad params", async () => {
        assert.isNull(await db.placemarkStore.getPlacemarkById(""));
        assert.isNull(await db.placemarkStore.getPlacemarkById());
    });

    test("delete one [id] - fail", async () => {
        await db.placemarkStore.deletePlacemark("bad-id");
        const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testPlacemarks.length, allPlacemarks.length);
    });
});