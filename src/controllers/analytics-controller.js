export const analyticsController = {
    index: {
        handler: async function (request, h) {
            const viewData = {
                title: "Analytics",
            }
            return h.view("analyticpage", viewData);
        },
    },
}