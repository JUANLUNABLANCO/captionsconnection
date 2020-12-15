/* ####### MODULES ######*/
const express           = require('express');
const app_router        = express();
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
const userController    = require('./user.controller'); // channelController
/* ####### MIDDLEWARES ##*/
const mdValidateUser    = require('./user.mdValidate');

// ########## NOTHING
// GET http://localhost:3333/api/channel/
app_router.get('/', (req, res) =>{
    console.log('en el api/channel/ redirect to /api/');
    res.redirect('/api');
});
// ########## C
// POST http://localhost:3333/api/channel/register 
// HASK: cualquiera puede registrarlo, deberías mandar un código a su email de confirmación, EN EL FUTURE
app_router.post('/register',            mdValidateUser.userForm_userRegister,       userController.Register );
// http://localhost:3333/api/channel/check-channel-exists
app_router.post('/check-email-exists',  mdValidateUser.userForm_checkEmailExists,   userController.checkEmailExists);
// ########## R
// GET: http://localhost:3333/api/channel/show-all              [ADMIN]
// GET: http://localhost:3333/api/channel/details:idChannel     [ADMIN] || [OWNNER]
// ########## U
// PUT: http://localhost:3333/api/channel/update:idChannel      [OWNNER]
// ########## D
// DELETE: http://localhost:3333/api/channel/delete:idChannel   [OWNNER]
module.exports = app_router;