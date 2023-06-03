import { aboutController } from "./controllers/about-controller.js";
import { accountController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { overviewController } from "./controllers/overview-controller.js";
import { analyticsController } from "./controllers/analytics-controller.js";
import { editController } from "./controllers/edit-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountController.index },
    { method: "GET", path: "/signup", config: accountController.showSignup },
    { method: "GET", path: "/login", config: accountController.showLogin },
    { method: "GET", path: "/logout", config: accountController.logout },
    { method: "POST", path: "/register", config: accountController.signup },
    { method: "POST", path: "/authenticate", config: accountController.login },

    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/dashboard", config: dashboardController.index },

    { method: "GET", path: "/overview", config: overviewController.index },
    { method: "POST", path: "/overview/addplacemark", config: overviewController.addPlacemark },
    { method: "GET", path: "/overview/deleteplacemark/{id}", config: overviewController.deletePlacemark },

    { method: "GET", path: "/analytics", config: analyticsController.index },

    { method: "GET", path: "/placemark/{id}", config: placemarkController.index},

    { method: "GET", path: "/placemark/{id}/edit", config: editController.index},
    { method: "POST", path: "/placemark/{id}/update", config: editController.edit},

    { method: "GET", path: "/admin", config: adminController.index},
    { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteuser},

    { method: "GET", path: "/category/{category}", config: categoryController.index},

    { method: "GET", path:"/{param*}", handler: {directory: { path: "./public" } }, options: { auth: false} }
];
