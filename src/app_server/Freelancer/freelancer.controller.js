/* ####### MODELS #######*/
const Freelancer    = require('./freelancer.model');
const CB            = require('../_configs/constsBusiness');
const ResManager    = require('../_helpers/hlpResponseManager')


const freelancerController = {};
// let _ENVLie = 'production';


// ######################## http://localhost:3333/api/channel/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]
freelancerController.Register = (req, res) =>{console.log('in controller');
    console.log("validación correcta");
    // ######################## viene el req.body
    if (req.body){
        console.log(req.body);
        const email = req.body.email;
        // ######################## buscamos es email
        Freelancer.findOne({email: email}, (err, email_finded) =>{ 
            if (err){
                console.log(err);
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError( res, 500, "", "Register: Freelancer.findOne()", "¡ERROR: BD Falló!",  err );
            } else {
                // ya habia alguien con ese email
                if ( email_finded  ){
                    ResManager.sendError( res, 412, "¡Este email ya existe!", "tRegister: freelancer.findOne()", "¡Preconditions Failed!", "Not BD Error" );
                } else {
                    var newFreelancer = new Freelancer(req.body);// 
                    // console.log(newFreelancer);
                    // ######################## creamos el freelancer
                    newFreelancer.save((err, freelancer_created) =>{ 
                        if (err) {
                            // error de servidor ( res,  status, message, origin, statusMessage, error  )
                            ResManager.sendError( res, 500, "", "Register: newFreelancer.save()", "¡ERROR: BD falló!", err );
                        } else {
                            // OK: ##########################################  
                            // OK: ##########################################
                            ResManager.sendOkData(res, 200, "Nuevo Freelancer creado", freelancer_created._id, 'Register:newFreelancer.save()', freelancer_created);
                            // res.status(200).json({
                            //     ok: true,
                            //     status: 200,
                            //     message: "Nuevo 'clientChannel' creado!",
                            //     freelancer: freelancer_created
                            // });
                            // OK: ##########################################
                            // OK: ##########################################
                        } // not err
                    });// newFreelance.save()
                    // ######################## creamos el channel
                } // email_finded
            } // not err
        }); // Freelancer.findOne(
        // ######################## buscamos es email
    // ######################## si viene el req.body
    // ######################## no viene el req.body
    }else{
        ResManager.sendError( res, 412, "El body no existe", "Register: else(req.body)", "¡Preconditions failled!", "Not err BD" );
    }
    // ######################## no viene el req.body
};
// ######################## http://localhost:3333/api/channel/register
// ///////////////////////////////////////////////////////////////////
// ############ http://localhost:3333/api/channel/check-channel-exists
freelancerController.checkEmailExists = (req, res) => {
    console.log("validación correcta");
    console.log(req.body.email);
    if (req.body.email ) { // req.body.email
        // buscar ese email
        Freelancer.findOne({email: req.body.email}, (err, email_finded) =>{ 
            if (err){
                console.log(err);
                // error de servidor
                ResManager.sendError( res, 500, "", "checkEmailExists: Freelancer.findOne()", "¡ERROR: BD falló!", err );
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
        ResManager.sendError( res, 412, "¡El body no existe!", "checkEmailExists: else(req.body)", "¡Preconditions falilled!", "Not err BD" );
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


module.exports = freelancerController;