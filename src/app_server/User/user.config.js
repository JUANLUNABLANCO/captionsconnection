// ########################## CONST BUSSINESS ##################################
// importar estos tres de constBusiness
const regExEmail            = require('../_configs/constsBusiness').regExEmail; // /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,50}$/;
const regExName             = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,50}$/;
const arrRoles              = ['user', 'client', 'freelancer'];
// ########################## CLIENT 


module.exports = {
    // common
    regExEmail,
    // user
    regExName,
    arrRoles
};
// ########################## CONST BUSSINESS ##################################
////////////////////////////////////////////////////////////////////////////////