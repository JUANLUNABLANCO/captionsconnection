/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const clientConfig          = require('./client.config');
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
const sendErrorMDValidate   = require('../_helpers/hlpResponseManager').sendErrorValidate;
const regExEmail            = clientConfig.regExEmail;
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/


clientForm_CheckEmailExists = (req, res, next)=>{
    // validaciones
    if (!req.body){ 
        sendErrorMDValidate(res, "el 'body' no existe");
    } else if (!req.body.email ) {
        sendErrorMDValidate(res, "el 'email' no existe");
    }else if (regExEmail.test(req.body.email) != true){
        sendErrorMDValidate(res, "el 'email' no es un correo válido");
    }else {
        req.body.email = req.body.email.trim().toLowerCase();
        next();
    }
};

clientForm_clientRegister = (req, res, next) =>{// clientForm_clientRegister

    if (!req.body){
        // no existe el body 
        sendErrorValidate(res, "el 'body' no existe");
    } else if (!req.body.email) {    
        sendErrorMDValidate(res, "Algún campo requerido no llega. Revisa los datos");
    } else if (regExEmail.test(req.body.email) != true){
        sendErrorMDValidate(res, "El 'email' no es un correo válido!");
    }else {
        req.body.email = req.body.email.trim().toLowerCase();
        next();
    }
};

module.exports = {
    clientForm_CheckEmailExists,
    clientForm_clientRegister
}