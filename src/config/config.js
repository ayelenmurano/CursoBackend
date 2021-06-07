const config = {};

const clientID = process.argv[3] || "249923326905355";
const clientSecret = process.argv[4] || "2d813974f9043c70e42c536e95e2eb47";

config.facebook = {
    clientID : clientID,
    clientSecret : clientSecret,
}

module.exports = config;