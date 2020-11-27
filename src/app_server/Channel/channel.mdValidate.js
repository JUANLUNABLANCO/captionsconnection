const CB = require ('../_configs/constsBusiness');

// ######### COMUNES
// const regExChName = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,}$/;
const regExChName   = CB.regExChName;
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

channelForm_CheckNameExists = (req, res, next)=>{
    // validaciones
    if (!req.body){ 
        sendErrorMDValidate(res, {ValidationError: "el 'body' no existe"});
    } else if (!req.body.channelName ) {
        sendErrorMDValidate(res, {ValidationError: "el 'channelName' no existe"});
    }else if (req.body.channelName.length < 3){
        sendErrorMDValidate(res, {ValidationError: "el 'channelName' es demasiado corto {min:3}"}); 
    }else if (regExChName.test(req.body.channelName) != true){
        sendErrorMDValidate(res, {ValidationError: "el 'channelName' no cumple con los caracteres permitidos. 'a-z A-Z 0-9 ñ Ñ áéíóúÁÉÍÓÚÜü_-@#$.'"});
    }else {
        req.body.channelName = req.body.channelName.trim().toLowerCase();
        // console.log(req.body.channelName.length);
        next();
    }
};


channelForm_ChannelSave = (req, res, next) =>{
    // const arrChannelTypeLeads   = ['YOUTUBER'];
    const arrChannelTypes = CB.arrChannelTypes;
    // const arrChannelLanguages   = [ 'ES', 'EN', 'FR', 'PT', 'other'];
    const arrChannelLanguages = CB.arrChannelLanguages;
    // const arrChannelCategories  = [
    //     'autos-vehicles', 'education', 'entertainment', 'film-animation', 'gaming', 'nonprofits-activism', 'howto-style', 'music', 
    //     'news-politics', 'people-blogs', 'pets-animals', 'science-technology', 'sports', 'travel-events', 'comedy'
    // ];
    const arrChannelCategories = CB.arrChannelCategories;

    if (!req.body){
        // no existe el body 
        sendErrorMDValidate(res, {ValidationError: "el 'body' no existe"});

    } else if (!req.body.channelName || !req.body.channelType || !req.body.clientEmail 
        || !req.body.channelLanguage || !req.body.channelCategory || !req.body.clientInterestingNow) {
        // no existe algun campo    
        sendErrorMDValidate(res, {ValidationError: "Algún campo requerido no llega. Revisa los datos"});

    }else if (req.body.channelName.length < 3){
        // el channelName es muy corto
        sendErrorMDValidate(res, {ValidationError: "el 'channelName' es demasiado corto {min:3}"}); 

    }else if (regExChName.test(req.body.channelName) != true){
        // el channel name no pasa el regex
        sendErrorMDValidate(res, {ValidationError: "el 'channelName' no cumple con los caracteres permitidos. 'a-z A-Z 0-9 ñ Ñ áéíóúÁÉÍÓÚÜü_-@#$.'"});

    }else if (regExEmail.test(req.body.clientEmail) != true){
        // match: [/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "El 'clientEmail' no es válido "],
        sendErrorMDValidate(res, {ValidationError: "el 'clientEmail' no cumple con los caracteres permitidos, para un email válido"});

    }else if (arrChannelTypes.indexOf(req.body.channelType) < 0){
        // enum: ["YOUTUBER"]
        sendErrorMDValidate(res, {ValidationError: "el 'channelType' no coincide con los valores permitidos"});

    }else if (arrChannelLanguages.indexOf(req.body.channelLanguage) < 0){
        // enum: [ 'ES', 'EN', 'FR', 'PT', 'other']
        sendErrorMDValidate(res, {ValidationError: "el 'channelLanguage' no coincide con los valores permitidos"});

    }else if (arrChannelCategories.indexOf(req.body.channelCategory) < 0){
        // enum: ['autos-vehicles', 'education', 'entertainment', 'film-animation', 'gaming', 'nonprofits-activism', 'howto-style', 'music', 
        // 'news-politics', 'people-blogs', 'pets-animals', 'science-technology', 'sports', 'travel-events', 'comedy']
        sendErrorMDValidate(res, {ValidationError: "el 'channelCategory' no coincide con los valores permitidos"});

    }else if (req.body.clientInterestingNow != true && req.body.clientInterestingNow != false){
        // true | false
        sendErrorMDValidate(res, {ValidationError: "el 'clientInterestingNow' debe ser true or false"});
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