// var env = process.env.NODE_ENV || "development"; // _ENV

var configGENERAL = {
    development: {
        PORT: 3333,
        URLBASE: "http://localhost:3333/api",
        INCOMMING_URL_HTTPACCESS_PERMITED: "http://localhost:4200", // cors peticiones aceptadas desde angular
        CONSOLE: {
            ACTIVE: true,
            ROUTE: true,
            GRAPH: "-DevelopmentMode->",
        },
        ROLES: {
            ROLE_USER: "USER_ROLE",
            ROLE_CLIENT: "CLIENT_ROLE",
            ROLE_FREELANCER: "FREELANCER_ROLE",
            ROLE_ASSOCIATED: "ASSOCIATED_ROLE",
            ROLE_API: "API_ROLE",
            ROLE_ADMIN: "ADMIN_ROLE",
            ROLE_GOODNESS: "GOODNESS_ROLE",
        },
    },
    testing: {
        PORT: 3366,
        URLBASE: "http://localhost:3366/api",
        INCOMMING_URL_HTTPACCESS_PERMITED: "http://localhost:9876", // cors peticiones aceptadas desde angular
        CONSOLE: {
            ACTIVE: true,
            ROUTE: true,
            GRAPH: "-TestingMode->",
        },
        ROLES: {
            ROLE_USER: "USER_ROLE",
            ROLE_CLIENT: "CLIENT_ROLE",
            ROLE_FREELANCER: "FREELANCER_ROLE",
            ROLE_ASSOCIATED: "ASSOCIATED_ROLE",
            ROLE_API: "API_ROLE",
            ROLE_ADMIN: "ADMIN_ROLE",
            ROLE_GOODNESS: "GOODNESS_ROLE",
        },
    },
};

module.exports = configGENERAL[_ENV];
