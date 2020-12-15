var env = process.env.NODE_ENV || 'development';    // _ENV

var configGENERAL = {
    'development': {
        PORT: 3333,
        URLBASE : 'http://localhost:3333/api',
        CONSOLE: {
            ACTIVE: true,
            ROUTE: true,
            GRAPH: '--->'
        },
        ROLES:{
            ROLE_USER: 'USER_ROLE',
            ROLE_CLIENT: 'CLIENT_ROLE',
            ROLE_FREELANCER: 'FREELANCER_ROLE',
            ROLE_ASSOCIATED: 'ASSOCIATED_ROLE',
            ROLE_API: 'API_ROLE',
            ROLE_ADMIN: 'ADMIN_ROLE',
            ROLE_GOODNESS: 'GOODNESS_ROLE',
        }
    },
    'production': {
        PORT: 3333,
        URLBASE : 'https://www.captios-connection.com/api',
        CONSOLE: {
            ACTIVE: false,
            ROUTE: false,
            GRAPH: false
        },
        ROLES:{ 
            ROLE_USER: 'LEAD_USER_ROLE',
            ROLE_CLIENT: 'LEAD_CLIENT_ROLE',
            ROLE_FREELANCER: 'LEAD_FREELANCER_ROLE',
            ROLE_ASSOCIATED: 'LEAD_ASSOCIATED_ROLE',
            ROLE_API: 'ROOT_API_ROLE',
            ROLE_ADMIN: 'ROOT_ADMIN_ROLE',
            ROLE_GOODNESS: 'ROOT_GOODNESS_ROLE',
        }
    }
}

module.exports = configGENERAL[env];