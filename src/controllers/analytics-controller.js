import {db} from "../models/db.js"
export const analyticsController = {
    index: {
        handler: async function (request, h) {
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
            return h.view("analyticpage", viewData);
        },
    },
}