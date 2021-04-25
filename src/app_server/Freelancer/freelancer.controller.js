/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
/* ####### MODELS #######*/
const Freelancer = require("./freelancer.model");
const User = require("../User/user.model");
/* ####### HELPERS ######*/
const ResManager = require("../_helpers/hlpResponseManager");
/* ####### CONTROLLERS ##*/
const freelancerController = {};
/* ####### MIDDLEWARES ##*/

// ############ http://localhost:3333/api/channel/check-channel-exists
freelancerController.checkEmailExists = (req, res) => {
    // console.log("validación correcta");
    // console.log(req.body.email);
    if (req.body.email) {
        // req.body.email
        // buscar ese email
        Freelancer.findOne({ email: req.body.email }, (err, email_finded) => {
            if (err) {
                _PRINT.Console(
                    "500 ERROR BD",
                    "freelancerController.checkEmailExists(Freelancer.FindOne())",
                    err
                );
                // error de servidor
                ResManager.sendError(
                    res,
                    500,
                    "",
                    "checkEmailExists: Freelancer.findOne()",
                    "¡ERROR: BD falló!",
                    err
                );
            } else {
                // ya habia alguien con ese nombre de canal
                if (email_finded) {
                    res.status(200).json({
                        isEmailAvailable: false,
                    });
                } else {
                    res.status(200).json({
                        isEmailAvailable: true,
                    });
                }
            }
        });
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "freelancerController.checkEmailExists(if(req.body == false))",
            "BODY NO VALIDO"
        );
        ResManager.sendError(
            res,
            412,
            "¡El body no existe o no es válido!",
            "checkEmailExists: else(req.body)",
            "¡Preconditions falilled!",
            "Not err BD"
        );
    }
};
// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////
// ######################## http://localhost:3333/api/channel/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]

// WARNING: REVISA LAS FUNCIONES ASINCRONAS Y DATOS RECIBIDOS
// TODO: refactoring async await for methods accesing db and reestructuring data from req.body
// save(req.body) ///no  --> const {name, email, password, ...} = req.body /// evitamos datos inyectados en req.body
// WARNING: REVISA LAS FUNCIONES ASINCRONAS Y DATOS RECIBIDOS

