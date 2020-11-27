/* ####### MODELS #######*/
const Channel   = require('./channel.model');
const Client    = require('../models/client.model');
const CB        = require('../_configs/constsBusiness');
const ResManager = require('../_helpers/hlpResponseManager');


const channelController = {};
// let _ENVLie = 'production';


// ######################## http://localhost:3333/api/channel/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]
channelController.youtubeChannelClientRegister = (req, res) =>{
    // ######################## vien el req.body
    if (req.body){
        // console.log(req.body);
        const channelName = req.body.channelName;
        // ######################## buscamos es channelName
        Channel.findOne({channelName: channelName}, (err, channel_finded) =>{ 
            if (err){
                console.log(err);
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: Channel.findOne()", "¡ERROR: BD Falló!", err );
            } else {
                // ya habia alguien con ese nombre de canal
                if ( channel_finded  ){
                    ResManager.sendError( res, 412, "¡Este canal ya existe!", "youtubeChannelClientRegister: Channel.findOne()", "¡Preconditions Failed!", "Not BD Error" );
                } else {
                    var newChannel = new Channel(req.body);// 
                    // console.log(newChannel);
                    // ######################## creamos el channel
                    newChannel.save((err, channel_created) =>{ 
                        // HASK: MIRAR CUAL ES MEJOR ese o este:  Channel.create(new_channel, (err, channel_created) =>{
                        if (err) {
                            // error de servidor
                            ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: newChannel.save()", "¡ERROR: BD falló!",  err );
                        } else {
                            // BUSCAR ESE CLIENTE POR EL CORREO QUE DEBE SER { unique:true }
                            // si lo encuentra actualizamos el cliente
                            // si no lo encuentra lo creamos
                            // ######################## actualización de cliente
                            let updateClientNewChannel = channel_created._id;
                            Client.findOneAndUpdate(
                                {email: channel_created.clientEmail},                       // el documento
                                {$push: { _idChannels: updateClientNewChannel }},           // actualizacion nuevo dato en array
                                {new: true},                                                // que devuelva el documento actualizado
                                (err, client_updated) =>{                                   // sino lo actualiza client_updated = null
                                if (err){
                                    // error de servidor
                                    ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: Client.findOneAndUpdate()", "¡ERROR: BD falló!", err );  
                                } else { 
                                    let _idClient = null;                                   // para actualizar el channel
                                    let clientUpdatedOrCreated = null;                      // para devolver el dato creado o actualizado             
                                    // ############################ ha sido actualizado el cliente o no?
                                    if (client_updated){
                                        // console.log('in client_updated ...', client_updated);
                                        clientUpdatedOrCreated = client_updated;
                                        _idClient = client_updated._id;
                                    }else {
                                        // ######################## creación de un nuevo cliente
                                        let customerJourney = channel_created.clientInterestingNow ? CB.arrCustomersJourney[1] : CB.arrCustomersJourney[0]; 
                                        console.log('customerJourney: ', customerJourney);
                                        newClient = new Client ({
                                            registered:         false,
                                            email:              channel_created.clientEmail,
                                            customerJourney:    customerJourney,
                                            typeClient:         channel_created.clientType,
                                            interested:         channel_created.clientInterestingNow,
                                            _idChannels:        channel_created._id
                                        });
                                        console.log(newClient);
                                        newClient.save((err, client_created) =>{ 
                                            // HASK: MIRAR CUAL ES MEJOR ese o este:  Channel.create(new_channel, (err, channel_created) =>{
                                            if (err) {
                                                // error de servidor
                                                ResManager.sendError( res, 500, "","youtubeChannelClientRegister: newClient.save()", "¡ERROR: BD falló!",  err );
                                            } else {
                                                console.log('in client_created', client_created );
                                                clientUpdatedOrCreated = client_created;
                                                _idClient = client_created._id;
                                            }
                                        });
                                        // ######################## creación de un nuevo cliente
                                    }
                                    // ############################ actualizacion de channel_created
                                    // console.log(_idClient);
                                    Channel.findOneAndUpdate(
                                        {_id: channel_created._id},                     // encuentra este 
                                        {_idClient: _idClient},                // nuevos datos a actualizar
                                        {new: true},                                    // para recoger el nuevo actualizado
                                        function(err, channel_updated){
                                            if (err) {
                                                // error de servidor
                                                ResManager.sendError( res, 500, "", "youtubeChannelClientRegister: Channel.findOneAndUpdate()", "¡ERROR: BD falló!",  err );
                                            } else { 
                                                // OK: ##########################################  
                                                // OK: ##########################################
                                                res.status(200).json({
                                                    ok: true,
                                                    status: 200,
                                                    message: "Nuevo 'clientChannel' creado!",
                                                    channel:    channel_created,
                                                    client:     clientUpdatedOrCreated,
                                                    channel_updated: channel_updated
                                                });
                                                // OK: ##########################################
                                                // OK: ##########################################
                                            } // no err
                                    }); // Channel.findOneAndUpdate()
                                    // ############################ actualizacion de channel_created
                                } // not err
                            }); // Client.findOneAndUpdate()
                            // ######################## actualización de cliente
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
        ResManager.sendError( res, 412, "El body no existe", "youtubeChannelClientRegister: else(req.body)", "¡Preconditions failled!", "Not err BD" );
    }
    // ######################## no viene el req.body
};
// ######################## http://localhost:3333/api/channel/register
// ///////////////////////////////////////////////////////////////////
// ############ http://localhost:3333/api/channel/check-channel-exists
channelController.checkChannelNameExists = (req, res) => {
    // console.log(req.body.channelName);
    if (req.body.channelName ) { // req.body.channelName
        // buscar ese channelName
        Channel.findOne({channelName: req.body.channelName}, (err, channel_finded) =>{ 
            if (err){
                console.log(err);
                // error de servidor
                ResManager.sendError( res, 500, "", "checkChannelNameExists: Channel.findOne()", "¡ERROR: BD falló!", err );
            } else {
                // ya habia alguien con ese nombre de canal
                if ( channel_finded  ){
                    res.status(200).json({
                        isChannelNameAvailable: false
                    });
                }else {
                    res.status(200).json({
                        isChannelNameAvailable: true
                    });
                }
            }
        });
    } else{
        ResManager.sendError( res, 412, "¡El body no existe!", "checkChannelNameExists: else(req.body)", "¡Preconditions falilled!",  "Not err BD" );
    }
}
// http://localhost:3333/api/channel/showAll  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/showAll', channelController.showAllChannels);
// http://localhost:3333/api/channel/details  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/details', channelController.detailsChannel);
// http://localhost:3333/api/channel/edit  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/edit', channelController.editChannel);
// http://localhost:3333/api/channel/delete  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/delete', channelController.deleteChannel);


module.exports = channelController;