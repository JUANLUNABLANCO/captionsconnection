var env = process.env.NODE_ENV || 'development';    // _ENV

var configGENERAL = {
    'development': {
        PORT: 3333,
        URLBASE : 'http://localhost:3333/api',
        CONSOLE: {
            ACTIVE: true,
            ROUTE: true,
            GRAPH: '--->'
        }
    },
    'production': {
        PORT: 3333,
        URLBASE : 'https://www.captios-connection.com/api',
        CONSOLE: {
            ACTIVE: false,
            ROUTE: false,
            GRAPH: false
        }
    }
}

module.exports = configGENERAL[env];