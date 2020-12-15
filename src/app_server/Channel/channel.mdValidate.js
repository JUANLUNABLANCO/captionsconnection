/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const channelConfig = require ('./channel.config');
const regExChName   = channelConfig.regExChName; // const regExChName = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,}$/;
const regExEmail    = channelConfig.regExEmail;  // const regExEmail = /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
const sendErrorMDValidate = require('../_helpers/hlpResponseManager').sendErrorValidate;
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/

channelForm_CheckNameExists = (req, res, next)=>{
    // validaciones
    if (!req.body){ 
        sendErrorMDValidate(res, "el 'body' no existe");
    } else if (!req.body.channelName ) {
        sendErrorMDValidate(res, "el 'channelName' no existe");
    }else if (req.body.channelName.length < 3){
        sendErrorMDValidate(res, "el 'channelName' es demasiado corto {min:3}"); 
    }else if (regExChName.test(req.body.channelName) != true){
        sendErrorMDValidate(res, "el 'channelName' no cumple con los caracteres permitidos. 'a-z A-Z 0-9 ñ Ñ áéíóúÁÉÍÓÚÜü_-@#$.'");
    }else {
        req.body.channelName = req.body.channelName.trim().toLowerCase();
        // console.log(req.body.channelName.length);
        next();
    }
};


channelForm_ChannelSave = (req, res, next) =>{
    const arrChannelTypes = channelConfig.arrChannelTypes;
    const arrChannelLanguages = channelConfig.arrChannelLanguages;
    const arrChannelCategories = channelConfig.arrChannelCategories;

    if (!req.body){
        // no existe el body 
        sendErrorMDValidate(res, "el 'body' no existe");

    } else if (!req.body.channelName || !req.body.channelType || !req.body.clientEmail 
        || !req.body.channelLanguage || !req.body.channelCategory || !req.body.clientInterestingNow) {
        // no existe algun campo    
        sendErrorMDValidate(res, "Algún campo requerido no llega. Revisa los datos");

    }else if (req.body.channelName.length < 3){
        // el channelName es muy corto
        sendErrorMDValidate(res, "el 'channelName' es demasiado corto {min:3}"); 

    }else if (regExChName.test(req.body.channelName) != true){
        // el channel name no pasa el regex
        sendErrorMDValidate(res, "el 'channelName' no cumple con los caracteres permitidos. 'a-z A-Z 0-9 ñ Ñ áéíóúÁÉÍÓÚÜü_-@#$.'");

    }else if (regExEmail.test(req.body.clientEmail) != true){
        // match: [/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "El 'clientEmail' no es válido "],
        sendErrorMDValidate(res, "el 'clientEmail' no cumple con los caracteres permitidos, para un email válido");

    }else if (arrChannelTypes.indexOf(req.body.channelType) < 0){
        // enum: ["YOUTUBER"]
        sendErrorMDValidate(res, "el 'channelType' no coincide con los valores permitidos");

    }else if (arrChannelLanguages.indexOf(req.body.channelLanguage) < 0){
        // enum: [ 'ES', 'EN', 'FR', 'PT', 'other']
        sendErrorMDValidate(res, "el 'channelLanguage' no coincide con los valores permitidos");

    }else if (arrChannelCategories.indexOf(req.body.channelCategory) < 0){
        // enum: ['autos-vehicles', 'education', 'entertainment', 'film-animation', 'gaming', 'nonprofits-activism', 'howto-style', 'music', 
        // 'news-politics', 'people-blogs', 'pets-animals', 'science-technology', 'sports', 'travel-events', 'comedy']
        sendErrorMDValidate(res, "el 'channelCategory' no coincide con los valores permitidos");

    }else if (req.body.clientInterestingNow != true && req.body.clientInterestingNow != false){
        // true | false
        sendErrorMDValidate(res, "el 'clientInterestingNow' debe ser true or false");
    }else {
        req.body.channelName = req.body.channelName.trim().toLowerCase();
        req.body.clientEmail = req.body.clientEmail.trim().toLowerCase();
        // console.log(req.body.channelName.length);
        next();
    }
};



module.exports = {
    channelForm_CheckNameExists,
    channelForm_ChannelSave
}