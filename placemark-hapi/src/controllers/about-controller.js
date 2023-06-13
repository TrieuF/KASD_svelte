export const aboutController = {
    index: {
        auth: false,
        handler: async function (request, h) {
            return h.view("aboutpage", { title: "About the Placemarkmap"});
        },
    },
};