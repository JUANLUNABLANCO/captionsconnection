////////////////////////////////////////////////////////////////////
/* ##########  MODULOS O PAQUTES REQUERIDOS  #################### */
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors"); //  console colors
const https = require("https");
/* ##########  MODULOS O PAQUTES REQUERIDOS  #################### */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  CONFIGURACION DE EXPRESS      #################### */
/* ####### CONFIGURATION  ####### */
global._ENV = process.env.NODE_ENV || "development";

const CONFIG =
    _ENV == "production"
        ? require("./_configs/.general-env")
        : require("./_configs/general");
// console.log(CONFIG);
/* ##########  HELPERS          ################################# */
const myPrint = require("./_helpers/hlpPrintConsole"); // console print dev
// const myResponseManager = require('./app_server/helpers/hlpResponseManager');   // para manejo de envíos res.json()...
/* ##########  HELPERS          ################################# */
/* ####### CONFIGURATION  ####### */
/* ####### GLOBALS        ####### */
// console.log("NODE_ENV=", _ENV);
global._PORT = CONFIG.PORT;
global._CONSOLE_ACTIVE = CONFIG.CONSOLE.ACTIVE;
global._CONSOLE_GRAPH = CONFIG.CONSOLE.GRAPH;
global._CONSOLE_ROUTE = CONFIG.CONSOLE.ROUTE;
global._PRINT = myPrint;
global._ROLES = CONFIG.ROLES;
/* ####### GLOBALS        ####### */
/* ####### LOCALS         ####### */
app.set("port", _PORT);
/* ####### LOCALS         ####### */
/* ##########  CONFIGURACION DE EXPRESS      #################### */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  MIDDLEWARES      ################################# */
// app.use(express.urlencoded({extended: false}));  // datos body
app.use(express.json()); // datos body y json
app.use(morgan("dev")); // colores console
app.use(cors({ origin: CONFIG.INCOMMING_URL_HTTPACCESS_PERMITED })); // development config http.//localhost:4200
/* ##########  MIDDLEWARES      ################################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  RUTAS            ################################# */
const channelRoutes = require("./Channel/channel.routes");
const freelancerRoutes = require("./Freelancer/freelancer.routes");
const clientRoutes = require("./Client/client.routes");
const userRoutes = require("./User/user.routes");
// @@@@@ raíz
const homeRoutes = require("./routes/main/home.routes");
// const {
//     channelForm_CheckNameExists,
// } = require("./app_server/Channel/channel.mdValidate");
// @@@@@@@@@@@@@@@@@ CHANNEL
// http://localhost:3333/api/channel
app.use("/api/channel", channelRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/user", userRoutes);
// @@@@@@@@@@@@@@@@@ /, /home, /api, /api/home, /etc
// http://localhost.3333/api/
app.use("/api", homeRoutes);
app.get("**", (req, res) => {
    // console.log("en el /, redirect to /api");
    res.redirect("/api"); // todas la rutas no contempladas vana a homeRoutes
});
/* ##########  RUTAS            ################################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  MANEJO DE ERRORES en las rutas   ############################# */
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    res.status(404).send("Ruta no encontrada!");
});
// error handler 500
app.use(function (err, req, res, next) {
    // stadout 1 pantalla 2 fichero log
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
/* ##########  MANEJO DE ERRORES en las rutas   ############################# */
////////////////////////////////////////////////////////////////////

module.exports = app;
