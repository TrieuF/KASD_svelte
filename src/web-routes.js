import { aboutController } from "./controllers/about-controller.js";
import { accountController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountController.index },
    { method: "GET", path: "/signup", config: accountController.showSignup },
    { method: "GET", path: "/login", config: accountController.showLogin },
    { method: "GET", path: "/logout", config: accountController.logout },
    { method: "POST", path: "/register", config: accountController.signup },
    { method: "POST", path: "/authenticate", config: accountController.login },

    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
    { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

    { method: "GET", path: "/placemark/{id}", config: placemarkController.index},
];
