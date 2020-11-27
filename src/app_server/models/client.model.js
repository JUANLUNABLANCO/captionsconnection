// conexion to db with auth
const mongoose = require('mongoose'); // podriamos hacer un try catch y si hay error mandar un mensaje: "No hay Conexion con bd"
const Schema = mongoose.Schema;

const CB = require('../_configs/constsBusiness');

const ClientSchema = new Schema({
    // user data
    idUser:             {type: Schema.Types.ObjectId, ref: 'user', required: false }, // puede venir por el registro de un usuario
    registered:         {type: Boolean, required: true, default: false}, // crear una función sino viene idUser registered=false, piensa 
                        // que puede registrar un canal y por tanto no le pedimos el idUser
    email:              {type: String, match: [CB.regExEmail, "El 'Email' no es válido "], required: true, 
                        index: {unique: true}, // dos usuarios con el mismo email no  es permitido
                        lowercase: true, trim: true},

    // client data required: true
    customerJourney:    {type: String, required: true, enum: CB.arrCustomersJourney, default: CB.arrCustomersJourney[0]}, 
                        // ['1-reconocimiento', '2-consideración', '3-decisión', '4-compra', '5-post-venta', '6-vip', '7-mosqueado'] // se modificará con los estados de compra
    clientType:         {type: String, required: true, enum: CB.arrClientTypes,  default: CB.arrClientTypes[0]}, // ['YOUTUBER', 'FACEBOOKER', 'INSTAGRAMMER', 'AGENCY']
    // client data required: false
    interested:         {type: Boolean, required: false, default: false}, // función si interested==false -> customerJourney=[0], 
                        // si interested==true --> customerJourney=[1], si viene idUser, customerJourney=[2]
    _idChannels:        [{type: Schema.Types.ObjectId, ref: 'channel', required: false}], // los canales de ese cliente
    idProposedWorks:    [{type: Schema.Types.ObjectId, ref: 'work', required: false}], // los trabajos propuestos
    // necesario
    visible:            {type: Boolean, required: false, default: true }
},
{
    timestamps: true // añade automáticamente updatedAt y createdAt
});


module.exports = mongoose.model('client', ClientSchema);