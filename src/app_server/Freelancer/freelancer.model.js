/* ####### MODULES ######*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
/* ####### ROUTES #######*/
/* ####### CONFIGS ######*/
const freelancerConfig = require("./freelancer.config");
/* ####### MODELS #######*/
/* ####### HELPERS ######*/
/* ####### CONTROLLERS ##*/
/* ####### MIDDLEWARES ##*/

const FreelancerSchema = new Schema(
    {
        // desde usuario
        _idUser: { type: Schema.Types.ObjectId, ref: "user", required: false }, // puede venir por el registro de un usuario
        registered: { type: Boolean, required: false, default: false }, // puede registrar un freelancer si registrar un user
        // REQUERIDOS desde freelancer
        email: {
            type: String,
            required: true,
            index: { unique: true },
            match: [freelancerConfig.regExEmail, "El 'email' no es válido "],
            lowercase: true,
            trim: true,
        },

        nativeLanguage: {
            type: String,
            required: true,
            enum: freelancerConfig.arrLanguages,
        },
        languages: [
            {
                type: String,
                required: true,
                enum: freelancerConfig.arrLanguages,
            },
        ],
        // ampliar enum en el PEB y poner levels for languages level 1 (medio), level 2 (alto), level 3 (nativo)
        habilities: [
            {
                type: String,
                required: true,
                enum: freelancerConfig.arrHabilities,
            },
        ],
        country: {
            type: String,
            required: true,
            enum: freelancerConfig.arrCountries,
        },

        // NO REQUERIDOS
        promotionPoints: { type: Number, required: false, default: 0 },
        alarm: { type: Boolean, required: false, default: false },
        visible: { type: Boolean, required: false, default: true },
    },
    {
        timestamps: true, // añade automáticamente updatedAt y createdAt
    }
);

FreelancerSchema.pre("save", function (next) {
    // console.log('VALUE COUNT: ', freelancerConfig.arrCountryValues[freelancerConfig.arrCountries.indexOf(this.country)]);
    // console.log('VALUE LANG: ', freelancerConfig.arrLanguages.indexOf(this.nativeLanguage));

    let countryPoints, nativePoints;
    let arrayNV = freelancerConfig.arrNativeValues; // [2, 3, 1.5, 1, 0.5];
    let arrayCV = freelancerConfig.arrCountryValues; // [7, 6, 5, 4, 3, 2, 1, 0];
    nativePoints =
        arrayNV[freelancerConfig.arrLanguages.indexOf(this.nativeLanguage)];
    countryPoints =
        arrayCV[freelancerConfig.arrCountries.indexOf(this.country)];
    this.promotionPoints =
        this.habilities.length * 10000 +
        this.languages.length * 1000 +
        countryPoints * 100 +
        nativePoints * 10; // 2315

    _PRINT.Console(
        "Result: " +
            this.habilities.length +
            " * 10000 " +
            this.languages.length +
            " * 1000 + " +
            countryPoints +
            " * 100 + " +
            nativePoints +
            " * 10 + " +
            " = " +
            this.promotionPoints
    );
    // ejemplo un freelancer nativo de inglaterra, con 2 idiomas / 3 habilidades y viviendo en España, tendría un total de:
    // 2237 puntos // de esta forma, viendo los puntos, en seguida identificamos que:
    // (2) es de inglaterra
    // (2) tiene 2 idiomas
    // (3) habilidades
    // (7) y vive en España. ==> "ES", "EN", "US", "FR", "hispano-america", "english-countrie", "zone-europe", "other"
    //                       ==>  7,    6,     5,     4,        3,                 2,                1,           0

    if (this.promotionPoints >= 20000) {
        // más de dos habilidades
        this.alarm = true;
    }
    console.log("Promotion points: ", this.promotionPoints);
    console.log("Alarm: ", this.alarm);
    next();
});

FreelancerSchema.post("save", (doc) => {
    // console.log('NEW FREELANCER: ', doc);
    if (_ENV == "development") {
        console.log("promotionPoints: ", doc.promotionPoints);
    }
    if (doc.alarm == true) {
        // notification to admin
    }
});
// funcion de encriptacion
FreelancerSchema.methods.encryptPassword = async (password) => {
    // HASK: recortala a no mas de 128 digitos bruto ¿SI TE METEN UN BLOB EXPLOTA LA BASE DE DATOS?
    return await bcrypt.hash(password, await bcrypt.genSalt(10));
};
// funcion de comparacion de contraseñas encriptadas
FreelancerSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// UserSchema.methods.confirmPasswords = function (password, confirmPassword){
//     return (password == confirmPassword); // true | false
// }
FreelancerSchema.methods.confirmEmails = function (email, confirmEmail) {
    return email == confirmEmail; // true | false
};

module.exports = mongoose.model("freelancer", FreelancerSchema);
