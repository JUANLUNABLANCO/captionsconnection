var mongoose = require('mongoose');

var db = require('../_configs/db');

if (_ENV === "development"){
    // ################ CONEXION QUE FUNCIONA PARA LOCALHOST EN DEVELOPMENT cuidao el @ debe llevarlo en development, puesto que el host en production comienza por @...
    var uri = "mongodb://" + db.user + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.database;
    mongoose.connect( uri,
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useFindAndModify: false 
        }        
    )
        var _db = mongoose.connection;
        _db.on('error', console.error.bind(console, 'connection error:'));
        _db.once('open', ()=> {
            console.log(`connection to database, in ` +  _ENV + `, established well: ` + db.port);
            console.log("*********************************************************************");
        });
} else if (_ENV === "production") {
    var uri = "mongodb://" + db.user + ":" + db.password + db.host + ":" + db.port + "/" + db.database;
    mongoose.connect( uri, 
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useFindAndModify: false 
        })
        var _db = mongoose.connection;
        _db.on('error', console.error.bind(console, 'connection error:'));
        _db.once('open', function() {
            console.log(`connection to database, in ` +  _ENV + `, established well: ` + db.port);
            console.log("**********************************************************************");            
        });
} 
module.exports = mongoose;