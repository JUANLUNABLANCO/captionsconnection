const mongoose = require("mongoose");

const db = require("../_configs/db");

// WARNING: la unica manera que no se rompa la app es con un middleware a la conexion
// mongoose
//   .connect(...)
//   .then(() => {
//     connected = true;
//   })
//   .catch(err => {
//     connected = false;
//   });
// Conectate a base de datos desde el inicio, en vez de en los modelos

// app.use('*', (req, res, next) => {
//   if (!connected) {
//     return res.status(500).send("Couldn't stablish connection. Please, contact the admin");
//   } else {
//     return next();
//   }
// });
// WARNING: la unica manera que no se rompa la app es con un middleware a la conexion

if (_ENV === "development") {
    // ################ CONEXION QUE FUNCIONA PARA LOCALHOST EN DEVELOPMENT cuidao el @ debe llevarlo en development, puesto que el host en production comienza por @...
    var uri =
        "mongodb://" +
        db.user +
        ":" +
        db.password +
        "@" +
        db.host +
        ":" +
        db.port +
        "/" +
        db.database;
    mongoose
        .connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            var _db = mongoose.connection;
            _db.once("open", () => {
                console.log(
                    `connection to database, in ` +
                        _ENV +
                        `, established well: ` +
                        db.port
                );
                console.log(
                    "*********************************************************************"
                );
            });
        })
        .catch((error) => {
            // console.log(error);
            var _db = mongoose.connection;
            _db.on("error", console.error.bind(console, "connection error:"));
            throw new Error(
                "Error DB: Couldn't stablish connection. Please, contact the admin"
            );
        });
} else if (_ENV === "production") {
    var uri =
        "mongodb://" +
        db.user +
        ":" +
        db.password +
        db.host +
        ":" +
        db.port +
        "/" +
        db.database;
    mongoose
        .connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            var _db = mongoose.connection;
            _db.once("open", function () {
                console.log(
                    `connection to database, in ` +
                        _ENV +
                        `, established well: ` +
                        db.port
                );
                console.log(
                    "**********************************************************************"
                );
            });
        })
        .catch((error) => {
            console.log(error);
            var _db = mongoose.connection;
            _db.on("error", console.error.bind(console, "connection error:"));
        });
}
module.exports = mongoose;
