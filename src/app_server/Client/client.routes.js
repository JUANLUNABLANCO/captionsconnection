/* ####### MODULES ######*/
const express           = require('express');
/* ####### ROUTES #######*/
const app_router        = express();
/* ####### CONFIGS ######*/
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
const clientController  = require('./client.controller');
/* ####### MIDDLEWARES ##*/
const mdValidateClient  = require('./client.mdValidate');

// ########## NOTHING
// GET http://localhost:3333/api/channel/
app_router.get('/', (req, res) =>{
    console.log('en el api/client/ redirect to /api/');
    res.redirect('/api');
});
// ########## C
// POST http://localhost:3333/api/channel/register 
// HASK: cualquiera puede registrarlo, deberías mandar un código a su email de confirmación, EN EL FUTURE
app_router.post('/register',                mdValidateClient.clientForm_clientRegister,         clientController.Register );
// http://localhost:3333/api/channel/check-channel-exists
app_router.post('/check-email-exists',      mdValidateClient.clientForm_CheckEmailExists,       clientController.checkEmailExists);
// ########## R
// GET: http://localhost:3333/api/channel/show-all              [ADMIN]
// GET: http://localhost:3333/api/channel/details:idChannel     [ADMIN] || [OWNNER]
// ########## U
// PUT: http://localhost:3333/api/channel/update:idChannel      [OWNNER]
// ########## D
// DELETE: http://localhost:3333/api/channel/delete:idChannel   [OWNNER]
module.exports = app_router;