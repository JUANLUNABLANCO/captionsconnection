// debes decidir en produccion cual va a ser el sistema de base de datos
// productionLocal o productionRemote
// en este punto _ENV = 'produciton'
// pero la estartegia debemos indicársela

const configDB = {
    production: {
        user: "cc_app",
        password: "JMLB_1234_ppcs_2709",
        host: "localhost",
        port: 60060, //puerto que requiere --auth
        database: "DB_caption_connection",
    },
    productionRemote: {
        // mlab
        // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!! usuario, db, etc y el package.json mongodProd
        user: "cc_api", // este es el usuario-cliente de la db (app, robomongo, consola), quien se esta conectando
        password: "************************",
        host: "@xxxxxx.mlab.com", //debes quitarle la @. Esto puede cambiar en remoto a no ser que la bd este en el mismo servidor que la app
        port: 000000, //y el puerto deberias cambiarlo aunque esten o no en la misma máquina
        database: "DB_captions_connection_prod", // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!!
        apikey_mlab: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
        mongo_version: "x.x.x",
    }, // mongodb://<dbuser>:<dbpassword>@<ds263640.mlab.com>:<63640>/DB_captions_connection_prod
};

module.exports = configDB[_ENV];
