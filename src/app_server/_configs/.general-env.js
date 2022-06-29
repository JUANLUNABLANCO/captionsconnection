// var env = process.env.NODE_ENV || "development"; // _ENV

var configGENERAL = {
    production: {
        PORT: 3333,
        URLBASE: "http://localhost:3333/api",
        INCOMMING_URL_HTTPACCESS_PERMITED: "http://localhost:4200", // cors peticiones aceptadas desde angular
        CONSOLE: {
            ACTIVE: false,
            ROUTE: false,
            GRAPH: false,
        },
        ROLES: {
            ROLE_USER: "LEAD_USER_ROLE",
            ROLE_CLIENT: "LEAD_CLIENT_ROLE",
            ROLE_FREELANCER: "LEAD_FREELANCER_ROLE",
            ROLE_ASSOCIATED: "LEAD_ASSOCIATED_ROLE",
            ROLE_API: "ROOT_API_ROLE",
            ROLE_ADMIN: "ROOT_ADMIN_ROLE",
            ROLE_GOODNESS: "ROOT_GOODNESS_ROLE",
        },
    },
};

module.exports = configGENERAL[_ENV];
