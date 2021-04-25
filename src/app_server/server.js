/////////////////////////////////////////////////////////////////////////
/* ##########  api - express            ################################# */
const api = require("./app");
/* ##########  api - express            ################################# */
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
// servidor secure layer transport SSL https://www.avr3dstudio.com:3000
if (_ENV == "arreglaresto") {
    // app.use(cors()); // HASK: ############# CORS CONFIGURATION IN PRODUCTION
    const credentials =
        "define credenciales, cors etc antes de subirlo a producción";
    var _server = https
        .createServer(credentials, api)
        .listen(api.get("port"), function () {
            console.log("NODE_ENV: " + api.get("env"));
            console.log(
                "Express server with SSL certificate listening in https://www.captionsconnection.com:" +
                    _server.address().port
            );
        });
}
// servidor local http://localhost:3000
else {
    var _server = api.listen(api.get("port"), () => {
        console.log(
            "*********************************************************************"
        );
        console.log(
            "Express server listening in http://localhost:" +
                _server.address().port
        ); // _PORT
        console.log(
            "---------------------------------------------------------------------"
        );
        _PRINT.Console("PrintConsole", "Print Console", _ENV);
        console.log(
            "---------------------------------------------------------------------"
        );
    });
}
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
////////////////////////////////////////////////////////////////////
module.exports = _server;
