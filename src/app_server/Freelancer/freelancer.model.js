const mongoose  = require('../_connections/db_connect');
const Schema    = mongoose.Schema;
const CB        = require('../_configs/constsBusiness');

const FreelancerSchema = new Schema({
    
    email:          {type: String, required: true, index: {unique: true}, match: [CB.regExEmail, "El 'email' no es válido "], lowercase: true, trim: true},
    
    nativeLanguage: {type: String, required: true,  enum: CB.arrLanguages },
    languages:      [{type: String, required: true, enum: CB.arrLanguages }],  
    // ampliar enum en el PEB y poner levels for languages level 1 (medio), level 2 (alto), level 3 (nativo)
    habilities:     [{type: String, required: true, enum: CB.arrHabilities}],
    country:        {type: String, required: true,  enum: CB.arrCountries},
    
    promotionPoints:    {type: Number, required: false, default: 0},
    alarm :             {type: Boolean, required: false, default: false },
    visible:            {type: Boolean, required: false, default: true }
},
{
    timestamps: true // añade automáticamente updatedAt y createdAt
});

FreelancerSchema.pre('save', function (next){
    console.log('VALUE COUNT: ', CB.arrCountryValues[CB.arrCountries.indexOf(this.country)]);
    console.log('VALUE LANG: ', CB.arrLanguages.indexOf(this.nativeLanguage));
    
    let countryPoints, nativePoints;
    let arrayNV             = CB.arrNativeValues; // [2, 3, 1.5, 1, 0.5];
    let arrayCV             = CB.arrCountryValues; // [7, 6, 5, 4, 3, 2, 1, 0];
    nativePoints            = arrayNV[CB.arrLanguages.indexOf(this.nativeLanguage)];
    countryPoints           = arrayCV[CB.arrCountries.indexOf(this.country)];
    this.promotionPoints    = 
                            this.habilities.length  * 10000 +
                            this.languages.length   * 1000  +
                            countryPoints           * 100   +
                            nativePoints            * 10; // 2315

    console.log('Result: ' + this.habilities.length  + ' * 10000 ' + 
                            this.languages.length + ' * 1000 + ' + 
                            countryPoints + ' * 100 + ' + 
                            nativePoints+ ' * 10 + ' + 
                            ' = ' + this.promotionPoints);
    // ejemplo un freelancer nativo de inglaterra, con 2 idiomas / 3 habilidades y viviendo en España, tendría un total de:
    // 2237 puntos // de esta forma, viendo los puntos, en seguida identificamos que:
    // (2) es de inglaterra
    // (2) tiene 2 idiomas 
    // (3) habilidades 
    // (7) y vive en España. ==> "ES", "EN", "US", "FR", "hispano-america", "english-countrie", "zone-europe", "other" 
    //                       ==>  7,    6,     5,     4,        3,                 2,                1,           0
    
    
    if (this.promotionPoints >= 20000){ // más de dos habilidades
        this.alarm = true;
    }
    console.log('Promotion points: ', this.promotionPoints);
    console.log('Alarm: ', this.alarm);
    next();                       
});
// después de crear el channel debe guardar ciertos datos en 'client'
FreelancerSchema.post('save', (doc) => {
    // console.log('NEW CAHNNEL: ', doc);
    if (_ENV == 'development'){
        console.log('promotionPoints: ', doc.promotionPoints);
    }
    if (doc.alarm == true){
        // notification to admin
    }
});
// FreelancerSchema.virtual('clientType').get(function(){
//     return CB.arrClientTypes[CB.arrChannelTypes.indexOf(this.channelType)];
// });

module.exports = mongoose.model('freelancer', FreelancerSchema);