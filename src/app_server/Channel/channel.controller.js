/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const clientConfig = require("../Client/client.config");
/* ####### MODELS #######*/
const Channel = require("./channel.model");
const Client = require("../Client/client.model");
const User = require("../User/user.model");
/* ####### HELPERS ######*/
const ResManager = require("../_helpers/hlpResponseManager");
/* ####### CONTROLLERS ##*/
const channelController = {};
/* ####### MIDDLEWARES ##*/

// WARNING: REVISA LAS FUNCIONES ASINCRONAS Y DATOS RECIBIDOS
// TODO: refactoring async await for methods accesing db and reestructuring data from req.body
// save(req.body) ///no  --> const {name, email, password, ...} = req.body /// evitamos datos inyectados en req.body
// WARNING: REVISA LAS FUNCIONES ASINCRONAS Y DATOS RECIBIDOS

// ############ http://localhost:3333/api/channel/check-channel-exists
channelController.checkChannelNameExists = (req, res) => {
    // console.log(req.body.channelName);
    if (req.body.channelName) {
        // req.body.channelName
        // buscar ese channelName
        Channel.findOne(
            { channelName: req.body.channelName },
            (err, channel_finded) => {
                if (err) {
                    _PRINT.Console(
                        "500 ERROR BD",
                        "channelController.checkChannelNameExists(Channel.findOne())",
                        err
                    );
                    // error de servidor
                    ResManager.sendError(
                        res,
                        500,
                        "",
                        "checkChannelNameExists: Channel.findOne()",
                        "¡ERROR: BD falló!",
                        err
                    );
                } else {
                    // ya habia alguien con ese nombre de canal
                    if (channel_finded) {
                        res.status(200).json({
                            isChannelNameAvailable: false,
                        });
                    } else {
                        res.status(200).json({
                            isChannelNameAvailable: true,
                        });
                    }
                }
            }
        );
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "channelController.checkChannelNameExists(if(req.body == false))",
            "no llegan datos correctos"
        );
        ResManager.sendError(
            res,
            412,
            "¡El body no existe o no es correcto!",
            "checkChannelNameExists: else(req.body)",
            "¡Preconditions falilled!",
            "Not err BD"
        );
    }
};
// ############ http://localhost:3333/api/channel/check-channel-exists
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// ######################## http://localhost:3333/api/channel/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]
channelController.youtubeChannelClientRegister = (req, res) => {
    // ######################## vien el req.body
    if (
        req.body.channelName &&
        req.body.clientEmail &&
        req.body.channelType &&
        req.body.channelLanguage &&
        req.body.channelCategory
    ) {
        // _PRINT.Console(req.body);
        const channelName = req.body.channelName;
        // CHANNEL ######################## buscamos es channelName
        Channel.findOne({ channelName: channelName }, (err, channel_finded) => {
            if (err) {
                _PRINT.Console(
                    "500 ERROR BD",
                    "channelController.youtubeChannelClientRegister(Channel.findOne())",
                    err
                );
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError(
                    res,
                    500,
                    "",
                    "youtubeChannelClientRegister: Channel.findOne()",
                    "¡ERROR: BD Falló!",
                    err
                );
            } else {
                // ya habia alguien con ese nombre de canal
                if (channel_finded) {
                    ResManager.sendError(
                        res,
                        412,
                        "¡Este canal ya existe!",
                        "youtubeChannelClientRegister: Channel.findOne()",
                        "¡Preconditions Failed!",
                        "Not BD Error"
                    );
                } else {
                    var newChannel = new Channel(req.body); //
                    // console.log(newChannel);
                    // ######################## creamos el channel
                    newChannel.save((err, channel_created) => {
                        if (err) {
                            // error de servidor
                            _PRINT.Console(
                                "500 ERROR BD",
                                "channelController.youtubeChannelClientRegister(Channel.save())",
                                err
                            );
                            ResManager.sendError(
                                res,
                                500,
                                "",
                                "youtubeChannelClientRegister: newChannel.save()",
                                "¡ERROR: BD falló!",
                                err
                            );
                        } else {
                            // CLIENT ############################# ACTUALIZA O CREA
                            Client.findOneAndUpdate(
                                { email: channel_created.clientEmail }, // el documento
                                { $push: { _idChannels: channel_created._id } }, // actualizacion nuevo dato en array
                                { new: true }, // que devuelva el documento actualizado
                                (err, client_updated) => {
                                    // sino lo actualiza client_updated = null
                                    if (err) {
                                        // error de servidor
                                        _PRINT.Console(
                                            "500 ERROR BD",
                                            "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate())",
                                            err
                                        );
                                        ResManager.sendError(
                                            res,
                                            500,
                                            "",
                                            "youtubeChannelClientRegister: Client.findOneAndUpdate()",
                                            "¡ERROR: BD falló!",
                                            err
                                        );
                                    } else {
                                        // ############################ ha sido actualizado el cliente o no?
                                        if (client_updated) {
                                            _PRINT.Console(
                                                "if(client_updated == true)",
                                                "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate(client_updated==true))",
                                                client_updated
                                            );
                                            let reason = "cliente actualizado";
                                            // let _idClient = client_updated._id;
                                            actualizaChannel(
                                                client_updated,
                                                reason
                                            );
                                        } else {
                                            // ######################## creación de un nuevo cliente
                                            _PRINT.Console(
                                                "if(client_updated == false)",
                                                "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate(client_updated==false))",
                                                null
                                            );
                                            let customerJourney = channel_created.clientInterestingNow
                                                ? clientConfig
                                                      .arrCustomersJourney[1]
                                                : clientConfig
                                                      .arrCustomersJourney[0];
                                            _PRINT.Console(
                                                "customerJourney",
                                                "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate(if(client_updated==false)))",
                                                customerJourney
                                            );
                                            newClient = new Client({
                                                registered: false,
                                                email:
                                                    channel_created.clientEmail,
                                                customerJourney: customerJourney,
                                                typeClient:
                                                    channel_created.clientType,
                                                interested:
                                                    channel_created.clientInterestingNow,
                                                _idChannels:
                                                    channel_created._id,
                                            });
                                            _PRINT.Console(
                                                "newClient",
                                                "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate(if(client_updated==false)))",
                                                newClient
                                            );
                                            newClient.save(
                                                (err, client_created) => {
                                                    // HASK: MIRAR CUAL ES MEJOR ese o este:  Channel.create(new_channel, (err, channel_created) =>{
                                                    if (err) {
                                                        _PRINT.Console(
                                                            "500 ERROR BD",
                                                            "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate(if(newClient.save())))",
                                                            err
                                                        );
                                                        // error de servidor
                                                        ResManager.sendError(
                                                            res,
                                                            500,
                                                            "",
                                                            "youtubeChannelClientRegister: newClient.save()",
                                                            "¡ERROR: BD falló!",
                                                            err
                                                        );
                                                    } else {
                                                        _PRINT.Console(
                                                            "client_created",
                                                            "channelController.youtubeChannelClientRegister(newClient.save())",
                                                            client_created
                                                        );
                                                        // clientUpdatedOrCreated = client_created;
                                                        // _idClient = client_created._id;
                                                        let reason =
                                                            "cliente creado, no actualizado";
                                                        actualizaChannel(
                                                            client_created,
                                                            reason
                                                        );
                                                    }
                                                }
                                            );
                                            // ######################## creación de un nuevo cliente
                                        }
                                        // CHANNEL ####################### funcion que debe ejecutarse en cualquiera de los dos casos: client_updated  or client_cretaed
                                        function actualizaChannel(
                                            clientUpdatedOrCreated,
                                            reason
                                        ) {
                                            _PRINT.Console(
                                                "reason",
                                                "channelController.youtubeChannelClientRegister(actualizaChannel)",
                                                reason
                                            );
                                            // ############################ actualizacion de channel_created
                                            // console.log(_idClient);
                                            Channel.findOneAndUpdate(
                                                { _id: channel_created._id }, // encuentra este
                                                {
                                                    _idClient:
                                                        clientUpdatedOrCreated._id,
                                                }, // nuevos datos a actualizar
                                                { new: true }, // para recoger el nuevo actualizado
                                                function (
                                                    err,
                                                    channel_updated
                                                ) {
                                                    if (err) {
                                                        _PRINT.Console(
                                                            "500 ERROR BD",
                                                            "channelController.youtubeChannelClientRegister(Channel.findOneAndUpdate())",
                                                            err
                                                        );
                                                        ResManager.sendError(
                                                            res,
                                                            500,
                                                            "",
                                                            "youtubeChannelClientRegister: Channel.findOneAndUpdate()",
                                                            "¡ERROR: BD falló!",
                                                            err
                                                        );
                                                    } else {
                                                        // actualizando o creando el usuario ##################
                                                        // USER ############################### buscar user.email exists
                                                        User.findOne(
                                                            {
                                                                email:
                                                                    channel_created.clientEmail,
                                                            },
                                                            (
                                                                err,
                                                                user_finded
                                                            ) => {
                                                                if (err) {
                                                                    _PRINT.Console(
                                                                        "500 ERROR BD",
                                                                        "channelController.youtubeChannelClientRegister(User.findOneAndUpdate())",
                                                                        err
                                                                    );
                                                                    ResManager.sendError(
                                                                        res,
                                                                        500,
                                                                        "",
                                                                        "youtubeChannelClientRegister: Channel.findOneAndUpdate()",
                                                                        "¡ERROR: BD falló!",
                                                                        err
                                                                    );
                                                                } else if (
                                                                    user_finded
                                                                ) {
                                                                    // USER ############################### actualizar el {_idUser: user_finded._id, regsitered: true}
                                                                    Client.findOneAndUpdate(
                                                                        {
                                                                            email:
                                                                                channel_created.clientEmail,
                                                                        },
                                                                        {
                                                                            _idUser:
                                                                                user_finded._id,
                                                                            registered: true,
                                                                        },
                                                                        {
                                                                            new: true,
                                                                        },
                                                                        (
                                                                            err,
                                                                            client_updated
                                                                        ) => {
                                                                            if (
                                                                                err
                                                                            ) {
                                                                                _PRINT.Console(
                                                                                    "500 ERROR BD",
                                                                                    "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate())",
                                                                                    err
                                                                                );
                                                                                ResManager.sendError(
                                                                                    res,
                                                                                    500,
                                                                                    "",
                                                                                    "channelController.youtubeChannelClientRegister(Client.findOneAndUpdate())",
                                                                                    "¡ERROR: BD falló!",
                                                                                    err
                                                                                );
                                                                            } else if (
                                                                                client_updated
                                                                            ) {
                                                                                // actualizar cliente para {registered:true}
                                                                                // OK: ##########################################
                                                                                // OK: ##########################################
                                                                                // sendOkData = (res, status, message,  data_public, origin, data_private )
                                                                                ResManager.sendOkData(
                                                                                    res,
                                                                                    201,
                                                                                    "¡Nuevo 'Canal' creado!. cliente actualizado, canal actualizado y cliente actualizado",
                                                                                    channel_created._id,
                                                                                    "from: channelController.youtubeChannelClientRegister(Channel.findOneAndUpdate(user_updated==true))",
                                                                                    {
                                                                                        channel: channel_created,
                                                                                        client: clientUpdatedOrCreated,
                                                                                        channel_updated: channel_updated,
                                                                                        client_updated: client_updated,
                                                                                    }
                                                                                );
                                                                                // OK: ##########################################
                                                                                // OK: ##########################################
                                                                            } // si no hay error else debe ser actualizado por fuerza, porque existe
                                                                        }
                                                                    );
                                                                } else {
                                                                    // NO CREAREMOS EL USUARIO PUES NOS FALTA name, password, etc
                                                                    // OK: ##########################################
                                                                    // OK: ##########################################
                                                                    // sendOkData = (res, status, message,  data_public, origin, data_private )
                                                                    ResManager.sendOkData(
                                                                        res,
                                                                        201,
                                                                        "¡Nuevo 'Canal' creado!. cliente actualizado y canal actualizado",
                                                                        channel_created._id,
                                                                        "from: channelController.youtubeChannelClientRegister(Channel.findOneAndUpdate(user_updated==false))",
                                                                        {
                                                                            channel_created: channel_created,
                                                                            client: clientUpdatedOrCreated,
                                                                            channel_updated: channel_updated,
                                                                        }
                                                                    );
                                                                    // OK: ##########################################
                                                                    // OK: ##########################################
                                                                }
                                                            }
                                                        );
                                                        // USER ############################### buscar user.email exists

                                                        // actualizando o creando el cliente ##################
                                                    } // no err
                                                }
                                            ); // Channel.findOneAndUpdate()
                                            // ############################ actualizacion de channel_created
                                        } // CHANNEL  fin function actualizaChannel ()
                                        // ####################### funcion que debe ejecutarse en cualquiera de los dos casos: client_updated  or client_cretaed
                                    } // not err
                                }
                            ); // CLIENT  Client.findOneAndUpdate()
                            // CLIENT ############################# ACTUALIZA O CREA
                        } // not err
                    }); // newChannel.save()
                    // ######################## creamos el channel
                } // channel_finded
            } // not err
        }); // CHANNEL Channel.findOne(
        // ######################## buscamos es channelName
        // ######################## si viene el req.body
        // ######################## no viene el req.body
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "channelController.youtubeChannelClientRegister(if(req.body == false))",
            "El body no existe"
        );
        ResManager.sendError(
            res,
            412,
            "El body no existe",
            "youtubeChannelClientRegister: else(req.body)",
            "¡Preconditions failled!",
            "Not err BD"
        );
    }
    // ######################## no viene el req.body
};
// ######################## http://localhost:3333/api/channel/register
// ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// http://localhost:3333/api/channel/showAll  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/showAll', channelController.showAllChannels);
// http://localhost:3333/api/channel/details  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/details', channelController.detailsChannel);
// http://localhost:3333/api/channel/edit  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/edit', channelController.editChannel);
// http://localhost:3333/api/channel/delete  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/delete', channelController.deleteChannel);

module.exports = channelController;
