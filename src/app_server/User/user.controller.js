/* ####### MODULES ######*/
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const R = _ROLES;
/* ####### MODELS #######*/
const User = require("./user.model");
const Client = require("../Client/client.model");
const Freelancer = require("../Freelancer/freelancer.model");
/* ####### HELPERS ######*/
const ResManager = require("../_helpers/hlpResponseManager");
/* ####### CONTROLLERS ##*/
const userController = {};
/* ####### MIDDLEWARES ##*/

// ############ http://localhost:3333/api/channel/check-channel-exists
userController.checkEmailExists = (req, res) => {
    console.log("in userController(): ", req.body);
    if (req.body.email) {
        // req.body.channelName
        // buscar ese channelName
        User.findOne({ email: req.body.email }, (err, user_finded) => {
            if (err) {
                _PRINT.Console(
                    "500 ERROR BD",
                    "userController.checkEmailExists(User.findOne())",
                    err
                );
                // error de servidor
                ResManager.sendError(
                    res,
                    500,
                    "",
                    "userController.checkEmailExists(User.findOne())",
                    "¡ERROR: BD falló!",
                    err
                );
            } else {
                // ya habia alguien con ese nombre de canal
                if (user_finded) {
                    res.status(200).json({
                        isUserEmailAvailable: false,
                    });
                } else {
                    res.status(200).json({
                        isUserEmailAvailable: true,
                    });
                }
            }
        });
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "userController.checkEmailExists(if(req.body == false))",
            "no llegan datos correctos"
        );
        ResManager.sendError(
            res,
            412,
            "¡El body no existe o no es correcto!",
            "userController.checkEmailExists(if(req.body==false))",
            "¡Preconditions falilled!",
            "Not err BD"
        );
    }
};

