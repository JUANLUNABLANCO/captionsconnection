/* ####### MODULES ######*/
const mongoose          = require('../_connections/db_connect');
const Schema = mongoose.Schema;
const bcrypt            = require('bcrypt');
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const userConfig        = require('./user.config');
const regExEmail        = userConfig.regExEmail;
const regExName         = userConfig.regExName;
const R                 = require('../_configs/general').ROLES;
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/

const UserSchema = new Schema({
    // ######################## req.body
    name:       {type: String, required: true, minLength: 3,maxlength: 50, match: [regExName, "El 'Email' no es válido "], lowercase: true, trim: true  },
    email:      {type: String, required: true, index: { unique: true }, match: [regExEmail, "El 'Email' no es válido "], lowercase: true, trim: true },
    password:   {type: String, required: true},
    // ######################## default
    img_avatar: {type: String, required: false, default: "img_anonimous.jpg"},
    role:       {type: String, required: true, default: R.ROLE_USER, enum: [
        R.ROLE_USER,        // se registra pero no es cliente, ni freelancer, ni asociado. Usa la web y accede a cursos contenidos
        R.ROLE_CLIENT,      // un usuario que ha decidido comprar alguno de nuestros servcicios o productos. Colecciones:
                            // 'user', 'client',  indirectamente --> channelClient (sus canales de YouTube)
        R.ROLE_FREELANCER,  // un usuario que quiere trabajar con nosotros, tenemos datos profesionales de él. Colecciones: 
                            // 'user', 'freelancer'
        R.ROLE_ASSOCIATED,  // un freelancer ha pasado a formar parte del equipo, Colecciones:
                            // 'user', 'freelancer', 'associated'
        R.ROLE_API,         // la aplicación realiza alguna acción, tiene su propio email no necesita loguearse
        R.ROLE_ADMIN,       // usuario con privilegios especiales        
        R.ROLE_GOODNESS     // administrador supremo, el único que puede crear nuevos admins 

        // hacemos diferenciación entre usuarios, clientes, freelances y asociados porque sus profiles y sus dashboards cambian.
        // así como los accesos a la app-web. Los privilegios de acceso, están aquí declarados por orden de importancia de menos a más
    ]},
    visible: {type: Boolean, required: false, default: true }
},
{
    timestamps: true // añade automáticamente updatedAt y createdAt
});

// TODO: CREAR FUNCIONES VIRTUALES SI SE REGISTRA COMO CLIENT INTRODUCIR EL CLIENTiD ...

// funcion de encriptacion
UserSchema.methods.encryptPassword = async (password) => {
    // HASK: recortala a no mas de 128 digitos bruto ¿SI TE METEN UN BLOB EXPLOTA LA BASE DE DATOS?
    return await bcrypt.hash(password, await bcrypt.genSalt( 10));
}
// funcion de comparacion de contraseñas encriptadas
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare (password, this.password);
}
// UserSchema.methods.confirmPasswords = function (password, confirmPassword){
//     return (password == confirmPassword); // true | false
// }
UserSchema.methods.confirmEmails = function (email, confirmEmail){
    return (email == confirmEmail); // true | false
}

module.exports = mongoose.model('user', UserSchema);