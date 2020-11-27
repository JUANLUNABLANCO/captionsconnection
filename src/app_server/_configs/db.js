// var env = process.env.NODE_ENV || 'development';
////console.log(env);
var configDB = {
    'development': {
        user: "cc_app",
        password: "JMLB_1234_ppcs_2709",
        host: "localhost",
        port: 30030, //puerto que requiere --auth
        database: "DB_caption_connection"
    },   
    'production': { // mlab
        // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!! usuario, db, etc
        user: "cc_app", // este es el usuario-cliente de la db (app, robomongo, consola), quien se esta conectando
        password: "JMLB_1234_ppcs_2709",
        host: "@xxxxxx.mlab.com", //esto puede cambiar en remoto a no ser que la bd este en el mismo servidor que la app
        port: 000000, //y el puerto deberias cambiarlo aunque esten o no en la misma máquina
        database: "DB_captions_connection",   // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!!
        apikey_mlab: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
        mongo_version: 'x.x.x'
    } // mongodb://<dbuser>:<dbpassword>@ds263640.mlab.com:63640/db_avr3ds
};
module.exports = configDB[_ENV];