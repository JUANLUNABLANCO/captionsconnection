// ########################## COMMON
const regExEmail            = require('../_configs/constsBusiness').regExEmail;
// ########################## FREELANCER
const arrLanguages          = ["english", "spanish", "french", "portugués", "OTHER"];
const arrHabilities         = ["translator", "trasncription", "subtitler", "video-editor"];
const arrCountries          = ["ES", "EN", "US", "FR", "PT", "hispano-america", "other-english-countries", "zone-europe", "OTHER"];
const arrNativeValues       = [2, 3, 1.5, 1, 0.5];
const arrCountryValues      = [7, 6, 5, 4, 3, 2, 1, 1.5, 0];
// ########################## FREELANCER
module.exports = {
    // common
    regExEmail,
    // freelancer
    arrLanguages,
    arrHabilities,
    arrCountries,
    arrNativeValues,
    arrCountryValues
}