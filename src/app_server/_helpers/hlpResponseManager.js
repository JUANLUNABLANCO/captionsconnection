const sendError = ( res,  status, message, origin, statusMessage, error  ) => {
    // object
    let Info = {};
    Info.origin          = origin;
    Info.statusMessage   = statusMessage;
    Info.error           = error;

    Info        = (_ENV == 'development') ? Info        : '--production: Info no se muestra--'; 

    res.status(status).json({
        ok: false,
        status:     status,     
        message:    message,
        // suceptible
        Info:       Info,
    });
}
// envios status 200 + data created
const sendOkData = (res, status, message,  data_public, origin, data_private ) => { 
    
    let Info = {};
    Info.origin = origin;
    Info.data_private = data_private;

    Info        = (_ENV == 'development') ? Info        : '--production: Info no se muestra--';

    res.status(status).json({
        ok: true,
        status: 200,
        message: message,
        data_public: data_public,
        Info: Info,
        
    });
}

module.exports = {
    sendError,
    sendOkData
}