// ######################## http://localhost:3333/api/channel/register  md[validate][isAuth][userIsUser], headers:[token], post:[data-register]
userController.Register = (req, res) => {
    // ######################## vien el req.body
    // console.log('in userController(): ', req.body);
    if (
        req.body.name &&
        req.body.email &&
        req.body.confirmEmail &&
        req.body.password &&
        req.body.role
    ) {
        // _PRINT.Console(req.body);
        const email = req.body.email;
        // ######################## buscamos ese email
        User.findOne({ email: email }, async (err, user_finded) => {
            if (err) {
                _PRINT.Console(
                    "500 ERROR BD",
                    "userController.Register(User.findOne())",
                    err
                );
                // error de servidor: ResManager.sendError( res, error, status, origin, statusMessage, message  )
                ResManager.sendError(
                    res,
                    500,
                    "",
                    "userController.Register(User.findOne())",
                    "¡ERROR: BD Falló!",
                    err
                );
            } else {
                // ya habia alguien con ese nombre de canal
                if (user_finded) {
                    ResManager.sendError(
                        res,
                        412,
                        "¡Este email ya existe!",
                        "userController.Register(User.findOne(if(user_finded==true)))",
                        "¡Preconditions Failed!",
                        "Not BD Error"
                    );
                } else {
                    var newUser = new User(req.body); //
                    // emails coinciden?
                    if (
                        newUser.confirmEmails(
                            req.body.email,
                            req.body.confirmEmail
                        )
                    ) {
                        newUser.password = await newUser.encryptPassword(
                            req.body.password
                        ); // encriptación de contraseña
                        // USER ######################## user save
                        newUser.save((err, user_created) => {
                            if (err) {
                                // error de servidor
                                _PRINT.Console(
                                    "500 ERROR BD",
                                    "userController.Register(newUser.save())",
                                    err
                                );
                                ResManager.sendError(
                                    res,
                                    500,
                                    "",
                                    "userController.Register(newUser.save())",
                                    "¡ERROR: BD falló!",
                                    err
                                );
                            } else {
                                ////////////////////////////////////////////
                                // USERISFREELANCER ######################## si usuario role es freelancer creamos o actualizamos un freelancer con {_idUser : user_creted._id}
                                if (user_created.role == R.ROLE_FREELANCER) {
                                    // actualizaremos el freelancer {_idUser: user._id, registered:true} solo si existe
                                    Freelancer.findOneAndUpdate(
                                        { email: user_created.email },
                                        {
                                            _idUser: user_created._id,
                                            registered: true,
                                        },
                                        { new: true },
                                        (err, freelancer_updated) => {
                                            if (err) {
                                                ResManager.sendError(
                                                    res,
                                                    500,
                                                    "ERROR. BD falló!",
                                                    "userController.Registe(Freelancer.findOneAndUpdate())",
                                                    "BD ERROR"
                                                );
                                            } else if (freelancer_updated) {
                                                // USER ################################################# ACTUALIZACION ROLE
                                                User.findOneAndUpdate(
                                                    {
                                                        email:
                                                            user_created.email,
                                                    },
                                                    { role: R.ROLE_FREELANCER },
                                                    { new: true },
                                                    (err, userRole_updated) => {
                                                        if (err) {
                                                            ResManager.sendError(
                                                                res,
                                                                500,
                                                                "ERROR. BD falló!",
                                                                "userController.Registe(User.findOneAndUpdate(userRole_update))",
                                                                "BD ERROR"
                                                            );
                                                        } else {
                                                            // FREELANCER ############################################
                                                            _PRINT.Console(
                                                                "USER-FREELANCER",
                                                                "userController.Register(newUser.save(freelancer_updated==true))",
                                                                "USUARIO CREADO. FREELANCER ACTUALIZADO"
                                                            );
                                                            ResManager.sendOkData(
                                                                res,
                                                                200,
                                                                "Nuevo usuario de tipo freelancer creado y freelancer actualizado",
                                                                user_created._id,
                                                                "userController.Register(newUser.save())",
                                                                {
                                                                    user_created: user_created,
                                                                    freelancer_updated: freelancer_updated,
                                                                    userRole_updated: userRole_updated,
                                                                }
                                                            );
                                                            // FREELANCER ############################################
                                                        }
                                                    }
                                                );
                                                // USER ################################################# ACTUALIZACION ROLE
                                            } else {
                                                // FREELANCER ############################################
                                                _PRINT.Console(
                                                    "USER-FREELANCER",
                                                    "userController.Register(newUser.save(freelancer_updated==false))",
                                                    "USUARIO CREADO. FREELANCER NO ACTUALIZADO"
                                                );
                                                ResManager.sendOkData(
                                                    res,
                                                    200,
                                                    "Nuevo usuario de tipo freelancer creado. Freelancer no existía!",
                                                    user_created._id,
                                                    "userController.Register(newUser.save())",
                                                    user_created
                                                );
                                                // ######################## actualización de cliente
                                                // FREELANCER ############################################
                                            }
                                        }
                                    );
                                }
                                // USERISFREELANCER ######################## si usuario role es freelancer creamos o actualizamos un freelancer con {_idUser : user_creted._id}
                                ////////////////////////////////////////////
                                // USERISCLIENT ############################ si usuario role es client creamos o actualizamos un client con {_idUser : user_creted._id}
                                else if (user_created.role == R.ROLE_CLIENT) {
                                    // actualizaremos el freelancer {_idUser: user._id, registered:true} solo si existe
                                    Client.findOneAndUpdate(
                                        { email: user_created.email },
                                        {
                                            _idUser: user_created._id,
                                            registered: true,
                                        },
                                        { new: true },
                                        (err, client_updated) => {
                                            if (err) {
                                                ResManager.sendError(
                                                    res,
                                                    500,
                                                    "ERROR. BD falló!",
                                                    "userController.Registe(Freelancer.findOneAndUpdate())",
                                                    "BD ERROR"
                                                );
                                            } else if (client_updated) {
                                                // USER ################################################# ACTUALIZACION ROLE
                                                User.findOneAndUpdate(
                                                    {
                                                        email:
                                                            user_created.email,
                                                    },
                                                    { role: R.ROLE_CLIENT },
                                                    { new: true },
                                                    (err, userRole_updated) => {
                                                        if (err) {
                                                            ResManager.sendError(
                                                                res,
                                                                500,
                                                                "ERROR. BD falló!",
                                                                "userController.Registe(User.findOneAndUpdate(userRole_update))",
                                                                "BD ERROR"
                                                            );
                                                        } else {
                                                            // CLIENT ############################################
                                                            _PRINT.Console(
                                                                "USER",
                                                                "userController.Register(newUser.save(client_updated==true))",
                                                                "USUARIO CREADO. CLIENTE ACTUALIZADO"
                                                            );
                                                            ResManager.sendOkData(
                                                                res,
                                                                200,
                                                                "Nuevo usuario de tipo client creado y client actualizado",
                                                                user_created._id,
                                                                "userController.Register(newUser.save(client_updated==true))",
                                                                {
                                                                    user_created: user_created,
                                                                    client_updated: client_updated,
                                                                    userRole_updated: userRole_updated,
                                                                }
                                                            );
                                                            // ######################## actualización de cliente
                                                            // CLIENT ############################################
                                                        }
                                                    }
                                                );
                                                // USER ################################################# ACTUALIZACION ROLE
                                            } else {
                                                // CLIENT ############################################
                                                _PRINT.Console(
                                                    "USER",
                                                    "userController.Register(newUser.save(client_updated==false))",
                                                    "USUARIO CREADO. CLIENTE NO ACTUALIZADO"
                                                );
                                                ResManager.sendOkData(
                                                    res,
                                                    200,
                                                    "Nuevo usuario de tipo client creado. client no existía!",
                                                    user_created._id,
                                                    "userController.Register(newUser.save(client_updated==false))",
                                                    user_created
                                                );
                                                // ######################## actualización de cliente
                                                // CLIENT ############################################
                                            }
                                        }
                                    );
                                }

                                // USERISCLIENT ############################ si usuario role es client creamos o actualizamos un client con {_idUser : user_creted._id}
                                ////////////////////////////////////////////
                                // USERISUSER ############################## no hacemos nada
                                else {
                                    // USER ############################################
                                    _PRINT.Console(
                                        "USER",
                                        "userController.Register(newUser.save())",
                                        "USUARIO CREADO. NI CLIENTE NI FREELANCER. user is only user"
                                    );
                                    ResManager.sendOkData(
                                        res,
                                        200,
                                        "Nuevo usuario creado. No es cliente ni es freelancer",
                                        user_created._id,
                                        "userController.Register(newUser.save())",
                                        user_created
                                    );
                                    // ######################## actualización de cliente
                                    // USER ############################################
                                }
                                // USERISUSER ############################## no hacemos nada
                                ////////////////////////////////////////////
                            } // not err
                        }); // newUser.save()
                        // ######################## creamos el USER
                    } else {
                        // la pasword y el confirmPassword no son iguales
                        ResManager.sendError(
                            res,
                            412,
                            "passwords no coinciden",
                            "userController.register(newUser.confirmPasswords(req.body.password, req.body.confirmPassword)==false)",
                            "Preconditions Failed",
                            "not bd error"
                        );
                    }
                } // channel_finded
            } // not err
        }); // Channel.findOne(
        // ######################## buscamos ese email
        // ######################## si viene el req.body
        // ######################## no viene el req.body
    } else {
        _PRINT.Console(
            "412 Preconditions Failed",
            "userController.Register(if(req.body == false))",
            "el body es inválido"
        );
        ResManager.sendError(
            res,
            412,
            "BODY NO válido",
            "userController.Register(if(req.body==true))",
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

/** 
 * 
//http://localhost:3333/api/user/register  [data] registro de usuario
// HASK: async? await?
userController.userRegister = (req, res) =>{
    const email = req.body.email;
    User.findOne({email: email.toLowerCase()}, async (err, user_finded) =>{ 
        if (err){
            // error de servidor
            res.status(500).json({
                ok: false,
                status: 500,
                message: "ERROR: bd falló! user.post.login",
                error: err
            });
        } else {
            // ya habia alguien con ese email
            if (user_finded != null){
                res.status(401).json({
                    ok: false,
                    status: 401,
                    message: "Ese email esta pillado wei!", 
                });
            }else {
                var newUser = new User(req.body);// name. email, password
                newUser.password =  await newUser.encryptPassword(req.body.password);
                // console.log(newUser);
                newUser.save((err, user_created) =>{ // await???
                    if (err) {
                        // error de servidor
                        res.status(500).json({
                            ok: false,
                            status: 500,
                            message: "ERROR: bd falló! volver a registrar",
                            errors: err
                        });
                    } else {
                        
                        // SESSION: ##############################################################
                        req.session.userId = user_created._id;
                        // SESSION: ##############################################################
                        const token = _jwt.createToken(_dataUser.getTokenUserData(user_created));

                        res.status(200).header('auth-token', token ).json({
                            ok: true,
                            status: 200,
                            message: "user creado en la bd!. Asumir login.",
                            'auth-token': token,
                            user: _dataUser.getPublicUserData(user_created)
                        });
                    } 
                });
            }
        }

    });

    
};
//http://localhost:3333/api/user/login [GET]
// #######################################################
// ### que se encargue angular de las vistas no te parece!!!
// #########################################################

//http://localhost:3333/api/user/login  [data]  // ####### método sin passport
userController.userLogin =  (req, res) =>{
    var email = req.body.email;

     User.findOne( {email: email},async (err, user_finded) =>{
        if (err) {
            // error de servidor
            res.status(500).json({
                ok: false,
                status: 500,
                message: "ERROR: bd falló! user.post.login",
                error: err
            });
        } else {// lo encuentra o no
            // no falló pero no hay coincidencias
            if (user_finded == null){
                res.status(401).json({
                    ok: false,
                    status: 401,
                    message: "usuario no existe!",
                    user_finded: null 
                });
            // no falló y hay coincidencias
            } else {
                // var password_db = user_finded.password;  // encrypted password
                var same = await user_finded.matchPassword(req.body.password); 
                // console.log(same);
                if(!same){
                    res.status(401).json({
                        ok: false,
                        status: 401,
                        message: "user login incorrecto!",
                        user_finded: null 
                    });
                } else {  
                    // enviar datos o redireccionar sobre login/success
                    const token = _jwt.createToken(_dataUser.getTokenUserData(user_finded));
                    // SESSION: ##############################################################
                    req.session.userId = user_finded._id;
                    // SESSION: ##############################################################

                    res.status(200).header('auth-token', token ).json({ // mejor el token lo envias por aqui 
                        ok: true,
                        status: 200,
                        message: "user login correcto!",
                        'auth-token': token,
                        user: _dataUser.getPublicUserData(user_finded) 
                    });
                }   
            } 
        } 
    });
};
//http://localhost:3333/api/user/logout [mdAuth.userIsAuthenticated]
userController.logout = (req, res)=>{
    console.log('in logout', req.session);
    if (req.session){
        req.session.userId = null;

        res.status(200).json({
            ok: true,
            status: 200,
            message: "usuario logout!",
            user: null,
            token: null,
            // FIXME: ONLY IN DEVELOPMENT
            reqSession : req.session
        });
    } else {
        res.redirect(200, '/api/user/login');
    }

}

// ENDPOINTS                                [tokenAuthenticated] [UserAuthorized]
//http://localhost:3333/api/user/profile    [tokenAuthenticated] [UserAuthorized]
userController.getProfile =  (req, res)=>{
    (req.session) ? console.log('################ REQ.USER EXIST ########## ', req.session) : console.log('no existe req.user');

    if ( req.verificationToken.auth == true) { 
        User.findOne({ _id: req.verificationToken.payload.sub._id, visible: true}, (err, user_finded)=>{
            // console.log("buscado el user");
            if(err){
                res.status(500).json({
                    ok: false,
                    status: 500,
                    message: 'OOOPS error de base de datos!',
                });
            } else {
                if(user_finded == null  || user_finded.visible == false){
                    res.status(401).json({
                        ok: false,
                        status: 401,
                        message: "El usuario no existe en bd"
                    });
                }else {
                    // creamos el req.user recuerda que existe también req.verificationToken
                    const ReqUserData = req.session;
                    const tokenUserData= _dataUser.getTokenUserData(user_finded);
                    const publicUserData= _dataUser.getPublicUserData(user_finded);
                    // console.log('req.user: ', req.user);
                    // console.log('req.verificationToken: ', req.verificationToken); 
                    if(_ENV == 'development'){
                        res.status(200).json({
                            ok: true,
                            status: 200,
                            message: "Tu perfil",
                            tokenExpired: req.verificationToken.expired,
                            token : req.verificationToken.token,
                            userPublic: publicUserData,
                            // FIXME: SOLO EN DEVELOPMENT #################################################################### 
                            verificationToken: req.verificationToken,
                            user: {
                                ReqUserData: ReqUserData,      // idUser, ... 
                                publicUserData: publicUserData,    // name, img_avatar, createdAt
                                tokenUserData: tokenUserData      //  _id, createdAt
                            }
                            // FIXME: SOLO EN DEVELOPMENT ####################################################################
                        });
                    }else {
                        res.status(200).json({
                            ok: true,
                            status: 200,
                            message: "Tu perfil",
                            tokenExpired: req.verificationToken.expired,
                            token : req.verificationToken.token,
                            userPublic: publicUserData
                        });
                    }
                    
                }

            }
        });
    } else {
        // HASK:  crea el usuario a partir del token o redireccionalo al login
        res.redirect(200, '/api/user/login');
    }

};

// TODO: //http://localhost:3333/api/user/edit       [tokenAuthenticated] [UserAuthorized]
// TODO: //http://localhost:3333/api/user/delete     [tokenAuthenticated] [Userauthorized] [ONLY-ADMIN-CANT-DO-THAT]
*/

module.exports = userController;
