export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const viewData = {
                title: "Dashboard",
                user: loggedInUser
            }
            return h.view("dashboardpage", viewData);
        },
    },
}