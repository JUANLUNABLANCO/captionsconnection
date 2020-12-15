////////////////////////////////////////////////////////////////////
/* ##########  MODULOS O PAQUTES REQUERIDOS  #################### */
const express   = require('express');
const app       = express();
const morgan    = require('morgan');                                //  console colors
/* ##########  MODULOS O PAQUTES REQUERIDOS  #################### */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  HELPERS          ################################# */
const myPrint   = require('./app_server/_helpers/hlpPrintConsole');      // console print dev
// const myResponseManager = require('./app_server/helpers/hlpResponseManager');   // para manejo de envíos res.json()...
/* ##########  HELPERS          ################################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  CONFIGURACION DE EXPRESS      #################### */
/* ####### CONFIGURATION  ####### */
const CONFIG    = require('./app_server/_configs/general'); 
/* ####### CONFIGURATION  ####### */
/* ####### GLOBALS        ####### */
global._ENV                 = process.env.NODE_ENV || 'development';
global._PORT                = CONFIG.PORT;                          
global._CONSOLE_ACTIVE      = CONFIG.CONSOLE.ACTIVE;
global._CONSOLE_GRAPH       = CONFIG.CONSOLE.GRAPH; 
global._CONSOLE_ROUTE       = CONFIG.CONSOLE.ROUTE;
global._PRINT               = myPrint;
/* ####### GLOBALS        ####### */
/* ####### LOCALS         ####### */
app.set('port', _PORT);
/* ##########  CONFIGURACION DE EXPRESS      #################### */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  MIDDLEWARES      ################################# */
// app.use(express.urlencoded({extended: false}));  // datos body
app.use(express.json());                            // datos body y json
app.use(morgan('dev'));                             // colores console
/* ##########  MIDDLEWARES      ################################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  RUTAS            ################################# */
const channelRoutes     = require("./app_server/Channel/channel.routes");
const freelancerRoutes  = require("./app_server/Freelancer/freelancer.routes");
const clientRoutes      = require("./app_server/Client/client.routes");
const userRoutes        = require("./app_server/User/user.routes");
// @@@@@ raíz
const homeRoutes    = require("./app_server/routes/main/home.routes");
// @@@@@@@@@@@@@@@@@ CHANNEL
// http://localhost:3333/api/channel
app.use('/api/channel',     channelRoutes);
app.use('/api/freelancer',  freelancerRoutes);
app.use('/api/client',      clientRoutes);
app.use('/api/user',        userRoutes);
// @@@@@@@@@@@@@@@@@ /, /home, /api, /api/home, /etc
// http://localhost.3333/api/
app.use('/api', homeRoutes);            
app.get('**', (req, res) =>{
    console.log('en el /, redirect to /api');
    res.redirect('/api');       // todas la rutas no contempladas vana a homeRoutes
});
/* ##########  RUTAS            ################################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
// servidor secure layer transport SSL https://www.avr3dstudio.com:3000
if (_ENV == 'production') {
    // app.use(cors()); // HASK: ############# CORS CONFIGURATION IN PRODUCTION
    const Server = https.createServer(credentials, app)
        .listen(app.get('port'), function() {
            console.log("NODE_ENV: " + app.get('env'));
            console.log('Express server with SSL certificate listening in https://www.captionsconnection.com:' + Server.address().port);
        });
}
// servidor local http://localhost:3000
else {
    var Server = app.listen(app.get('port'), ()=> {
      console.log("*********************************************************************");
      console.log('Express server listening in http://localhost:' + Server.address().port ); // _PORT
      console.log("---------------------------------------------------------------------");
      _PRINT.Console("PrintConsole","Print Console", _ENV);
      console.log("---------------------------------------------------------------------");
    });
  }
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  MANEJO DE ERRORES    ############################# */
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada!');
 });
 // error handler 500
 app.use(function (err, req, res, next) {// stadout 1 pantalla 2 fichero log
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
/* ##########  MANEJO DE ERRORES    ############################# */
////////////////////////////////////////////////////////////////////
module.exports = Server;