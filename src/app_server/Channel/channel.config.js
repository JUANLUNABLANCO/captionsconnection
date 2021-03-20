// ########################## COMMON
const regExEmail = require("../_configs/constsBusiness").regExEmail;
// ########################## CHANNEL
const regExChName = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,50}$/;
const arrChannelTypes = [
    "YOUTUBE",
    "FACEBOOK",
    "INSTAGRAM",
    "BLOG-WEB",
    "MARKETING-AGENCY",
    "OTHER",
];
const arrChannelLanguages = ["ES", "EN", "FR", "PT", "OTHER"];
const arrChannelCategories = [
    "autos-vehicles",
    "comedy",
    "education",
    "entertainment",
    "film-animation",
    "gaming",
    "nonprofits-activism",
    "howto-style",
    "music",
    "news-politics",
    "people-blogs",
    "pets-animals",
    "science-technology",
    "sports",
    "travel-events",
];
// ########################## CHANNEL
module.exports = {
    // COMMON
    regExEmail,
    // CHANNELS
    regExChName,
    arrChannelTypes,
    arrChannelLanguages,
    arrChannelCategories,
};