freelancerController.Register = (req, res) => {
    //console.log('in controller');
    // console.log("validación correcta");
    // ######################## viene el req.body
    if (
        req.body.email &&
        req.body.nativeLanguage &&
        req.body.languages &&
        req.body.habilities &&
        req.body.country
    ) {
        // console.log(req.body);
        const email = req.body.email;
        // ######################## buscamos es email
        Freelancer.findOne({ email: email }, (err, email_finded) => {
            if (err) {
                _PRINT.Console(
                    "500 ERROR BD",
                    "freelancerController.Register(Freelancer.FindOne())",
                    err
                );
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError(
                    res,
                    500,
                    "",
                    "Register: Freelancer.findOne()",
                    "¡ERROR: BD Falló!",
                    err
                );
            } else {
                // ya habia alguien con ese email
                if (email_finded) {
                    ResManager.sendError(
                        res,
                        412,
                        "¡Este email ya existe!",
                        "tRegister: freelancer.findOne()",
                        "¡Preconditions Failed!",
                        "Not BD Error"
                    );
                } else {
                    var newFreelancer = new Freelancer(req.body); //
                    _PRINT.Console(
                        "newFreelancer",
                        "freelancerController.Register(Freelancer.findOne(if(email_finded==false)))",
                        newFreelancer
                    );
                    // ######################## creamos el freelancer
                    newFreelancer.save((err, freelancer_created) => {
                        if (err) {
                            _PRINT.Console(
                                "500 ERROR BD",
                                "freelancerController.Register(newFreelancer.save())",
                                err
                            );
                            // error de servidor ( res,  status, message, origin, statusMessage, error  )
                            ResManager.sendError(
                                res,
                                500,
                                "",
                                "Register: newFreelancer.save()",
                                "¡ERROR: BD falló!",
                                err
                            );
                        } else {
                            // USER ######################################### buscar si existe, extraerle el id y actualizar este freelancer
                            User.findOne(
                                { email: freelancer_created.email },
                                (err, user_finded) => {
                                    if (err) {
                                        _PRINT.Console(
                                            "500 ERROR BD",
                                            "freelancerController.Register(User.findOne())",
                                            err
                                        );
                                        ResManager.sendError(
                                            res,
                                            500,
                                            "",
                                            "freelancerController.Register(User.findOne())",
                                            "¡ERROR: BD falló!",
                                            err
                                        );
                                    } else if (user_finded) {
                                        // let _idUser = user_finded._id
                                        Freelancer.findOneAndUpdate(
                                            { email: freelancer_created.email },
                                            {
                                                _idUser: user_finded._id,
                                                registered: true,
                                            },
                                            { new: true },
                                            (err, freelancer_updated) => {
                                                if (err) {
                                                    _PRINT.Console(
                                                        "500 ERROR BD",
                                                        "freelancerController.Register(User.findOne())",
                                                        err
                                                    );
                                                    ResManager.sendError(
                                                        res,
                                                        500,
                                                        "",
                                                        "freelancerController.Register(User.findOne())",
                                                        "¡ERROR: BD falló!",
                                                        err
                                                    );
                                                } else if (freelancer_updated) {
                                                    // OK: ##########################################
                                                    // OK: ##########################################
                                                    _PRINT.Console(
                                                        "200 Freelancer created and updated",
                                                        "freelancerController.Register(User.findOne(freelancer_updated==true))",
                                                        freelancer_updated
                                                    );
                                                    ResManager.sendOkData(
                                                        res,
                                                        200,
                                                        "Nuevo Freelancer creado y actualizado",
                                                        freelancer_created._id,
                                                        "Register:newFreelancer.save()",
                                                        {
                                                            freelancer_created: freelancer_created,
                                                            freelancer_updated: freelancer_updated,
                                                        }
                                                    );
                                                    // OK: ##########################################
                                                    // OK: ##########################################
                                                } // else {} no cabe else porque freelancer_created si existe y lo va a encontrar
                                            }
                                        );
                                    } else {
                                        // OK: ##########################################
                                        // OK: ##########################################
                                        _PRINT.Console(
                                            "200 Freelancer created",
                                            "freelancerController.Register(User.findOne())",
                                            freelancer_created
                                        );
                                        ResManager.sendOkData(
                                            res,
                                            200,
                                            "Nuevo Freelancer creado",
                                            freelancer_created._id,
                                            "Register:newFreelancer.save()",
                                            freelancer_created
                                        );
                                        // OK: ##########################################
                                        // OK: ##########################################
                                    }
                                }
                            );
                        } // not err
                    }); // newFreelance.save()
                    // ######################## creamos el channel
                } // email_finded
            } // not err
        }); // Freelancer.findOne(
        // ######################## buscamos es email
        // ######################## si viene el req.body
        // ######################## no viene el req.body
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "freelancerController.Register(if(req.body==false))",
            "BODY NO VÁLIDO"
        );
        ResManager.sendError(
            res,
            412,
            "El body no existe o es erróneo!",
            "Register: else(req.body)",
            "¡Preconditions failled!",
            "Not err BD"
        );
    }
    // ######################## no viene el req.body
};
// ######################## http://localhost:3333/api/channel/register
// ///////////////////////////////////////////////////////////////////

// http://localhost:3333/api/channel/showAll  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/showAll', channelController.showAllChannels);
// http://localhost:3333/api/channel/details  md[validate][isAuth][userIsUser], headers:[token]
// app_router.get('/details', channelController.detailsChannel);
// http://localhost:3333/api/channel/edit  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/edit', channelController.editChannel);
// http://localhost:3333/api/channel/delete  md[validate][isAuth][userIsUser], headers:[token], put:[data-edit]
// app_router.put('/delete', channelController.deleteChannel);

module.exports = freelancerController;
