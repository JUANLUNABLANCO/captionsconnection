/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const userConfig = require("./user.config");
const regExEmail = userConfig.regExEmail;
const regExName = userConfig.regExName;
const arrRoles = userConfig.arrRoles;
const R = _ROLES;
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/
const sendErrorMDValidate = require("../_helpers/hlpResponseManager")
    .sendErrorValidate;

userForm_checkEmailExists = (req, res, next) => {
    // validaciones
    if (!req.body) {
        sendErrorMDValidate(res, "el 'body' no existe");
    } else if (!req.body.email) {
        sendErrorMDValidate(res, "el 'email' no existe");
    } else if (regExEmail.test(req.body.email) != true) {
        sendErrorMDValidate(res, "el 'email' no es un correo válido'");
    } else {
        req.body.email = req.body.email.trim().toLowerCase();
        next();
    }
};

userForm_userRegister = (req, res, next) => {
    if (!req.body) {
        // no existe el body
        sendErrorMDValidate(res, "el 'body' no existe");
    } else if (!req.body.email) {
        // no existe algun campo
        sendErrorMDValidate(
            res,
            "Algún campo requerido no llega. Revisa los datos"
        );
    } else if (regExEmail.test(req.body.email) != true) {
        // match: [/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "El 'clientEmail' no es válido "],
        sendErrorMDValidate(
            res,
            "el 'email' no cumple con los caracteres permitidos, para un correo válido"
        );
    } else if (
        !req.body.email ||
        !req.body.name ||
        !req.body.password ||
        !req.body.confirmEmail
    ) {
        // required:true
        sendErrorMDValidate(res, "Algunos campos no llegan");
    } else if (req.body.email != req.body.confirmEmail) {
        sendErrorMDValidate(res, "Los emials no coinciden");
    } else if (regExName.test(req.body.name) != true) {
        sendErrorMDValidate(res, "el 'nombre' no es válido'");
    } else {
        req.body.email = req.body.email.trim().toLowerCase();
        req.body.name = req.body.name.trim().toLowerCase();
        if (!req.body.role) req.body.role = "user";
        if (arrRoles.indexOf(req.body.role) < 0) {
            // [ 'user', freelancer', 'client'] //
            sendErrorMDValidate(
                res,
                "el 'userRole' no coincide con los valores permitidos"
            );
        } else {
            // ROLES: ['user', 'client', 'freelancer']
            if (req.body.role == arrRoles[2]) {
                // 'freelancer'
                req.body.role = R.ROLE_FREELANCER;
            } else if (req.body.role == arrRoles[1]) {
                // 'client'
                req.body.role = R.ROLE_CLIENT;
            } else {
                // 'user'
                req.body.role = R.ROLE_USER;
            }
            // console.log(req.body.role);
            next();
        }
    }
};

module.exports = {
    userForm_checkEmailExists,
    userForm_userRegister,
};
