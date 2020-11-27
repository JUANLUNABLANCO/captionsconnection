const CB = require ('../_configs/constsBusiness');

// ######### COMUNES
// const regExChName = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,}$/;
// const regExChName   = CB.regExChName;
// const regExEmail = /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const regExEmail    = CB.regExEmail;

function sendErrorMDValidate( res, error) {
    let ok= false, status= 500, message = "ERROR: mdValidate falló!";
    res.status(status).json({
        ok: ok,
        status: status,
        message: "ERROR: mdValidate falló!",
        error: error
    });
}

freelancerForm_CheckEmailExists = (req, res, next) =>{
    // validaciones
    if (!req.body){ 
        sendErrorMDValidate(res, {ValidationError: "el 'body' no existe"});
    } else if (!req.body.email ) {
        sendErrorMDValidate(res, {ValidationError: "el 'email' no existe"}); 
    }else if (regExEmail.test(req.body.email) != true){
        sendErrorMDValidate(res, {ValidationError: "el 'email' no cumple con los caracteres permitidos. 'a-z A-Z 0-9 ñ Ñ áéíóúÁÉÍÓÚÜü_-@#$.'"});
    }else {
        req.body.email = req.body.email.trim().toLowerCase();
        // console.log(req.body.email.length);
        next();
    }
};


freelancerForm_Save =  (req, res, next) =>{

    const arrNativeLanguages    = CB.arrLanguages;
    const arrLanguages          = CB.arrLanguages;
    const arrHabilities         = CB.arrHabilities;
    const arrCountries          = CB.arrCountries;
    
    if (!req.body){
        // no existe el body 
        sendErrorMDValidate(res, {ValidationError: "el 'body' no existe"});

    } else if (!req.body.email || !req.body.nativeLanguage || !req.body.languages 
        || !req.body.habilities || !req.body.country) {
        // no existe algun campo    
        sendErrorMDValidate(res, {ValidationError: "Algún campo requerido no llega. Revisa los datos"});

    } else if (regExEmail.test(req.body.email) != true){
        // match: [/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "El 'clientEmail' no es válido "],
        sendErrorMDValidate(res, {ValidationError: "el 'email' no cumple con los caracteres permitidos, para un email válido"});

    } else if (arrNativeLanguages.indexOf(req.body.nativeLanguage) < 0){
        // enum: 
        sendErrorMDValidate(res, {ValidationError: "el 'native Language' no coincide con los valores permitidos"});

    } else if (arrCountries.indexOf(req.body.country) < 0){
        // true | false
        sendErrorMDValidate(res, {ValidationError: "el 'country' no coincide con los valores permitidos"});
    } else  { 
        console.log('array languages. ', arrLanguages);
        let valid = true;
        for (let x=0; x < req.body.languages.length; x++) {
            console.log('req.body[',x,']: ', req.body.languages[x]);
            console.log('indexOf ', arrLanguages.indexOf(req.body.languages[x]));
            if (arrLanguages.indexOf(req.body.languages[x]) < 0) {
                valid = false;
                // break;
            }
            console.log('valor de x: ', x);    
        }
        console.log('valid: ', valid);
        if (valid == false){
            sendErrorMDValidate(res, {ValidationError: "el campo 'languages[]' no coincide con los valores permitidos"}); 
        } else { 
            console.log('hello2');
            let valid = true;
            for (let x=0; x < req.body.habilities.length; x++){
                if (arrHabilities.indexOf(req.body.habilities[x]) < 0) {
                    valid = false;
                    // break;
                }
            }
            console.log('valid: ', valid);
            if (valid == false){
                sendErrorMDValidate(res, {ValidationError: "el campo 'habilities[]' no coincide con los valores permitidos"}); 
            }else {
                req.body.email = req.body.email.trim().toLowerCase();
                console.log("finish validate: ", req.body);
                next();
            }
        }   
    }
};



module.exports = {
    freelancerForm_CheckEmailExists,
    freelancerForm_Save    
}
