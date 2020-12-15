/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const R                     = require('../_configs/general').ROLES;
/* ####### MODELS #######*/
const Client                = require('./client.model');
const User                  = require('../User/user.model');
/* ####### HELPERS ######*/
const ResManager            = require('../_helpers/hlpResponseManager');
/* ####### CONTROLLERS ##*/
const clientController      = {};
/* ####### MIDDLEWARES ##*/

// ############ http://localhost:3333/api/client/check-channel-exists
clientController.checkEmailExists = (req, res) => {
    // console.log(req.body.channelName);
    if (req.body.email ) { // req.body.channelName
        // buscar ese channelName
        Client.findOne({email: req.body.email}, (err, email_finded) =>{ 
            if (err){
                _PRINT.Console('500 ERROR BD', 'clientController.checkEmailExists(Client.findOne())', err);
                // error de servidor
                ResManager.sendError( res, 500, "", "checkChannelNameExists: Channel.findOne()", "¡ERROR: BD falló!", err );
            } else {
                // ya habia alguien con ese nombre de canal
                if ( email_finded  ){
                    res.status(200).json({
                        isEmailAvailable: false
                    });
                }else {
                    res.status(200).json({
                        isEmailAvailable: true
                    });
                }
            }
        });
    } else{
        _PRINT.Console('412 Preconditions Failed', 'clientController.checkEmailExists(if(req.body.email))', 'El body no es correcto, no llega req.body.email');
        ResManager.sendError( res, 412, "¡BODY NO válido!", "checkChannelNameExists: if(req.body.email==false)", "¡Preconditions falilled!",  "Not err BD" );
    }
}
// ############ http://localhost:3333/api/client/check-channel-exists
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// ######################## http://localhost:3333/api/client/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]
clientController.Register = (req, res) =>{
    // ######################## vien el req.body
    if (req.body.email){
        // console.log(req.body);
        const email = req.body.email;
        // ######################## buscamos es channelName
        Client.findOne({email: email}, (err, client_finded) =>{ 
            if (err){
                _PRINT.Console('500 ERROR BD', 'clientController.Register(Client.findOne())', err);
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: Channel.findOne()", "¡ERROR: BD Falló!", err );
            } else {
                // ya habia alguien con ese nombre de canal
                if ( client_finded  ){ 
                    _PRINT.Console('412 Preconditions Failed', 'clientController.Register(Client.findOne())', 'ese email ya existe');
                    // ( res,  status, message, origin, statusMessage, error  )
                    ResManager.sendError( res, 412, "¡Este correo ya existe!", "clientController.Register(Client.findOne())", "¡Preconditions Failed!", "Not BD Error" );
                } else {
                    var newClient = new Client(req.body);// 
                    // console.log(newChannel);
                    // CLIENT ########################## lo  creamos
                    newClient.save((err, client_created) =>{ 
                        // HASK: MIRAR CUAL ES MEJOR ese o este:  Channel.create(new_channel, (err, channel_created) =>{
                        if (err) {
                            _PRINT.Console('500 ERROR BD', 'clientController.Register(newClient.save())', 'ese email ya existe');
                            ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: newChannel.save()", "¡ERROR: BD falló!",  err );
                        } else {

                            // USER ##################### SI EXISTE CON ESTE EMAIL EXTRAER _Id para actualizar client
                            User.findOneAndUpdate(
                                {email: client_created.email},
                                {role: R.ROLE_CLIENT}, 
                                {new: true},
                                (err, user_updated)=>{
                                if (err){
                                    _PRINT.Console('500 ERROR BD', 'clientController.Register(newClient.save())', 'ese email ya existe');
                                    ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: newChannel.save()", "¡ERROR: BD falló!",  err );
                                }else if (user_updated){
                                    // CLIENT ############################## actualizamos client {_idUser: user_finded._id, registered: true}
                                    Client.findOneAndUpdate(
                                        {email: client_created.email},
                                        {_idUser: user_updated._id, registered: true},
                                        {new: true},
                                        (err, client_updated)=>{
                                            if (err){
                                                _PRINT.Console('500 ERROR BD', 'clientController.Register(newClient.save())', 'ese email ya existe');
                                                ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: newChannel.save()", "¡ERROR: BD falló!",  err );
                                            } else { // lo ha actualizado si o si
                                                // OK: ##########################################  
                                                // OK: ##########################################

                                                ResManager.sendOkData(res, 200, "Nuevo cliente creado. Usuario exite, cliente actualizado", client_created._id, 'clientController.Register(newClient.save())',  
                                                {   client_created:     client_created,
                                                    user_updated:        user_updated,
                                                    client_updated:     client_updated });

                                                // OK: ##########################################
                                                // OK: ##########################################
                                            }
                                        });
                                }else {
                                    // OK: ##########################################  
                                    // OK: ##########################################

                                    ResManager.sendOkData(res, 200, "Nuevo cliente creado. No existe usuario", client_created._id, 'clientController.Register(newClient.save())',  
                                    { client_created:     client_created });

                                    // OK: ##########################################
                                    // OK: ##########################################
                                }
                            });
                        } // not err
                    });// newChannel.save()
                    // ######################## creamos el channel
                } // channel_finded
            } // not err
        }); // Channel.findOne(
        // ######################## buscamos es channelName
    // ######################## si viene el req.body
    // ######################## no viene el req.body
    }else{
        ResManager.sendError( res, 412, "El body no existe o algún campo falta", "youtubeChannelClientRegister: else(req.body)", "¡Preconditions failled!", "Not err BD" );
    }
    // ######################## no viene el req.body
};
// ######################## http://localhost:3333/api/client/register
// ///////////////////////////////////////////////////////////////////
// http://localhost:3333/api/client/showAll  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/showAll', clientController.showAllChannels);
// http://localhost:3333/api/client/details  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/details', clientController.detailsChannel);
// http://localhost:3333/api/client/edit  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/edit', clientController.editChannel);
// http://localhost:3333/api/client/delete  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/delete', clientController.deleteChannel);


module.exports = clientController;