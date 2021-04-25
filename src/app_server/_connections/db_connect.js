const mongoose = require("mongoose");

const db =
    _ENV == "production"
        ? require("../_configs/.db-env")
        : require("../_configs/db");

if (_ENV === "testing") {
    var uri = "mongodb://" + db.host + ":" + db.port + "/" + db.database;
    console.log("URI-DB: " + uri);
} else if (_ENV === "development" || _ENV === "production") {
    // WARNING: en production, el host comienza por @...
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
}

// console.log("URI-DB: " + uri);
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection
    .on("error", (err) => console.error.bind(console, "Connection:" + err)) // enlaza el track de error a la consola (proceso actual)
    .once("open", () => {
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

module.exports = mongoose;
