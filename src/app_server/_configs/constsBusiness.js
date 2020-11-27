// ########################## CHANNEL
const regExChName           = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,}$/;
const regExEmail            = /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const arrChannelTypes       = ['YOUTUBE', 'FACEBOOK', 'INSTAGRAM', 'BLOG-WEB','MARKETING-AGENCY', 'OTHER'];
const arrChannelLanguages   = ['ES', 'EN', 'FR', 'PT', 'OTHER'];
const arrChannelCategories  = [
    'autos-vehicles', 'education', 'entertainment', 'film-animation', 'gaming', 'nonprofits-activism', 'howto-style', 'music', 
    'news-politics', 'people-blogs', 'pets-animals', 'science-technology', 'sports', 'travel-events', 'comedy'
];
// ########################## CHANNEL
// ########################## CLIENT
const arrClientTypes        = ['YOUTUBER', 'FACEBOOKER', 'INSTAGRAMMER', 'BLOGGER-WEB', 'MARKETTER', 'OTHER'];
const arrCustomersJourney   = ['1-reconocimiento', '2-consideración', '3-decisión', '4-compra', '5-post-venta', '6-early-adopter', '7-mosqueado', '8-vip'];
// ########################## CLIENT
// ########################## FREELANCER
const arrLanguages          = ["english", "spanish", "french", "portugués", "OTHER"];
const arrHabilities         = ["translator", "trasncription", "subtitler", "video-editor"];
const arrCountries          = ["ES", "EN", "US", "FR", "PT", "hispano-america", "other-english-countries", "zone-europe", "OTHER"];
const arrNativeValues       = [2, 3, 1.5, 1, 0.5];
const arrCountryValues      = [7, 6, 5, 4, 3, 2, 1, 1.5, 0];

module.exports = {
    // CHANNELS
    regExChName,
    regExEmail,
    arrChannelTypes,
    arrChannelLanguages,
    arrChannelCategories,
    // CLIENTS
    arrClientTypes,
    arrCustomersJourney,
    // FREELANCER
    arrLanguages,
    arrHabilities,
    arrCountries,
    arrNativeValues,
    arrCountryValues
};