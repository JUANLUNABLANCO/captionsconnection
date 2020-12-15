/* ####### MODULES ######*/
const mongoose      = require('../_connections/db_connect');
const Schema        = mongoose.Schema;
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const channelConfig = require('./channel.config');
const clientConfig  = require('../Client/client.config');
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/





const ChannelSchema =  new Schema ({
    channelType:        {type: String, required: "El 'channelType' es requerido", enum: channelConfig.channelType},
    // CLIENT 
    clientEmail:        {
        type: String, 
        required: "El 'clientEmail' es requerido",
        match: [channelConfig.regExEmail, "El 'clientEmail' no es válido "], 
        index: { unique: false }, 
        lowercase: true, 
        trim: true
    },
    channelName:        {
        type: String, 
        required: "El 'channelName', es requerido",
        match: [channelConfig.regExChName, "El 'channelName' no es válido."],
        minlength: [3, "demasiado corto"], 
        index: { unique: true }, 
        lowercase: true, 
        trim: true
    },
    channelLanguage:            {type: String, required: true, enum: channelConfig.channelLanguage},
    channelCategory:            {type: String, required: true, enum: channelConfig.channelCategory},
    clientInterestingNow:       {type: Boolean, require: false, default: false},
    // ##################### default
    channelImg:         {type: String, required: false, default: 'img_channel_default.jpg'},
    // CLIENT ##################### introducidos de segundas, cuando se cree el cliente
    _idClient:          { type: Schema.Types.ObjectId, ref: 'client', required: false},// el dueño del canal
    // ##################### datos extraidos de la API YOUTUBE
    total_subscribers:  {type: Number, required: false, default: 0},
    total_views:        {type: Number, required: false, default: 0},
    total_videos:       {type: Number, required: false, default: 0}, // estos datos seran arrays de Clases donde vendrá el número y la fecha
    // ##################### datos internos
    visible:            {type: Boolean, default: true }

},
{
    timestamp: true
});
// después de crear el channel debe guardar ciertos datos en 'client'
ChannelSchema.post('save', (doc) => {
    // console.log('NEW CAHNNEL: ', doc);
    if (_ENV == 'development'){
        console.log('channelType', doc.channelType);
        console.log('clientType: ',  clientConfig.arrClientTypes[channelConfig.arrChannelTypes.indexOf( doc.channelType)]);
    }
});
ChannelSchema.virtual('clientType').get(function(){
    return clientConfig.arrClientTypes[channelConfig.arrChannelTypes.indexOf(this.channelType)];
});
ChannelSchema.index({clientEmail: 1, channelName: 1}, {unique: true});   // indice de busqueda que agrupa el clientEmail (puede repetirse) y
// el channelName (no puede repetirse). por ejemplo: 1 email@x.com - #carbonChannel, 2 email@x.com - #otroCanal


module.exports = mongoose.model('channel', ChannelSchema);