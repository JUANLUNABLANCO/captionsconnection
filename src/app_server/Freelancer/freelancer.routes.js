const express           = require('express');
const app_router        = express();
const freelancerController      = require('./freelancer.controller');
const mdValidateFreelancer      = require('./freelancer.mdValidate');

// ########## NOTHING
// GET http://localhost:3333/api/freelancer/                            [ANYBODY]
app_router.get('/', (req, res) =>{
    console.log('en el api/freelancer/ redirect to /api/');
    res.redirect('/api');
});
// ########## C
// POST http://localhost:3333/api/freelancer/register                   [ANYBODY]
// HASK: cualquiera puede registrarlo, deberías mandar un código a su email de confirmación, EN EL FUTURE
app_router.post('/register',                mdValidateFreelancer.freelancerForm_Save,               freelancerController.Register );
// http://localhost:3333/api/freelancer/check-email-exists              [ANGULAR]
app_router.post('/check-email-exists',      mdValidateFreelancer.freelancerForm_CheckEmailExists,   freelancerController.checkEmailExists);
// ########## R
// GET: http://localhost:3333/api/freelancer/show-all                   [ADMIN]
// GET: http://localhost:3333/api/freelancer/details:idfreelancer       [ADMIN] || [OWNNER]
// ########## U
// PUT: http://localhost:3333/api/freelancer/update:idfreelancer        [OWNNER]
// ########## D
// DELETE: http://localhost:3333/api/freelancer/delete:idfreelancer     [OWNNER]
module.exports = app_router;