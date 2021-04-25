// ######################### RESPONSE MANAGER #################
// ########## sendError #######################################
const sendError = (res, status, message, origin, statusMessage, error) => {
    // object

    let Info = {};
    Info.origin = origin;
    Info.statusMessage = statusMessage;
    Info.error = error;

    Info = _ENV == "development" ? Info : "--production: Info no se muestra--";

    // let name = status==412 ? '412 PRECONDITIONS FAILED': '500 ERROR BD';
    // _PRINT.Console(name, origin, message ); // (name, origin, message)
    res.status(status).json({
        ok: false,
        status: status,
        message: message,
        // suceptible
        Info: Info,
    });
};
// ########## sendError ######################################
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// ######### sendErrorValidate ###############################
const sendErrorValidate = (res, message) => {
    let ok = false,
        status = 412,
        error = "ValidationError";
    let Info = {};
    Info.message = message;

    Info = _ENV == "development" ? Info : "--production: Info no se muestra--";

    // _PRINT.Console('ERROR VALIDATE', origin, message ); // (name, origin, message)
    res.status(status).json({
        ok: ok,
        status: status,
        error: error,
        Info: Info,
    });
};
// ######### sendErrorValidate ###############################
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// ########## sendOkData #####################################
const sendOkData = (
    res,
    status,
    message,
    data_public,
    origin,
    data_private
) => {
    let Info = {};
    Info.origin = origin;
    Info.data_private = data_private;

    Info = _ENV == "development" ? Info : "--production: Info no se muestra--";

    // _PRINT.Console('OK DATA', origin, message ); // (name, origin, message)
    res.status(status).json({
        ok: true,
        status: status,
        message: message,
        data_public: data_public,
        Info: Info,
    });
};
// ########## sendOkData #####################################
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// ########## sendBadRedirect ################################
const sendBadRedirect = (res, status, message, origin, error) => {
    let Info = {};
    Info.origin = origin;
    Info.error = error;

    Info = _ENV == "development" ? Info : "--production: Info no se muestra--";

    // _PRINT.Console( status + ' REDIRECT BAD', origin, message );
    res.status(status).json({
        ok: false,
        status: status,
        message: message + " [ng:redirect]",
        Info: Info,
    });
};
// ########## sendBadRedirect ################################
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
module.exports = {
    sendError,
    sendErrorValidate,
    sendOkData,
    sendBadRedirect,
};
//////////////////////////////////////////////////////////////
// ######################### RESPONSE MANAGER #################
