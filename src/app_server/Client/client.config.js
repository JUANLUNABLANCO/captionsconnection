// ########################## COMMON
const regExEmail            = require('../_configs/constsBusiness').regExEmail;
// ########################## CLIENT
const arrClientTypes        = ['YOUTUBER', 'FACEBOOKER', 'INSTAGRAMMER', 'BLOGGER-WEB', 'MARKETTER', 'OTHER'];
const arrCustomersJourney   = ['1-reconocimiento', '2-consideración', '3-decisión', '4-compra', '5-post-venta', '6-early-adopter', '7-mosqueado', '8-vip'];
// ########################## CLIENT
module.exports = {
    // common
    regExEmail,
    // client
    arrClientTypes,
    arrCustomersJourney
}