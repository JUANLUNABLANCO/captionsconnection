const express           = require('express');
const app_router        = express();


// GET http://localhost:3333/api/
app_router.get('/', (req, res) =>{
    console.log('en el /api');
    res.json({
        ok: true,
        status: 200,
        message: 'in /api'
    });
});
// GET http://localhost:3333/api/home
app_router.get('/home',  (req, res) =>{
    console.log('en el /api/home');
    res.json({
        ok: true,
        status: 200,
        message: 'in /api/home'
    });
});

module.exports = app_router;