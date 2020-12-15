/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const freelancerConfig = require ('../_configs/constsBusiness');
const regExEmail    = freelancerConfig.regExEmail;
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
const sendErrorMDValidate = require('../_helpers/hlpResponseManager').sendErrorValidate;
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/
// ############### CONFIG

freelancerForm_CheckEmailExists = (req, res, next)=>{
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

freelancerForm_Save =  (req, res, next) =>{

    const arrNativeLanguages    = freelancerConfig.arrLanguages;
    const arrLanguages          = freelancerConfig.arrLanguages;
    const arrHabilities         = freelancerConfig.arrHabilities;
    const arrCountries          = freelancerConfig.arrCountries;
    
    if (!req.body){
        // no existe el body 
        sendErrorMDValidate(res, "el 'body' no existe");

    } else if (!req.body.email || !req.body.nativeLanguage || !req.body.languages 
        || !req.body.habilities || !req.body.country) {
        // no existe algun campo    
        sendErrorMDValidate(res, "Algún campo requerido no llega. Revisa los datos");

    } else if (regExEmail.test(req.body.email) != true){
        // match: [/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "El 'clientEmail' no es válido "],
        sendErrorMDValidate(res, "el 'email' no cumple con los caracteres permitidos, para un email válido");

    } else if (arrNativeLanguages.indexOf(req.body.nativeLanguage) < 0){
        // enum: 
        sendErrorMDValidate(res, "el 'native Language' no coincide con los valores permitidos");

    } else if (arrCountries.indexOf(req.body.country) < 0){
        // true | false
        sendErrorMDValidate(res, "el 'country' no coincide con los valores permitidos");
    } 
    // ######### languages
    else  { 
        // console.log('array languages. ', arrLanguages);
        let valid = true;
        for (let x=0; x < req.body.languages.length; x++) {
            // console.log('req.body[',x,']: ', req.body.languages[x]);
            // console.log('indexOf ', arrLanguages.indexOf(req.body.languages[x]));
            if (arrLanguages.indexOf(req.body.languages[x]) < 0) {
                valid = false;
                // break;
            }
            // console.log('valor de x: ', x);    
        }
        // console.log('valid: ', valid);
        if (valid == false){
            sendErrorMDValidate(res, "el campo 'languages[]' no coincide con los valores permitidos"); 
        } 
        // ######### habilities
        else { 
            // console.log('req.body.habilities ', req.body.habilities);
            let valid = true;
            for (let x=0; x < req.body.habilities.length; x++){
                if (arrHabilities.indexOf(req.body.habilities[x]) < 0) {
                    valid = false;
                    // break;
                }
            }
            // console.log('valid: ', valid);
            if (valid == false){
                sendErrorMDValidate(res, "el campo 'habilities[]' no coincide con los valores permitidos"); 
            }
            // ######### next()
            else {
                req.body.email = req.body.email.trim().toLowerCase();
                // console.log("finish validate: ", req.body);
                next();
            }
            // ######### next()
        }// else
        // ######### habilities   
    }// else
    // ######### languages
};



module.exports = {
    freelancerForm_CheckEmailExists,
    freelancerForm_Save    
}
