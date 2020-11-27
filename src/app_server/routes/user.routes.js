const express = require('express');
const app_router = express();


// CRUD Create --> POST, Read --> GET, Update --> PUT,  Delete -->DELETE
// /api/user/
app_router.get('/', (req, res) => {
    res.status(200).json({
        respuesta: "hello I`m a user"
    })
});
// CREATE --> POST
// /api/user/  /create    create   POST {name: '', email: ''}
app_router.post('/create', (req, res) => {
    if (req.body) {
        res.status(200).json({
            status: 200,
            message: "creando usuario",
            user: req.body
        });
    } else {
        res.status(412).json({
            status: 412,
            message: "No hay data",
            user: null
        });
    }    
});

// READ --> GET:_idUser
// /api/user/  /find:_idUser    find   GET
app_router.get('/find:_idUser', (req, res) => {
    if (req.params._idUser){
        res.status(200).json({
            respuesta: "encontrando usuario"
        });
    } else {
        res.status(412).json({
            status: 412,
            message: "No hay data",
            user: null
        });        
    }

});

// PUT --> PUT:_idUser
// /api/user/  /update:_idUser    update   UPDATE
app_router.put('/update:_idUser', (req, res) => {
    res.status(200).json({
        respuesta: "actualizando usuario"
    })
});


// DELETE --> DELETE:_idUser
// /api/user/  /delete:_idUser   DELETE
app_router.delete('/delete:_idUser', (req, res) => {
    res.status(200).json({
        respuesta: "borrando usuario"
    })
});


module.exports = app_router;